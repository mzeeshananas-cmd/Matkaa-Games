import { useState } from "react"
import { Camera, Globe, Send, Video } from "lucide-react"
import PartnershipEnquiryModal from "./PartnershipEnquiryModal"

const menuLinks = [
  ["Fees", "/#fees"],
  ["Tools", "/#tools"],
  ["How it works", "/#how-it-works"],
  ["News", "/#news"],
  ["Contacts", "/#contacts"],
]
const socialLinks = [
  [Send, "Telegram", "https://t.me/partnersMATKAA"],
  [Camera, "Instagram", "https://instagram.com"],
  [Video, "YouTube", "https://youtube.com"],
  [Globe, "Community", "https://matka-bet.com"],
]

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false)
  return (
    <>
      <footer className="mx-auto mt-7 w-full max-w-[1248px] rounded-t-[28px] bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="/"
              className="inline-flex"
              aria-label="MATKAA Partners home"
            >
              <img
                src="/assets/1d816.png"
                alt="MATKAA Partners"
                className="mb-3 h-11 w-[145px] object-contain"
              />
            </a>
            <p className="text-[13px] text-slate-400">© MATKAA Partners 2026</p>
          </div>
          <nav aria-label="Footer navigation">
            <p className="mb-3 text-sm font-semibold text-slate-400">Menu</p>
            {menuLinks.map(([label, href]) =>
              label === "Contacts" ? (
                <button
                  key={label}
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="block text-sm leading-8 text-slate-600 transition-colors hover:text-purple-600"
                >
                  {label}
                </button>
              ) : (
                <a
                  key={label}
                  href={href}
                  className="block text-sm leading-8 text-slate-600 transition-colors hover:text-purple-600"
                >
                  {label}
                </a>
              ),
            )}
          </nav>
          <div>
            <p className="mb-3 text-sm font-semibold text-slate-400">
              Our social media
            </p>
            <div className="mb-5 flex gap-2">
              {socialLinks.map(([Icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-purple-50 hover:text-purple-600"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <p className="mb-2 text-sm font-semibold text-slate-400">
              Documents
            </p>
            <a
              href="/#privacy"
              className="block text-sm leading-8 text-slate-600 hover:text-purple-600"
            >
              Privacy Policy
            </a>
            <a
              href="/#terms"
              className="block text-sm leading-8 text-slate-600 hover:text-purple-600"
            >
              Terms and Conditions
            </a>
          </div>
          <div>
            <p
              id="contacts"
              className="mb-3 scroll-mt-24 text-sm font-semibold text-slate-400"
            >
              Partnership enquiries
            </p>
            <p className="mb-4 text-sm leading-6 text-slate-600">
              Please contact your Matkaa Partners representative to discuss your
              partnership options.
            </p>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="rounded-xl bg-[#8f43d6] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7c38c0]"
            >
              Contact us
            </button>
          </div>
        </div>
      </footer>
      {contactOpen && (
        <PartnershipEnquiryModal onClose={() => setContactOpen(false)} />
      )}
    </>
  )
}
