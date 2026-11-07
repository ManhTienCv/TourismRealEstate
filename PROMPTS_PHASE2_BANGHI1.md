# 🎬 TIE PLATFORM — KẾ HOẠCH THỰC THI GIAI ĐOẠN 2 (DỰA TRÊN BANGHI1.MP4)

Tài liệu này ghi lại toàn bộ kết quả phân tích chuyên sâu từng khung hình từ video mới **`Banghi1.mp4`** (thời lượng **8 phút 29 giây / 509 giây**, độ phân giải 1808x992).

Dự án được chia thành **5 Prompt thực thi độc lập (từ Prompt 2.1 đến Prompt 2.5)** để bạn có thể yêu cầu chạy từng phần hoặc chạy tuần tự toàn bộ theo ý muốn.

---

## 📑 MỤC LỤC CÁC PROMPT THỰC THI GIAI ĐOẠN 2

1. **[Prompt 2.1]**: Trang chủ Vi-tương tác Nâng cao (Hero Flycam Video + Thẻ Dự án Kép Break House + Vector Nét tay 480s).
2. **[Prompt 2.2]**: Hệ thống Trang Con Giải pháp Nhà ở (*Starter Home* & *Forever Home* với minh họa phóng to).
3. **[Prompt 2.3]**: Khối Quy hoạch Xây dựng & Ma trận Điều kiện Tài chính (*Zoning, Foundation Drone, Financial Conditions 01-04*).
4. **[Prompt 2.4]**: Phân hệ Quy chuẩn Kiến trúc (*"What is a Standard?"* & *"The Step-by-Step"* Bản đồ Vệ tinh + Accordion).
5. **[Prompt 2.5]**: Phân hệ Hồ sơ Dự án Thực tế (*Arrowhead Ridge Case Study* với Badge Pills và Thư viện Ảnh).

---

## 🎯 CHI TIẾT TỪNG PROMPT

---

### 🟢 PROMPT 2.1: TRANG CHỦ VI-TƯƠNG TÁC NÂNG CAO (HERO FLYCAM + THẺ DỰ ÁN KÉP + VECTOR NÉT TAY)

```markdown
Role: Senior Frontend Motion Engineer (React + Tailwind CSS + Framer Motion)
Task: Tinh chỉnh các vi tương tác trên Trang chủ dựa trên giây 00:00 - 02:20 và 08:00 của Banghi1.mp4:

1. HERO SECTION CINEMATIC BACKGROUND:
- Nâng cấp HeroSection hỗ trợ hiển thị video flycam lướt qua tán rừng thông nhìn xuống ngôi nhà gỗ gabled đang thi công mờ sương (hoặc ảnh chất lượng cao 4K dạng aerial view có chuyển động zoom chậm Ken-Burns effect mượt mà).
- Nút bấm trung tâm: Giữ nguyên dáng Pill xanh rêu `#567D42` `[ Get Started (→) ]`.

2. THẺ DỰ ÁN KÉP TRÊN TRANG CHỦ (BREAK HOUSE - KHUNG HÌNH 120s):
- Tại RealizedPortfolioSection:
  - Hiển thị công trình tiêu biểu "Break House".
  - Bố cục 2 lớp ảnh đè nổi (Layered Overlap):
    + 1 ảnh nền toàn cảnh căn nhà gỗ đen dài giữa thảm cỏ xanh mùa thu.
    + 1 khung ảnh chụp nội thất ấm cúng (phòng khách có lò sưởi củi và đàn guitar gỗ) bo góc cong `rounded-2xl` nổi bật ở góc trên bên phải của bức ảnh nền.
  - Phía góc trái: Tên font Serif lớn "Break House" cùng hàng badge pill bo tròn màu than mờ:
    `[ Big Bar ] [ 3 Bed ] [ 2 Bath ] [ 1,000-1,500 Sqft ] [ Hybrid Home ]`.

3. PRE-FOOTER BANNER MINH HỌA NÉT TAY CHUẨN XÁC (KHUNG HÌNH 480s):
- Cập nhật lại hình vẽ SVG của PreFooterBanner theo đúng khung hình 480s của Banghi1.mp4:
  - Nhân vật đặt hai tay trước ngực ngước nhìn lên đầy hứng khởi.
  - Phía trên là đám mây suy nghĩ màu xanh lá với ngôi nhà cabin A-frame bên trong tỏa các tia hào quang.
