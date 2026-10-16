import React, { useState } from "react"

import { Eye, EyeOff, CheckCircle2, AlertCircle, Menu, X } from "lucide-react"

import Footer from "./components/Footer"
import PartnershipEnquiryModal from "./components/PartnershipEnquiryModal"

const A = "/assets"

const imgMatkaaLogo = `${A}/1d816.png`

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
  const [login, setLogin] = useState("")

  const [password, setPassword] = useState("")

  const [showPassword, setShowPassword] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const [statusMessage, setStatusMessage] = useState(null)

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const [forgotOpen, setForgotOpen] = useState(false)

  const [resetEmail, setResetEmail] = useState("")

  const [resetMessage, setResetMessage] = useState(null)

  const [resetLoading, setResetLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!login.trim() || !password.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please enter both login and password.",
      })

      return
    }

    setIsLoading(true)

    setStatusMessage(null)

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ email: login.trim(), password }),
      })

      const result = await response.json()

      if (!response.ok) throw new Error(result.message || "Unable to log in.")

      localStorage.setItem("matkaaToken", result.token)

      localStorage.setItem("matkaaUser", JSON.stringify(result.user))

      window.location.replace("/dashboard")

      setStatusMessage({
        type: "success",
        text: result.message || "Logged in successfully.",
      })
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: error.message || "Could not connect to the server.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()

    setResetLoading(true)

    setResetMessage(null)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({ email: resetEmail.trim() }),
      })

      const result = await response.json()

      if (!response.ok)
        throw new Error(result.message || "Unable to send reset link.")

      setResetMessage({ type: "success", text: result.message })
    } catch (error) {
      setResetMessage({
        type: "error",
        text: error.message || "Could not connect to the server.",
      })
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased text-gray-800 bg-[#f8fafc] selection:bg-purple-100 selection:text-purple-900">
      {/* HEADER NAVBAR */}
      <header className="w-full bg-[#f8fafc]/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 h-20 flex items-center justify-between relative">
          {/* Brand Logo */}
          <MatkaaLogo />

          {/* Desktop Navigation Links & Actions */}
          <div className="hidden lg:flex absolute left-[calc(50%-20px)] -translate-x-1/2 items-center gap-12">
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
            {/* Registration link */}
            <a
              href="/register"
              className="px-6 py-2 text-[16px] font-medium text-gray-800 hover:text-purple-600 transition-colors"
            >
              Registration
            </a>

            {/* Active log in button */}
            <a
              href="/login"
              className="px-6 py-2 rounded-none bg-[#8335e6] hover:bg-[#7227d4] text-white text-[16px] font-semibold shadow-sm hover:shadow-md hover:shadow-purple-500/20 transition-all"
            >
              Log in
            </a>
          </div>

          {/* Mobile Menu Toggle */}
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
                className="block w-full py-2.5 text-gray-700 font-medium text-center"
              >
                Registration
              </a>
              <a
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2 rounded-none bg-[#8335e6] text-white font-semibold"
              >
                Log in
              </a>
            </div>
          </div>
        )}
      </header>

      {}
      <main className="flex-1 relative flex items-center justify-center py-16 px-4 sm:px-6 overflow-hidden bg-gradient-to-b from-[#e8f1f7] via-[#ebf3f9] to-[#edf4fa]">
        {/* Subtle decorative wavy textured background SVG */}
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
            <filter id="distort">
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
              filter="url(#distort)"
            />
          </svg>
        </div>

        {}
        <div className="relative z-10 w-full max-w-[430px] bg-white rounded-[26px] border border-[#d6e0ea] shadow-[0_10px_35px_rgba(40,60,90,0.06)] px-8 sm:px-10 py-11 transition-all duration-300 hover:shadow-[0_14px_45px_rgba(40,60,90,0.09)]">
          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-[28px] font-medium text-[#1e2432] tracking-tight mb-2">
              Log in
            </h1>
            <p className="text-[14px] text-gray-500 font-normal">
              Don't have an account yet?{" "}
              <a
                href="/register"
                className="text-[#1e2432] font-semibold hover:text-[#8335e6] underline-offset-2 transition-colors"
              >
                Register
              </a>
            </p>
          </div>

          {/* Feedback notification banner */}
          {statusMessage && (
            <div
              className={`mb-6 p-3 rounded-xl text-xs flex items-center gap-2 transition-all ${
                statusMessage.type === "error"
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-emerald-50 text-emerald-700 border border-emerald-200"
              }`}
            >
              {statusMessage.type === "error" ? (
                <AlertCircle className="w-4 h-4 shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="login"
                className="block text-[13.5px] font-medium text-gray-700 text-left"
              >
                Email
              </label>
              <input
                id="login"
                type="email"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#cbd5e1] text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all"
              />
            </div>

            {/* Password Field with Eye toggle */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-[13.5px] font-medium text-gray-700 text-left"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-lg border border-[#cbd5e1] text-gray-800 text-[14px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-[#8335e6] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-[18px] h-[18px]" />
                  ) : (
                    <Eye className="w-[18px] h-[18px]" />
                  )}
                </button>
              </div>
            </div>

            {/* Log in Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-[#8335e6] hover:bg-[#7428d8] text-white font-medium text-[15px] shadow-sm hover:shadow-md hover:shadow-purple-500/25 active:scale-[0.99] transition-all disabled:opacity-60 flex items-center justify-center cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Log in"
              )}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  setResetEmail(login)
                  setResetMessage(null)
                  setForgotOpen(true)
                }}
                className="text-[13.5px] font-normal text-gray-600 hover:text-[#8335e6] transition-colors"
              >
                Forgot your password?
              </button>
            </div>
          </form>
        </div>
      </main>

      {}

      {forgotOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/45 p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setForgotOpen(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="forgot-title"
            className="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="forgot-title"
                  className="text-xl font-semibold text-gray-900"
                >
                  Reset your password
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter your registered email and we'll send you a secure reset
                  link.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setForgotOpen(false)}
                aria-label="Close dialog"
                className="text-2xl leading-none text-gray-400"
              >
                <X size={20} />
              </button>
            </div>
            {resetMessage && (
              <p
                role="status"
                className={`mb-4 rounded-lg border p-3 text-sm ${
                  resetMessage.type === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-700"
                    : "border-emerald-200 bg-emerald-50 text-emerald-700"
                }`}
              >
                {resetMessage.text}
              </p>
            )}
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <label
                htmlFor="reset-email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                required
                id="reset-email"
                type="email"
                autoComplete="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-3.5 py-2.5 text-sm focus:border-[#8335e6] focus:outline-none focus:ring-2 focus:ring-purple-500/20"
              />
              <button
                disabled={resetLoading}
                type="submit"
                className="w-full rounded-lg bg-[#8335e6] px-4 py-3 text-sm font-medium text-white hover:bg-[#7428d8] disabled:opacity-60"
              >
                {resetLoading ? "Sending..." : "Send reset link"}
              </button>
            </form>
          </section>
        </div>
      )}
      <Footer />
      {contactOpen && (
        <PartnershipEnquiryModal onClose={() => setContactOpen(false)} />
      )}
    </div>
  )
}
