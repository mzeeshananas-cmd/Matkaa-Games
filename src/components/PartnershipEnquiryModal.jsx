import { useEffect } from "react"
import { Send } from "lucide-react"

export default function PartnershipEnquiryModal({ onClose }) {
  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#4b0872]/80 p-4 backdrop-blur-[2px]"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="partnership-enquiries-title"
        className="w-full max-w-[620px] rounded-[30px] bg-white px-6 py-7 shadow-2xl sm:rounded-[34px] sm:px-8 sm:py-9 md:px-10 md:py-10"
      >
        <h2
          id="partnership-enquiries-title"
          style={{
            fontFamily: "'League Gothic:Regular', 'League Gothic', sans-serif",
          }}
          className="text-3xl font-bold leading-tight text-[#310b3c] sm:text-4xl"
        >
          Partnership enquiries
        </h2>
        <p className="mt-6 text-base leading-relaxed text-slate-600 sm:mt-7 sm:text-[21px]">
          Please contact your Matkaa Partners representative to discuss your
          partnership options.
        </p>
        <p className="mt-5 text-base leading-relaxed text-slate-600 sm:mt-6 sm:text-[21px]">
          Enquiries cannot be submitted through this page.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
          <a
            href="https://wa.me/923174333986"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[52px] items-center justify-center gap-3 rounded-2xl bg-[#8f43d6] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#7c38c0] sm:min-h-[60px] sm:px-7 sm:text-xl"
          >
            <Send size={21} />
            Contact on Telegram
          </a>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[52px] rounded-2xl border border-slate-300 bg-white px-6 py-3 text-base font-semibold text-[#8f43d6] transition hover:bg-purple-50 sm:min-h-[60px] sm:px-7 sm:text-xl"
          >
            Close
          </button>
        </div>
      </section>
    </div>
  )
}
