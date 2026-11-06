# TIE PLATFORM — PROMPT PLAN SỬA GIAO DIỆN & CHUYỂN ĐỘNG UX (DỰA TRÊN BANGHI.MP4)

Tài liệu này ghi lại toàn bộ phân tích chi tiết từng khung hình (từ giây 00:00 đến 01:09) của video mẫu `Banghi.mp4` (Huts.com), và chia thành **7 Prompt thực thi độc lập** để bạn có thể copy-paste chạy sửa từng phần hoặc yêu cầu chạy tự động.

---

## MỤC LỤC CÁC PROMPT THỰC THI

1. **[Prompt 1]**: Hero Section tràn viền (Full-Bleed) & Thanh Header trong suốt chuyển Sticky (`+` đổi thành `×`).
2. **[Prompt 2]**: MegaMenu Standards (Lưới 3x3 ảnh Thumbnail) & How It Works (Khối Bo Tròn Cream).
3. **[Prompt 3]**: Section *"Whatever type of place you have in mind"* — Lưới 3D Carousel & 6 hình vẽ nhân vật chính xác từ Video.
4. **[Prompt 4]**: Section *"We do it across the country"* — Bộ ảnh xếp chồng tương tác (Stacked Photo Deck) & Mũi tên xanh lá `↓`.
5. **[Prompt 5]**: Section *"It all starts with our Standards..."* — Dàn ảnh ngang bo góc lớn (`rounded-3xl`) của Small L, Big L, Village, Dogtrot.
6. **[Prompt 6]**: Section 4 Con số Thống kê ("Still don't believe it?") kèm biểu tượng ngôi sao lấp lánh `✨` và tia sáng `彡`.
7. **[Prompt 7]**: Deep Forest Green Footer 4 Cột chuẩn xác 100% từ video kèm thanh mạng xã hội.

---

## CHI TIẾT TỪNG PROMPT

### PROMPT 1: HERO SECTION TRÀN VIỀN & THANH HEADER TRONG SUỐT CHUYỂN STICKY

```markdown
Role: Senior Frontend Engineer & Motion Designer (React + Tailwind CSS + Framer Motion)
Task: Cập nhật HeroSection và MegaMenuNavbar dựa trên video Banghi.mp4 (giây 00:00 - 00:10):

1. HEADER & NAVBAR:
- Trạng thái ở đỉnh trang (ScrollY = 0): Nằm đè lên ảnh Hero (Absolute/Fixed Transparent), toàn bộ chữ màu trắng tinh tế.
- Logo: Chữ "TIE" in hoa đậm, sans/serif tối giản (không có khung vuông, không có chữ PropTech rườm rà).
- Menu items: "Housing Solutions +", "Standards +", "How it Works +", "Portfolio", "Resources +". Khi rê chuột vào menu nào, dấu "+" tự động đổi thành dấu "×".
- Nút CTA bên phải: Dáng Pill bo tròn màu xanh cốm (Pistachio) `#D2E2B0` với chữ đen `#1C1B18` "Get Started".
- Khi cuộn chuột (ScrollY > 40): Header chuyển mượt mà sang màu kem `#FAF8F5`/95 với hiệu ứng backdrop-blur và chữ chuyển sang màu than #1C1B18.

2. HERO SECTION FULL-BLEED:
- Bố cục tràn viền 100% chiều ngang (Edge-to-edge), chiều cao chiếm trọn màn hình (100vh).
- Ảnh nền: Ngôi nhà gỗ đen hiện đại (Black Timber Gabled House) nằm cạnh hồ nước và rừng cây rợp bóng. Hỗ trợ hiệu ứng đổi góc nhìn sang ảnh chụp Flycam từ trên cao (Aerial view).
- Tiêu đề căn giữa:
  "The best way to design
   and develop a property in
   the country"
  Cụm từ "way to design" có đúng 2 nét gạch chân uốn lượn màu xanh lá mềm mại (Hand-drawn double green underline).
