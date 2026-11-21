import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export interface ProjectFeatureItemData {
  title: string;
  slug: string;
  image: string;
  interiorImage?: string;
  tags: string[];
}

export interface ProjectFeatureSectionProps {
  heading: string;
  includeInterior?: boolean;
  projects: ProjectFeatureItemData[];
}

interface ProjectCurtainItemProps {
  project: ProjectFeatureItemData;
  index: number;
  total: number;
  includeInterior?: boolean;
}

const ProjectCurtainItem: React.FC<ProjectCurtainItemProps> = ({
  project,
  index,
  total,
  includeInterior = false,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  // Parallax độc lập cho từng ảnh dự án
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  // Tính toán class vị trí rèm dính trên Desktop (lg:)
  const isFirst = index === 0;
  const isLast = index === total - 1;

  let desktopCurtainClass = '';
  if (total === 1) {
    desktopCurtainClass = 'lg:top-0 lg:h-[200vh]';
  } else if (isFirst) {
    desktopCurtainClass = 'lg:top-0 lg:h-[200vh]';
  } else if (isLast) {
    desktopCurtainClass = 'lg:-top-[100vh] lg:h-[200vh]';
  } else {
    desktopCurtainClass = 'lg:-top-[100vh] lg:h-[300vh]';
  }

  return (
    <div
      ref={itemRef}
      className="relative block w-full h-[85vh] lg:h-[100vh] [overflow:clip] bg-[#1E1414] select-none"
    >
      {/* Ảnh nền Parallax tràn 120% chiều cao */}
      <motion.img
        src={`${project.image}?w=1600&q=85&auto=format`}
        alt={project.title}
        style={{ y }}
        className="absolute -top-[10%] left-0 w-full h-[120%] object-cover will-change-transform pointer-events-none select-none"
        decoding="async"
        loading="lazy"
      />

      {/* Lớp phủ tối tăng tương phản cho chữ */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/50 via-black/25 to-black/15" />

      {/* Khung nội dung Rèm dính (Curtain wipe wrapper) */}
      <div
        className={`absolute left-0 right-0 z-[2] inset-0 h-full lg:inset-auto lg:left-0 lg:right-0 pointer-events-none ${desktopCurtainClass}`}
      >
        {/* Khối chữ dính bên trong */}
        <div className="h-full lg:h-[100vh] lg:sticky lg:top-0 flex flex-col lg:flex-row justify-end lg:justify-between items-start lg:items-center gap-6 px-6 py-12 lg:px-[clamp(3rem,6vw,7rem)] box-border">
          {/* Bên trái: Tiêu đề h2 + Tags */}
          <div className="info-wrapper max-w-[560px] flex flex-col gap-5 pointer-events-auto">
            <h2 className="font-serif font-normal text-[#FFFDF6] text-[clamp(2.375rem,3.2vw+1.6rem,4.5rem)] leading-[1.02] tracking-[-0.025em] [text-wrap:balance]">
              {project.title}
            </h2>

            <div className="tag-wrapper flex flex-wrap gap-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-3.5 py-1.5 rounded-full text-[12px] leading-[1.4] text-[#FFFDF6] bg-[#1E1414]/45 backdrop-blur-md border border-[#534E4A] font-sans"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bên phải: Khung ảnh nội thất nổi 16/9 (nếu có và được bật) */}
          {includeInterior && project.interiorImage && (
            <div className="w-full lg:w-[42vw] max-w-[560px] aspect-video rounded-[16px] overflow-hidden shadow-2xl shrink-0 pointer-events-auto">
              <img
                src={`${project.interiorImage}?w=1200&q=85&auto=format`}
                alt={`${project.title} interior`}
                className="w-full h-full object-cover"
                decoding="async"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ProjectFeatureSection: React.FC<ProjectFeatureSectionProps> = ({
  heading,
  includeInterior = false,
  projects,
}) => {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="relative z-0 pt-14 md:pt-20 pb-14 md:pb-[5.25rem] bg-[#FAF7ED]">
      {/* Tiêu đề section */}
      <h3 className="max-w-[820px] mx-auto px-6 text-center font-serif font-normal text-[#0C310A] text-[clamp(1.75rem,2.63vw+1.13rem,3.5rem)] leading-[1.1] tracking-[-0.03em] mb-10 md:mb-14">
        {heading}
      </h3>

      {/* Danh sách các dự án rèm trượt tràn viền */}
      <div className="w-full flex flex-col">
        {projects.map((project, index) => (
          <ProjectCurtainItem
            key={project.slug || `${project.title}-${index}`}
            project={project}
            index={index}
            total={projects.length}
            includeInterior={includeInterior}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectFeatureSection;
