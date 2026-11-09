import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { SEED_STANDARD_PLANS } from '@tie/shared';
import { FOOTER_SOLUTIONS, FOOTER_STANDARDS } from './footer/footerData';
import { FooterSocialLinks } from './footer/FooterSocialLinks';

export const Footer: React.FC = () => {
  const { setActiveTab, openConfigurator, openPlanDetail, setFilterSolutionSlug, closeSolutionDetail } = useConfiguratorStore();

  const handleSolutionClick = (slug: string) => {
    setFilterSolutionSlug(slug);
    const el = document.getElementById('solutions-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStandardClick = (slug?: string) => {
    if (!slug || slug === 'what-is-a-standard') {
      closeSolutionDetail();
      setActiveTab('standards');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const plan = SEED_STANDARD_PLANS.find((p) => p.slug === slug);
    if (plan) {
      openPlanDetail(plan);
    } else {
      closeSolutionDetail();
      setActiveTab('home');
      const el = document.getElementById('standards-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-16">
        
        {/* Main Footer Row: Big TIE Wordmark (Left) + 4 Categorized Columns (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Massive Bold TIE Wordmark */}
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
                {FOOTER_SOLUTIONS.map((item) => (
                  <li key={item.slug}>
                    <button
                      onClick={() => handleSolutionClick(item.slug)}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: Standards */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                Standards
              </h4>
              <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                {FOOTER_STANDARDS.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleStandardClick(item.slug)}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: Company */}
            <div className="space-y-4">
              <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                Company
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
                    onClick={() => handleScrollTo('portfolio-section')}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Portfolio
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleFieldReportClick}
                    className="hover:text-[#D2E2B0] transition-colors text-left inline-flex items-center space-x-2"
                  >
                    <span>Field Report</span>
                    <span className="w-2 h-2 rounded-full bg-[#A8C86D] animate-pulse" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openConfigurator()}
                    className="hover:text-[#D2E2B0] transition-colors text-left"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: Contact & Resources */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-[#F8F6EA]/75">
                  Resources
                </h4>
                <ul className="space-y-3 font-serif text-[17px] sm:text-[18px] text-[#F8F6EA] leading-snug">
                  <li>
                    <button
                      onClick={() => handleStandardClick('what-is-a-standard')}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      Standards Guide
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openConfigurator()}
                      className="hover:text-[#D2E2B0] transition-colors text-left"
                    >
                      Cost Pro-Forma
                    </button>
                  </li>
                </ul>
              </div>

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

        {/* Bottom Baseline Bar: Legal Links + 6 Social Icons */}
        <div className="mt-16 sm:mt-24 pt-8 border-t border-[#F8F6EA]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-sm">
          
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

          <FooterSocialLinks />

        </div>

      </div>
    </footer>
  );
};

export default Footer;
