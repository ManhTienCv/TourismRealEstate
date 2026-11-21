import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { HutsButton } from '../common/HutsButton';

export const PreFooterBanner: React.FC = () => {
  const { openConfigurator } = useConfiguratorStore();

  return (
    <section className="relative w-full bg-[#FAF7ED] z-10">
      <div className="sock w-full bg-[#D5E798] rounded-t-[24px] px-6 md:px-16 py-8 md:py-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative">
        {/* Hình minh họa SVG bên trái (figure.illo) */}
        <figure className="illo w-[140px] md:w-[175px] aspect-square shrink-0 object-contain flex items-center justify-center m-0">
          <img
            src="https://cdn.sanity.io/images/xi1ruvdt/production/5950b2b3cc53f79646218dad8be5132223257be8-164x164.svg"
            alt="Dreaming of a country home"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
        </figure>

        {/* Tiêu đề h3 */}
        <h3 className="font-serif font-normal text-[#0C310A] text-[clamp(1.75rem,2.63vw+1.13rem,3.5rem)] leading-[1.1] tracking-[-0.03em] text-center lg:text-left max-w-[600px]">
          Let’s find that place you’ve been dreaming about
        </h3>

        {/* Nút CTA bên phải */}
        <HutsButton
          variant="sock"
          withArrow
          to="/get-started"
          onClick={() => openConfigurator()}
          className="lg:ml-auto shrink-0"
        >
          Get Started
        </HutsButton>
      </div>
    </section>
  );
};

export default PreFooterBanner;
