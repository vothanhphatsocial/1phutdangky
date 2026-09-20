import {
  defineCollection,
  reference,
} from 'astro:content';

import { glob } from 'astro/loaders';
import { z } from 'astro/zod';


/* ========================================
   SHARED SCHEMAS
   ======================================== */

const sourceSchema = z.object({
  title: z.string(),
  url: z.url(),
  publisher: z.string().optional(),
});


/* ========================================
   PRODUCTS
   ======================================== */

const productCategorySchema = z.enum([
  'bank-account',
  'credit-card',
  'loan',
  'e-wallet',
  'insurance',
]);

const offerChannelSchema = z.enum([
  'affiliate-network',
  'direct-referral',
]);

const productOfferSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string(),
  channel: offerChannelSchema,
  enabled: z.boolean().default(false),
  url: z.url(),
  network: z.string().optional(),
  referralCode: z.string().optional(),
  ctaLabel: z.string().optional(),
  validThrough: z.coerce.date().optional(),
  lastVerifiedAt: z.coerce.date(),
});

const productFactSchema = z.object({
  label: z.string(),
  value: z.string(),
  note: z.string().optional(),
});

const products = defineCollection({
  loader: glob({
    base: './src/data/products',
    pattern: '**/*.json',
  }),

  schema: z.object({
    name: z.string(),

    provider: z.string(),

    category: productCategorySchema,

    summary: z.string(),

    officialUrl: z.url(),

    offers: z
      .array(productOfferSchema)
      .default([]),

    primaryOfferId: z
      .string()
      .optional(),

    ctaLabel: z
      .string()
      .default('Xem thông tin'),

    facts: z
      .array(productFactSchema)
      .default([]),

    highlights: z
      .array(z.string())
      .default([]),

    considerations: z
      .array(z.string())
      .default([]),

    sources: z
      .array(sourceSchema)
      .default([]),

    lastVerifiedAt: z.coerce.date(),

    draft: z.boolean().default(false),
  }).superRefine((product, context) => {
    const offerIds = new Set<string>();

    product.offers.forEach((offer, index) => {
      if (offerIds.has(offer.id)) {
        context.addIssue({
          code: 'custom',
          message: `Offer ID bị trùng: ${offer.id}`,
          path: ['offers', index, 'id'],
        });
      }

      offerIds.add(offer.id);

      if (
        offer.channel === 'affiliate-network' &&
        !offer.network
      ) {
        context.addIssue({
          code: 'custom',
          message: 'Offer affiliate-network phải khai báo network.',
          path: ['offers', index, 'network'],
        });
      }
    });

    if (!product.primaryOfferId) {
      const enabledOfferCount =
        product.offers.filter(
          (offer) => offer.enabled
        ).length;

      if (enabledOfferCount > 1) {
        context.addIssue({
          code: 'custom',
          message: 'Product có nhiều offer đang bật phải khai báo primaryOfferId.',
          path: ['primaryOfferId'],
        });
      }

      return;
    }

    const primaryOffer = product.offers.find(
      (offer) =>
        offer.id === product.primaryOfferId
    );

    if (!primaryOffer) {
      context.addIssue({
        code: 'custom',
        message: 'primaryOfferId phải trỏ tới một offer tồn tại.',
        path: ['primaryOfferId'],
      });
      return;
    }

    if (!primaryOffer.enabled) {
      context.addIssue({
        code: 'custom',
        message: 'Offer chính phải ở trạng thái enabled.',
        path: ['primaryOfferId'],
      });
    }
  }),
});


/* ========================================
   ARTICLES
   ======================================== */

const categorySchema = z.enum([
  'mo-tai-khoan',
  'the-tin-dung',
  'vay-tien-mat',
  'vi-dien-tu',
]);

const articleTypeSchema = z.enum([
  'guide',
  'product',
  'comparison',
  'knowledge',
]);

const articles = defineCollection({
  loader: glob({
    base: './src/content/articles',
    pattern: '**/*.{md,mdx}',
  }),

  schema: ({ image }) => z.object({
    title: z.string(),

    description: z.string(),

    category: categorySchema,

    type: articleTypeSchema,

    publishedAt: z.coerce.date(),

    updatedAt: z.coerce.date(),

    lastVerifiedAt:
      z.coerce.date().optional(),

    readingMinutes: z
      .number()
      .int()
      .positive()
      .optional(),

    featured:
      z.boolean().default(false),

    cover:
      image().optional(),

    coverAlt:
      z.string().optional(),

    draft:
      z.boolean(),

    quickAnswer:
      z.string().optional(),

    productBeforeToc:
      z.boolean().default(false),

    products: z
      .array(reference('products'))
      .default([]),

    affiliate: z
      .object({
        enabled: z.boolean().default(false),
      })
      .default({
        enabled: false,
      }),

    sources: z
      .array(sourceSchema)
      .default([]),
  }).refine(
    (article) =>
      Boolean(article.cover) ===
      Boolean(article.coverAlt?.trim()),
    {
      message:
        'Ảnh đại diện và mô tả alt phải được khai báo cùng nhau.',
      path: ['coverAlt'],
    }
  ).refine(
    (article) =>
      article.draft ||
      article.sources.length > 0,
    {
      message:
        'Bài viết xuất bản phải có ít nhất một nguồn.',
      path: ['sources'],
    }
  ),
});


export const collections = {
  articles,
  products,
};