```

---

### 🟢 PROMPT 2.2: HỆ THỐNG TRANG CON GIẢI PHÁP NHÀ Ở (STARTER HOME & FOREVER HOME)

```markdown
Role: Senior Frontend Engineer & UI Designer (React + Tailwind CSS + Zustand)
Task: Xây dựng hệ thống hiển thị chi tiết cho các giải pháp nhà ở dựa trên giây 02:40 - 04:30 của Banghi1.mp4:

1. TRANG CHI TIẾT "STARTER HOME" (KHUNG HÌNH 178s):
- Banner đỉnh trang:
  - Tranh vẽ minh họa nét tay phóng to: Người đàn ông quỳ gối tưới hoa cúc trên mái nhà.
  - Nhãn danh mục: "Starter Home" (font sans màu xanh lá `#567D42`).
  - Tiêu đề Serif lớn: "Start small. Think long."
    + Dưới cụm từ "Think long." có nét gạch chân uốn lượn màu xanh lá mềm mại.
  - Cụm nút hành động kép: `[ Create my Starter Home ] (→)`.
- Phần bài viết biên tập (Editorial Storytelling):
  - "We get it. You're tired of renting, but the leap to buying feels overwhelming — especially when every 'affordable' home on the market needs work, feels cramped, or looks like someone else's dream from 1993..."

2. TRANG CHI TIẾT "FOREVER HOME" (KHUNG HÌNH 280s):
- Banner đỉnh trang:
  - Tranh vẽ minh họa nét tay khổng lồ toàn bộ gia đình 4 người hướng về cụm nhà quê thanh bình.
  - Nhãn danh mục: "Forever Home".
  - Tiêu đề Serif lớn: "Build the last house you'll ever need."
  - Cụm nút hành động kép: `[ Create my Forever Home ] (→)`.

3. ĐIỀU PHỐI ĐIỀU HƯỚNG AN TOÀN (IN-APP NAVIGATION):
- Khi người dùng click vào thẻ "Starter Home" hoặc "Forever Home" từ UseCaseSelector hoặc MegaMenu, hệ thống kích hoạt View chi tiết tương ứng mà không làm mới trang, có nút quay lại [ ← Back to Overview ] tiện lợi.
```

---

### 🟢 PROMPT 2.3: KHỐI QUY HOẠCH XÂY DỰNG & MA TRẬN ĐIỀU KIỆN TÀI CHÍNH

```markdown
Role: Senior Frontend Engineer (React + Tailwind CSS)
Task: Xây dựng các khối nội dung chuyên sâu về Quy hoạch & Tài chính dựa trên giây 04:00 - 05:40 của Banghi1.mp4:

1. KHỐI QUY TRÌNH THI CÔNG & MÓNG NHÀ (KHUNG HÌNH 240s):
- Cột trái: Ảnh chụp flycam từ trên cao hố móng đất công trình bo góc lớn `rounded-3xl`.
- Cột phải:
  - Tiêu đề Serif: "We guide the whole process."
  - Đoạn văn: "Land selection, permitting, utilities, phasing — we don’t just draw it. We get it built."
- Bên dưới: Khối "Design Considerations" liệt kê các tiêu chí thiết kế có icon dấu tích tròn xanh lá `(✓)`:
  - "Layout that tells a story. Arrival sequence, sightlines, and lighting are all scripted to create a memorable experience."

2. KHỐI HIỂU BIẾT QUY HOẠCH ĐỊA PHƯƠNG (KHUNG HÌNH 340s):
- Cột trái: Ảnh chụp công trình nhà dài bọc lớp bảo ôn xanh bên rìa rừng thông bo góc `rounded-3xl`.
- Cột phải:
  - Tiêu đề Serif: "We know the zoning landscape."
  - Đoạn văn: "From subdivisions to accessory dwellings to shared utilities, we’ll help you unlock what’s possible."

