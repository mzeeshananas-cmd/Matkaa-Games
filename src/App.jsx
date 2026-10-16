import Footer from "./components/Footer";
import PartnershipEnquiryModal from "./components/PartnershipEnquiryModal";
import { useEffect, useState } from 'react';

const A = '/assets';

const imgSection = `${A}/9cb02.png`;
const imgGroup51 = `${A}/5046d.png`;
const imgBackground = `${A}/548e1.png`;
const imgBackground1 = `${A}/bc95e.png`;
const imgBackground2 = `${A}/7cd90.png`;
const imgSection1 = `${A}/65b19.png`;
const imgSection2 = `${A}/bdd15.png`;
const imgSection3 = `${A}/457a6.png`;
const imgBackground3 = `${A}/24c4d.png`;
const imgToolBanner = `${A}/848b6.png`;
const imgDash1 = `${A}/9c399.png`;
const imgTeamSpirit = `${A}/b88bb.png`;
const imgTeamSpirit1 = `${A}/ef602.png`;
const imgLogo2 = `${A}/1de76.png`;
const imgLogo2a = `${A}/1570a.png`;
const imgLogo3 = `${A}/b8c75.png`;
const imgLogo4 = `${A}/deee6.png`;
const imgLogo5 = `${A}/9ba96.png`;
const imgLogo6 = `${A}/d5456.png`;
const imgLogo7 = `${A}/45808.png`;
const imgLogo8 = `${A}/a1b62.png`;
const imgLogo10 = `${A}/018e1.png`;
const imgLogo11 = `${A}/3d893.png`;
const imgLogo13 = `${A}/68b2a.png`;
const imgLogo9svg = `${A}/e0749.svg`;
const imgNews1 = `${A}/ce722.png`;
const imgNews2 = `${A}/ac354.png`;
const imgNews3 = `${A}/dd3fb.png`;
const imgMatkaaLogo = `${A}/1d816.png`;
const imgImage = `${A}/a9af8.png`;
const imgArrowRight = `${A}/08866.svg`;
const imgVector = `${A}/6ddba.svg`;
const imgGroup2 = `${A}/1d17c.svg`;
const imgGroup3 = `${A}/85ddc.svg`;
const imgGroup4 = `${A}/bd005.svg`;
const imgFaqArrow = `${A}/33912.svg`;
const imgChat = `${A}/a2748.svg`;
const imgTool1 = `${A}/bafdc.svg`;
const imgTool2 = `${A}/9ec2c.svg`;
const imgTool3 = `${A}/e0042.svg`;
const imgTool4 = `${A}/9ace7.svg`;
const imgTool5 = `${A}/b65d5.svg`;
const imgWindows = `${A}/09127.svg`;
const imgTime = `${A}/1da39.svg`;
const imgReport = `${A}/a1d58.svg`;
const imgHeart = `${A}/914c4.svg`;
const imgTarget = `${A}/68093.svg`;
const imgReverseLeft = `${A}/25760.svg`;
const imgWorldMap = `${A}/03d9b.svg`;
const imgStep1 = `${A}/50e1c.svg`;
const imgStep2 = `${A}/bcae7.svg`;
const imgStep3 = `${A}/67cb2.svg`;
const imgStep4 = `${A}/37767.svg`;
const imgArrowNews = `${A}/cb57a.svg`;
const imgTelegram = `${A}/8001a.svg`;
const imgDownloadAndroid = `${A}/5476f.png`;

const league = { fontFamily: "'League Gothic:Regular', 'League Gothic', sans-serif", fontVariationSettings: '"wdth" 100' };
const interBold = { fontFamily: "'Inter:Bold', 'Inter', sans-serif", fontWeight: 700 };
const interSemi = { fontFamily: "'Inter:Semi Bold', 'Inter', sans-serif", fontWeight: 600 };
const interMed = { fontFamily: "'Inter:Medium', 'Inter', sans-serif", fontWeight: 500 };
const interReg = { fontFamily: "'Inter:Regular', 'Inter', sans-serif", fontWeight: 400 };
const sectionHref = label => { const sectionIds = { Fees: 'fees', Tools: 'tools', 'How it works': 'how-it-works', News: 'news', Contacts: 'contacts' }; return `/#${sectionIds[label]}`; };

const faqItems = [
  'What is the Partners MATKAA affiliate program?',
  'How does the Partners MATKAA affiliate program work?',
  'How can I become a MATKAA affiliate?',
  'How much can I earn with Partners MATKAA?',
  'What are the advantages of Partners MATKAA?',
  'Is it free to join the affiliate program?',
  "How do I join the Partners MATKAA program if I don't have a website?",
  'How can I promote MATKAA?',
  'Can I promote MATKAA on two or more websites?',
  'Where can I get MATKAA banners and other marketing materials?',
  'What payment methods are available?',
];

