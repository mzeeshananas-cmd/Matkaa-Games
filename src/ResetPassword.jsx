import React, { useState } from "react"
import Footer from "./components/Footer"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const token = new URLSearchParams(window.location.search).get("token") || ""

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage(null)
    if (password !== confirmPassword) {
      setMessage({ error: true, text: "The passwords do not match." })
      return
    }
    setLoading(true)
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const result = await response.json()
      if (!response.ok)
        throw new Error(result.message || "Unable to reset password.")
      setMessage({ error: false, text: result.message })
    } catch (error) {
      setMessage({
        error: true,
        text: error.message || "Could not connect to the server.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
          <h1 className="text-2xl font-semibold text-slate-900">
            Choose a new password
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Your reset link is valid for 30 minutes.
          </p>
          {message && (
            <p
              role="status"
              className={`mt-5 rounded-lg border p-3 text-sm ${
                message.error
                  ? "border-rose-200 bg-rose-50 text-rose-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {message.text}
            </p>
          )}
          {!token ? (
            <p className="mt-5 text-sm text-rose-700">
              This reset link is missing its token. Request a new link from the
              login page.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                New password
                <input
                  required
                  minLength={8}
                  maxLength={128}
                  pattern="(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,128}"
                  title="Use at least 8 characters, including an uppercase letter and a special character."
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5"
                />
              </label>
              <label className="block text-sm font-medium text-slate-700">
                Confirm new password
                <input
                  required
                  minLength={8}
                  maxLength={128}
                  pattern="(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,128}"
                  title="Use at least 8 characters, including an uppercase letter and a special character."
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-300 px-3.5 py-2.5"
                />
              </label>
              <button
                disabled={loading}
                className="w-full rounded-lg bg-[#8335e6] px-4 py-3 font-medium text-white disabled:opacity-60"
              >
                {loading ? "Updatingâ€¦" : "Update password"}
              </button>
            </form>
          )}
          <a
            href="/login"
            className="mt-6 inline-block text-sm font-medium text-[#8335e6]"
          >
            Back to login
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
