import React from 'react';
import { HousingSolution } from '@tie/shared';
import { AVAILABLE_ILLUSTRATIONS } from './CharacterIllustrations';

export interface ArchetypeCardProps {
  sol: HousingSolution;
  onLearnMore: (slug: string) => void;
  isScrolling?: boolean;
}

const HUTS_EDITORIAL_DATA: Record<string, { desc: string; buttonText: string }> = {
  'starter-home': {
    desc: 'First-time home buyer and don’t know where to start? We get it.',
    buttonText: 'Learn about the Starter Home',
  },
  'forever-home': {
    desc: 'You’ve traded up and are ready to create your memory palace. It’s one part home, one part work space, one part hotel for the in-law.',
    buttonText: 'Learn about the Forever Home',
  },
  'second-home': {
    desc: 'You’ve worked hard, and now you want a place that works for you—a second home that feels like a first priority.',
    buttonText: 'Learn about the Second Home',
  },
  'hybrid-home': {
    desc: 'We get it. You rent in your city, but want to own a place. All the existing homes you’ve looked at kind of suck, or look like a big, expensive project to renovate.',
    buttonText: 'Learn about the Hybrid Home',
  },
  'adu': {
    desc: 'An ADU can be a guest house, a rental, a home office, or a soft landing spot for family—but the real magic is how much flexibility it adds to your property and your life.',
    buttonText: 'Learn about the ADU',
  },
  'investment-property': {
    desc: 'This isn’t just a house—it’s a strategy. Design and develop properties with ROI in mind from day one.',
    buttonText: 'Learn about the Investment Property',
  },
  'micro-hospitality': {
    desc: 'Great stays start with great sites—and even better planning. We know how to find the right land, design unforgettable spaces, and navigate the messy middle between vision and viability.',
    buttonText: 'Learn about the Micro Hospitality',
  },
  'multi-gen-compound': {
    desc: 'This isn’t about one house. It’s about designing land, relationships, and legacy. A place that can stretch, flex, and last.',
    buttonText: 'Learn about the Multi-Generational Compound',
  },
};

export const Archetype3DCard: React.FC<ArchetypeCardProps> = ({ sol, onLearnMore }) => {
  const illustrationSrc = AVAILABLE_ILLUSTRATIONS[sol.slug] || '/illustrations/starter-home.svg';
  const editorial = HUTS_EDITORIAL_DATA[sol.slug] || {
    desc: sol.description,
    buttonText: `Learn about the ${sol.title}`,
  };

  return (
    <div className="card-wrapper select-none">
      <div
        className="card illustration"
        onClick={() => onLearnMore(sol.slug)}
      >
        <div className="card-inner">
          {/* MẶT TRƯỚC: Hình SVG lớn + Tiêu đề h5 */}
          <div className="card-front">
            <div className="illustration-wrapper">
              <figure className="w-full h-full flex items-center justify-center">
                <img
                  src={illustrationSrc}
                  alt={sol.title}
                  className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] object-contain select-none pointer-events-none"
                  draggable={false}
                />
              </figure>
            </div>
            <div className="text-wrapper">
              <h5>{sol.title}</h5>
            </div>
          </div>

          {/* MẶT SAU: Hình SVG nhỏ 40% + Đoạn mô tả + Nút button-text */}
          <div className="card-back">
            <figure className="w-full h-[40%] flex items-center justify-center">
              <img
                src={illustrationSrc}
                alt={sol.title}
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
              />
            </figure>

            <div className="text-wrapper px-2">
              <h5>{sol.title}</h5>
              <p>{editorial.desc}</p>
            </div>

            <div className="button button-text">
              <div className="text-wrapper">
                <span>{editorial.buttonText}</span>
              </div>
              <div className="btn-icon">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="btn-icon-svg btn-arrow"
                >
                  <path
                    className="stroke"
                    d="M0.5 6.00195L10.74 6.00195"
                    stroke="#0C310A"
                    strokeWidth="1.5"
                  />
                  <path
                    className="stroke"
                    d="M7.05566 11.3327C7.05566 8.28506 9.12974 5.99935 11.5001 5.99935C10.0186 5.64379 7.05566 4.07935 7.05566 0.666016"
                    stroke="#0C310A"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archetype3DCard;
