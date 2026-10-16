import React, { useState } from "react"

import { parsePhoneNumberFromString } from "libphonenumber-js"

import {
  ChevronsUpDown,
  Info,
  Send,
  CheckCircle2,
  AlertCircle,
  Menu,
  X,
  Check,
} from "lucide-react"

import Footer from "./components/Footer"
import PartnershipEnquiryModal from "./components/PartnershipEnquiryModal"

const A = "/assets"

const imgMatkaaLogo = `${A}/1d816.png`

const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="5"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
  </svg>
)

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <path
      fill="#25D366"
      d="M12 2a9.8 9.8 0 0 0-8.45 14.76L2.3 22l5.37-1.22A9.8 9.8 0 1 0 12 2Z"
    />
    <path
      fill="white"
      d="M16.98 14.34c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.13-.42-2.15-1.33-.79-.7-1.33-1.57-1.49-1.84-.16-.27-.02-.42.12-.56.12-.12.27-.32.41-.47.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.47-.07-.14-.61-1.47-.84-2.01-.22-.52-.45-.45-.61-.46h-.52c-.18 0-.47.07-.72.34-.25.27-.95.93-.95 2.26s.97 2.62 1.11 2.8c.14.18 1.91 2.92 4.63 4.1.65.28 1.16.45 1.56.57.66.21 1.26.18 1.73.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32Z"
    />
  </svg>
)

const MessengerIcon = ({ messenger, className }) =>
  messenger === "WhatsApp" ? (
    <WhatsAppIcon className={className} />
  ) : (
    <Send className={`${className} text-[#8335e6] -rotate-12`} />
  )
const MatkaaLogo = ({ className = "" }) => (
  <a
    href="/"
    aria-label="MATKAA Partners home"
    className={`flex items-center select-none cursor-pointer ${className}`}
  >
    <img
      src={imgMatkaaLogo}
      alt="MATKAA Partners"
      className="h-[46px] w-[146px] object-contain"
    />
  </a>
)

