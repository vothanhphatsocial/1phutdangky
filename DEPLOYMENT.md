# Vận hành và triển khai

## Sản phẩm

- Production origin: `https://1phutdangky.com`
- Canonical host: `1phutdangky.com`
- `www.1phutdangky.com`: redirect 301 về canonical host
- Production branch: `main`
- GitHub repository: `vothanhphatsocial/1phutdangky`

## Cloudflare Pages

- Pages project: `1phutdangky`
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22.12.0`
- Framework output: Astro static
- Search index: Pagefind, generated during the build

`npm run build` cũng chạy validator sau khi tạo artifact. Không dùng `npm run validate` riêng làm quality gate vì lệnh đó có thể kiểm tra một thư mục `dist` cũ.

## DNS và redirect

URL bài viết có dạng `/<chuyên-mục>/<slug>/`, khớp thư mục trong `src/content/articles/` và trường `category`. Build sẽ báo lỗi nếu bài nằm sai chuyên mục.

Các URL cũ sau chuyển hướng 301 trực tiếp tới URL trong chuyên mục (cả dạng có và không có dấu `/` cuối):

- `/ma-gioi-thieu-mb-bank/` → `/mo-tai-khoan/ma-gioi-thieu-mb-bank/`
- `/khong-dang-ky-duoc-mb-bank/` → `/mo-tai-khoan/khong-dang-ky-duoc-mb-bank/`

- Domain registrar/account: Namecheap
- DNS authoritative và proxy: Cloudflare
- Apex và `www` trỏ tới Pages project `1phutdangky`
- HTTP được chuyển sang HTTPS
- `www` được chuyển về apex để canonical hóa URL
- Không tạo hostname viết sai như `ww.1phutdangky.com`

Hai Redirect Rules chuẩn hóa tên miền (`Canonical domain redirect` và
`HTTP canonical domain redirect`) đang bật. Rule riêng `Redirect legacy wallet
route` đang tắt; không bật lại chuyển hướng `/vi-dien-tu/` về trang chủ.
Chuyên mục `/vi-dien-tu/` đã được khôi phục cho nội dung Home PayLater theo URL được chủ site chốt. Các bài cũ đã xóa không có nội dung thay thế vẫn trả `404`;
các chuyển hướng bài MB Bank sang URL trong chuyên mục vẫn giữ nguyên.

## Analytics

- Google Tag Manager container: `GTM-NXX3GHJ7`
- Google Analytics 4 measurement ID: `G-BHKK5RF8X8`
- Consent mặc định: denied
- Chỉ gửi custom event sau khi người dùng cho phép đo lường
- Không cấu hình Google Ads, Floodlight hoặc remarketing tag

## Kiểm tra trước khi phát hành

```bash
npm ci
npm run build
```

Kiểm tra production sau khi deploy:

```bash
curl -fsSI https://1phutdangky.com/
curl -fsSI https://www.1phutdangky.com/
curl -fsSL https://1phutdangky.com/robots.txt
curl -fsSL https://1phutdangky.com/sitemap-index.xml
```

Kết quả cần đạt:

- Apex trả `200`.
- `www` trả `301` tới `https://1phutdangky.com/`.
- `robots.txt` trỏ tới sitemap index của `1phutdangky.com`.
- Sitemap index và các sitemap con chỉ dùng canonical origin.
- Build validator không báo lỗi.
- `/vi-dien-tu/` và `/vi-dien-tu/mo-tai-khoan-tra-sau-home-paylater-online/` trả `200`, không chuyển về trang chủ. Kiểm tra cả response
  trên tên miền chính vì Redirect Rules của zone chạy trước quy tắc trong Pages.

## Green SM Bike category

The first Green SM Bike run adds `/dang-ky-doi-tac/` through the existing category routing. Verify that this category and `/dang-ky-doi-tac/dang-ky-tai-xe-green-sm-bike/` return 200, appear in the sitemap, and use matching category palettes for article/card/product/social images. Preserve the exact AccessTrade URL from the engine workbook in CTA hrefs. No DNS, environment, project or deployment-branch changes are required.
