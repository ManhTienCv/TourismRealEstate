import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { HutsButton } from '../common/HutsButton';
import {
  HOUSING_SOLUTIONS_DATA,
  STANDARDS_LOOKUP,
  getHousingSolution,
  HousingSolutionDetailData,
  BackAndForthItem,
} from './housingSolutionsData';
import { getLenis } from '../../utils/smoothScroll';
import { SEED_STANDARD_PLANS } from '@tie/shared';

interface HousingSolutionPageProps {
  slug?: string;
}

export const HousingSolutionPage: React.FC<HousingSolutionPageProps> = ({ slug: propSlug }) => {
  const storeSlug = useConfiguratorStore((s) => s.selectedSolutionSlug);
  const openConfigurator = useConfiguratorStore((s) => s.openConfigurator);
  const openPlanDetail = useConfiguratorStore((s) => s.openPlanDetail);

  const activeSlug = propSlug || storeSlug || 'starter-home';
  const data: HousingSolutionDetailData = getHousingSolution(activeSlug);

  // Cuộn lên đầu trang khi đổi slug
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [activeSlug]);

  // Phân tích tiêu đề h1 có chứa [cụm từ gạch chân]
  const renderUnderlinedTitle = (title: string) => {
    const match = title.match(/^(.*?)\[(.*?)\](.*)$/);
    if (!match) return title;
    const [, before, underlined, after] = match;
    return (
      <>
        {before}
        <span className="relative inline-block">
          <span className="relative z-10">{underlined}</span>
          <svg
            viewBox="0 0 412 26"
            className="absolute left-0 right-0 -bottom-2 w-full h-[14px] pointer-events-none overflow-visible z-0"
            preserveAspectRatio="none"
            fill="none"
          >
            <motion.path
              d="M255.8,23.8c-35.1-1.6-92.1-2.1-99.5-3-7-.8-6.6-1.9-.7-2.6,39.4-3.2,81.7,1.2,121.9-2.5,3.1-.7-2.6-1.4-4-1.6-46.3-3.1-94.4-1.2-140.4-3.3-16.6-.8-11.7-1.6,2.5-1.8,82.3-1.2,165.4,1,247.6-1.1,7.1-.3,15.8-.5,21.7-1.5.4,0,1.4-.3.5-.6C292.1,1.4,121.4.5,1.2,5.3"
              fill="none"
              stroke="#D5E798"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.55, ease: [0.33, 1, 0.68, 1] }}
            />
          </svg>
        </span>
        {after}
      </>
    );
  };

  return (
    <motion.div
      key={activeSlug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
      className="w-full bg-[#FAF7ED] text-[#1E1414] overflow-x-clip font-sans selection:bg-[#CBE282] selection:text-[#0C310A]"
    >
      {/* 1. HERO SECTION (section.page-header.page-header-centered.w-illo) */}
      <section className="page-header page-header-centered w-illo min-h-[100svh] flex flex-col justify-center items-center text-center px-6 md:px-24 pt-28 pb-16 gap-10">
        {/* Hình minh họa Illo SVG */}
        <motion.figure
          className="illo w-[256px] md:w-[375px] aspect-square flex items-center justify-center"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.33, 1, 0.68, 1] }}
        >
          <img
            src={data.illo}
            alt={data.label}
            className="w-full h-full object-contain select-none pointer-events-none"
            loading="eager"
            decoding="async"
          />
        </motion.figure>

        {/* Khối Tiêu đề & Nhãn */}
        <motion.div
          className="max-w-[900px] mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.33, 1, 0.68, 1] }}
        >
          <p className="label text-[#57772E] text-[15.5px] font-sans mb-3 font-normal tracking-wide">
            {data.label}
          </p>
          <h1 className="font-serif font-normal text-[#0C310A] text-[34px] md:text-[50px] leading-[1.1] tracking-[-0.03em] mb-6">
            {renderUnderlinedTitle(data.h1)}
          </h1>

          {/* Nút CTA dẫn tới /get-started hoặc mở wizard */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
            className="mt-2"
          >
            <HutsButton
              variant="primary"
              withArrow={true}
              onClick={() => openConfigurator(undefined, data.slug as any)}
            >
              {data.cta}
            </HutsButton>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. KHỐI DẪN NHẬP (section.text-block) */}
      <section className="text-block max-w-[820px] mx-auto px-6 py-20 md:py-28 text-left">
        <p className="label text-[#57772E] text-[15.5px] mb-5 font-sans font-normal">
          We get it.
        </p>
        <h5 className="font-serif font-normal text-[#0C310A] text-[22px] md:text-[29.6px] leading-[1.35] tracking-[-0.025em]">
          {data.intro}
        </h5>
      </section>

      {/* 3. CÁC KHỐI 2 CỘT SO LE ĐẦU TIÊN (section.back-and-forth) */}
      <div className="space-y-6 md:space-y-12">
        {data.backAndForth.map((item, idx) => (
          <BackAndForthBlock key={idx} item={item} isWhyHuts={false} />
        ))}
      </div>

      {/* 4. HAI KHỐI DANH SÁCH (section.list: Design Considerations & Financial Conditions) */}
      <div className="py-12 md:py-20 space-y-16">
        {/* Block 1: Design Considerations */}
        <section className="list grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 md:px-16 py-12 max-w-[1584px] mx-auto">
          <div className="lg:col-span-5">
            <h3 className="text-[34px] lg:text-[50px] leading-[1.1] tracking-[-0.03em] font-serif font-normal text-[#0C310A] lg:sticky lg:top-28">
              Design Considerations
            </h3>
          </div>
          <div className="lg:col-span-7 divide-y divide-[#D0D4C8]">
            {data.designConsiderations.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-6 py-8 first:pt-0"
              >
                <div className="max-w-[520px]">
                  <h5 className="text-[22px] md:text-[29.6px] leading-[1.3] font-serif text-[#0C310A] mb-2 font-normal">
                    {item.title}
                  </h5>
                  <p className="text-[15.5px] leading-[1.5] text-[#664A42] font-sans">
                    {item.desc}
                  </p>
                </div>
                <img
                  src="https://cdn.sanity.io/images/xi1ruvdt/production/cf0a2a952429e843d70e2de7a1fef98abbc8aa83-32x32.svg"
                  alt="Checkmark"
                  className="w-8 h-8 shrink-0 mt-1 select-none pointer-events-none"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Block 2: Financial Conditions */}
        <section className="list grid grid-cols-1 lg:grid-cols-12 gap-10 px-6 md:px-16 py-12 max-w-[1584px] mx-auto">
          <div className="lg:col-span-5">
            <h3 className="text-[34px] lg:text-[50px] leading-[1.1] tracking-[-0.03em] font-serif font-normal text-[#0C310A] lg:sticky lg:top-28">
              Financial Conditions
            </h3>
          </div>
          <div className="lg:col-span-7 divide-y divide-[#D0D4C8]">
            {data.financialConditions.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-6 py-8 first:pt-0"
              >
                <div className="max-w-[520px]">
                  <h5 className="text-[22px] md:text-[29.6px] leading-[1.3] font-serif text-[#0C310A] mb-2 font-normal">
                    {item.title}
                  </h5>
                  <p className="text-[15.5px] leading-[1.5] text-[#664A42] font-sans">
                    {item.desc}
                  </p>
                </div>
                <h5 className="font-serif text-[26px] md:text-[29.6px] text-[#57772E] shrink-0 font-normal">
                  0{idx + 1}
                </h5>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 5. KHỐI "Why HUTS Works..." (Khối 2 cột so le thứ 4) */}
      <div className="py-6 md:py-10">
        <BackAndForthBlock item={data.whyHuts} isWhyHuts={true} />
      </div>

      {/* 6. KHỐI GỢI Ý 3 THẺ STANDARDS (section.card-slider) */}
      {data.standardsSlider && (
        <section className="card-slider px-6 md:px-16 py-16 md:py-24 max-w-[1584px] mx-auto">
          <div className="max-w-[800px] mx-auto text-center mb-10">
            <h3 className="text-[34px] lg:text-[50px] leading-[1.1] tracking-[-0.03em] font-serif font-normal text-[#0C310A] mb-4">
              {data.standardsSlider.title}
            </h3>
            <p className="text-[15.5px] leading-[23px] text-[#664A42] font-sans max-w-[750px] mx-auto">
              {data.standardsSlider.desc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px] w-full">
            {data.standardsSlider.cards.map((cardKey) => {
              const card = STANDARDS_LOOKUP[cardKey];
              if (!card) return null;
              return (
                <StandardDetailCard
                  key={cardKey}
                  card={card}
                  onSelect={() => {
                    const foundPlan = SEED_STANDARD_PLANS.find(
                      (p) => p.slug === card.slug || p.slug.startsWith(card.slug)
                    );
                    if (foundPlan) {
                      openPlanDetail(foundPlan);
                    }
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* 7. KHỐI DỰ ÁN CUỐI TRANG (section.project-feature) */}
      <section className="project-feature py-20 px-6 md:px-16 max-w-[1584px] mx-auto">
        <h3 className="max-w-[800px] mx-auto text-center mb-12 text-[34px] lg:text-[50px] font-serif font-normal text-[#0C310A] leading-[1.1] tracking-[-0.03em]">
          {data.projectFeature.heading}
        </h3>

        <div className="relative w-full h-[70vh] md:h-[85vh] lg:h-screen rounded-[24px] overflow-hidden group shadow-lg">
          <img
            src={data.projectFeature.image}
            alt={data.projectFeature.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-8 md:p-14">
            <div className="flex flex-wrap gap-2 mb-4">
              {data.projectFeature.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[12px] uppercase tracking-wider text-white bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full font-sans font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h4 className="text-[32px] md:text-[50px] font-serif text-[#FAF7ED] font-normal leading-tight">
              {data.projectFeature.title}
            </h4>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

// Component con: Khối 2 cột so le
const BackAndForthBlock: React.FC<{ item: BackAndForthItem; isWhyHuts?: boolean }> = ({
  item,
  isWhyHuts = false,
}) => {
  const isRight = item.side === 'right';

  return (
    <section className="back-and-forth grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-[160px] px-6 md:px-16 py-14 max-w-[1584px] mx-auto">
      {/* Media Column */}
      <div
        className={`aspect-square w-full rounded-[22px] overflow-hidden bg-[#EAE6DF] ${
          isRight ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {item.mediaType === 'video' ? (
          <video
            src={item.mediaUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={`${item.mediaUrl}?w=1200&q=85&auto=format`}
            alt={item.title}
            className="w-full h-full object-cover"
            decoding="async"
            loading="lazy"
          />
        )}
      </div>

      {/* Text Column */}
      <div
        className={`max-w-[540px] ${
          isRight ? 'lg:order-1 lg:pl-12' : 'lg:order-2'
        }`}
      >
        <h4 className="text-[28px] lg:text-[36.1px] leading-[1.14] tracking-[-0.02em] font-serif font-normal text-[#0C310A] mb-[22px]">
          {item.title}
        </h4>
        <p
          className={
            isWhyHuts
              ? 'text-[15.5px] leading-[1.5] text-[#664A42] font-sans'
              : 'text-[17px] lg:text-[19.5px] leading-[1.4] text-[#664A42] font-sans'
          }
        >
          {item.desc}
        </p>
      </div>
    </section>
  );
};

// Component con: Thẻ Standard lật 3D
const StandardDetailCard: React.FC<{
  card: { slug: string; title: string; coverImg: string; axonImg: string; tags: string[] };
  onSelect: () => void;
}> = ({ card, onSelect }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="card-wrapper w-full flex flex-col gap-[20px] group select-none">
      <div
        className="card standard relative w-full aspect-[6/5] max-h-[45vh] rounded-[20px] [perspective:1000px] cursor-pointer"
        onClick={onSelect}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <div
          className={`card-inner relative w-full h-full rounded-[20px] [transform-style:preserve-3d] transition-transform duration-[800ms] ease-[cubic-bezier(0.175,0.885,0.32,1.125)] ${
            isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
          }`}
        >
          {/* Mặt trước: Ảnh ngoại thất */}
          <div className="card-front absolute inset-0 w-full h-full rounded-[20px] overflow-hidden [backface-visibility:hidden] bg-[#FFFDF6] border border-[#0C310A]/25">
            <img
              src={card.coverImg}
              alt={card.title}
              className="w-full h-full object-cover select-none pointer-events-none"
              loading="lazy"
            />
          </div>

          {/* Mặt sau: Bản vẽ 3D Axonometric nền trắng tinh */}
          <div className="card-back absolute inset-0 w-full h-full rounded-[20px] overflow-hidden [backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#FFFFFF] border border-[#57772E] px-5 pt-5 pb-14 flex items-center justify-center">
            <img
              src={card.axonImg}
              alt={`${card.title} 3D Axonometric`}
              className="w-full h-full max-h-[220px] object-contain select-none pointer-events-none"
              loading="lazy"
            />
            {/* Nhãn thông số */}
            <div className="tags-wrapper absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
              {card.tags.map((tag, tIdx) => (
                <div
                  key={tIdx}
                  className="text-[12px] leading-[1.5] text-[#1E1414] bg-[#FFFDF6]/65 border border-[#D0D4C8] rounded-full px-[14px] py-[5px] font-sans select-none"
                >
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tiêu đề bên dưới thẻ */}
      <h5
        className={`text-left text-[24px] md:text-[28px] leading-[1.2] font-serif transition-colors duration-200 ${
          isFlipped ? 'text-[#57772E]' : 'text-[#0C310A]'
        } group-hover:text-[#57772E]`}
      >
        {card.title}
      </h5>
    </div>
  );
};

export default HousingSolutionPage;
