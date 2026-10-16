import { useEffect, useState } from "react"
import { parsePhoneNumberFromString } from "libphonenumber-js"
import Footer from "./components/Footer"

const emptyUser = { fullName: "", lastName: "", email: "" }
const emptyPartner = {
  phone: "",
  country: "",
  messengerUsername: "",
  messenger: "Telegram",
  language: "EN",
}
const fieldClass =
  "mt-1.5 w-full rounded-lg border border-gray-300 px-3.5 py-2.5 font-normal outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-100"
const validName = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u
const validEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
const countries = {
  UK: { name: "United Kingdom", region: "GB" },
  GB: { name: "United Kingdom", region: "GB" },
  US: { name: "United States", region: "US" },
  DE: { name: "Germany", region: "DE" },
  FR: { name: "France", region: "FR" },
  IN: { name: "India", region: "IN" },
  PK: { name: "Pakistan", region: "PK" },
}
const languages = ["EN", "RU", "DE", "ES", "FR"]

const getEditableValues = (user, partner) => ({
  user: { fullName: user.fullName, lastName: user.lastName, email: user.email },
  partner: {
    phone: partner.phone,
    country: partner.country,
    messengerUsername: partner.messengerUsername,
    messenger: partner.messenger,
    language: partner.language,
  },
})

function validateMessengerUsername(value, messenger) {
  const input = value.trim()
  if (!input)
    return `Enter your ${
      messenger === "WhatsApp" ? "WhatsApp number" : "Telegram username"
    }.`
  if (messenger === "WhatsApp") {
    const digits = input.replace(/\D/g, "")
    return /^\+?[\d\s().-]+$/.test(input) &&
      digits.length >= 7 &&
      digits.length <= 15
      ? ""
      : "Enter a valid WhatsApp number with 7 to 15 digits."
  }
  return /^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(input)
    ? ""
    : "Enter a Telegram username with 5 to 32 letters, numbers, or underscores."
}