const faqAnswers = [
  'Partners MATKAA is an affiliate program where you promote MATKAA products and earn commission from customers who join through your affiliate link.',
  'After you apply and your account is approved, you can share your affiliate link. Referrals are tracked and assigned to your account, and commission is paid according to your agreed program model.',
  'Select Become a partner or Join our team, complete the registration form, and submit your application. The team will review it before you begin promoting.',
  'The program advertises revenue share of up to 40% of net revenue. Your actual earnings depend on referred customers and the commission model and terms agreed for your account.',
  'Partners can use marketing tools such as banners and landing pages, review affiliate activity in the dashboard, and get help from a personal manager.',
  'The program page does not specify an enrollment fee. Contact the MATKAA team to confirm any fees or requirements before applying.',
  'A personal website is not the only way to promote MATKAA. You can use channels such as social media or messaging platforms, subject to the program terms.',
  'You can promote MATKAA through your website, social media, or other permitted channels. Use your affiliate link so referrals can be attributed to your account.',
  'Yes. You can promote MATKAA on more than one website, provided each site follows the affiliate program terms.',
  'After your account is approved, find available banners and landing pages in the partner dashboard. Contact your manager if you need help choosing materials.',
  'The available payout methods, minimum payout, and schedule depend on your account and region. Check the partner dashboard or ask your manager for the current details.',
];

