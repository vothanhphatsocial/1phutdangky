# Theo dõi hiệu quả website

## Hệ thống đang dùng

- Website: `https://1phutdangky.com`
- GTM: `GTM-NXX3GHJ7`; account `6377947924`, container `264708734`.
- GA4: property `555032371`, web stream `15813188208`, measurement ID `G-BHKK5RF8X8`.
- Giữ nguyên cơ chế đồng ý hiện hữu: GTM chỉ được tải và custom event chỉ được đẩy khi `consentChoice` là `granted`.
- Không thêm Google Ads, Floodlight, remarketing hoặc nhà cung cấp đo lường mới.

## Sự kiện

| Sự kiện | Hành động | GA4 key event |
| --- | --- | --- |
| `affiliate_click` | Bấm CTA affiliate/giới thiệu | Có |
| `contact_click` | Bấm liên hệ Zalo hoặc gọi nhân viên hỗ trợ tại cửa hàng | Có |
| `referral_code_copy` | Sao chép mã giới thiệu thành công | Có, theo yêu cầu chủ website |
| `directions_click` | Bấm chỉ đường tới FPT Shop | Không |
| `official_link_click` | Bấm CTA sản phẩm chính thức không có affiliate | Không |
| `site_search` | Pagefind hoàn tất tìm kiếm, bao gồm không có kết quả | Không |

`page_view`, `scroll`, `click` và các sự kiện đo lường nâng cao vẫn theo cấu hình GA4 hiện hữu. Không cộng sự kiện tự động `click` với `affiliate_click` để tính lượt đăng ký. `purchase` là key event mặc định của GA4, không phát sinh dữ liệu trong website này; không tạo tag phát sự kiện đó.

Đây là hành động trên website. Kết quả mở tài khoản, xét duyệt, giải ngân, nhận việc hoặc hoa hồng phải đối soát từ nhà cung cấp/nền tảng affiliate; hệ thống này không tự xác nhận những kết quả đó.

## Dữ liệu gửi kèm

Các action/copy event gửi `product_id`, `product_name`, `offer_id`, `offer_channel`, `affiliate_network`, `cta_position`, `affiliate`, `destination_hostname`, `contact_type`, `page_path`, `category_slug`.

- `contact_type`: `phone`, `zalo`, `email` hoặc `other` khi áp dụng; không chứa số điện thoại/địa chỉ email.
- `destination_hostname`: chỉ tên miền; không gửi toàn bộ URL affiliate hoặc tracking parameters trong custom payload.
- `page_path`: đường dẫn hiện tại, bỏ query/hash. Nguồn/medium của phiên dùng trường tích hợp sẵn của GA4.
- Copy event chỉ được phát sau khi sao chép thành công; không gửi mã được sao chép.
- Search tag riêng chỉ ánh xạ `result_count` và `page_path`; không gửi từ khoá tìm kiếm và không dùng lại ngữ cảnh sản phẩm của sự kiện trước.
- Mọi action/copy payload đặt lại các trường không áp dụng thành giá trị rỗng/false để không giữ nhầm ngữ cảnh trước đó.
- Hai bài FPT Shop gắn tracking cho số/nút gọi Võ Thành Phát và chỉ đường; số tổng đài nhà cung cấp không được tính thành liên hệ tư vấn của website.

## Phương diện GA4 và báo cáo

Sáu phương diện phạm vi sự kiện được đăng ký:

| Tên hiển thị | Event parameter |
| --- | --- |
| Sản phẩm | `product_name` |
| Vị trí nút | `cta_position` |
| Hình thức liên hệ | `contact_type` |
| Chuyên mục | `category_slug` |
| Kênh hành động | `offer_channel` |
| Mạng affiliate | `affiliate_network` |

Báo cáo tùy chỉnh **Hành động đăng ký và liên hệ** (`16342980677`) lọc chính xác sáu sự kiện trong bảng trên. Có thể đổi phương diện chính hoặc thêm phương diện phụ để xem theo sản phẩm, đường dẫn bài viết, loại liên hệ, chuyên mục, vị trí nút hoặc nguồn/medium của phiên.

Các phương diện mới không bổ sung ngược dữ liệu chi tiết cho sự kiện lịch sử. GA4 có thể cần 24–48 giờ để dữ liệu mới xuất hiện trong báo cáo. Số lượng sự kiện và số key event có thể khác nhau theo cách đếm đang cấu hình; không coi tổng các loại hành động là số khách hàng duy nhất.