- Nút bấm chính ở trung tâm: Dáng Pill màu xanh rêu `#567D42` viền nhẹ:
  `[ Get Started  (→) ]`
  bên trong có vòng tròn nhỏ màu trắng chứa mũi tên chuyển động nhẹ khi hover. Bỏ hoàn toàn các nút phụ và thẻ thông số rườm rà dưới thảm cỏ.
```

---

### PROMPT 2: MEGAMENU STANDARDS (LƯỚI 3X3 THUMBNAIL) & HOW IT WORKS

```markdown
Role: Senior Frontend Engineer (React + Tailwind CSS + Framer Motion)
Task: Thiết kế MegaMenu thả xuống cho "Standards +" và "How it Works +" dựa trên giây 00:12 - 00:28 của Banghi.mp4:

1. MEGAMENU "STANDARDS +":
- Bảng menu màu kem `#FAF8F5` trải rộng toàn màn hình với bo góc tròn lớn ở đáy (`rounded-b-3xl`).
- Lưới 3 cột x 3 dòng (9 ô), mỗi ô gồm:
  - 1 ảnh thumbnail thực tế góc bo tròn (`rounded-xl`):
    1. "What is a Standard?": HUTS base plans that can be modified for your home site and unique lifestyle.
    2. "ADU": Small-scale structures designed for extra space, homesteading your lot, or generating revenue.
    3. "Small L": An elegant assembly of two gable-roofed forms that combines function with grandeur.
    4. "Small Bar": The swiss-army knife of our Standards collection. All the essentials in a beautiful, affordable package.
    5. "Medium Bar": An efficient 2.5 bedroom home that packs big functionality into a small footprint.
    6. "Big L": The largest Standard plan that combines the efficiency of the Small L with a grand primary suite.
    7. "Dogtrot": 2 bedroom design that's marked by a clean separation of public and private functions.
    8. "Village": A 3-bedroom village scheme designed for sites where there's more than just one view or home experience.
    9. "Big Bar": Organized in wings with bedrooms on either side of the public spaces with a single, long roof line.
  - Hover vào tên mẫu nhà: Đổi màu xanh lá `#567D42`.

2. MEGAMENU "HOW IT WORKS +":
- Hiển thị 2 thẻ lớn trong khung màu kem:
  - "The TIE Approach": We combine our experience in architecture, development, and placemaking to make the home design and building process better (Icon bóng đèn ý tưởng trong ô bo tròn).
  - "Our Services": We simplify and streamline the home design and development process at every step of the way (Icon bản vẽ & búa trong ô bo tròn).
```

---

### PROMPT 3: SECTION "WHATEVER TYPE OF PLACE YOU HAVE IN MIND" — 3D CAROUSEL & 6 MINH HỌA NÉT TAY

```markdown
Role: Creative Web Developer & Motion Specialist (React + CSS 3D Transforms + Framer Motion)
Task: Tái hiện Section "Whatever type of place you have in mind" theo đúng giây 00:30 - 00:44 của Banghi.mp4:

1. TIÊU ĐỀ:
- Căn giữa trang trọng bằng font Serif:
  "Whatever type of place you have
   in mind"

2. LƯỚI THẺ 3D CAROUSEL (PERSPECTIVE 1200PX):
- Thẻ bo góc tròn lớn (`rounded-3xl`), nền trắng tinh khôi, viền hairline nhạt, kích thước 300px x 420px.
- Hiệu ứng cuộn 3D (3D Y-Axis Rotation):
  Khi người dùng kéo chuột hoặc lướt sang trái, các thẻ ở mép trái tự động xoay nghiêng theo trục Y (`rotateY(-45deg)` đến `-60deg`), tạo cảm giác chiều sâu hình trụ tròn 3D sống động như trong video.
- Cơ chế lật thẻ 3D 180 độ (3D Flip):
  Click vào thẻ sẽ xoay 180 độ theo trục Y hé lộ mặt sau chứa thông tin diện tích gợi ý, ngân sách và nút hành động "Explore plans →".

