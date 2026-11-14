import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Camera,
  Compass,
  Plus,
  CheckCircle2,
} from 'lucide-react';

interface SurveyHotspot {
  id: string;
  label: string;
  zone: string;
  top: string; // percentage string
  left: string;
  elevation: string;
  slope: string;
  aspect: string;
  note: string;
  photoUrl: string;
}

const SURVEY_HOTSPOTS: SurveyHotspot[] = [
  {
    id: 'north-meadow',
    label: 'North Meadow Clearing',
    zone: 'Home Site',
    top: '22%',
    left: '32%',
    elevation: '1,420 ft',
    slope: '3.2% gentle grade',
    aspect: 'Full Southern Exposure',
    note: 'Optimal build envelope for Standard Small L or Medium Bar. Minimal tree clearing required, excellent winter passive solar gain.',
    photoUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'ridge-outcrop',
    label: 'Ridge Rock Outcrop',
    zone: 'Home Site',
    top: '16%',
    left: '42%',
    elevation: '1,485 ft',
    slope: 'Exposed granite shelf',
    aspect: 'Western Sunset Vistas',
    note: 'Sturdy bedrock suitable for pin-pier foundation engineering. Natural perch for detached cedar sauna or cantilevered lookout deck.',
    photoUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'valley-view',
    label: 'Valley View Ledge',
    zone: 'Home Site',
    top: '30%',
    left: '44%',
    elevation: '1,390 ft',
    slope: '8.5% moderate slope',
    aspect: 'Eastern Sunrise Sightline',
    note: 'Unobstructed 180° views across state forest preserve. Mature birch and pine grove provides natural microclimate wind buffering.',
    photoUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'access-road',
    label: 'Driveway & Utility Tie-in',
    zone: 'Utilities & Road',
    top: '51%',
    left: '37%',
    elevation: '1,350 ft',
    slope: 'Flat road apron',
    aspect: 'Roadway Frontage',
    note: 'Town road apron with existing culvert. Overhead electric grid pole located within 75 ft; gravel driveway trench path pre-routed.',
    photoUrl: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'creek-buffer',
    label: 'Creek Buffer & Soil Perc Site',
    zone: 'Conservation Buffer',
    top: '78%',
    left: '56%',
    elevation: '1,290 ft',
    slope: 'Valley drainage trough',
    aspect: 'Protected Wetland Basin',
    note: 'Passed deep-hole perc test (14 min/inch) for 4-bedroom septic mound. Well beyond required 100 ft municipal conservation wetland setback.',
    photoUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80',
  },
];

interface StepItem {
  number: string;
  title: string;
  description: string;
  highlights: string[];
}

const STEP_ITEMS: StepItem[] = [
  {
    number: '01',
    title: 'Understand the build site',
    description:
      'Get started with HUTS Land to identify the perfect parcel for you. Some people take a long time to find the right spot, but we can point you in the right direction.',
    highlights: [
      'Comprehensive zoning analysis and legal municipal setback confirmation',
      'Topographical contour survey & natural drainage corridor mapping',
      'Soil percolation testing, deep-hole exploratory logs & septic feasibility',
      'Solar orientation, prevailing wind patterns & seasonal tree canopy studies',
    ],
  },
  {
    number: '02',
    title: 'Determine budget & program',
    description:
      'Align your functional requirements and total investment targets. We establish clear square-footage and finish-tier guardrails before drafting starts.',
    highlights: [
      'Dynamic Pro-Forma model balancing Hard, Site, Soft, and Contingency costs',
      'Program definition: sleeping quarters, bath counts, outdoor living and flex space',
      'Lender-ready development packages to secure competitive construction financing',
    ],
  },
  {
    number: '03',
    title: 'Select the Standard',
    description:
      'Choose from our 8 proven architectural archetypes—from compact ADUs to expansive Dogtrots—engineered for rural terrain and rapid modular assembly.',
    highlights: [
      '16-foot modular dimensional grid eliminating construction offcut waste',
      'Dual-view evaluation comparing exterior photography with 3D axonometrics',
      'Standardized trade assemblies executable by any reputable local contractor',
    ],
  },
  {
    number: '04',
    title: 'Modify for your site & lifestyle',
    description:
      'Tailor the modular grid to your topography, solar orientation, and personal living needs. Adjust roof pitches, add breezeways, or expand decking.',
    highlights: [
      'Flexible window shifting and daylight optimization without structural change',
      'Topographical foundation adaptation: piers, stepped stem walls, or walkout basements',
      'Exterior envelope specifications: White Pine, Zinc, Eastern Cedar, or Shou Sugi Ban',
    ],
  },
  {
    number: '05',
    title: 'Secure building & municipal permits',
    description:
      'Complete municipal entitlements, zoning setback variances, board of health sign-offs, and fully stamped construction documentation ready for contractor bid.',
    highlights: [
      'Pre-engineered structural drawing sets bearing licensed Professional Engineer stamps',
      'Municipal planning board, environmental review, and conservation approvals',
      'Competitive general contractor bidding coordination and field progress tracking',
    ],
  },
];

