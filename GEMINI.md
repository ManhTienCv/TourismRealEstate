---
name: tie-proptech-architecture
description: Quy chuẩn kiến trúc hệ thống PropTech kết hợp AI/GIS Engine và UI/UX HUTS Showroom cho dự án TIE (Khóa luận tốt nghiệp). Bắt buộc tuân thủ khi phát triển và bảo trì toàn bộ dự án.
---

# BỐI CẢNH DỰ ÁN & KIẾN TRÚC TỔNG THỂ (TIE PROPTECH PLATFORM)

## 1. Thông tin Đề tài Khóa luận Tốt nghiệp
- **Tên đề tài chính thức:** "Xây dựng nền tảng PropTech ứng dụng học máy, dữ liệu không gian để đánh giá thửa đất và đề xuất bất động sản nghỉ dưỡng"
- **Brand định vị trên giao diện:** **TIE** (Turnkey Country Property & Productized Architecture Platform).

## 2. Bản chất Hệ thống (Kiến trúc Song hành: HUTS Showroom + AI/GIS Engine)
Dự án là một nền tảng PropTech tích hợp 2 phân hệ gắn kết chặt chẽ:
- **Phần 1 — Frontend Digital Showroom & Configurator (`apps/web`):**
  - Giữ nguyên 100% ngôn ngữ thiết kế cao cấp của HUTS: hiệu ứng vật lý Framer Motion, sticky horizontal scroll, lật thẻ 3D, typography thanh lịch (`"HW Cigars"` / `"ABC Walter Neue"` hoặc font tương đương), bố cục và bảng màu chuẩn (`#0C310A`, `#FAF7ED`, `#664A42`, `#CBE282`).
  - Đóng vai trò là showroom trực tuyến trưng bày các mẫu nhà mô-đun tiền chế (`Standards`: Small Bar, Medium Bar, Big Bar, Dogtrot, Village...), danh mục phân loại nhu cầu (`UseCaseSelector`) và các dự án nghỉ dưỡng tiêu biểu (`RealizedPortfolioSection`).
- **Phần 2 — Spatial Data & Machine Learning Engine (Tích hợp vào luồng `Get Started` / `Configurator`):**
  - Hiện thực hóa 2 chỉ số cốt lõi trên trang chủ:
    1. *"5,000+ Rural land parcels evaluated"* — Đánh giá thửa đất vùng ven dựa trên dữ liệu không gian viễn thám & GIS.
    2. *"Average build costs are within 5% of our pre-design estimates"* — Mô hình học máy dự toán chi phí xây dựng chuẩn xác (sai số < 5%).
  - Khi người dùng tương tác với bản đồ chọn đất (GIS Map Picker) tại luồng Configurator, hệ thống trích xuất dữ liệu không gian địa lý (độ dốc DEM, chỉ số lớp phủ thực vật NDVI, mặt nước MNDWI, khoảng cách tới đường giao thông/tiện ích) và chạy mô hình Học máy (Random Forest / Regression / Classification) để:
    1. Chấm điểm độ khả thi của thửa đất (`Land Suitability Score`).
    2. Tự động đề xuất mẫu nhà mô-đun (`Standard`) tối ưu nhất cho địa hình và cảnh quan thửa đất đó.
    3. Tính toán bảng dự toán chi phí động (`Cost Pro-Forma & Financial Estimate`) sát với điều kiện thi công thực tế.

## 3. Lộ trình Triển khai Dự án (3 Giai đoạn)
- **Giai đoạn 1 (Hiện tại - Ưu tiên số 1):** Hoàn thiện dứt điểm 100% giao diện, bố cục, tỷ lệ hình khối và hiệu ứng cuộn mượt mà trên Trang chủ (`HomePage`) chuẩn xác theo mẫu gốc HUTS.
- **Giai đoạn 2:** Việt hóa toàn bộ nội dung/ngôn ngữ giao diện, chuyển đổi dữ liệu và bối cảnh sang thị trường bất động sản nghỉ dưỡng vùng ven Việt Nam (Ba Vì, Sóc Sơn, Lương Sơn - Hòa Bình, Đà Lạt, Bảo Lộc...).
- **Giai đoạn 3:** Xây dựng trọn vẹn luồng tương tác Configurator (Bản đồ GIS tương tác + Tích hợp API Học máy đánh giá đất & Đề xuất mẫu nhà) và Backend/PostGIS phục vụ chấm điểm và xuất báo cáo Pro-Forma.

---

# QUY CHUẨN FRONTEND & ANIMATION (BẮT BUỘC TUÂN THỦ 100%)

## 1. Nguyên tắc Bảo toàn Code (Anti-Regression Rules)
- **Chỉ sửa đúng phạm vi (Surgical Edits):** Khi người dùng yêu cầu sửa 1 phần tử (ví dụ: mũi tên, kích thước ảnh, nút bấm), CHỈ được sửa đúng các dòng liên quan. TUYỆT ĐỐI KHÔNG tự ý viết lại cấu trúc cuộn, xóa props của `framer-motion` hoặc thay đổi bố cục các phần khác đang hoạt động tốt trong cùng file.
- **Không phá vỡ `position: sticky`:** Tuyệt đối KHÔNG BAO GIỜ thêm `overflow-hidden` hoặc `overflow-x-hidden` vào `App.tsx`, `<main>`, `<body>` hoặc thẻ `<section>` cha đang bọc phần tử `sticky`. Nếu cần chống tràn ngang ở cấp trang, bắt buộc dùng `overflow-x: clip`.