3. BẢNG ĐIỀU KIỆN TÀI CHÍNH (FINANCIAL CONDITIONS - KHUNG HÌNH 420s):
- Tiêu đề Serif: "Financial Conditions"
- 4 dòng phân tích dòng tiền chuyên nghiệp, chia bằng đường kẻ hairline mảnh kèm số thứ tự Serif:
  - `01 Designed to cash flow.` -> We model your build costs against rental income and help hit targets from day one.
  - `02 CapEx you can trust.` -> Our estimates are grounded in reality — based on actual construction across the country.
  - `03 Loan ready documentation.` -> Drawings, specs, and pro formas built to satisfy lenders and underwriters.
  - `04 Low overhead, high return.` -> Efficient prefabricated modular assembly minimizes holding costs and interest.
```

---

### 🟢 PROMPT 2.4: PHÂN HỆ QUY CHUẨN KIẾN TRÚC ("WHAT IS A STANDARD?" & "THE STEP-BY-STEP")

```markdown
Role: Senior Frontend Engineer & Interactive Systems Specialist (React + Tailwind CSS + Framer Motion)
Task: Xây dựng giao diện trang giải thích Tiêu chuẩn kiến trúc và Quy trình 5 bước dựa trên giây 07:30 - 08:29 của Banghi1.mp4:

1. TRANG "WHAT IS A STANDARD?" (KHUNG HÌNH 460s):
- Header:
  - Nhãn nhỏ: "What is a Standard?"
  - Tiêu đề Serif: "Designed to balance high design with ease of construction"
    + Dưới cụm từ "balance high design" có đường uốn lượn màu xanh lá vẽ tay.
  - Nút bấm: `[ Find Your Home ] (→)`
- Khối Tổng quan (Overview):
  - "Standards are a collection of plans that put you in the editor's seat. Based on a 16’ grid, they work with much of the existing standardization of the American construction trade — minimizing waste and utilizing details that most any contractor could successfully execute."

2. KHỐI QUY TRÌNH TƯƠNG TÁC "THE STEP-BY-STEP" (KHUNG HÌNH 500s):
- Tiêu đề Serif: "The Step-by-Step"
- Bố cục 2 cột:
  - Cột trái: Bản đồ vệ tinh khu đất nông thôn với đường ranh giới thửa đất màu xanh neon và các điểm ghim camera khảo sát màu đỏ (Survey hotspot pins) có thể nhấp để xem ảnh thực tế tại điểm đó.
  - Cột phải: Khối Accordion 5 bước với chuyển động đóng/mở mượt mà:
    + `01 Understand the build site` (Mở sẵn kèm nội dung: "Get started with TIE Land to identify the perfect parcel for you...").
    + `02 Determine budget & program` (`+`)
    + `03 Select the Standard` (`+`)
    + `04 Modify for your site & lifestyle` (`+`)
    + `05 Secure business permits` (`+`)
```

---

### 🟢 PROMPT 2.5: PHÂN HỆ HỒ SƠ DỰ ÁN THỰC TẾ (ARROWHEAD RIDGE CASE STUDY)

```markdown
Role: Senior Frontend Engineer (React + Tailwind CSS)
Task: Xây dựng trang hồ sơ dự án thực tế chuyên sâu dựa trên giây 05:00 - 07:00 của Banghi1.mp4:

1. DỰ ÁN "ARROWHEAD RIDGE" (KHUNG HÌNH 300s):
- Hero Banner tràn rộng: Ảnh thực tế toàn cảnh ngôi nhà gỗ đen gabled giữa rừng đá sỏi.
- Tiêu đề lớn Serif: "Arrowhead Ridge".
- Dãy badge pills bo tròn:
  `[ Big L ] [ 2 Bed ] [ 2.5 Bath ] [ 2,000–3,000 Sqft ] [ Forever Home ] [ ADU ]`
- Bộ sưu tập ảnh công trình thực tế (Photo Gallery Grid):
  - Ảnh không gian sinh hoạt chung ngập tràn ánh sáng.
  - Ảnh phòng ngủ master hướng ra rừng cây.
  - Mặt bằng kiến trúc kỹ thuật (Architectural Floor Plan).
```

---

## 🚀 HƯỚNG DẪN THỰC THI
- Bạn có thể ra lệnh: **"start prompt 2.1"** để bắt đầu ngay bước đầu tiên, hoặc yêu cầu điều chỉnh bất kỳ nội dung nào trong bản kế hoạch này!
