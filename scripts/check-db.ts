import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔄 Đang kết nối tới PostgreSQL để kiểm tra dữ liệu...\n');

  const [solutions, plans, pivots, portfolio, fieldReports, estimates] = await Promise.all([
    prisma.housingSolution.count(),
    prisma.standardPlan.count(),
    prisma.solutionStandardPlan.count(),
    prisma.portfolioProject.count(),
    prisma.fieldReport.count(),
    prisma.projectEstimate.count(),
  ]);

  console.log('====================================================');
  console.log('       KẾT QUẢ KIỂM TRA DỮ LIỆU POSTGRESQL');
  console.log('====================================================');
  console.log(`✓ housing_solutions (Mục tiêu nhà ở):         ${solutions} bản ghi`);
  console.log(`✓ standard_plans (Mẫu nhà tiêu chuẩn):          ${plans} bản ghi`);
  console.log(`✓ solution_standard_plans (Liên kết quan hệ):   ${pivots} bản ghi`);
  console.log(`✓ portfolio_projects (Dự án thực tế):          ${portfolio} bản ghi`);
  console.log(`✓ field_reports (Báo cáo tiến độ 6 giai đoạn): ${fieldReports} bản ghi`);
  console.log(`✓ project_estimates (Cấu hình & Báo giá):      ${estimates} bản ghi`);
  console.log('====================================================\n');

  console.log('📋 Danh sách 8 Mẫu nhà Standard Plans:');
  const planList = await prisma.standardPlan.findMany({
    select: {
      name: true,
      slug: true,
      bedrooms: true,
      bathrooms: true,
      sqftArea: true,
      baseCostPerSqft: true,
    },
    orderBy: { sqftArea: 'asc' },
  });
  console.table(planList);

  console.log('\n📋 Danh sách 8 Housing Solutions:');
  const solList = await prisma.housingSolution.findMany({
    select: {
      name: true,
      slug: true,
      tagline: true,
    },
  });
  console.table(solList);

  console.log('\n📋 Danh sách Dự án thực tế (Portfolio Projects):');
  const projList = await prisma.portfolioProject.findMany({
    select: {
      title: true,
      slug: true,
      location: true,
      clientName: true,
      actualSqft: true,
    },
  });
  console.table(projList);

  console.log('\n📋 Chi tiết Field Report:');
  const reports = await prisma.fieldReport.findMany({
    select: {
      projectCode: true,
      clientEmail: true,
      currentStage: true,
      estimatedBudget: true,
      actualSpent: true,
      variancePercentage: true,
    },
  });
  console.table(reports);
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi kiểm tra dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