## 2. Bảng màu & Typography Cố định (Design Tokens Chuẩn HUTS)
- **Màu nền toàn trang & Nền thẻ:** `#FAF8F1` (Kem ấm HUTS). Không dùng nền trắng tinh `#FFFFFF` hay xám lạnh gây lệch nhịp thị giác.
- **Màu tiêu đề chính trên nền kem (`h2`, `h3`, Card Title):** `#0C310A` (`rgb(12, 49, 10)` - Đen ánh rêu sâu).
- **Màu chữ tiêu đề trên nền ảnh tối (`Hero`, `Portfolio`):** `#FAF7ED` (`rgb(250, 247, 237)`).
- **Màu chữ mô tả & đoạn văn phụ:** `#664A42` (`rgb(102, 74, 66)`).
- **Màu viền thẻ (Border):** `#DFDCD0` hoặc `#E2DDD5` (`1px solid`).
- **Màu điểm nhấn Banner (PreFooter):** `#CBE282` (Xanh cốm dịu HUTS).
- **Màu điểm nhấn CTA (Navbar / Accent):** `#D2EF72`.
- **Màu nét vẽ SVG & Mũi tên chuyển tiếp:** `#4A772F` hoặc `#4B6B3B` (`strokeWidth="1.8" - "2"`).
- **Bo góc nút bấm:** `rounded-[104px]`.
- **Bo góc thẻ & ảnh trượt ngang:** `rounded-[17.5px]`.

## 3. Các Pattern Hiệu ứng Cốt lõi (Không được làm sai lệch)

### A. Sticky Horizontal Scroll (`UseCaseSelector`, `StandardsCatalogGrid`)
- Thẻ `<section ref={containerRef}>` ngoài cùng: `relative w-full h-[250vh] bg-[#FAF8F1]` (KHÔNG có `overflow-hidden`).
- Thẻ con trực tiếp: `sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center`.
- Hook cuộn: Bắt buộc dùng `useScroll({ target: containerRef, offset: ["start start", "end end"] })` kết hợp `useTransform(scrollYProgress, [0, 0.85, 1], ["0%", "-52%", "-52%"])` để có 15% buffer cuối hành trình.
- Lật thẻ 3D: Phải có khóa khi đang cuộn (`isScrolling`) và độ trễ `setTimeout` 200–220ms (Hover Intent) bằng state `isFlipped`. Không dùng `group-hover` CSS thuần gây tự lật khi cuộn.

### B. Mũi tên Chuyển tiếp (DoubleLoopArrow)
- Sử dụng SVG xoắn 2 vòng đồng nhất giữa các phân đoạn chuyển tiếp.
- Kích thước responsive: `w-[200px] sm:w-[240px] md:w-[270px] lg:w-[285px] h-auto`.
- Vị trí áp sát đáy dải thẻ bên trên: Sử dụng container trong suốt `pointer-events-none bg-transparent` với margin âm `-mt-20 sm:-mt-28 md:-mt-36` để xóa khoảng trống thừa, kéo mũi tên nằm sát mép đáy của dải thẻ.

### C. Clip-path Wipe Portfolio (`RealizedPortfolioSection`)
- Mỗi dự án: `<div className="relative w-full h-screen overflow-hidden [clip-path:inset(0)]">`.
- Khung nội dung bên trong: Bắt buộc dùng `fixed inset-0 pointer-events-none flex items-center justify-between w-[82vw] max-w-[1260px] mx-auto`.
- CẤM thêm hiệu ứng `hover:scale` hoặc `hover:-translate-y` lên khung ảnh nhỏ bên phải để tránh lỗi giật lệch 2 nửa ảnh khi di chuột qua đường cắt.

### D. Custom Cursor Follower & Carousel (`TrustMetricsSection` / Testimonials)
- Vùng Carousel phải tràn toàn màn hình (`w-full overflow-hidden`), không bọc trong `max-w-7xl`.
- Nút tròn bám theo chuột: Bắt buộc dùng `useMotionValue` (hoặc `useSpring` với `stiffness: 1500, damping: 50`), TUYỆT ĐỐI KHÔNG dùng `useState` trong `onMouseMove` và KHÔNG gắn class CSS `transition-all` / `duration-...` lên `motion.div` của nút tròn.
- Chuyển slide phải có biến khóa `isAnimating` (`useRef`) chống spam click.

### E. Draggable Photo Stack (`NarrativeJourneySection`)
- Chỉ thẻ trên cùng (`index === 0`) có `drag={true}` và `dragSnapToOrigin={true}`.
- Bắt buộc dùng `key={card.id}` cố định (cấm dùng `key={index}`) và luôn ép `animate={{ x: 0, y: 0, rotate: ..., scale: ... }}` để thẻ tự hút về tâm xấp bài sau khi thả chuột.
