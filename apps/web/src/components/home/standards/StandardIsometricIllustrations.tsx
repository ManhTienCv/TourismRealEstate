import React from 'react';

interface SvgProps {
  className?: string;
}

export const StandardIsometricIllustrations: Record<string, React.FC<SvgProps>> = {
  'small-bar': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Ground deck */}
      <polygon points="95,145 165,105 145,93 75,133" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* House Base / Front Gable */}
      <polygon points="110,135 150,112 150,82 130,55 110,70" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Side Wall (Long bar) */}
      <polygon points="150,112 85,74 85,44 150,82" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Roof Pitch Left */}
      <polygon points="130,55 65,17 85,44 150,82" fill="#D2EF72" fillOpacity="0.35" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Roof Pitch Right */}
      <polygon points="130,55 65,17 45,44 110,70" fill="#D2EF72" fillOpacity="0.2" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Chimney */}
      <polygon points="85,25 92,21 92,10 85,14" fill="#2D4C23" />
      {/* Windows on side wall */}
      <polygon points="135,95 145,89 145,74 135,80" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      <polygon points="115,83 125,77 125,62 115,68" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      <polygon points="95,71 105,65 105,50 95,56" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      {/* Front Door & Glass */}
      <polygon points="120,123 132,116 132,92 120,99" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      <line x1="120" y1="107" x2="132" y2="100" stroke="#4A772F" strokeWidth="0.8" />
    </svg>
  ),

  'medium-bar': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 250 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Extended Deck */}
      <polygon points="85,152 185,94 155,76 55,134" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* Main Front Gable */}
      <polygon points="120,140 160,117 160,82 140,55 120,70" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Long Side Wall */}
      <polygon points="160,117 70,65 70,30 160,82" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Roof Pitch Facing */}
      <polygon points="140,55 50,3 70,30 160,82" fill="#D2EF72" fillOpacity="0.35" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Roof Pitch Back */}
      <polygon points="140,55 50,3 30,30 120,70" fill="#D2EF72" fillOpacity="0.2" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Sliding Glass Wall Center */}
      <polygon points="100,75 130,58 130,42 100,59" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.3" />
      <line x1="115" y1="66" x2="115" y2="50" stroke="#4A772F" strokeWidth="1" />
      {/* Bedroom Window Pairs */}
      <polygon points="140,98 152,91 152,77 140,84" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      <polygon points="78,62 90,55 90,41 78,48" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      {/* Front Entrance */}
      <polygon points="130,128 144,120 144,95 130,103" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
    </svg>
  ),

  'big-bar': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 260 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Broad Deck */}
      <polygon points="80,165 200,95 170,78 50,148" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* Main Gable End (Grand Vault) */}
      <polygon points="125,148 175,119 175,75 150,42 125,60" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Cathedral Glazing End Wall */}
      <polygon points="135,135 165,117 165,82 150,56 135,72" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.3" />
      <line x1="150" y1="56" x2="150" y2="126" stroke="#4A772F" strokeWidth="1" />
      <line x1="135" y1="98" x2="165" y2="98" stroke="#4A772F" strokeWidth="1" />
      {/* Side Wall */}
      <polygon points="175,119 65,55 65,11 175,75" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Roof */}
      <polygon points="150,42 40,-22 65,11 175,75" fill="#D2EF72" fillOpacity="0.38" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Side Windows Array */}
      <polygon points="145,95 160,86 160,68 145,77" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.1" />
      <polygon points="115,78 130,69 130,51 115,60" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.1" />
      <polygon points="85,60 100,51 100,33 85,42" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.1" />
    </svg>
  ),

  'dogtrot': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 260 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Continuous Terrace */}
      <polygon points="80,155 195,88 170,73 55,140" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* Pod 1 (Right Module) */}
      <polygon points="145,117 175,100 175,70 155,48 135,62 135,111" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="175,100 145,82 145,52 175,70" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.4" strokeLinejoin="round" />
      {/* Pod 2 (Left Module) */}
      <polygon points="105,94 75,76 75,46 95,24 115,38 115,88" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Central Breezeway Plank Deck (The Open-Air Dogtrot) */}
      <polygon points="135,111 115,88 115,70 135,93" fill="#FAF8F1" stroke="#2D4C23" strokeDasharray="3,3" strokeWidth="1.2" />
      {/* Overhead Continuous Roof Canopy connecting both modules */}
      <polygon points="155,48 95,24 115,38 175,62" fill="#D2EF72" fillOpacity="0.4" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Central Breezeway Open Cutout Frame */}
      <line x1="115" y1="38" x2="135" y2="62" stroke="#2D4C23" strokeWidth="1.6" />
      {/* Pod 1 Window & Door */}
      <polygon points="150,105 160,99 160,82 150,88" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.1" />
      {/* Pod 2 Window */}
      <polygon points="85,78 95,72 95,55 85,61" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.1" />
    </svg>
  ),

  'small-l': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 250 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* L-Shaped Inner Courtyard Patio */}
      <polygon points="100,145 160,110 120,87 60,122" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* Front Wing */}
      <polygon points="100,135 140,112 140,82 120,58 100,72" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Side Wing forming L-Bend */}
      <polygon points="140,112 80,77 80,47 140,82" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="80,77 40,100 40,70 80,47" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Interlocking Roof Planes */}
      <polygon points="120,58 60,23 80,47 140,82" fill="#D2EF72" fillOpacity="0.35" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="60,23 20,46 40,70 80,47" fill="#D2EF72" fillOpacity="0.2" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Glass Doors onto Courtyard */}
      <polygon points="95,85 125,68 125,50 95,67" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      <line x1="110" y1="76" x2="110" y2="58" stroke="#4A772F" strokeWidth="1" />
    </svg>
  ),

  'big-l': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 260 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Broad Wrap Deck */}
      <polygon points="90,165 190,107 140,78 40,136" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* Tall Primary 2-Story Wing */}
      <polygon points="110,145 160,116 160,68 135,38 110,54" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Secondary Lateral Wing */}
      <polygon points="160,116 80,70 80,28 160,68" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="80,70 30,99 30,57 80,28" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Roofs */}
      <polygon points="135,38 55,-8 80,28 160,68" fill="#D2EF72" fillOpacity="0.4" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      <polygon points="55,-8 5,21 30,57 80,28" fill="#D2EF72" fillOpacity="0.22" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Double Row Glass Apertures */}
      <polygon points="120,105 145,91 145,75 120,89" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      <polygon points="120,135 145,121 145,105 120,119" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
      <polygon points="45,86 65,74 65,58 45,70" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.2" />
    </svg>
  ),

  'village': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 260 190" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Connecting Boardwalk */}
      <polygon points="60,150 190,75 160,58 30,133" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* Cabin 1 (Center Main) */}
      <polygon points="130,128 160,111 160,85 145,63 130,75" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.5" />
      <polygon points="160,111 100,76 100,50 160,85" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.5" />
      <polygon points="145,63 85,28 100,50 160,85" fill="#D2EF72" fillOpacity="0.35" stroke="#2D4C23" strokeWidth="1.5" />
      {/* Cabin 2 (Guest Pod Front Left) */}
      <polygon points="80,148 105,134 105,112 92,94 80,104" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.4" />
      <polygon points="105,134 60,108 60,86 105,112" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.4" />
      <polygon points="92,94 47,68 60,86 105,112" fill="#D2EF72" fillOpacity="0.3" stroke="#2D4C23" strokeWidth="1.4" />
      {/* Cabin 3 (Studio Back Right) */}
      <polygon points="170,88 190,76 190,56 180,41 170,50" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.4" />
      <polygon points="190,76 150,53 150,33 190,56" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.4" />
      <polygon points="180,41 140,18 150,33 190,56" fill="#D2EF72" fillOpacity="0.25" stroke="#2D4C23" strokeWidth="1.4" />
    </svg>
  ),

  'adu': ({ className = 'w-full h-full' }) => (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Minimal Foundation Deck */}
      <polygon points="85,150 170,101 145,86 60,135" fill="#EFECE1" stroke="#DFDCD0" strokeWidth="1" />
      {/* Front Glazed Facade */}
      <polygon points="105,138 155,109 155,58 105,82" fill="#FAF8F1" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Floor to Ceiling Glass Corner */}
      <polygon points="115,128 145,111 145,72 115,88" fill="#FFFFFF" stroke="#4A772F" strokeWidth="1.3" />
      <line x1="130" y1="120" x2="130" y2="80" stroke="#4A772F" strokeWidth="1" />
      <line x1="115" y1="108" x2="145" y2="91" stroke="#4A772F" strokeWidth="0.8" />
      {/* Side Wall */}
      <polygon points="155,109 95,74 95,30 155,58" fill="#EAE6DA" stroke="#2D4C23" strokeWidth="1.6" strokeLinejoin="round" />
      {/* Mono-pitch Shed Slant Roof (Iconic ADU Modernist Silhouette) */}
      <polygon points="105,82 45,47 95,30 155,58" fill="#D2EF72" fillOpacity="0.38" stroke="#2D4C23" strokeWidth="1.7" strokeLinejoin="round" />
      {/* Overhanging Eaves Line */}
      <line x1="102" y1="83" x2="158" y2="57" stroke="#2D4C23" strokeWidth="1.8" />
      {/* Entrance Step */}
      <polygon points="100,144 115,135 115,132 100,141" fill="#2D4C23" />
    </svg>
  ),
};