function FAQItem({ q, answer, id, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#f8fafc]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="w-full text-left px-5 py-5 flex items-center justify-between hover:bg-[#f1f5f9] transition-colors"
      >
        <span style={interBold} className="text-[#475569] text-[18px] leading-8">{q}</span>
        <img
          src={imgFaqArrow}
          alt=""
          className="flex-shrink-0 ml-4 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'none', width: 14, height: 8 }}
        />
      </button>
      {open && <div id={id} className="px-5 pb-5 text-[#64748b] text-[17px] leading-8">{answer}</div>}
    </div>
  );
}
export default function App() {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  const [contactEnquiryOpen, setContactEnquiryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem('matkaaToken')));

  function handleLogout() {
    localStorage.removeItem('matkaaToken');
    localStorage.removeItem('matkaaUser');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    const syncAuthState = () => setIsLoggedIn(Boolean(localStorage.getItem('matkaaToken')));
    window.addEventListener('pageshow', syncAuthState);
    window.addEventListener('focus', syncAuthState);
    window.addEventListener('storage', syncAuthState);
    return () => {
      window.removeEventListener('pageshow', syncAuthState);
      window.removeEventListener('focus', syncAuthState);
      window.removeEventListener('storage', syncAuthState);
    };
  }, []);

  useEffect(() => {
    const sectionId = decodeURIComponent(window.location.hash.slice(1));
    if (!sectionId) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }, []);

  return (
    <div className="bg-[#f4f8fa] min-h-screen w-full">

      <div className="sticky top-0 z-50 bg-[#f4f8fa]">
      {/* Telegram top bar */}
      <div className="flex justify-center">
        <a href="https://wa.me/923174333986" target="_blank" rel="noopener noreferrer" aria-label="Open MATKAA Partners on Telegram" className="mt-1 flex items-center gap-2 rounded-[18px] border border-slate-200 bg-white px-6 py-2 shadow-sm transition-colors hover:bg-slate-50">
          <img src={imgTelegram} alt="" style={{ width: 18, height: 18 }} />
          <span style={interBold} className="text-[#64748b] text-[12px] uppercase tracking-wide">partnersMATKAA</span>
        </a>
      </div>

      {/* Navbar */}
      <nav className="mx-auto max-w-[1440px] px-4 mt-2">
        <div className="relative bg-white rounded-[18px] px-3 flex items-center justify-between gap-3 min-h-[64px]">
          <details className="xl:hidden relative z-50 shrink-0">
            <summary aria-label="Toggle navigation menu" title="Open navigation menu" className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-xl border border-[#e2e8f0] text-[#64748b] transition-colors hover:border-[#8f43d6] hover:text-[#8f43d6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f43d6]">
              <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
                <span className="h-0.5 w-full rounded-full bg-current" />
              </span>
            </summary>
            <div onClick={event => { if (event.target.closest('a, button')) event.currentTarget.closest('details')?.removeAttribute('open'); }} className="absolute left-0 top-full mt-2 flex max-h-[calc(100vh-100px)] w-[min(84vw,280px)] flex-col gap-2 overflow-y-auto rounded-2xl border border-slate-100 bg-white p-3 shadow-xl">
              {['Fees', 'Tools', 'How it works', 'News', 'Contacts'].map(item => (
                <a key={item} href={sectionHref(item)} onClick={(event) => { if (item === "Contacts") { event.preventDefault(); setContactEnquiryOpen(true); event.currentTarget.closest("details")?.removeAttribute("open") } }} className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2.5 text-sm font-medium text-[#64748b] transition-colors hover:border-purple-100 hover:bg-purple-50 hover:text-[#8f43d6]">{item}</a>
              ))}
              {isLoggedIn ? <><a href="/dashboard" className="rounded-xl border border-purple-100 bg-purple-50 px-3 py-2.5 text-sm font-medium text-[#8f43d6]">Dashboard</a><button type="button" onClick={handleLogout} className="rounded-xl bg-[#8f43d6] px-3 py-2.5 text-left text-sm font-semibold text-white">Log out</button></> : <><a href="/login" className="rounded-xl border border-purple-100 bg-purple-50 px-3 py-2.5 text-sm font-medium text-[#8f43d6] transition-colors hover:bg-purple-100">Log in</a><a href="/register" className="rounded-xl bg-[#8f43d6] px-3 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#7c38c0]">Become a partner</a></>}
            </div>
          </details>
          {/* Brand */}
          <a href="/" aria-label="MATKAA Partners home" className="flex-shrink-0 -ml-1 flex items-center justify-start h-[42px] w-[146px]">
            <img src={imgMatkaaLogo} alt="MATKAA Partners" className="h-full w-full object-contain" />
          </a>
          {/* Main navigation */}
          <div className="hidden xl:flex flex-shrink-0 items-center justify-center gap-8">
            {['Fees','Tools','How it works'].map(item => (
              <a key={item} href={sectionHref(item)} style={interSemi} className="text-[#64748b] text-[16px] hover:text-[#8f43d6] transition-colors">{item}</a>
            ))}
          </div>
          {/* News and contacts */}
          <div className="hidden xl:flex flex-shrink-0 items-center justify-center gap-8">
            <a href="/#news" style={interSemi} className="text-[#64748b] text-[16px] hover:text-[#8f43d6] transition-colors">News</a>
            <button type="button" onClick={() => setContactEnquiryOpen(true)} style={interSemi} className="text-[#64748b] text-[16px] hover:text-[#8f43d6] transition-colors">Contacts</button>
          </div>
          {/* Account actions */}
          <div className="hidden xl:flex flex-shrink-0 items-center justify-end gap-2">
            {isLoggedIn ? <><a href="/dashboard" style={interSemi} className="rounded-xl bg-[rgba(4,94,214,0.05)] px-5 py-1.5 text-[16px] text-[#8f43d6] hover:bg-[rgba(143,67,214,0.1)]">Dashboard</a><button type="button" onClick={handleLogout} style={interSemi} className="rounded-xl bg-[#8f43d6] px-5 py-2.5 text-[16px] text-white hover:bg-[#7c38c0]">Log out</button></> : <><a href="/login" style={interSemi} className="bg-[rgba(4,94,214,0.05)] text-[#8f43d6] px-5 py-1.5 rounded-xl text-[16px] hover:bg-[rgba(143,67,214,0.1)] transition-colors">Log in</a><a href="/register" style={interSemi} className="bg-[#8f43d6] text-white px-5 py-2.5 rounded-xl text-[16px] hover:bg-[#7c38c0] transition-colors">Become a partner</a></>}
          </div>
        </div>
      </nav>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 flex flex-col gap-4 mt-4 pb-4">

        {/* Hero */}
        <section className="relative rounded-[32px] overflow-hidden min-h-[460px] sm:min-h-[560px] lg:min-h-[680px]">
          <img src={imgSection} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[560px] lg:min-h-[680px] px-6 py-16 text-center">
            <div className="bg-[rgba(255,255,255,0.15)] rounded-xl px-6 py-2 flex items-center gap-2 mb-6">
              <span style={interSemi} className="text-white text-[14px] uppercase tracking-wide">Affiliate Program</span>
              <img src={imgGroup51} alt="" style={{ height: 27, width: 112, objectFit: 'contain' }} />
            </div>
            <h1 style={{ ...league, fontSize: 'clamp(48px, 8vw, 120px)', lineHeight: 1, color: 'white', textTransform: 'uppercase' }} className="mb-4">
              Make a profit. Simple
            </h1>
            <p style={interReg} className="text-white text-[16px] sm:text-[18px] lg:text-[20px] leading-7 sm:leading-8 lg:leading-9 mb-8 max-w-[520px]">
              Become an affiliate of a successful betting company and get up to 40% of its net revenue
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a href="/register" style={interSemi} className="bg-[#f4f8fa] text-[#8f43d6] px-8 py-3 rounded-xl text-[16px] hover:bg-white transition-colors">Become a partner</a>
              <a href="/#how-it-works" style={interSemi} className="bg-[rgba(255,255,255,0.1)] backdrop-blur-sm text-white border border-white/20 px-8 py-3 rounded-xl text-[16px] hover:bg-[rgba(255,255,255,0.2)] transition-colors">How does it work?</a>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="bg-white rounded-[24px] px-6 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'On the market', value: '15 years' },
            { label: 'Daily players', value: '3M+' },
            { label: 'Geography', value: '62 countries' },
            { label: 'Revenue Share', value: 'Up to 40%' },
          ].map((s, i) => (
            <div key={i} className={`text-center ${i < 3 ? 'lg:border-r border-[#e2e8f0]' : ''}`}>
              <p style={interMed} className="text-[#94a3b8] text-[14px] mb-1">{s.label}</p>
              <p style={interBold} className="text-[#94a3b8] text-[28px]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Our products */}
        <section className="bg-white rounded-[32px] px-8 py-14">
          <div className="text-center mb-10">
            <p style={interSemi} className="text-[#cca6ff] text-[14px] uppercase tracking-widest mb-2">Our products</p>
            <h2 style={{ ...league, fontSize: 'clamp(36px, 4vw, 64px)', textTransform: 'uppercase', color: '#2c053b' }}>
              The MATKAA affiliate program
            </h2>
            <p style={interReg} className="text-[#64748b] text-[15px] mt-2">Become a direct affiliate and earn money by advertising our products:</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: imgBackground, title: 'Sport', desc: '50+ types of sports, 1,000+ daily events' },
              { img: imgBackground1, title: 'Esports', desc: '3,500 events in over 25 esports' },
              { img: imgBackground2, title: 'Casino', desc: 'Over 13,000 games' },
            ].map((p, i) => (
              <div key={i} className="relative rounded-[24px] overflow-hidden" style={{ paddingBottom: '130%' }}>
                <img src={p.img} alt={p.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute bottom-4 left-4 right-4 bg-[#8f43d6] rounded-[24px] py-4 px-4 text-center">
                  <p style={{ ...league, fontSize: 40, textTransform: 'uppercase', lineHeight: '40px', color: 'white' }}>{p.title}</p>
                  <p style={interReg} className="text-white/80 text-[14px] mt-1">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Advantages */}
        <section className="relative rounded-[32px] overflow-hidden">
          <img src={imgSection1} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="relative z-10 grid lg:grid-cols-2 min-h-0 lg:min-h-[900px]">
            <div className="p-12 lg:p-16">
              <p style={interSemi} className="text-[#cca6ff] text-[14px] uppercase tracking-widest mb-4">Advantages</p>
              <h2 style={{ ...league, fontSize: 'clamp(48px, 5vw, 88px)', textTransform: 'uppercase', color: '#2c053b', lineHeight: 1 }}>
                With us,<br />everything<br />is quick, easy and<br />transparent
              </h2>
            </div>
            <div className="p-10 lg:p-12 flex flex-col gap-8 justify-center">
              {[
                { icon: '/rocket_icon.png', title: 'Swift sign-up', desc: "We've made it as easy as possible to register and verify your affiliate account. Get your first affiliate link in no time!" },
                { icon: imgGroup2, title: 'Guidance and support', desc: 'We will gladly share our wealth of experience and knowledge with you and help you start from scratch. Your personal manager will help you build the right marketing strategy, and resolve any issues you may encounter.' },
                { icon: '/add_promo_icon.png', title: 'Ready-to-use promo materials', desc: 'No more using your own time and money on marketing - our team has a wide range of ready-to-use, high quality promotional materials on hand to maximize conversion.' },
                { icon: imgGroup4, title: 'Fast and convenient payments', desc: "We've cut down our wait times to the bare minimum, along with the minimum withdrawal limit. You can now withdraw any amount from $30 via your choice of 200 payment options." },
              ].map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-2xl bg-[#8f43d6]/10">
                    {typeof item.icon === 'string' ? <img src={item.icon} alt="" className="w-full h-full object-contain" /> : item.icon}
                  </div>
                  <div>
                    <h3 style={interBold} className="text-[#334155] text-[20px] leading-9 mb-1">{item.title}</h3>
                    <p style={interMed} className="text-[#64748b] text-[16px] leading-7">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top-tier terms */}
        <section id="fees" className="relative scroll-mt-24 rounded-[32px] overflow-hidden bg-[#8f43d6]">
          <div className="p-5 sm:p-8 lg:p-10 grid lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
            <div>
              <p style={interSemi} className="text-white text-[14px] uppercase tracking-widest mb-2">Fees</p>
              <h2 style={{ ...league, fontSize: 'clamp(40px, 4vw, 64px)', textTransform: 'uppercase', color: 'white', lineHeight: 1 }} className="mb-6">Top-tier terms</h2>
              <div className="bg-white rounded-[32px] p-8">
                <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                  <div>
                    <h3 style={interBold} className="text-[#2c053b] text-[28px]">Revenue Share</h3>
                    <p style={interMed} className="text-[#64748b] text-[14px] max-w-lg mt-1">Get lifetime commission from the net revenue generated by every customer you refer</p>
                  </div>
                  <a href="/register" style={interSemi} className="bg-[#8f43d6] text-white px-6 py-2.5 rounded-xl text-[16px] hover:bg-[#7c38c0] transition-colors flex-shrink-0">Join our team</a>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="bg-[#f1f5f9] border border-[#f1f5f9] rounded-2xl px-4 py-4 flex items-center gap-2 mb-3">
                      <span style={interBold} className="text-[#64748b] text-[14px]">Afghanistan</span>
                      <img src={imgFaqArrow} alt="" style={{ width: 14, height: 8 }} />
                    </div>
                    <div className="bg-[#f1f5f9] rounded-2xl p-5 flex flex-col gap-1">
                      <span style={interSemi} className="text-[#64748b] text-[14px]">From</span>
                      <span style={{ ...league, fontSize: 80, color: '#2c053b', lineHeight: 1, textTransform: 'uppercase' }}>25%</span>
                    </div>
                  </div>
                  <div className="relative bg-[#f1f5f9] rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4 p-6 min-h-[200px]">
                    <img src={imgBackground3} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="relative z-10 flex flex-col items-center gap-4 text-center">
                      <img src={imgChat} alt="" style={{ width: 40, height: 40 }} />
                      <p style={interBold} className="text-[#2c053b] text-[15px]">Contact us to learn more about the terms for this country</p>
                      <button type="button" onClick={() => setContactEnquiryOpen(true)} style={interSemi} className="bg-[#8f43d6] text-white px-6 py-2 rounded-xl text-[15px] hover:bg-[#7c38c0] transition-colors">Contact us</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { title: 'CPA', desc: 'Earn commission when your referred customers complete certain actions' },
                { title: 'Hybrid', desc: 'Combine both models at the same time' },
              ].map((item, i) => (
                <div key={i} className="bg-[rgba(255,255,255,0.25)] rounded-[32px] p-8 flex flex-col gap-3">
                  <h3 style={interBold} className="text-white/80 text-[24px]">{item.title}</h3>
                  <p style={interMed} className="text-white/80 text-[14px] leading-6">{item.desc}</p>
                  <button type="button" style={interSemi} className="bg-[rgba(255,255,255,0.1)] text-white px-4 py-2.5 rounded-xl text-[15px] w-fit hover:bg-[rgba(255,255,255,0.2)] transition-colors">Upon request</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Marketing Tools */}
        <section id="tools" className="bg-white rounded-[32px] px-8 py-14 scroll-mt-24">
          <div className="text-center mb-10">
            <p style={interSemi} className="text-[#cca6ff] text-[14px] uppercase tracking-widest mb-2">Tools</p>
            <h2 style={{ ...league, fontSize: 'clamp(36px, 4vw, 64px)', textTransform: 'uppercase', color: '#2c053b' }}>User-friendly marketing tools</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="bg-[#eff6ff] rounded-[32px] p-6 flex flex-col items-center text-center row-span-2">
              <img src={imgTool1} alt="" style={{ width: 48, height: 48 }} className="mb-4" />
              <h3 style={interBold} className="text-[#2c053b] text-[20px] mb-2">Banners and landing pages</h3>
              <p style={interMed} className="text-[#64748b] text-[14px] leading-6">We regularly update our banners and landing pages database</p>
              <img src={imgToolBanner} alt="banner preview" className="mt-6 w-full max-w-[280px] rounded-xl" />
            </div>
            <div className="bg-[#eff6ff] rounded-[32px] p-6 flex flex-col items-center text-center">
              <img src={imgTool2} alt="" style={{ width: 48, height: 48 }} className="mb-3" />
              <h3 style={interBold} className="text-[#2c053b] text-[20px] mb-1">Smart Link</h3>
              <p style={interMed} className="text-[#64748b] text-[14px]">All the best offers in one link</p>
            </div>
            <div className="bg-[#eff6ff] rounded-[32px] p-6 flex flex-col items-center text-center">
              <img src={imgTool4} alt="" style={{ width: 48, height: 48 }} className="mb-3" />
              <h3 style={interBold} className="text-[#2c053b] text-[20px] mb-1">Promo codes</h3>
              <p style={interMed} className="text-[#64748b] text-[14px]">Unique promo codes for your audience</p>
            </div>
            <div className="bg-[#eff6ff] rounded-[32px] p-6 flex flex-col items-center text-center">
              <img src={imgTool3} alt="" style={{ width: 48, height: 48 }} className="mb-3" />
              <h3 style={interBold} className="text-[#2c053b] text-[20px] mb-1">JSON Feeds</h3>
              <p style={interMed} className="text-[#64748b] text-[14px]">Get the best products directly from our server</p>
            </div>
            <div className="bg-[#eff6ff] rounded-[32px] p-6 flex flex-col items-center text-center">
              <img src={imgTool5} alt="" style={{ width: 48, height: 48 }} className="mb-3" />
              <h3 style={interBold} className="text-[#2c053b] text-[20px] mb-1">S2S integration</h3>
              <p style={interMed} className="text-[#64748b] text-[14px]">Integration with any of the popular trackers</p>
            </div>
          </div>
        </section>

        {/* Affiliate Dashboard */}
        <section className="bg-white rounded-[32px] px-8 py-14">
          <div className="text-center mb-10">
            <p style={interSemi} className="text-[#cca6ff] text-[14px] uppercase tracking-widest mb-2">Affiliate dashboard</p>
            <h2 style={{ ...league, fontSize: 'clamp(36px, 4vw, 64px)', textTransform: 'uppercase', color: '#2c053b' }}>All your info in one place</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <img src={imgDash1} alt="Dashboard preview" className="w-full rounded-2xl" />
            <div className="flex flex-col gap-6">
              <div className="bg-[#eff6ff] rounded-[32px] p-6 flex gap-4">
                <img src={imgWindows} alt="" style={{ width: 64, height: 64, flexShrink: 0 }} />
                <div>
                  <h3 style={interBold} className="text-[#334155] text-[20px] mb-1">My account</h3>
                  <p style={interMed} className="text-[#64748b] text-[16px] leading-7">All the information you need can be found on our handy affiliate dashboard</p>
                </div>
              </div>
              <div className="flex gap-4 px-2">
                <img src={imgTime} alt="" style={{ width: 64, height: 64, flexShrink: 0 }} />
                <div>
                  <h3 style={interBold} className="text-[#334155] text-[20px] mb-1">Real-time statistics</h3>
                  <p style={interMed} className="text-[#64748b] text-[16px]">Watch as your stats are updated in real time</p>
                </div>
              </div>
              <div className="flex gap-4 px-2">
                <img src={imgReport} alt="" style={{ width: 64, height: 64, flexShrink: 0 }} />
                <div>
                  <h3 style={interBold} className="text-[#334155] text-[20px] mb-1">Detailed reports</h3>
                  <p style={interMed} className="text-[#64748b] text-[16px]">Create and view detailed reports on a range of information</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why affiliates choose us */}
        <section className="relative rounded-[32px] overflow-hidden">
          <img src={imgSection2} alt="" className="absolute inset-0 w-full h-full object-cover object-bottom" />
          <div className="relative z-10 p-5 sm:p-10">
            <p style={interSemi} className="text-white text-[14px] uppercase tracking-widest mb-2">About us</p>
            <h2 style={{ ...league, fontSize: 'clamp(40px, 4vw, 64px)', textTransform: 'uppercase', color: 'white', lineHeight: 1 }} className="mb-8">
              Why do affiliates<br />choose us?
            </h2>
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <div className="flex flex-col gap-4">
                <div className="rounded-[32px] overflow-hidden aspect-video">
                  <img src={imgTeamSpirit} alt="Team" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white rounded-[32px] p-8">
                  <h3 style={{ ...league, fontSize: 48, textTransform: 'uppercase', color: '#2c053b', lineHeight: 1 }} className="mb-4">
                    An innovative betting company
                  </h3>
                  <p style={interMed} className="text-[#64748b] text-[15px] leading-6">
                    We're one of the most popular betting websites in the world, offering some of the highest odds for players, a huge variety of events to bet on, a flexible Bet Constructor feature, and quick and easy withdrawal options.
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-[32px] overflow-hidden aspect-video">
                  <img src={imgTeamSpirit1} alt="Team" className="w-full h-full object-cover" />
                </div>
                <div className="backdrop-blur-sm bg-[rgba(255,255,255,0.15)] rounded-[32px] p-8">
                  <h3 style={{ ...league, fontSize: 34, textTransform: 'uppercase', color: 'white', lineHeight: 1.1 }} className="mb-5">
                    100,000 affiliates from all over the world are already working with us
                  </h3>
                  {[
                    { icon: imgHeart, title: 'A competitive brand', desc: 'We go the extra mile to promote our brand across the globe' },
                    { icon: imgTarget, title: 'High Conversion', desc: 'We are constantly improving our marketing strategies to achieve the highest possible conversion rates' },
                    { icon: imgReverseLeft, title: 'High retention', desc: 'Special loyalty programs and customer retention methods' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 mb-4">
                      <img src={item.icon} alt="" style={{ width: 32, height: 32, flexShrink: 0 }} />
                      <div>
                        <p style={interBold} className="text-white text-[17px]">{item.title}</p>
                        <p style={interMed} className="text-white/80 text-[15px] leading-6">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* World map */}
            <div className="bg-[#cca6ff] rounded-[32px] overflow-hidden p-8 mb-8">
              <h3 style={{ ...league, fontSize: 36, textTransform: 'uppercase', color: 'white' }} className="mb-4">Brand locations</h3>
              <div className="relative overflow-hidden rounded-2xl" style={{ maxHeight: 460 }}>
                <img src={imgWorldMap} alt="World map" className="w-full opacity-60" />
              </div>
              <div className="bg-[#8d52da] rounded-[24px] p-5 grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {[
                  { val: '3M+', label: 'Daily players' },
                  { val: '62 countries', label: 'Geography' },
                  { val: '49', label: 'Supported languages' },
                  { val: '250', label: 'Payment solutions' },
                ].map((s, i) => (
                  <div key={i} className={`text-center ${i < 3 ? 'border-r border-white/25' : ''}`}>
                    <p style={interBold} className="text-white text-[24px]">{s.val}</p>
                    <p style={interMed} className="text-white text-[14px]">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partner logos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
              <div className="flex flex-col items-center">
                <p style={interSemi} className="text-white/80 text-[17px] mb-3">Sports partners</p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {[imgLogo2, imgLogo2a, imgLogo3, imgLogo4, imgLogo5, imgLogo6, imgLogo7].map((src, i) => (
                    <img key={i} src={src} alt="sports partner" style={{ height: 48, objectFit: 'contain', maxWidth: 80 }} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p style={interSemi} className="text-white/80 text-[17px] mb-3">Esports partners</p>
                <div className="flex flex-wrap items-center justify-center gap-6">
                  {[imgLogo8, imgLogo9svg, imgLogo10, imgLogo11, imgLogo13].map((src, i) => (
                    <img key={i} src={src} alt="esports partner" style={{ height: 48, objectFit: 'contain', maxWidth: 80 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
</section>

        {/* How it works */}
        <section id="how-it-works" className="bg-white rounded-[32px] px-8 py-14 scroll-mt-24">
          <div className="text-center mb-10">
            <p style={interSemi} className="text-[#cca6ff] text-[14px] uppercase tracking-widest mb-2">How it works</p>
            <h2 style={{ ...league, fontSize: 'clamp(36px, 4vw, 64px)', textTransform: 'uppercase', color: '#2c053b' }}>Four steps to get you earning</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: imgStep1, title: 'Sign up', desc: 'Register in no time and wait for your account to be verified' },
              { icon: imgStep2, title: 'Post an ad', desc: 'Post promotional materials with your affiliate link on your platform' },
              { icon: imgStep3, title: 'Bring in customers', desc: 'Every new customer who is referred via your link is permanently assigned to you' },
              { icon: imgStep4, title: 'Withdraw your money', desc: 'Get up to 40% of our net revenue from every customer you refer.' },
            ].map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <img src={s.icon} alt={s.title} style={{ width: 64, height: 64 }} className="mb-4" />
                <h3 style={interBold} className="text-[#2c053b] text-[20px] mb-2">{s.title}</h3>
                <p style={interMed} className="text-[#64748b] text-[14px] leading-6">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <a href="/register" style={interSemi} className="bg-[#8f43d6] text-white px-10 py-3 rounded-xl text-[16px] hover:bg-[#7c38c0] transition-colors">Join our team</a>
          </div>
        </section>

        {/* News */}
        <section id="news" className="bg-white rounded-[32px] px-8 py-10 scroll-mt-24">
          <div className="flex items-center justify-between mb-8">
            <h2 style={{ ...league, fontSize: 'clamp(36px, 4vw, 64px)', textTransform: 'uppercase', color: '#2c053b' }}>News</h2>
            <a href="#news" style={interSemi} className="bg-[rgba(4,94,214,0.05)] text-[#8f43d6] px-5 py-2.5 rounded-xl text-[15px] flex items-center gap-2 hover:bg-[rgba(143,67,214,0.1)] transition-colors">
              All news
              <img src={imgArrowNews} alt="" style={{ width: 13, height: 13 }} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: imgNews1, title: 'Upcoming Promo Digest - March 2024', desc: 'March brings a variety of gaming and betting experiences, from virtual football and esports to themed slots.' },
              { img: imgNews2, title: 'Upcoming Promo Digest - February 2024', desc: 'Explore this month\u2019s virtual football, esports, and themed gaming events.' },
              { img: imgNews3, title: 'Upcoming Promo Digest - January 2024', desc: 'Discover January promotions across esports, football, and gaming.' },
            ].map((n, i) => (
              <div key={i} className="flex flex-col gap-3">
                <img src={n.img} alt={n.title} className="w-full rounded-2xl aspect-video object-cover" />
                <h3 style={interBold} className="text-[#2c053b] text-[17px] uppercase leading-7">{n.title}</h3>
                <p style={interMed} className="text-[#475569] text-[14px] leading-6">{n.desc}</p>
                <span aria-disabled="true" title="Article details are not available yet" style={interBold} className="text-[#64748b] text-[14px]">More details coming soon</span>
              </div>
            ))}
          </div>
        </section>

        {/* Android app */}
        <section className="bg-white rounded-[32px] px-8 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p style={interSemi} className="text-[#cca6ff] text-[14px] uppercase tracking-widest mb-3">Android app</p>
              <h2 style={{ ...league, fontSize: 'clamp(32px, 4vw, 56px)', textTransform: 'uppercase', color: '#2c053b', lineHeight: 1.05 }} className="mb-4">
                Discover seamless affiliate<br />partnership management
              </h2>
              <p style={interSemi} className="text-[#64748b] text-[16px] leading-7 mb-6">
                Manage your affiliate networks from anywhere with the PartnersMATKAA mobile app. Configure the app to suit your needs and make managing your affiliate network even more efficient.
              </p>
              <button type="button" style={interSemi} className="bg-[#8f43d6] text-white px-6 py-3 rounded-xl text-[16px] inline-flex items-center gap-3 hover:bg-[#7c38c0] transition-colors">Download for Android</button>
            </div>
            <div className="bg-[#8136c8] rounded-[32px] overflow-hidden flex items-end justify-center h-[360px]">
              <img src={imgDownloadAndroid} alt="Mobile app" style={{ height: 320, objectFit: 'contain' }} />
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white rounded-[32px] px-8 py-12">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <p style={interSemi} className="text-[#cca6ff] text-[16px] uppercase tracking-widest mb-2">FAQ</p>
              <h2 style={{ ...league, fontSize: 'clamp(56px, 7vw, 80px)', fontWeight: 700, textTransform: 'uppercase', color: '#2c053b' }}>FAQs</h2>
            </div>
            <div className="flex w-full max-w-[900px] flex-col gap-2">
              {faqItems.map((q, i) => <FAQItem key={q} id={`faq-answer-${i}`} q={q} answer={faqAnswers[i]} open={openFaqIndex === i} onToggle={() => setOpenFaqIndex(current => current === i ? null : i)} />)}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative rounded-[32px] overflow-hidden flex flex-col items-center justify-center py-16 text-center">
          <img src={imgSection3} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="relative z-10 px-6">
            <h2 style={{ ...league, fontSize: 'clamp(32px, 4vw, 56px)', color: '#f8fafc' }} className="mb-6">
              Get earning with a trusty partner by your side
            </h2>
            <a href="/register" style={interSemi} className="bg-[#f4f8fa] text-[#8f43d6] px-8 py-3 rounded-xl text-[16px] inline-block hover:bg-white transition-colors">Become a partner</a>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
      {contactEnquiryOpen && <PartnershipEnquiryModal onClose={() => setContactEnquiryOpen(false)} />}
    </div>
  );
}



