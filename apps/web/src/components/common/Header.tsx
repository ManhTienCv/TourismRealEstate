import React from 'react';
import { useConfiguratorStore } from '../../store/useConfiguratorStore';
import { Compass, Hammer, Layers, Sparkles, Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, openConfigurator } = useConfiguratorStore();

  const handleNavClick = (tab: 'home' | 'standards' | 'portfolio' | 'field-report', elementId?: string) => {
    setActiveTab(tab);
    if (elementId) {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-tie-bg/95 backdrop-blur-md border-b border-tie-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Editorial Wordmark */}
        <div
          onClick={() => handleNavClick('home')}
          className="cursor-pointer flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 rounded-sm bg-tie-pine flex items-center justify-center text-tie-bg font-serif text-xl font-bold tracking-wider shadow-sm group-hover:bg-tie-pine-hover transition-colors">
            T
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-serif text-2xl font-bold tracking-tight text-tie-ink group-hover:text-tie-pine transition-colors">
                TIE
              </span>
              <span className="text-xs px-2 py-0.5 rounded font-mono font-medium bg-tie-surface text-tie-muted border border-tie-border">
                PROPTECH
              </span>
            </div>
            <p className="text-[11px] uppercase tracking-widest text-tie-muted font-sans hidden sm:block">
              Productized Architecture
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
          <button
            onClick={() => handleNavClick('home', 'solutions-section')}
            className="px-3 py-2 rounded text-tie-muted hover:text-tie-ink hover:bg-tie-surface transition-all flex items-center space-x-1.5"
          >
            <Compass className="w-4 h-4 text-tie-pine" />
            <span>Solutions</span>
          </button>

          <button
            onClick={() => handleNavClick('standards', 'standards-section')}
            className={`px-3 py-2 rounded transition-all flex items-center space-x-1.5 ${
              activeTab === 'standards'
                ? 'text-tie-pine font-semibold bg-tie-surface border border-tie-border'
                : 'text-tie-muted hover:text-tie-ink hover:bg-tie-surface'
            }`}
          >
            <Layers className="w-4 h-4 text-tie-pine" />
            <span>Standards (8)</span>
          </button>

          <button
            onClick={() => handleNavClick('portfolio', 'portfolio-section')}
            className={`px-3 py-2 rounded transition-all flex items-center space-x-1.5 ${
              activeTab === 'portfolio'
                ? 'text-tie-pine font-semibold bg-tie-surface border border-tie-border'
                : 'text-tie-muted hover:text-tie-ink hover:bg-tie-surface'
            }`}
          >
            <Building2 className="w-4 h-4 text-tie-pine" />
            <span>Realized Projects</span>
          </button>

          <button
            onClick={() => handleNavClick('field-report', 'field-report-section')}
            className={`px-3 py-2 rounded transition-all flex items-center space-x-1.5 ${
              activeTab === 'field-report'
                ? 'text-tie-terracotta font-semibold bg-tie-surface border border-tie-border'
                : 'text-tie-muted hover:text-tie-ink hover:bg-tie-surface'
            }`}
          >
            <Hammer className="w-4 h-4 text-tie-terracotta" />
            <span>Field Report</span>
            <span className="w-2 h-2 rounded-full bg-tie-terracotta animate-pulse ml-0.5" />
          </button>
        </nav>

        {/* CTA & Actions */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => openConfigurator()}
            className="group relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-sm text-tie-bg bg-tie-pine hover:bg-tie-pine-hover shadow-tie-soft transition-all duration-200 active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 mr-2 text-tie-terracotta-light group-hover:rotate-12 transition-transform" />
            <span>Configure Your Build</span>
          </button>
        </div>
      </div>
    </header>
  );
};