export const StepByStepProcessSection: React.FC = () => {
  const [openStep, setOpenStep] = useState<string>('01');
  const [activeHotspot, setActiveHotspot] = useState<SurveyHotspot | null>(SURVEY_HOTSPOTS[0]);
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Home Site' | 'Utilities & Road' | 'Conservation Buffer'>('All');

  const filteredHotspots = SURVEY_HOTSPOTS.filter(
    (h) => selectedFilter === 'All' || h.zone === selectedFilter
  );

  return (
    <section id="step-by-step-section" className="w-full bg-[#FAF8F1] text-tie-ink py-20 sm:py-28">
      <div className="max-w-[1584px] mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Section Header */}
        <div className="mb-14 sm:mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs sm:text-sm font-sans font-medium text-[#4B6B38] tracking-wider uppercase">
              The Methodology
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C3B24] tracking-tight">
            The Step-by-Step
          </h2>
          <p className="mt-4 font-sans text-base sm:text-lg text-tie-muted max-w-2xl leading-relaxed">
            From raw rural acreage to a fully permitted, turnkey architectural home. Our repeatable 5-stage framework removes guesswork from rural development.
          </p>
        </div>

        {/* Two-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN: Interactive Satellite Parcel Map             */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Filter Bar & Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-sans pb-1">
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#EFECE6] border border-[#E2DDD5]">
                {(['All', 'Home Site', 'Utilities & Road', 'Conservation Buffer'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                      selectedFilter === filter
                        ? 'bg-[#1C3B24] text-white font-medium shadow-xs'
                        : 'text-tie-muted hover:text-[#1C1B18]'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 text-[11px] font-mono text-tie-muted bg-[#EFECE6]/70 px-3 py-1 rounded-full border border-[#E2DDD5]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#39FF14] inline-block shadow-xs" />
                <span>Parcel Boundary (14.2 Acres)</span>
              </div>
            </div>

            {/* Satellite Map Canvas Container */}
            <div className="relative rounded-3xl sm:rounded-[32px] overflow-hidden border border-[#DCD9CE] bg-[#1a2318] shadow-md aspect-[16/11] select-none">
              
              {/* Actual Satellite Map Imagery extracted from Banghi1.mp4 */}
              <img
                src="/standards/satellite_parcel_map.jpg"
                alt="Satellite view of rural development parcel with boundary and topographic survey"
                className="w-full h-full object-cover object-center filter saturate-110"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80';
                }}
              />

              {/* Glowing Neon Green Boundary Accent Overlay */}
              <div className="absolute inset-0 pointer-events-none border-2 border-[#39FF14]/30 rounded-3xl sm:rounded-[32px]" />

              {/* Interactive Camera Hotspots */}
              {filteredHotspots.map((spot) => {
                const isSelected = activeHotspot?.id === spot.id;
                return (
                  <div
                    key={spot.id}
                    style={{ top: spot.top, left: spot.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group"
                  >
                    {/* Pulsing Radar Ring */}
                    {isSelected && (
                      <span className="absolute inset-0 -m-2 rounded-full bg-red-500/30 animate-ping pointer-events-none" />
                    )}

                    {/* Camera Marker Button */}
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(spot)}
                      onMouseEnter={() => setActiveHotspot(spot)}
                      className={`relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-transform duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-[#E11D48] text-white ring-4 ring-[#E11D48]/30 scale-125 z-30 shadow-lg'
                          : 'bg-[#DC2626] text-white hover:scale-110 hover:bg-[#E11D48] shadow-md'
                      }`}
                      title={spot.label}
                    >
                      <Camera className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>

                    {/* Compact Label */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 top-full mt-1.5 px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-sans font-medium whitespace-nowrap shadow-sm pointer-events-none transition-all duration-200 ${
                        isSelected
                          ? 'bg-black/90 text-white opacity-100 z-30'
                          : 'bg-black/70 text-white/90 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {spot.label}
                    </span>
                  </div>
                );
              })}

              {/* Bottom Info Bar Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between px-3.5 py-2 rounded-xl bg-black/60 backdrop-blur-md text-white text-[11px] sm:text-xs font-mono border border-white/10 z-10">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#39FF14]" />
                  <span>North 04°12'E • GIS Survey Overlay</span>
                </div>
                <div className="text-white/80">
                  {SURVEY_HOTSPOTS.length} Verified Field Markers
                </div>
              </div>
            </div>

            {/* Active Hotspot Detail Card (Appears beneath map when a pin is selected) */}
            <AnimatePresence mode="wait">
              {activeHotspot && (
                <motion.div
                  key={activeHotspot.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl p-5 bg-[#EFECE6]/90 border border-[#DCD9CE] shadow-xs flex flex-col sm:flex-row gap-5 items-start"
                >
                  {/* Photo Preview */}
                  <div className="w-full sm:w-36 h-28 shrink-0 rounded-xl overflow-hidden bg-black/10 border border-[#DCD9CE]">
                    <img
                      src={activeHotspot.photoUrl}
                      alt={activeHotspot.label}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Information & Metrics */}
                  <div className="space-y-2 flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-serif text-lg sm:text-xl font-bold text-[#1C1B18] truncate">
                        {activeHotspot.label}
                      </h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1C3B24] text-white">
                        {activeHotspot.zone}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-tie-muted">
                      <span>Elevation: <strong>{activeHotspot.elevation}</strong></span>
                      <span>•</span>
                      <span>Grade: <strong>{activeHotspot.slope}</strong></span>
                      <span>•</span>
                      <span>Aspect: <strong>{activeHotspot.aspect}</strong></span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#3E3C36] leading-relaxed">
                      {activeHotspot.note}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN: 5-Step Interactive Accordion (Frame 500s)   */}
          {/* ========================================================= */}
          <div className="lg:col-span-6 space-y-2 pt-2">
            
            {STEP_ITEMS.map((item) => {
              const isOpen = openStep === item.number;
              return (
                <div
                  key={item.number}
                  className={`border-b transition-colors duration-200 ${
                    isOpen ? 'border-[#1C3B24]/40 bg-white/40 rounded-xl px-4 py-2' : 'border-[#E2DDD5] py-2'
                  }`}
                >
                  {/* Accordion Header Row */}
                  <button
                    type="button"
                    onClick={() => setOpenStep(isOpen ? '' : item.number)}
                    className="w-full py-4 flex items-center justify-between gap-4 text-left cursor-pointer group"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                      <span className="font-mono text-sm sm:text-base font-semibold text-[#4B6B38]">
                        {item.number}
                      </span>
                      <h3
                        className={`font-serif text-xl sm:text-2xl md:text-[27px] transition-colors leading-snug ${
                          isOpen ? 'text-[#1C3B24] font-bold' : 'text-[#1C1B18] group-hover:text-[#4B6B38]'
                        }`}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Plus to Cross Morphing Icon */}
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-[#1C3B24] text-white rotate-45'
                          : 'bg-[#EFECE6] text-[#1C1B18] group-hover:bg-[#E2DDD5]'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                    </span>
                  </button>

                  {/* Accordion Content Body */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="pl-8 sm:pl-12 pr-2 pb-6 space-y-4">
                          <p className="font-sans text-sm sm:text-base text-tie-muted leading-relaxed">
                            {item.description}
                          </p>

                          {/* Deliverables Checklist */}
                          <div className="space-y-2 pt-2">
                            {item.highlights.map((point, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-sans text-[#2C2A26]">
                                <CheckCircle2 className="w-4 h-4 text-[#567D42] shrink-0 mt-0.5" />
                                <span>{point}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
};
