import { useEffect, useMemo, useRef, useState } from "react"
import {
  Copy,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  Wallet,
} from "lucide-react"
import Footer from "./components/Footer"
import PartnershipEnquiryModal from "./components/PartnershipEnquiryModal"
const data = [
  ["12....89", "$25.00", "14 Sep 2026", "Tier 1", "Paid"],
  ["48....21", "$4.50", "14 Sep 2026", "14 Sep 2026", "Paid"],
  ["73....05", "$2.00", "13 Sep 2026", "Tier 3", "Pending"],
  ["91....44", "$25.00", "12 Sep 2026", "Tier 1", "Paid"],
  ["56....78", "$3.00", "11 Sep 2026", "Tier 2", "Paid"],
  ["34....12", "$2.00", "10 Sep 2026", "Tier 3", "Pending"],
  ["87....33", "$25.00", "09 Sep 2026", "Tier 1", "Paid"],
  ["22....67", "$4.50", "08 Sep 2026", "Tier 2", "Paid"],
]
const tierStyle = {
  "Tier 1": "bg-purple-50 text-purple-600",
  "Tier 2": "bg-blue-50 text-blue-600",
  "Tier 3": "bg-teal-50 text-teal-600",
}
export default function Dashboard() {
  const [tier, setTier] = useState("All"),
    [status, setStatus] = useState("All"),
    [page, setPage] = useState(1),
    [notice, setNotice] = useState(""),
    [menuOpen, setMenuOpen] = useState(false),
    [authState, setAuthState] = useState("checking"),
    [contactOpen, setContactOpen] = useState(false)
  const sessionCheckId = useRef(0)
  const user = JSON.parse(localStorage.getItem("matkaaUser") || "{}")
  useEffect(() => {
    const checkSession = async () => {
      const checkId = ++sessionCheckId.current
      setAuthState("checking")
      const token = localStorage.getItem("matkaaToken")
      if (!token) {
        window.location.replace("/login")
        return
      }
      try {
        const response = await fetch("/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        })
        if (checkId !== sessionCheckId.current) return
        if (response.status === 401 || response.status === 403) {
          localStorage.removeItem("matkaaToken")
          localStorage.removeItem("matkaaUser")
          window.location.replace("/login")
          return
        }
        setAuthState(response.ok ? "authorized" : "error")
      } catch {
        if (checkId === sessionCheckId.current) setAuthState("error")
      }
    }
    const checkWhenVisible = () => {
      if (document.visibilityState === "visible") void checkSession()
    }
    void checkSession()
    window.addEventListener("pageshow", checkSession)
    window.addEventListener("popstate", checkSession)
    window.addEventListener("focus", checkSession)
    window.addEventListener("storage", checkSession)
    document.addEventListener("visibilitychange", checkWhenVisible)
    return () => {
      sessionCheckId.current++
      window.removeEventListener("pageshow", checkSession)
      window.removeEventListener("popstate", checkSession)
      window.removeEventListener("focus", checkSession)
      window.removeEventListener("storage", checkSession)
      document.removeEventListener("visibilitychange", checkWhenVisible)
    }
  }, [])
  const filtered = useMemo(
    () =>
      data.filter(
        (r) =>
          (tier === "All" || r[3] === tier) &&
          (status === "All" || r[4] === status),
      ),
    [tier, status],
  )
  const copy = async (v) => {
    try {
      await navigator.clipboard.writeText(v)
      setNotice("Copied to clipboard")
    } catch {
      setNotice(v)
    }
    setTimeout(() => setNotice(""), 2000)
  }
  const logout = () => {
    localStorage.removeItem("matkaaToken")
    localStorage.removeItem("matkaaUser")
    location.replace("/")
  }
  if (authState !== "authorized")
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4f8fa] p-6 text-center text-slate-600">
        <div>
          {authState === "checking" ? (
            <p>Checking your login...</p>
          ) : (
            <>
              <p>
                We could not verify your login. Check your connection and try
                again.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-3 rounded-lg bg-purple-600 px-4 py-2 text-white"
              >
                Try again
              </button>
            </>
          )}
        </div>
      </main>
    )
  return (
    <main
      className="min-h-screen overflow-x-clip bg-[#f4f8fa] px-4 pb-8 pt-0 sm:px-8 lg:px-12 lg:pb-12 lg:pt-0"
      style={{ fontFamily: "Inter,sans-serif" }}
    >
      <div className="mb-2 flex justify-center">
        <a
          href="https://wa.me/923174333986"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Official Telegram support: PARTNERSMATKAA"
          className="flex items-center gap-2 rounded-b-[18px] bg-white px-6 py-2 text-xs font-bold uppercase tracking-wide text-slate-500 transition-colors hover:bg-slate-50"
        >
          <span aria-hidden="true" className="text-[#229ED9]">
            ✈
          </span>
          <span>Official Telegram support: PARTNERSMATKAA</span>
        </a>
      </div>
      <nav className="relative mx-auto mb-6 flex max-w-[1248px] items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm sm:px-5">
        <a href="/" aria-label="MATKAA Partners home">
          <img
            src="/assets/1d816.png"
            alt="MATKAA Partners"
            className="h-10 w-[130px] object-contain"
          />
        </a>
        <div className="hidden flex-1 items-center gap-6 pl-5 md:flex">
          <a
            href="/#fees"
            className="text-sm font-medium text-slate-600 hover:text-purple-600"
          >
            Fees
          </a>
          <a
            href="/#tools"
            className="text-sm font-medium text-slate-600 hover:text-purple-600"
          >
            Tools
          </a>
          <a
            href="/#how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-purple-600"
          >
            How it works
          </a>
          <a
            href="/#news"
            className="text-sm font-medium text-slate-600 hover:text-purple-600"
          >
            News
          </a>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="text-sm font-medium text-slate-600 hover:text-purple-600"
          >
            Contacts
          </button>
        </div>
        <a
          href="/profile"
          className="ml-auto hidden rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-600 md:inline-flex"
        >
          My profile
        </a>
        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg border border-slate-200 text-slate-600 md:hidden"
          aria-label={
            menuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="h-0.5 w-5 rounded bg-current" />
          <span className="h-0.5 w-5 rounded bg-current" />
          <span className="h-0.5 w-5 rounded bg-current" />
        </button>
      </nav>
      {menuOpen && (
        <div className="mx-auto -mt-4 mb-6 flex max-w-[1248px] flex-col gap-1 rounded-2xl bg-white p-3 shadow-sm md:hidden">
          {[
            ["Fees", "/#fees"],
            ["Tools", "/#tools"],
            ["How it works", "/#how-it-works"],
            ["News", "/#news"],
            ["Contacts", "/#contacts"],
            ["My profile", "/profile"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              onClick={(event) => {
                setMenuOpen(false)
                if (label === "Contacts") {
                  event.preventDefault()
                  setContactOpen(true)
                }
              }}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-purple-50 hover:text-purple-600"
            >
              {label}
            </a>
          ))}
        </div>
      )}
      <div className="mx-auto min-w-0 max-w-[1248px]">
        <header className="mb-7 flex items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-[#310b3c] sm:text-[38px]">
              Referral Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              Invite users and manage your referral earnings with global
              intelligence tracking.
            </p>
          </div>
          <button
            onClick={logout}
            className="rounded-lg bg-white px-2.5 py-1.5 text-xs text-slate-600 sm:px-4 sm:py-2 sm:text-sm"
          >
            <span className="sm:hidden">Logout</span>
            <span className="hidden sm:inline">
              {user.fullName || "Account"} · Log out
            </span>
          </button>
        </header>
        <section className="mb-7 grid gap-5 lg:grid-cols-2">
          {[
            ["Your referral code", "MATKAA82", "Copy Code"],
            ["Your referral link", "matka-bet.com/ref/MATKAA82", "Copy Link"],
          ].map(([l, v, b]) => (
            <div key={l} className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-3 text-xs font-semibold uppercase text-slate-500">
                {l}
              </div>
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2">
                <b className="truncate text-slate-900">{v}</b>
                <button
                  onClick={() => copy(v)}
                  className="ml-2 flex shrink-0 items-center gap-1 rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-600"
                >
                  <Copy size={12} />
                  {b}
                </button>
              </div>
            </div>
          ))}
        </section>
        <section className="mb-7 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-[28px] bg-gradient-to-br from-fuchsia-600 via-purple-600 to-purple-800 p-7 text-white shadow-xl shadow-purple-500/40">
            <div className="flex justify-between text-sm font-semibold uppercase">
              <span>Available balance</span>
              <span className="rounded bg-white px-3 py-1 text-xs normal-case text-emerald-500">
                Instant Withdraw
              </span>
            </div>
            <div className="mt-4 text-5xl font-bold">$250.00</div>
            <p className="mt-1 text-sm">Minimum payout limit is $30.00</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => setNotice("Withdrawal request submitted")}
                className="rounded-xl bg-white py-3 font-bold text-purple-600"
              >
                Withdraw
              </button>
              <button className="rounded-xl border-2 border-white py-3 font-semibold">
                ◯ Transfer to Account
              </button>
            </div>
          </div>
          <div className="grid gap-5">
            <Stat
              title="Total referral earnings"
              value="$1,420.00"
              icon={<CircleDollarSign size={19} />}
            />
            <Stat
              title="Total paid / withdrawn"
              value="$1,170.00"
              icon={<Wallet size={19} />}
            />
          </div>
        </section>
        <section className="mb-7 rounded-[24px] bg-white p-6 shadow-lg sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-2xl text-[#310b3c]">
                Commission Structure
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Multi-tier revenue chain built to maximize earnings from deep
                networks.
              </p>
            </div>
            <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-bold text-purple-600">
              25% Max Total
            </span>
          </div>
          <div className="my-5 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
            ● Partner A <i>→</i> 🟣 Referral B <i>→</i> 🔵 Referral C <i>→</i>{" "}
            🟢 Referral D
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              ["LEVEL 1 (DIRECT)", "Direct players", "20%", "text-purple-600"],
              ["LEVEL 2", "Sub-partners", "3%", "text-blue-500"],
              ["LEVEL 3", "Tier 3 affiliates", "2%", "text-teal-500"],
            ].map(([n, d, p, c]) => (
              <div
                key={n}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex justify-between">
                  <b className={`text-xs ${c}`}>{n}</b>
                  <span className="text-xs text-slate-500">{d}</span>
                </div>
                <b className={`text-3xl ${c}`}>{p}</b>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-[24px] bg-white p-6 shadow-lg sm:p-7">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-2xl text-[#310b3c]">
              Referral Activity
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex rounded-lg bg-slate-100 p-1">
                {["All", "Tier 1", "Tier 2", "Tier 3"].map((x) => (
                  <button
                    key={x}
                    onClick={() => {
                      setTier(x)
                      setPage(1)
                    }}
                    className={`rounded-md px-3 py-1.5 text-xs ${
                      tier === x
                        ? "bg-white text-purple-600 shadow"
                        : "text-slate-500"
                    }`}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setNotice("Showing activity from the last 30 days")
                }
                className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs text-slate-600"
              >
                <CalendarDays size={14} />
                Last 30 Days
              </button>
              <label className="flex items-center gap-2 rounded-lg border px-3 py-2 text-xs text-slate-600">
                Status:
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value)
                    setPage(1)
                  }}
                  className="bg-transparent"
                >
                  <option>All</option>
                  <option>Paid</option>
                  <option>Pending</option>
                </select>
              </label>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase text-slate-500">
                  {[
                    "User ID",
                    "Payout Amount",
                    "Date",
                    "Referral Type",
                    "Status",
                  ].map((x) => (
                    <th key={x} className="px-4 py-3">
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.slice((page - 1) * 8, page * 8).map((r, i) => (
                  <tr key={i} className="border-b border-slate-200">
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      {r[0]}
                    </td>
                    <td className="px-4 py-4 font-bold text-slate-900">
                      {r[1]}
                    </td>
                    <td className="px-4 py-4 text-slate-500">{r[2]}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded px-2 py-1 text-xs ${tierStyle[r[3]]}`}
                      >
                        {r[3]}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`rounded px-2 py-1 text-xs ${
                          r[4] === "Paid"
                            ? "bg-emerald-50 text-emerald-500"
                            : "bg-amber-100 text-amber-600"
                        }`}
                      >
                        {r[4]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-7 flex flex-wrap justify-between gap-3 text-sm text-slate-500">
            <span>
              Showing{" "}
              <b className="text-slate-900">
                {filtered.length ? (page - 1) * 8 + 1 : 0} to{" "}
                {Math.min(page * 8, filtered.length)}
              </b>{" "}
              of <b className="text-slate-900">96</b> entries
            </span>
            <div className="flex min-w-0 items-center gap-1 sm:gap-2">
              <button
                aria-label="Previous page"
                onClick={() => setPage(Math.max(1, page - 1))}
                className="rounded border p-1 sm:p-2"
              >
                <ChevronLeft size={16} />
              </button>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`rounded border px-2 py-1.5 sm:px-3 ${
                    page === n
                      ? "border-purple-600 bg-purple-600 text-white"
                      : "border-slate-200"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                aria-label="Next page"
                onClick={() => setPage(page + 1)}
                className="rounded border p-1 sm:p-2"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      {notice && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-white shadow-xl"
        >
          {notice}
        </div>
      )}
      {contactOpen && (
        <PartnershipEnquiryModal onClose={() => setContactOpen(false)} />
      )}
    </main>
  )
}
function Stat({ title, value, icon }) {
  return (
    <div className="flex flex-col justify-center rounded-2xl bg-white p-6 shadow-lg">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase text-slate-500">
        {icon}
        {title}
      </div>
      <strong className="mt-2 text-3xl text-slate-900">{value}</strong>
    </div>
  )
}