3. MINH HỌA NHÂN VẬT NÉT TAY CHÍNH XÁC TỪNG CHI TIẾT TỪ VIDEO:
- Thẻ 1: "Starter Home" -> Người đàn ông áo kẻ quỳ gối cầm bình tưới cho ngôi nhà nhỏ có bông hoa cúc nở bung trên mái.
- Thẻ 2: "Forever Home" -> Cả gia đình (bố cõng con nhỏ trên vai, mẹ, con trai) hướng mắt về những ngôi nhà miền quê.
- Thẻ 3: "Second Home" -> Người đeo kính râm nằm thư giãn gác chân trên ghế tắm nắng bên hồ nước, có cabin gỗ phía xa.
- Thẻ 4: "Hybrid Home" -> Người đàn ông sải bước chia đôi cơ thể (nửa trái là đồi cỏ & cánh chim, nửa phải là tòa nhà cao ốc văn phòng).
- Thẻ 5: "ADU" -> Người phụ nữ đeo kính và quàng khăn, vui vẻ tung hứng 2 ngôi nhà nhỏ trên không trung kèm vệt quỹ đạo.
- Thẻ 6: "Investment Property" -> Hai bàn tay đang ghép các khối module nhà màu vàng/xanh lại với nhau như trò chơi xếp hình.
```

---

### PROMPT 4: SECTION "WE DO IT ACROSS THE COUNTRY" — BỘ ẢNH XẾP CHỒNG (STACKED PHOTO DECK)

```markdown
Role: Senior Frontend Engineer (React + Framer Motion + Tailwind CSS)
Task: Xây dựng Section "We do it across the country" theo đúng giây 00:44 - 00:54 của Banghi.mp4:

1. BỐ CỤC 2 CỘT:
- Bên trái: Bộ ảnh xếp chồng (Stacked Photo Deck) gồm 3 bức ảnh công trình chụp thực tế đặt chồng lên nhau với các góc xoay tự nhiên (`-4deg`, `2deg`, `-1deg`), góc bo tròn lớn (`rounded-2xl`). Cho phép người dùng nhấp hoặc kéo để tráo ảnh (Shuffle deck motion).
- Bên phải:
  - Tiêu đề Serif: "We do it across the country"
  - Đoạn văn: "We focused exclusively on delivering in rural locations. Coast-to-coast, TIE crafts beautiful properties through guidance, intent, and care. Have a specific area or state in mind? We've either built there, or will soon."
  - Nút bấm: `[ See Our Projects  (→) ]` (Nút pill nền trắng viền xanh đậm `#1C1B18` kèm nút tròn mũi tên tách biệt).
- Phía trên có hình vẽ tay mũi tên xanh lá nhỏ chỉ xuống `↓`.
```

---

### PROMPT 5: SECTION "IT ALL STARTS WITH OUR STANDARDS..." — DÀN ẢNH NGANG BO GÓC LỚN

```markdown
Role: Senior Frontend Engineer (React + Tailwind CSS)
Task: Cập nhật danh mục mẫu nhà Standards theo đúng giây 00:54 - 01:02 của Banghi.mp4:

1. TIÊU ĐỀ & MÔ TẢ:
- Tiêu đề Serif: "It all starts with our Standards..."
- Đoạn văn: "They're more than home plans, they're home products—designed for real land, real budgets, and real life. TIE Standards combine timeless design with construction-ready details, making it faster and easier to build a home that feels anything but standard."

2. DÀN ẢNH CUỘN NGANG (HORIZONTAL SCROLLING CARDS):
- Các thẻ ảnh khổ lớn bo góc cong mềm mại (`rounded-3xl` hoặc `rounded-[28px]`), tỉ lệ 16:10.
- Bên trong là ảnh chụp thực tế kiến trúc góc rộng:
  1. "Small L": Ảnh chụp từ trên cao hai khối nhà gabled ghép hình chữ L bằng gỗ sáng màu với bậc đá dẫn ra sân cỏ.
  2. "Big L": Ngôi nhà gabled màu đen với mảng kính thông tầng cao vút, phía trước là cụm ghế sofa ngoài trời quanh đống lửa.
  3. "Village": Cụm nhiều gian nhà gỗ liên hoàn kết nối sân trong.
  4. "Dogtrot": Ngôi nhà 2 gian có hành lang mở đón gió ở giữa.
