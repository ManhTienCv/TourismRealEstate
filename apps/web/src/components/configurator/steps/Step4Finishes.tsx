import React from 'react';
import { Check } from 'lucide-react';

interface Step4FinishesProps {
  finishTier: 'essential' | 'signature' | 'bespoke';
  cladding: 'pine' | 'zinc' | 'cedar' | 'shou_sugi_ban';
  wizardAddons: {
    wraparoundDeck: boolean;
    solarBatteryPack: boolean;
    radiantHeating: boolean;
    detachedSauna: boolean;
    screenedPorch: boolean;
    evCarport: boolean;
  };
  onSetFinishTier: (tier: 'essential' | 'signature' | 'bespoke') => void;
  onSetCladding: (cladding: 'pine' | 'zinc' | 'cedar' | 'shou_sugi_ban') => void;
  onToggleAddon: (key: 'wraparoundDeck' | 'solarBatteryPack' | 'radiantHeating' | 'detachedSauna' | 'screenedPorch' | 'evCarport') => void;
}

export const Step4Finishes: React.FC<Step4FinishesProps> = ({
  finishTier,
  cladding,
  wizardAddons,
  onSetFinishTier,
  onSetCladding,
  onToggleAddon,
}) => {
  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-mono uppercase tracking-widest text-tie-pine">
          STEP 04 &bull; CRAFT &amp; SPECIFICATIONS
        </span>
        <h4 className="font-serif text-2xl sm:text-3xl font-bold text-tie-ink mt-1">
          Customize Finishes &amp; Add-ons.
        </h4>
        <p className="text-sm text-tie-muted font-sans mt-1">
          Tailor the tactile experience, exterior rainscreen envelope, and optional lifestyle modules.
        </p>
      </div>

      {/* Subsection: Finish Tier */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
          Interior Architectural Finish Tier:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              id: 'essential' as const,
              name: 'Essential Nordic',
              rate: 'Included ($0/sqft)',
              materials: 'Baltic Birch plywood cabinetry, polished architectural concrete floors, minimalist matte black hardware.',
            },
            {
              id: 'signature' as const,
              name: 'Signature Crafted',
              rate: '+$35 / SQFT',
              materials: 'Engineered European White Oak plank flooring, honed charcoal soapstone counters, hydronic towel warmers.',
            },
            {
              id: 'bespoke' as const,
              name: 'Bespoke Atelier',
              rate: '+$68 / SQFT',
              materials: 'Hand-troweled microcement wet rooms, vein-cut Roman travertine slabs, solid walnut millwork throughout.',
            },
          ].map((item) => {
            const isSelected = finishTier === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSetFinishTier(item.id)}
                className={`p-5 rounded-sm border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine'
                    : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-tie-terracotta">
                      {item.rate}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-tie-pine stroke-[3]" />}
                  </div>
                  <h5 className="font-serif text-lg font-bold text-tie-ink">
                    {item.name}
                  </h5>
                  <p className="text-xs text-tie-muted font-sans leading-relaxed">
                    {item.materials}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subsection: Exterior Cladding */}
      <div className="space-y-3 pt-4 border-t border-tie-border/70">
        <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
          Exterior Rainscreen Cladding:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { id: 'pine' as const, label: 'Thermally Modified Pine', note: 'Natural weathering, low maintenance' },
            { id: 'zinc' as const, label: 'Standing Seam Zinc', note: '100-year non-combustible lifetime' },
            { id: 'cedar' as const, label: 'Western Red Cedar', note: 'Clear vertical grain architectural grade' },
            { id: 'shou_sugi_ban' as const, label: 'Shou Sugi Ban Yakisugi', note: 'Fire-resistant charred timber' },
          ].map((item) => {
            const isSelected = cladding === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSetCladding(item.id)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine font-medium'
                    : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-tie-ink">{item.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-tie-pine stroke-[3]" />}
                </div>
                <span className="text-[11px] text-tie-muted block font-sans">{item.note}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subsection: Add-ons Grid */}
      <div className="space-y-3 pt-4 border-t border-tie-border/70">
        <label className="text-xs font-mono uppercase text-tie-muted tracking-wider block">
          Lifestyle &amp; Performance Add-on Modules:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { key: 'wraparoundDeck' as const, title: 'Wrap-around Ipe Deck', cost: 26000, desc: '600 sqft architectural hardwood deck with cable railing' },
            { key: 'solarBatteryPack' as const, title: 'Solar & 20kWh Battery', cost: 38000, desc: '11.2kW bifacial solar array + dual Tesla Powerwalls for off-grid' },
            { key: 'radiantHeating' as const, title: 'Hydronic Radiant Heat', cost: 12500, desc: 'In-slab continuous zone heating with smart thermostat integration' },
            { key: 'detachedSauna' as const, title: 'Detached Cedar Sauna', cost: 24500, desc: '8x10 ft Western Red Cedar module with Finnish electric heater' },
            { key: 'screenedPorch' as const, title: 'Screened Bug Porch', cost: 18500, desc: 'Integrated three-season bug-proof outdoor dining pavilion' },
            { key: 'evCarport' as const, title: 'Covered EV Carport', cost: 15000, desc: 'Heavy timber open carport with integrated Level 2 EV charging' },
          ].map((item) => {
            const isChecked = wizardAddons[item.key];
            return (
              <div
                key={item.key}
                onClick={() => onToggleAddon(item.key)}
                className={`p-3.5 rounded-sm border cursor-pointer transition-all flex items-start space-x-3 ${
                  isChecked
                    ? 'bg-tie-pine/5 border-tie-pine ring-1 ring-tie-pine'
                    : 'bg-tie-surface hover:bg-tie-surface-light border-tie-border'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => {}}
                  className="mt-1 h-4 w-4 rounded border-tie-border text-tie-pine focus:ring-tie-pine cursor-pointer"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-tie-ink">
                      {item.title}
                    </span>
                    <span className="font-mono text-xs font-semibold text-tie-pine">
                      +${item.cost.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-[11px] text-tie-muted font-sans mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
