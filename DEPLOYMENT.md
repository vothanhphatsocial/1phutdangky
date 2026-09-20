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

- Domain registrar/account: Namecheap
- DNS authoritative và proxy: Cloudflare
- Apex và `www` trỏ tới Pages project `1phutdangky`
- HTTP được chuyển sang HTTPS
- `www` được chuyển về apex để canonical hóa URL
- Không tạo hostname viết sai như `ww.1phutdangky.com`

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
