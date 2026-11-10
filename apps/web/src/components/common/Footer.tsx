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
    <footer className="relative z-10 -mt-8 w-full bg-[#0E2D0B] text-[#FAF8F1] rounded-t-[28px] pt-14 pb-10 px-8 md:px-16 overflow-hidden select-none">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Main Footer Grid: Logo Left (Col-4) + 4 Menu Columns Right (Col-8) */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-10 mb-14">
          
          {/* Left Column: TIE Logo aligned with the top of menu columns */}
          <div className="md:col-span-4 flex items-start">
            <span
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-sans font-black text-5xl md:text-[64px] tracking-tight leading-none text-[#FAF8F1] -mt-1 select-none cursor-pointer block hover:opacity-90 transition-opacity"
            >
              TIE
            </span>
          </div>

          {/* Right: 4 High-Fidelity Categorized Menu Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8 items-start text-left">
            
            {/* COLUMN 1: Housing Solutions */}
            <div className="space-y-1">
              <h4 className="font-sans text-[11px] font-medium text-[#CFE87B]/80 tracking-wide mb-3">
                Housing Solutions
              </h4>
              <ul className="space-y-0.5">
                {FOOTER_SOLUTIONS.map((item) => (
                  <li key={item.slug}>
                    <button
                      onClick={() => handleSolutionClick(item.slug)}
                      className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: Standards */}
            <div className="space-y-1">
              <h4 className="font-sans text-[11px] font-medium text-[#CFE87B]/80 tracking-wide mb-3">
                Standards
              </h4>
              <ul className="space-y-0.5">
                {FOOTER_STANDARDS.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => handleStandardClick(item.slug)}
                      className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: Company */}
            <div className="space-y-1">
              <h4 className="font-sans text-[11px] font-medium text-[#CFE87B]/80 tracking-wide mb-3">
                Company
              </h4>
              <ul className="space-y-0.5">
                <li>
                  <button
                    onClick={() => handleScrollTo('process-section')}
                    className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                  >
                    The TIE Approach
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleScrollTo('portfolio-section')}
                    className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                  >
                    Portfolio
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleFieldReportClick}
                    className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors py-1 text-left inline-flex items-center space-x-1.5"
                  >
                    <span>Field Report</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#CFE87B] animate-pulse" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openConfigurator()}
                    className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                  >
                    Get Started
                  </button>
                </li>
              </ul>
            </div>

            {/* COLUMN 4: Resources & Contact */}
            <div className="space-y-5">
              <div className="space-y-1">
                <h4 className="font-sans text-[11px] font-medium text-[#CFE87B]/80 tracking-wide mb-3">
                  Resources
                </h4>
                <ul className="space-y-0.5">
                  <li>
                    <button
                      onClick={() => handleStandardClick('what-is-a-standard')}
                      className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                    >
                      Standards Guide
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openConfigurator()}
                      className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                    >
                      Cost Pro-Forma
                    </button>
                  </li>
                </ul>
              </div>

              <div className="space-y-1">
                <h4 className="font-sans text-[11px] font-medium text-[#CFE87B]/80 tracking-wide mb-3">
                  Contact
                </h4>
                <ul className="space-y-0.5">
                  <li>
                    <a
                      href="mailto:hello@tie.com"
                      className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                    >
                      hello@tie.com
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={() => openConfigurator()}
                      className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                    >
                      For Partners
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => openConfigurator()}
                      className="font-sans text-[13px] md:text-[14px] font-normal text-[#FAF8F1]/90 hover:text-[#CFE87B] transition-colors block py-1 text-left"
                    >
                      Newsletter
                    </button>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms Left + Social Pills Right */}
        <div className="pt-6 border-t border-[#FAF8F1]/10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 text-[11px] text-[#FAF8F1]/70">
          
          <div className="md:col-span-4 flex items-center gap-6">
            <span className="font-sans">©2026 TIE</span>
            <div className="flex items-center gap-2 font-sans">
              <button
                onClick={() => handleScrollTo('solutions-section')}
                className="hover:text-[#CFE87B] transition-colors text-left"
              >
                Privacy Policy
              </button>
              <span className="text-[#FAF8F1]/30">/</span>
              <button
                onClick={() => handleScrollTo('solutions-section')}
                className="hover:text-[#CFE87B] transition-colors text-left"
              >
                Terms of Use
              </button>
            </div>
          </div>

          <div className="md:col-span-8 flex items-center gap-3">
            <FooterSocialLinks />
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