- Dưới mỗi bức ảnh: Chỉ hiển thị tên mẫu nhà bằng font Serif trang nhã ("Small L", "Big L", "Village", "Dogtrot").
```

---

### PROMPT 6: SECTION 4 CON SỐ THỐNG KÊ ("STILL DON'T BELIEVE IT?") VỚI ICON VẼ TAY

```markdown
Role: Senior Frontend Engineer (React + Tailwind CSS + SVG)
Task: Thiết kế Section thống kê 4 ô theo đúng giây 01:02 - 01:08 của Banghi.mp4:

1. BỐ CỤC 4 Ô PHÂN CHIA BẰNG ĐƯỜNG KẺ MẢNH (HAIRLINE DIVIDERS):
- Nhãn nhỏ góc trên bên trái: "Still don't believe it?" (font sans màu xanh lá).
- 4 ô thống kê:
  - Ô 1 (Trên - Trái): Con số Serif khổng lồ `200K+`, nhãn dưới: "square feet currently under construction".
  - Ô 2 (Trên - Phải): Con số Serif khổng lồ `18` kèm 2 ngôi sao vẽ tay lấp lánh màu xanh lá `✨`, nhãn dưới: "States with active home design & development projects".
  - Ô 3 (Dưới - Trái): Con số Serif khổng lồ `5.0%`, nhãn dưới: "Average budget variance".
  - Ô 4 (Dưới - Phải): Con số Serif khổng lồ `5,000+` kèm các tia sáng vẽ tay tỏa ra `彡`, nhãn dưới: "Rural land parcels evaluated".
```

---

### PROMPT 7: DEEP FOREST GREEN FOOTER 4 CỘT CHUẨN XÁC TỪ VIDEO

```markdown
Role: Senior Frontend Engineer (React + Tailwind CSS)
Task: Cập nhật Footer theo đúng giây 01:08 - 01:09 của Banghi.mp4:

1. BỐ CỤC CHUẨN XÁC:
- Nền màu xanh rừng thẫm (`bg-[#183D24]` hoặc `bg-[#1A3B22]`).
- Bên trái: Chữ **TIE** in hoa cực lớn màu trắng tinh.
- 4 Cột liên kết:
  - Cột 1: "Housing Solutions" -> Starter Home, Forever Home, Second Home, Hybrid Home, ADU, Investment Property, Micro-Hospitality, Multi-Gen Compound.
  - Cột 2: "Standards" -> What is a Standard?, ADU, Small L, Small Bar, Medium Bar, Big L, Dogtrot, Village, Big Bar.
  - Cột 3: "Company" (Portfolio, About), "Other Operations" (Courses, The Department of Leisure, The Starter Home), "How It Works" (The TIE Approach, Services).
  - Cột 4: "Resources" (The Field Report, The Land Report, TIE Guides, Development Opportunities), "Contact" (hello@tie.com, For Partners, Newsletter).
- Dòng chân trang: ©2026 TIE, Privacy Policy, Terms of Use, kèm hàng icon mạng xã hội: YouTube, TikTok, Instagram, LinkedIn, Pinterest, Spotify.
```

---

## CÁCH SỬ DỤNG
- Bạn có thể **chọn chạy từng Prompt một** bằng cách gửi cho tôi (ví dụ: *"Chạy Prompt 2"* hoặc *"Chạy Prompt 4"*).
- Hoặc yêu cầu: *"Chạy tuần tự toàn bộ từ Prompt 1 đến Prompt 7"* để tôi hoàn thiện liền mạch toàn bộ hệ thống theo video!
