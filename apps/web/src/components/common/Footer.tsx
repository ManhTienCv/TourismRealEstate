import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SEED_STANDARD_PLANS } from '@tie/shared';

export const Footer: React.FC = () => {
  const { setActiveTab, openConfigurator, openPlanDetail, setFilterSolutionSlug } = useConfiguratorStore();

  // 1. Housing Solutions Link Handler
  const handleSolutionClick = (slug: string) => {
    setFilterSolutionSlug(slug);
    const el = document.getElementById('solutions-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 2. Standards Link Handler
  const handleStandardClick = (slug?: string) => {
    if (!slug || slug === 'what-is-a-standard') {
      const el = document.getElementById('standards-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    } else {
      const el = document.getElementById('standards-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Navigation / Action Handlers
  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFieldReportClick = () => {
    setActiveTab('field-report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0E370B] text-[#F8F6EA] rounded-t-[36px] sm:rounded-t-[48px] pt-16 sm:pt-20 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Main Footer Row: Big TIE Wordmark (Left) + 4 Categorized Columns (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Massive Bold TIE Wordmark (Exact Match to Banghi.mp4 01:08 - 01:09) */}
          <div className="lg:col-span-3">
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-sans font-black text-7xl sm:text-8xl lg:text-[104px] tracking-tight text-[#F8F6EA] leading-none select-none cursor-pointer block hover:opacity-90 transition-opacity"
            >
              TIE
            </span>
          </div>

          {/* Right Area: 4 High-Fidelity Categorized Columns */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 text-left">
            
            {/* COLUMN 1: Housing Solutions */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                Housing Solutions
              </h4>
              <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                <li>
                  <button
                    onClick={() => handleSolutionClick('starter-home')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Starter Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSolutionClick('forever-home')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Forever Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSolutionClick('second-home')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Second Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSolutionClick('hybrid-live-work')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Hybrid Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSolutionClick('backyard-adu')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    ADU
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSolutionClick('investment-property')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Investment Property
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSolutionClick('micro-hospitality')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Micro-Hospitality
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSolutionClick('multi-generation-compound')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Multi-Gen Compound
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 2: Standards */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                Standards
              </h4>
              <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                <li>
                  <button
                    onClick={() => handleStandardClick('what-is-a-standard')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    What is a Standard?
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('adu')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    ADU
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('small-l')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Small L
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('small-bar')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Small Bar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('medium-bar')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Medium Bar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('big-l')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Big L
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('dogtrot')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Dogtrot
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('village')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Village
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleStandardClick('big-bar')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Big Bar
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: Company / Other Operations / How It Works */}
            <div className="space-y-8">
              {/* Group A: Company */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                  Company
                </h4>
                <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                  <li>
                    <button
                      onClick={() => handleScrollTo('portfolio-section')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      Portfolio
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleScrollTo('narrative-section')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      About
                    </button>
                  </li>
                </ul>
              </div>

              {/* Group B: Other Operations */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                  Other Operations
                </h4>
                <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                  <li>
                    <button
                      onClick={() => handleScrollTo('solutions-section')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      Courses
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleScrollTo('solutions-section')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      The Department of Leisure
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSolutionClick('starter-home')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      The Starter Home
                    </button>
                  </li>
                </ul>
              </div>

              {/* Group C: How It Works */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                  How It Works
                </h4>
                <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                  <li>
                    <button
                      onClick={() => handleScrollTo('process-section')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      The TIE Approach
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleScrollTo('process-section')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      Services
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* COLUMN 4: Resources & Contact */}
            <div className="space-y-8">
              {/* Group A: Resources */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                  Resources
                </h4>
                <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                  <li>
                    <button
                      onClick={handleFieldReportClick}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      The Field Report
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleFieldReportClick}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      The Land Report
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleScrollTo('standards-section')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      TIE Guides
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openConfigurator()}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      Development Opportunities
                    </button>
                  </li>
                </ul>
              </div>

              {/* Group B: Contact */}
              <div className="space-y-3">
                <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                  Contact
                </h4>
                <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                  <li>
                    <a
                      href="mailto:hello@tie.com"
                      className="hover:text-[#D2E2B0] transition-colors text-left block"
                    >
                      hello@tie.com
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => openConfigurator()}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      For Partners
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openConfigurator()}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      Newsletter
                    </button>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Baseline Bar: Legal Links (Left) + 6 Crisp Social Icons (Aligned) */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[#F8F6EA]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm">
          
          {/* Left: Copyright & Stacked Legal Links matching Banghi.mp4 bottom_bar.jpg */}
          <div className="flex items-start space-x-8 sm:space-x-12 text-[#F8F6EA]/75 text-xs sm:text-sm">
            <span className="font-sans pt-0.5">©2026 TIE</span>
            <div className="flex flex-col space-y-1 font-sans">
              <button
                onClick={() => handleScrollTo('solutions-section')}
                className="hover:text-[#D2E2B0] transition-colors text-left"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleScrollTo('solutions-section')}
                className="hover:text-[#D2E2B0] transition-colors text-left"
              >
                Terms of Use
              </button>
            </div>
          </div>

          {/* Right: 6 Social Media SVG Icons (Exact Match to Banghi.mp4 01:08) */}
          <div className="flex items-center space-x-6 sm:space-x-7 text-[#F8F6EA]">
            {/* 1. YouTube */}
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D2E2B0] transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>

            {/* 2. TikTok */}
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D2E2B0] transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>

            {/* 3. Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D2E2B0] transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* 4. LinkedIn (Solid badge matching bottom_bar.jpg) */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D2E2B0] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 0 0 1.54-1.53c0-.85-.69-1.54-1.54-1.54a1.54 1.54 0 0 0-1.54 1.54c0 .84.69 1.53 1.54 1.53m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
              </svg>
            </a>

            {/* 5. Pinterest */}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D2E2B0] transition-colors"
              aria-label="Pinterest"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.056.23-.186.279-.429.168-1.603-.746-2.604-3.089-2.604-4.972 0-4.047 2.94-7.766 8.484-7.766 4.455 0 7.917 3.175 7.917 7.417 0 4.428-2.791 7.991-6.664 7.991-1.301 0-2.525-.676-2.944-1.474l-.801 3.054c-.29 1.109-1.077 2.499-1.604 3.355 1.19.367 2.457.567 3.774.567 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* 6. Spotify */}
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#D2E2B0] transition-colors"
              aria-label="Spotify"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.493 17.306c-.216.353-.674.464-1.026.248-2.809-1.716-6.345-2.105-10.51-1.153-.404.093-.807-.162-.9-.566-.093-.404.162-.807.566-.9 4.562-1.042 8.48-.598 11.622 1.345.353.216.464.674.248 1.026zm1.465-3.26c-.272.443-.854.582-1.297.31-3.216-1.977-8.118-2.548-11.921-1.393-.497.151-1.024-.136-1.175-.633-.151-.497.136-1.024.633-1.175 4.347-1.319 9.757-.68 13.45 1.594.443.272.582.854.31 1.297zm.126-3.41c-3.856-2.29-10.22-2.502-13.88-1.391-.591.179-1.218-.16-1.397-.751-.179-.591.16-1.218.751-1.397 4.223-1.282 11.246-1.034 15.688 1.602.532.316.706 1.008.39 1.54-.316.533-1.008.707-1.54.39z"/>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};
export default Footer;