Bộ sưu tập **Hiệu quả 1 Phút Đăng Ký** (`16343190616`) đã xuất bản trong menu **Báo cáo**, gồm chủ đề **Theo dõi website**: báo cáo hành động, **Trang và màn hình**, **Thu nạp qua lưu lượng truy cập**.

## Cấu hình GTM lưu trong repository

`gtm-1phutdangky.json` là cấu hình có thể nhập lại vào đúng container. Nhập bằng **Merge / overwrite conflicting tags, triggers and variables**; kiểm tra preview trước khi áp dụng. Không dùng chế độ ghi đè toàn bộ workspace có thay đổi không liên quan.

- Giữ Google tag và measurement ID hiện hữu.
- Một GA4 custom-events tag ánh xạ 11 tham số cho action/copy event.
- Một GA4 search tag riêng cho `site_search`.
- Trigger action dùng regex có neo đầu/cuối; trigger tìm kiếm chỉ khớp đúng `site_search`.
- 12 Data Layer Variables phiên bản 2, gồm `result_count`.

## Kiểm tra khi thay tracking

- `npm run test:tracking`: consent, ngữ cảnh, reset dữ liệu, search count, loại liên hệ và không phát các sự kiện kết quả chưa có bằng chứng.
- `npm run check`: Astro build, Pagefind và build validator.
- `npm run test:validator` khi thay quy tắc validator hoặc cần kiểm tra hồi quy.
- Kiểm tra trình duyệt khi denied/granted/revoked; desktop và mobile; mỗi tương tác chỉ có một custom event; kiểm tra cả dataLayer và request GA4.
- Kiểm tra href/nhãn CTA, H1, canonical và ngày hiển thị giữ đúng giá trị trước thay đổi tracking.
- Lưu thay đổi trên GitHub, để Cloudflare Pages chạy theo workflow hiện tại; xác minh production sau build.

## Phát hành ngày 15/11/2026

- GTM phiên bản **6 — Complete action tracking and product context** đã được xuất bản; bản JSON trong thư mục này được xuất lại từ phiên bản 6 thực tế.
- [GTM phiên bản 6](https://tagmanager.google.com/#/versions/accounts/6377947924/containers/264708734/versions/6).
- [Báo cáo hành động](https://analytics.google.com/analytics/web/#/a394704774p555032371/reports/explorer?collectionId=16343190616&r=16342980677).

### Kết quả kiểm chứng phát hành

- Mã website: [`d7976e297d8c9f93335ed9f38c99d78d2567dbf5`](https://github.com/vothanhphatsocial/1phutdangky/commit/d7976e297d8c9f93335ed9f38c99d78d2567dbf5), branch `main`; push thành công.
- Cloudflare Pages cho commit này trả trạng thái `completed / success`, deployment `bd7cd772-9be0-42a2-b2d8-15520ae7e30a`.
- `npm run check`: pass, 37 HTML và 35 sitemap URLs; `npm run test:tracking`: 7/7; `npm run test:validator`: 41/41; `git diff --check`: pass.
- Local browser QA: 120 kiểm tra pass, không có lỗi runtime; đối chiếu baseline 16 kiểm tra pass cho H1, canonical, ngày hiển thị, href và nhãn action tại các trang đại diện.
- Production browser QA: 58 kiểm tra pass; MB affiliate/copy, Home PayLater Zalo, hai bài FPT chỉ đường, gọi nhân viên tại đầu/cuối bài, Pagefind có kết quả/không kết quả và consent denied. Không có lỗi runtime hoặc tràn ngang ở viewport 390px trên các trang kiểm tra.
- Kiểm tra request xác nhận custom events nhắm `G-BHKK5RF8X8`, có đúng `dp`/product/category/contact/CTA context và không gửi raw code, số liên hệ hoặc từ tìm kiếm trong custom parameters. Endpoint thu thập được chặn trong phiên QA để không làm tăng số liệu thật; đây là kiểm chứng payload/request, không phải xác nhận số liệu mới đã xử lý trong báo cáo GA4.
- GA4 UI đã xác nhận ba key event `affiliate_click`, `contact_click`, `referral_code_copy`, sáu custom dimensions và bộ sưu tập đã xuất bản; báo cáo hành động mở được từ menu.
