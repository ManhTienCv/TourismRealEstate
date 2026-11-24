---
name: fe-huts-animation-architecture
description: Quy chuẩn thiết kế UI/UX, bảng màu, bố cục và hiệu ứng cuộn (Framer Motion / Sticky / Clip-path) theo phong cách HUTS cho dự án TIE. Luôn áp dụng khi chỉnh sửa bất kỳ file nào trong src/components/.
---

# QUY CHUẨN FRONTEND & ANIMATION (BẮT BUỘC TUÂN THỦ 100%)

## 1. Nguyên tắc Bảo toàn Code (Anti-Regression Rules)
- **Chỉ sửa đúng phạm vi (Surgical Edits):** Khi người dùng yêu cầu sửa 1 phần tử (ví dụ: mũi tên, kích thước ảnh, nút bấm), CHỈ được sửa đúng các dòng liên quan. TUYỆT ĐỐI KHÔNG tự ý viết lại cấu trúc cuộn, xóa props của `framer-motion` hoặc thay đổi bố cục các phần khác đang hoạt động tốt trong cùng file.
- **Không phá vỡ `position: sticky`:** Tuyệt đối KHÔNG BAO GIỜ thêm `overflow-hidden` hoặc `overflow-x-hidden` vào `App.tsx`, `<main>`, `<body>` hoặc thẻ `<section>` cha đang bọc phần tử `sticky`. Nếu cần chống tràn ngang ở cấp trang, bắt buộc dùng `overflow-x: clip`.

## 2. Bảng màu & Typography Cố định (Design Tokens)
- **Màu nền toàn trang & Nền thẻ (Đồng nhất):** `#FAF8F1` (Kem ấm). Không dùng nền trắng `#FFFFFF` hay xám lạnh gây lệch màu giữa các section.
- **Màu chữ chính:** `#182215` (Đen ánh xanh rêu sâu).
- **Màu chữ mô tả:** `#2C3527`.
- **Màu viền thẻ (Border):** `#DFDCD0` hoặc `#E2DFD3` (`1px solid`).
- **Màu điểm nhấn (CTA & Illustration Fill):** `#D2EF72` (Xanh cốm tươi).
- **Màu nét vẽ SVG & Mũi tên:** `#4A772F` hoặc `#2D4C23` (`strokeWidth="2"`).

## 3. Các Pattern Hiệu ứng Cốt lõi (Không được làm sai lệch)

### A. Sticky Horizontal Scroll (`UseCaseSelector`, `Standards`)
- Thẻ `<section ref={containerRef}>` ngoài cùng: `relative w-full h-[250vh] bg-[#FAF8F1]` (KHÔNG có `overflow-hidden`).
- Thẻ con trực tiếp: `sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center`.
- Hook cuộn: Bắt buộc dùng `useScroll({ target: containerRef, offset: ["start start", "end end"] })` kết hợp `useTransform(scrollYProgress, [0, 1], ["0%", "-52%"])`.
- Lật thẻ 3D (`UseCaseSelector`): Phải có khóa khi đang cuộn (`isScrolling`) và độ trễ `setTimeout` 220ms (Hover Intent) bằng state `isFlipped`. Không dùng `group-hover` CSS thuần gây tự lật khi cuộn.

### B. Clip-path Wipe Portfolio (`RealizedPortfolioSection`)
- Mỗi dự án: `<div className="relative w-full h-screen overflow-hidden [clip-path:inset(0)]">`.
- Khung nội dung bên trong (Chữ trái + Ảnh nhỏ phải): Bắt buộc dùng `fixed inset-0 pointer-events-none flex items-center justify-between w-[82vw] max-w-[1260px] mx-auto`.
- CẤM thêm hiệu ứng `hover:scale` hoặc `hover:-translate-y` lên khung ảnh nhỏ bên phải để tránh lỗi giật lệch 2 nửa ảnh khi di chuột qua đường cắt.

### C. Custom Cursor Follower & Carousel (`Testimonials` - "But, don't take it from us...")
- Vùng Carousel phải tràn toàn màn hình (`w-full overflow-hidden`), không bọc trong `max-w-7xl`.
- Nút tròn bám theo chuột: Bắt buộc dùng `useMotionValue` (hoặc `useSpring` với `stiffness: 1500, damping: 50`), TUYỆT ĐỐI KHÔNG dùng `useState` trong `onMouseMove` và KHÔNG gắn class CSS `transition-all` / `duration-...` lên `motion.div` của nút tròn.
- Chuyển slide phải có biến khóa `isAnimating` (`useRef`) chống spam click và dùng `transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}`.

### D. Draggable Photo Stack ("We do it across the country")
- Chỉ thẻ trên cùng (`index === 0`) có `drag={true}` và `dragSnapToOrigin={true}`.
- Bắt buộc dùng `key={card.id}` cố định (cấm dùng `key={index}`) và luôn ép `animate={{ x: 0, y: 0, rotate: ..., scale: ... }}` để thẻ tự hút về tâm xấp bài sau khi thả chuột.