export default function App() {
  // Form input states

  const [formData, setFormData] = useState({
    fullName: "",

    lastName: "",

    email: "",

    password: "",

    phone: "",

    country: "UK",

    messengerUsername: "",

    messenger: "Telegram",

    language: "EN",
  })

  // UI interaction states

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [feedback, setFeedback] = useState(null)

  const [fieldErrors, setFieldErrors] = useState({})

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  // Custom Dropdown Open States

  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false)

  const [messengerDropdownOpen, setMessengerDropdownOpen] = useState(false)

  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false)

  // Available options

  const countries = [
    { code: "UK", name: "United Kingdom", dialCode: "+44", phoneLength: 10 },

    { code: "US", name: "United States", dialCode: "+1", phoneLength: 10 },

    { code: "DE", name: "Germany", dialCode: "+49", phoneLength: 13 },

    { code: "FR", name: "France", dialCode: "+33", phoneLength: 9 },

    { code: "IN", name: "India", dialCode: "+91", phoneLength: 10 },

    { code: "PK", name: "Pakistan", dialCode: "+92", phoneLength: 10 },
  ]

  const messengers = [
    { id: "Telegram", label: "Telegram" },

    { id: "WhatsApp", label: "WhatsApp" },
  ]

  const languages = [
    { id: "EN", label: "English" },

    { id: "RU", label: "Russian" },

    { id: "DE", label: "German" },

    { id: "ES", label: "Spanish" },

    { id: "FR", label: "French" },
  ]

  const selectedCountry =
    countries.find((country) => country.code === formData.country) ||
    countries[0]

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const validateMessengerUsername = (value, messenger) => {
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
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "email") {
      setFieldErrors((prev) => ({
        ...prev,
        email:
          value && !validateEmail(value)
            ? "Enter a valid email address including @ and a domain."
            : "",
      }))
    }
    if (field === "messengerUsername") {
      setFieldErrors((prev) => ({
        ...prev,
        messengerUsername: value
          ? validateMessengerUsername(value, formData.messenger)
          : "",
      }))
    }
    if (field === "messenger") {
      setFieldErrors((prev) => ({
        ...prev,
        messengerUsername: formData.messengerUsername
          ? validateMessengerUsername(formData.messengerUsername, value)
          : "",
      }))
    }
  }

  const handleNameChange = (field, value) => {
    const invalidCharacters = /[^\p{L}\p{M} '\u2019-]/u.test(value)
    const name = value.replace(/[^\p{L}\p{M} '\u2019-]/gu, "")
    setFormData((prev) => ({ ...prev, [field]: name }))
    setFieldErrors((prev) => ({
      ...prev,
      [field]: invalidCharacters
        ? "Use letters only. Spaces, hyphens, and apostrophes are allowed."
        : "",
    }))
  }

  const handleNextSubmit = async (e) => {
    e.preventDefault()
    const validName = /^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u
    const nameErrors = {}
    if (!formData.fullName.trim()) nameErrors.fullName = "Enter your full name."
    else if (!validName.test(formData.fullName.trim()))
      nameErrors.fullName =
        "Use letters only. Spaces, hyphens, and apostrophes are allowed."
    if (!formData.lastName.trim()) nameErrors.lastName = "Enter your last name."
    else if (!validName.test(formData.lastName.trim()))
      nameErrors.lastName =
        "Use letters only. Spaces, hyphens, and apostrophes are allowed."
    setFieldErrors((prev) => ({ ...prev, ...nameErrors }))
    if (Object.keys(nameErrors).length) return
    const emailError = !formData.email.trim()
      ? "Enter your email address."
      : !validateEmail(formData.email)
        ? "Enter a valid email address including @ and a domain."
        : ""
    const messengerError = validateMessengerUsername(
      formData.messengerUsername,
      formData.messenger,
    )
    setFieldErrors((prev) => ({
      ...prev,
      email: emailError,
      messengerUsername: messengerError,
    }))
    if (emailError || messengerError) return

    // Validate required fields marked with *

    if (
      !formData.fullName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.messengerUsername.trim()
    ) {
      setFeedback({
        type: "error",

        message:
          "Please fill in all required fields marked with an asterisk (*).",
      })

      return
    }

    const hasUppercase = /[A-Z]/.test(formData.password)
    const hasSpecialCharacter = /[^A-Za-z0-9]/.test(formData.password)
    if (formData.password.length < 8 || !hasUppercase || !hasSpecialCharacter) {
      setFeedback({
        type: "error",
        message:
          "Password must be at least 8 characters and include an uppercase letter and a special character.",
      })
      return
    }

    const phoneRegion =
      selectedCountry.code === "UK" ? "GB" : selectedCountry.code
    const parsedPhone = formData.phone.trim()
      ? parsePhoneNumberFromString(formData.phone.trim(), phoneRegion)
      : undefined
    if (formData.phone.trim() && !parsedPhone?.isValid()) {
      setFeedback({
        type: "error",
        message: `Enter a valid ${selectedCountry.name} phone number.`,
      })
      return
    }
    setIsSubmitting(true)

    setFeedback(null)

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ ...formData, phone: parsedPhone?.number || "" }),
      })

      const result = await response.json()

      if (!response.ok)
        throw new Error(result.message || "Unable to create your account.")

      localStorage.setItem("matkaaToken", result.token)

      localStorage.setItem("matkaaUser", JSON.stringify(result.user))

      window.location.assign("/profile")

      setFeedback({
        type: "success",
        message: result.message || "Your partner account has been created.",
      })
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Could not connect to the server.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-800 bg-[#f8fafc] selection:bg-purple-100 selection:text-purple-900">
      {}
      <header className="w-full bg-[#f8fafc]/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/70 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between relative">
          {/* Logo */}
          <MatkaaLogo />

          {/* Desktop Navigation */}
          <div className="hidden lg:flex absolute left-[calc(50%-20px)] -translate-x-1/2 items-center gap-18">
            <a
              href="/#news"
              className="text-[16px] font-medium text-gray-800 hover:text-purple-600 transition-colors"
            >
              News
            </a>
            <a
              href="/#contacts"
              onClick={(event) => {
                event.preventDefault()
                setContactOpen(true)
                setMobileMenuOpen(false)
              }}
              className="text-[16px] font-medium text-gray-800 hover:text-purple-600 transition-colors"
            >
              Contacts
            </a>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center justify-end gap-8 ml-auto">
            {/* Registration Button (Active state) */}
            <a
              href="/register"
              className="px-6 py-2 rounded-none bg-[#8335e6] hover:bg-[#7227d4] text-white text-[16px] font-semibold shadow-sm hover:shadow-md hover:shadow-purple-500/20 active:scale-[0.98] transition-all"
            >
              Registration
            </a>

            {/* Log in link */}
            <a
              href="/login"
              className="px-6 py-2 text-[16px] font-medium text-gray-800 hover:text-purple-600 transition-colors"
            >
              Log in
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-4 space-y-3 shadow-md">
            <a
              href="/#news"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-medium text-gray-800"
            >
              News
            </a>
            <a
              href="/#contacts"
              onClick={(event) => {
                event.preventDefault()
                setContactOpen(true)
                setMobileMenuOpen(false)
              }}
              className="block py-2 text-base font-medium text-gray-800"
            >
              Contacts
            </a>
            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-2.5 rounded-none bg-[#8335e6] text-white font-semibold text-center"
              >
                Registration
              </a>
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 text-gray-700 font-medium"
              >
                Log in
              </a>
            </div>
          </div>
        )}
      </header>

      {}
      <main className="flex-1 relative flex items-center justify-center py-12 lg:py-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#e8f1f7] via-[#ebf3f9] to-[#edf4fa]">
        {/* Subtle patterned background overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
          style={{
            backgroundImage: `radial-gradient(#cad7e4 1px, transparent 1px), radial-gradient(#d3e1ee 1px, #eef4f9 1px)`,

            backgroundSize: "32px 32px",

            backgroundPosition: "0 0, 16px 16px",
          }}
        />

        {/* Dynamic atmospheric subtle waves overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg
            className="w-full h-full object-cover"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <filter id="distort-reg">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.015"
                numOctaves="3"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="30"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <rect
              width="100%"
              height="100%"
              fill="none"
              stroke="#7e9bb4"
              strokeWidth="1"
              opacity="0.35"
              filter="url(#distort-reg)"
            />
          </svg>
        </div>

        {/* Central Registration Card */}
        <div className="relative z-10 w-full max-w-[820px] bg-white rounded-[26px] border border-[#d6e0ea] shadow-[0_10px_35px_rgba(40,60,90,0.06)] px-7 sm:px-12 py-10 transition-all duration-300">
          {/* Card Header Title and Login link */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-medium text-[#1e2432] tracking-tight mb-2">
              Registration
            </h1>
            <p className="text-[14px] text-gray-500 font-normal">
              Do you already have an account?{" "}
              <a
                href="/login"
                className="text-[#1e2432] font-semibold hover:text-[#8335e6] underline-offset-2 transition-colors cursor-pointer"
              >
                Log in
              </a>
            </p>
          </div>

          {/* Feedback message banner */}
          {feedback && (
            <div
              className={`mb-6 p-3 rounded-xl text-xs flex items-center gap-2 transition-all ${
                feedback.type === "error"
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {feedback.type === "error" ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
          )}

          {/* 2-Column Responsive Registration Form */}
          <form onSubmit={handleNextSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 items-start">
              {/* LEFT COLUMN: Row 1 - Full name */}
              <div className="space-y-1.5">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Full name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleNameChange("fullName", e.target.value)}
                  placeholder="Adam"
                  aria-invalid={Boolean(fieldErrors.fullName)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all"
                />
                {fieldErrors.fullName && (
                  <p role="alert" className="text-xs text-rose-600">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              {/* RIGHT COLUMN: Row 1 - Last name */}
              <div className="space-y-1.5">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Last name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleNameChange("lastName", e.target.value)}
                  placeholder="Karter"
                  aria-invalid={Boolean(fieldErrors.lastName)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all"
                />
                {fieldErrors.lastName && (
                  <p role="alert" className="text-xs text-rose-600">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>

              {/* LEFT COLUMN: Row 2 - Email with info icon */}
              <div className="space-y-1.5">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Email <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    aria-invalid={Boolean(fieldErrors.email)}
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="example@gmail.com"
                    className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#cbd5e1] text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all"
                  />
                  <button
                    type="button"
                    title="Provide a valid email address for account confirmation"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
                {fieldErrors.email && (
                  <p role="alert" className="text-xs text-rose-600">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              {/* RIGHT COLUMN: Row 2 - Password */}
              <div className="space-y-1.5">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Password <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  minLength={8}
                  maxLength={128}
                  pattern="(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,128}"
                  title="Use at least 8 characters, including an uppercase letter and a special character."
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Enter password"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all"
                />
              </div>

              {/* LEFT COLUMN: Row 3 - Country with Flag and double caret */}
              <div className="space-y-1.5 relative">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Country <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setCountryDropdownOpen(!countryDropdownOpen)

                    setMessengerDropdownOpen(false)

                    setLanguageDropdownOpen(false)
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] bg-white text-gray-800 text-[14px] flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-normal text-gray-800">
                      {selectedCountry.name}
                    </span>
                  </div>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Country Dropdown List */}
                {countryDropdownOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-30 max-h-48 overflow-y-auto animate-in fade-in slide-in-from-top-1">
                    {countries.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            country: c.code,
                            phone: prev.phone.slice(0, c.phoneLength),
                          }))

                          setCountryDropdownOpen(false)
                        }}
                        className="w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-purple-50 text-gray-700 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold w-8 text-center">
                            {c.code}
                          </span>
                          {c.name} ({c.code})
                        </span>
                        {formData.country === c.code && (
                          <Check className="w-3.5 h-3.5 text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Row 3 - Phone */}
              <div className="space-y-1.5">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Phone
                </label>
                <div className="flex overflow-hidden rounded-lg border border-[#cbd5e1] bg-white focus-within:border-[#8335e6] focus-within:ring-2 focus-within:ring-purple-500/20">
                  <span
                    aria-label={`Country calling code ${selectedCountry.dialCode}`}
                    className="flex items-center border-r border-[#cbd5e1] bg-slate-50 px-3.5 text-[14px] font-medium text-gray-700"
                  >
                    {selectedCountry.dialCode}
                  </span>
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={selectedCountry.phoneLength}
                    value={formData.phone}
                    onChange={(e) =>
                      handleInputChange(
                        "phone",
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, selectedCountry.phoneLength),
                      )
                    }
                    placeholder="Phone number"
                    autoComplete="tel-national"
                    aria-label={`Phone number for ${selectedCountry.name}; digits only`}
                    className="min-w-0 w-full px-3.5 py-2.5 text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Row 4 - Messenger with Send icon */}
              <div className="space-y-1.5 relative">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Messenger
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMessengerDropdownOpen(!messengerDropdownOpen)

                    setCountryDropdownOpen(false)

                    setLanguageDropdownOpen(false)
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] bg-white text-gray-800 text-[14px] flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <MessengerIcon
                      messenger={formData.messenger}
                      className="w-4 h-4"
                    />
                    <span className="font-normal text-gray-800">
                      {formData.messenger}
                    </span>
                  </div>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Messenger Dropdown List */}
                {messengerDropdownOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-30 animate-in fade-in slide-in-from-top-1">
                    {messengers.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => {
                          handleInputChange("messenger", m.id)

                          setMessengerDropdownOpen(false)
                        }}
                        className="w-full px-3.5 py-2 text-left text-sm flex items-center justify-between hover:bg-purple-50 text-gray-700 cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <MessengerIcon
                            messenger={m.id}
                            className="w-3.5 h-3.5"
                          />
                          {m.label}
                        </span>
                        {formData.messenger === m.id && (
                          <Check className="w-3.5 h-3.5 text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* LEFT COLUMN: Row 4 - Username in messenger */}
              <div className="space-y-1.5">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  {formData.messenger === "WhatsApp"
                    ? "Number in WhatsApp"
                    : "Username in Telegram"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type={formData.messenger === "WhatsApp" ? "tel" : "text"}
                  inputMode={formData.messenger === "WhatsApp" ? "tel" : "text"}
                  required
                  aria-invalid={Boolean(fieldErrors.messengerUsername)}
                  value={formData.messengerUsername}
                  onChange={(e) =>
                    handleInputChange("messengerUsername", e.target.value)
                  }
                  placeholder={
                    formData.messenger === "WhatsApp"
                      ? "XXX XXX XXXX"
                      : "@username"
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all"
                />
                {fieldErrors.messengerUsername && (
                  <p role="alert" className="text-xs text-rose-600">
                    {fieldErrors.messengerUsername}
                  </p>
                )}
              </div>

              {/* LEFT COLUMN: Row 5 - Language dropdown */}
              <div className="space-y-1.5 relative">
                <label className="block text-[13.5px] font-medium text-gray-700 text-left">
                  Language <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setLanguageDropdownOpen(!languageDropdownOpen)

                    setCountryDropdownOpen(false)

                    setMessengerDropdownOpen(false)
                  }}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] bg-white text-gray-800 text-[14px] flex items-center justify-between hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all cursor-pointer"
                >
                  <span className="font-normal text-gray-800">
                    {languages.find(
                      (language) => language.id === formData.language,
                    )?.label || "English"}
                  </span>
                  <ChevronsUpDown className="w-4 h-4 text-gray-400" />
                </button>

                {/* Language Dropdown Options */}
                {languageDropdownOpen && (
                  <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-30 max-h-44 overflow-y-auto animate-in fade-in slide-in-from-top-1">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        type="button"
                        onClick={() => {
                          handleInputChange("language", lang.id)

                          setLanguageDropdownOpen(false)
                        }}
                        className="w-full px-3.5 py-2 text-left text-sm flex items-center justify-between hover:bg-purple-50 text-gray-700 cursor-pointer"
                      >
                        <span>{lang.label}</span>
                        {formData.language === lang.id && (
                          <Check className="w-3.5 h-3.5 text-purple-600" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Row 5 - Next Purple Button */}
              <div className="pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-44 py-2.5 px-8 rounded-none bg-[#8335e6] hover:bg-[#7227d4] text-white font-medium text-[15px] shadow-sm hover:shadow-md hover:shadow-purple-500/20 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {}
      <Footer />
      {contactOpen && (
        <PartnershipEnquiryModal onClose={() => setContactOpen(false)} />
      )}
    </div>
  )
}
