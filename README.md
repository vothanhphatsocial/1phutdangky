# 1 Phút Đăng Ký

Website hướng dẫn tài chính dễ hiểu về tài khoản ngân hàng, thẻ tín dụng
và khoản vay.

Production: `https://1phutdangky.com`

## Phát triển

```bash
npm ci
npm run dev
```

## Kiểm tra production build

```bash
npm run check
```

Website được xây dựng bằng Astro, xuất bản dạng static và sử dụng Pagefind
cho tìm kiếm nội bộ.

## Bảo trì nội dung

Trước mỗi lượt làm nội dung, chạy `npm run content:review` và mở nguồn chính thức
theo hướng dẫn trong `AGENTS.md`. Lệnh kiểm tra hạn nguồn đã ghi trong
`docs/content/source-review.json`; đồng thời nhắc rà toàn bài
sau 90 ngày kể từ ngày kiểm chứng. Bản ghi kiểm tra một phần không đặt lại
chu kỳ toàn bài. Đây là lịch biên tập nội bộ, không phải
thời hạn Google quy định. Lệnh không tự kiểm chứng thông tin trên website
nhà cung cấp và không tắt liên kết đăng ký.

Khi có thay đổi, ghi đúng phạm vi đã kiểm tra, phiên bản nguồn và hạn rà tiếp theo.
Kiểm chứng một phần không làm mới ngày kiểm chứng của toàn bộ bài.
Ngày cập nhật bài chỉ đổi khi nội dung được sửa đáng kể; thời điểm mới dùng
múi giờ `+07:00` và ngày hiển thị dùng múi giờ Việt Nam.

Kiểm tra các quy tắc bảo trì và khả năng phát hiện lỗi trong bản build:

```bash
npm run test:maintenance
npm run test:validator
```
