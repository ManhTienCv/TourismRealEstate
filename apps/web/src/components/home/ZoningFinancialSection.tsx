import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Compass, FileSpreadsheet, ShieldCheck } from 'lucide-react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';

// Financial Conditions 01-04 matching exact Huts specification from Banghi1.mp4 (420s)
const FINANCIAL_CONDITIONS = [
  {
    number: '01',
    title: 'Designed to cash flow.',
    description: 'We model your build costs against rental income and help hit targets from day one.',
    badge: 'Pro-Forma Modeling',
  },
  {
    number: '02',
    title: 'CapEx you can trust.',
    description: 'Our estimates are grounded in reality — based on actual construction across the country.',
    badge: 'Cost Certainty',
  },
  {
    number: '03',
    title: 'Loan ready documentation.',
    description: 'Drawings, specs, and pro formas built to satisfy lenders and underwriters.',
    badge: 'Underwriter Approved',
  },
  {
    number: '04',
    title: 'Low overhead, high return.',
    description: 'Efficient prefabricated modular assembly minimizes holding costs and interest.',
    badge: 'Speed of Delivery',
  },
];

export const ZoningFinancialSection: React.FC = () => {
  const { openConfigurator } = useConfiguratorStore();

  return (
    <section id="zoning-financial-section" className="relative py-24 sm:py-32 bg-tie-bg overflow-hidden border-b border-tie-border/60">
      <div className="max-w-[1584px] mx-auto px-6 sm:px-12 lg:px-16 space-y-28 sm:space-y-36">
        
        {/* =========================================================================
            1. KHỐI QUY TRÌNH THI CÔNG & MÓNG NHÀ (Frame 240s: "We guide the whole process")
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* CỘT TRÁI: Ảnh chụp flycam từ trên cao hố móng đất công trình bo góc lớn rounded-3xl */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[32px] overflow-hidden bg-[#E8E4DC] border border-[#DCD9CE] shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=1600&q=85"
                alt="Aerial flycam foundation groundwork and precision civil excavation"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle architectural badge overlay */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#1C1B18] border border-white/40 shadow-xs flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#567D42] animate-pulse" />
                <span>Phase 01 &bull; Groundwork &amp; Pier Foundation</span>
              </div>
            </div>
          </motion.div>

          {/* CỘT PHẢI: Editorial Copy & Design Considerations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 space-y-6 max-w-xl"
          >
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#567D42]">
              <Compass className="w-3.5 h-3.5 text-[#567D42]" />
              <span>01 &bull; GROUNDWORK &amp; EXECUTION</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight text-[#1C1B18] leading-[1.14]">
              We guide the whole process.
            </h2>

            <p className="text-base sm:text-lg text-[#555148] font-sans leading-relaxed">
              Land selection, permitting, utilities, phasing — we don’t just draw it. We get it built. From rural septic engineering to off-grid solar arrays, our architectural team shepherds every detail.
            </p>

            {/* Khối "Design Considerations" liệt kê các tiêu chí thiết kế có icon tròn xanh lá (✓) */}
            <div className="pt-2">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E8E4DC] space-y-4 shadow-xs">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1C1B18] border-b border-[#E8E4DC] pb-3">
                  Design Considerations
                </div>
                
                <ul className="space-y-3.5 text-sm text-[#555148] font-sans leading-relaxed">
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0DC] text-[#4D6D3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>
                      <strong className="text-[#1C1B18] font-medium">Layout that tells a story.</strong> Arrival sequence, sightlines, and lighting are all scripted to create a memorable experience.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0DC] text-[#4D6D3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>
                      <strong className="text-[#1C1B18] font-medium">Solar &amp; microclimate orientation.</strong> Ridge placement and window fenestration engineered to optimize passive winter heat gain and natural forest cross-ventilation.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0DC] text-[#4D6D3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>
                      <strong className="text-[#1C1B18] font-medium">Topographical preservation.</strong> Stepped foundation engineering adapts gracefully to rock ledges and mature forest canopies without heavy clear-cutting.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </motion.div>

        </div>

        {/* =========================================================================
            2. KHỐI HIỂU BIẾT QUY HOẠCH ĐỊA PHƯƠNG (Frame 340s: "We know the zoning landscape")
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* CỘT TRÁI: Ảnh chụp công trình nhà dài bọc lớp bảo ôn xanh bên rìa rừng thông bo góc rounded-3xl */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[32px] overflow-hidden bg-[#E8E4DC] border border-[#DCD9CE] shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85"
                alt="Long timber framed building wrapped in weather-resistant membrane along rural pine forest edge"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle architectural badge overlay */}
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-mono font-medium text-[#1C1B18] border border-white/40 shadow-xs flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#567D42]" />
                <span>Municipal Permitting &bull; Entitlements Verified</span>
              </div>
            </div>
          </motion.div>

          {/* CỘT PHẢI: Editorial Copy & Zoning Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-6 space-y-6 max-w-xl"
          >
            <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#567D42]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#567D42]" />
              <span>02 &bull; FEASIBILITY &amp; ENTITLEMENTS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[46px] font-normal tracking-tight text-[#1C1B18] leading-[1.14]">
              We know the zoning landscape.
            </h2>

            <p className="text-base sm:text-lg text-[#555148] font-sans leading-relaxed">
              From subdivisions to accessory dwellings to shared utilities, we’ll help you unlock what’s possible. Municipal building departments have unique ordinances — our standardized plans streamline the approval pipeline.
            </p>

            {/* Khối "Zoning Navigation" chi tiết */}
            <div className="pt-2">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E8E4DC] space-y-4 shadow-xs">
                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1C1B18] border-b border-[#E8E4DC] pb-3">
                  Municipal Navigation
                </div>
                
                <ul className="space-y-3.5 text-sm text-[#555148] font-sans leading-relaxed">
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0DC] text-[#4D6D3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>
                      <strong className="text-[#1C1B18] font-medium">Local setback &amp; height thresholds.</strong> Navigating rural zoning bylaws and conservation setbacks without compromising architectural proportion.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0DC] text-[#4D6D3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>
                      <strong className="text-[#1C1B18] font-medium">Perc testing &amp; civil infrastructure.</strong> Comprehensive soil percolation validation, septic field layout, and deep bedrock well coordination.
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-[#E8F0DC] text-[#4D6D3A] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                    <span>
                      <strong className="text-[#1C1B18] font-medium">Conservation &amp; wetland buffers.</strong> Expedited environmental review and board of health sign-offs backed by pre-engineered structural stamps.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

          </motion.div>

        </div>

        {/* =========================================================================
            3. BẢNG ĐIỀU KIỆN TÀI CHÍNH (Frame 420s: "Financial Conditions")
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="pt-12 border-t border-[#E2DDD5]"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#567D42]">
                <FileSpreadsheet className="w-3.5 h-3.5 text-[#567D42]" />
                <span>03 &bull; CAPITAL ALLOCATION</span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] font-normal tracking-tight text-[#1C1B18] leading-[1.12]">
                Financial Conditions
              </h2>
            </div>
            <p className="text-base sm:text-lg text-[#555148] font-sans max-w-md leading-relaxed">
              Rigorous pro-forma modeling and construction cost transparency from day one. Real estimates for real land.
            </p>
          </div>

          {/* 4 Dòng phân tích dòng tiền chuyên nghiệp chia bằng đường kẻ hairline mảnh */}
          <div className="divide-y divide-[#E2DDD5] border-y border-[#E2DDD5]">
            {FINANCIAL_CONDITIONS.map((cond) => (
              <div
                key={cond.number}
                className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start hover:bg-white/50 px-4 -mx-4 rounded-2xl transition-colors duration-200"
              >
                {/* Number */}
                <div className="md:col-span-2 font-serif text-3xl sm:text-4xl font-semibold text-[#567D42]">
                  {cond.number}
                </div>

                {/* Title */}
                <div className="md:col-span-4">
                  <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#1C1B18] tracking-tight">
                    {cond.title}
                  </h3>
                  <span className="inline-block mt-2 text-xs font-mono font-medium text-[#567D42] bg-[#E8F0DC] px-2.5 py-0.5 rounded-full">
                    {cond.badge}
                  </span>
                </div>

                {/* Description */}
                <div className="md:col-span-6 text-base sm:text-lg text-[#555148] font-sans leading-relaxed">
                  {cond.description}
                </div>
              </div>
            ))}
          </div>

          {/* HUTS Dual CTA: Pill Button + Companion Arrow Button */}
          <div className="pt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-sm font-sans text-[#78746C] max-w-md">
              Need a customized pro-forma for your exact parcel or county? Run our interactive estimator to calculate development budgets, modular timelines, and return metrics.
            </p>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => openConfigurator()}
                className="px-8 py-3.5 rounded-full bg-[#183D24] hover:bg-[#122A1A] text-white text-sm font-sans font-medium transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                Model Your Pro-Forma
              </button>
              <button
                onClick={() => openConfigurator()}
                className="w-12 h-12 rounded-full bg-[#183D24] hover:bg-[#122A1A] text-white flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95 group"
                title="Model Your Pro-Forma"
              >
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
