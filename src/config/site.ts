export const SITE = {
  name: '1 Phút Đăng Ký',
  url: 'https://1phutdangky.com',
  description:
    'Hướng dẫn tài chính dễ hiểu về tài khoản ngân hàng, thẻ tín dụng và khoản vay.',
  logo: '/brand/logo-512.png',
  socialImage: '/brand/og-default.png',
  editor: {
    name: 'Võ Thành Phát',
    url: '/tac-gia/vo-thanh-phat/',
  },
};

export const GTM_ID = 'GTM-NXX3GHJ7';

export const CATEGORIES = {
  'mo-tai-khoan': {
    slug: 'mo-tai-khoan',
    name: 'Mở tài khoản',
    shortName: 'Tài khoản',
    description:
      'Điều kiện, phí và hướng dẫn mở tài khoản ngân hàng online.',
    icon: 'bank',
  },

  'the-tin-dung': {
    slug: 'the-tin-dung',
    name: 'Thẻ tín dụng',
    shortName: 'Thẻ tín dụng',
    description:
      'Tìm hiểu, lựa chọn và so sánh các loại thẻ tín dụng.',
    icon: 'card',
  },

  'vay-tien-mat': {
    slug: 'vay-tien-mat',
    name: 'Vay tiền mặt',
    shortName: 'Khoản vay',
    description:
      'Kiến thức về điều kiện, chi phí và quy trình vay tiền mặt.',
    icon: 'cash',
  },

} as const;

export type CategorySlug = keyof typeof CATEGORIES;

export function isCategorySlug(
  value: string
): value is CategorySlug {
  return value in CATEGORIES;
}

export function categoryUrl(
  slug: CategorySlug
) {
  return `/${slug}/`;
}

export function articleUrl(id: string) {
  return `/${id}/`;
}