export default function Profile() {
  const [user, setUser] = useState(emptyUser)
  const [partner, setPartner] = useState(emptyPartner)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
  const [fieldErrors, setFieldErrors] = useState({})

  const [initialValues, setInitialValues] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("matkaaToken")
    if (!token) {
      window.location.replace("/login")
      return
    }
    const headers = { Authorization: `Bearer ${token}` }
    Promise.all([
      fetch("/api/users/me", { headers }),
      fetch("/api/partners/me", { headers }),
    ])
      .then(async ([userResponse, partnerResponse]) => {
        const [userResult, partnerResult] = await Promise.all([
          userResponse.json(),
          partnerResponse.json(),
        ])
        if (userResponse.status === 401 || partnerResponse.status === 401) {
          localStorage.removeItem("matkaaToken")
          localStorage.removeItem("matkaaUser")
          window.location.replace("/login")
          return
        }
        if (!userResponse.ok)
          throw new Error(userResult.message || "Unable to load your account.")
        if (!partnerResponse.ok)
          throw new Error(
            partnerResult.message || "Unable to load your partner profile.",
          )
        const loadedUser = {
          fullName: userResult.user.fullName || "",
          lastName: userResult.user.lastName || "",
          email: userResult.user.email || "",
        }

        const loadedPartner = {
          phone: partnerResult.partner.phone || "",
          country: partnerResult.partner.country || "",
          messengerUsername: partnerResult.partner.messengerUsername || "",
          messenger: partnerResult.partner.messenger || "Telegram",
          language: partnerResult.partner.language || "EN",
        }

        setUser(loadedUser)

        setPartner({
          ...loadedPartner,
          status: partnerResult.partner.status || "pending",
        })

        setInitialValues(
          JSON.stringify(getEditableValues(loadedUser, loadedPartner)),
        )
        localStorage.setItem("matkaaUser", JSON.stringify(userResult.user))
      })
      .catch((error) =>
        setMessage({
          type: "error",
          text: error.message || "Could not connect to the server.",
        }),
      )
      .finally(() => setLoading(false))
  }, [])

  function updateName(field, value) {
    const sanitized = value.replace(/[^\p{L}\p{M} '\u2019-]/gu, "")
    setUser((current) => ({ ...current, [field]: sanitized }))
    setFieldErrors((current) => ({
      ...current,
      [field]:
        sanitized && !validName.test(sanitized.trim())
          ? "Use letters only. Spaces, hyphens, and apostrophes are allowed."
          : "",
    }))
  }
  function updateUserField(field, value) {
    setUser((current) => ({ ...current, [field]: value }))
  }
  function updatePartnerField(field, value) {
    setPartner((current) => ({ ...current, [field]: value }))
  }

  function validateForm() {
    const errors = {}
    for (const field of ["fullName", "lastName"]) {
      const value = user[field].trim()
      if (!value)
        errors[field] =
          field === "fullName"
            ? "Enter your full name."
            : "Enter your last name."
      else if (!validName.test(value))
        errors[field] =
          "Use letters only. Spaces, hyphens, and apostrophes are allowed."
    }
    if (!user.email.trim()) errors.email = "Enter your email address."
    else if (!validEmail(user.email))
      errors.email = "Enter a valid email address including @ and a domain."
    if (!countries[partner.country]) errors.country = "Select a valid country."
    if (!languages.includes(partner.language))
      errors.language = "Select a valid language."
    if (!["Telegram", "WhatsApp"].includes(partner.messenger))
      errors.messenger = "Select Telegram or WhatsApp."
    const messengerError = validateMessengerUsername(
      partner.messengerUsername,
      partner.messenger,
    )
    if (messengerError) errors.messengerUsername = messengerError
    if (partner.phone.trim()) {
      const country = countries[partner.country]
      const parsed = country
        ? parsePhoneNumberFromString(partner.phone.trim(), country.region)
        : undefined
      if (!parsed?.isValid())
        errors.phone = `Enter a valid ${country?.name || "country"} phone number.`
    }
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage(null)
    if (!validateForm()) {
      setMessage({
        type: "error",
        text: "Please correct the highlighted fields before saving.",
      })
      return
    }
    const token = localStorage.getItem("matkaaToken")
    setSaving(true)
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    }
    try {
      const [userResponse, partnerResponse] = await Promise.all([
        fetch("/api/users/me", {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            fullName: user.fullName.trim(),
            lastName: user.lastName.trim(),
            email: user.email.trim(),
          }),
        }),
        fetch("/api/partners/me", {
          method: "PATCH",
          headers,
          body: JSON.stringify({
            phone: partner.phone.trim(),
            country: partner.country,
            messengerUsername: partner.messengerUsername.trim(),
            messenger: partner.messenger,
            language: partner.language,
          }),
        }),
      ])
      const [userResult, partnerResult] = await Promise.all([
        userResponse.json(),
        partnerResponse.json(),
      ])
      if (!userResponse.ok)
        throw new Error(
          userResult.message || "Unable to update account details.",
        )
      if (!partnerResponse.ok)
        throw new Error(
          partnerResult.message || "Unable to update partner details.",
        )
      const savedUser = {
        fullName: userResult.user.fullName,
        lastName: userResult.user.lastName,
        email: userResult.user.email,
      }

      const savedPartner = { ...partner, ...partnerResult.partner }

      setUser(savedUser)

      setPartner(savedPartner)

      setInitialValues(
        JSON.stringify(getEditableValues(savedUser, savedPartner)),
      )
      localStorage.setItem("matkaaUser", JSON.stringify(userResult.user))
      setMessage({ type: "success", text: "Your profile has been updated." })
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Could not connect to the server.",
      })
    } finally {
      setSaving(false)
    }
  }

  function logout() {
    localStorage.removeItem("matkaaToken")
    localStorage.removeItem("matkaaUser")
    window.location.replace("/")
  }

  const hasChanges =
    initialValues !== null &&
    JSON.stringify(getEditableValues(user, partner)) !== initialValues

  const inputProps = (field) => ({
    "aria-invalid": Boolean(fieldErrors[field]),
    className: `${fieldClass}${
      fieldErrors[field]
        ? " border-rose-500 focus:border-rose-500 focus:ring-rose-100"
        : ""
    }`,
  })
  const errorText = (field) =>
    fieldErrors[field] && (
      <p role="alert" className="mt-1 text-xs text-rose-600">
        {fieldErrors[field]}
      </p>
    )

  return (
    <>
      <main className="min-h-screen bg-[#f8fafc] px-4 py-12 text-gray-800">
        <section className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
          <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-[#2c053b]">
                Partner profile
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage your account and partner contact details.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/dashboard"
                className="rounded-lg border border-purple-200 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50"
              >
                Back to dashboard
              </a>
              <button
                onClick={logout}
                className="text-sm font-medium text-purple-700 hover:text-purple-900"
              >
                Log out
              </button>
            </div>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading profile...</p>
          ) : (
            <form noValidate onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-sm font-medium text-gray-700">
                  First name
                  <input
                    {...inputProps("fullName")}
                    required
                    autoComplete="given-name"
                    value={user.fullName}
                    onChange={(e) => updateName("fullName", e.target.value)}
                  />
                  {errorText("fullName")}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                  <input
                    {...inputProps("lastName")}
                    required
                    autoComplete="family-name"
                    value={user.lastName}
                    onChange={(e) => updateName("lastName", e.target.value)}
                  />
                  {errorText("lastName")}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                  <input
                    {...inputProps("email")}
                    required
                    type="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={(e) => updateUserField("email", e.target.value)}
                  />
                  {errorText("email")}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Country code
                  <input
                    {...inputProps("country")}
                    required
                    maxLength={2}
                    pattern="[A-Za-z]{2}"
                    title="Enter a supported two-letter country code."
                    autoComplete="country"
                    value={partner.country}
                    onChange={(e) =>
                      updatePartnerField(
                        "country",
                        e.target.value.toUpperCase(),
                      )
                    }
                  />
                  {errorText("country")}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Phone (optional)
                  <input
                    {...inputProps("phone")}
                    type="tel"
                    autoComplete="tel"
                    value={partner.phone}
                    onChange={(e) =>
                      updatePartnerField("phone", e.target.value)
                    }
                  />
                  {errorText("phone")}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Messenger
                  <select
                    {...inputProps("messenger")}
                    value={partner.messenger}
                    onChange={(e) =>
                      updatePartnerField("messenger", e.target.value)
                    }
                  >
                    <option>Telegram</option>
                    <option>WhatsApp</option>
                  </select>
                  {errorText("messenger")}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  {partner.messenger === "WhatsApp"
                    ? "WhatsApp number"
                    : "Telegram username"}
                  <input
                    {...inputProps("messengerUsername")}
                    required
                    type={partner.messenger === "WhatsApp" ? "tel" : "text"}
                    value={partner.messengerUsername}
                    onChange={(e) =>
                      updatePartnerField("messengerUsername", e.target.value)
                    }
                    placeholder={
                      partner.messenger === "WhatsApp"
                        ? "XXX XXX XXXX"
                        : "@username"
                    }
                  />
                  {errorText("messengerUsername")}
                </label>
                <label className="block text-sm font-medium text-gray-700">
                  Language
                  <select
                    {...inputProps("language")}
                    required
                    value={partner.language}
                    onChange={(e) =>
                      updatePartnerField("language", e.target.value)
                    }
                  >
                    {languages.map((language) => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                  {errorText("language")}
                </label>
              </div>
              <p className="text-sm text-gray-600">
                Application status:{" "}
                <span className="font-semibold capitalize">
                  {partner.status || "pending"}
                </span>
              </p>
              {message && (
                <p
                  role="status"
                  className={`rounded-lg p-3 text-sm ${
                    message.type === "error"
                      ? "bg-rose-50 text-rose-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {message.text}
                </p>
              )}
              <button
                disabled={saving || !hasChanges}
                className="w-full rounded-lg bg-[#8335e6] px-4 py-3 font-medium text-white hover:bg-[#7227d4] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
