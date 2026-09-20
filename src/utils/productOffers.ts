import type {
  CollectionEntry,
} from 'astro:content';

type Product =
  CollectionEntry<'products'>;

export type ProductOffer =
  Product['data']['offers'][number];

export function getEnabledProductOffers(
  product: Product
) {
  return product.data.offers.filter(
    (offer) => offer.enabled
  );
}

export function getPrimaryProductOffer(
  product: Product,
  requestedOfferId?: string
): ProductOffer | undefined {
  const enabledOffers =
    getEnabledProductOffers(product);

  if (requestedOfferId) {
    return enabledOffers.find(
      (offer) =>
        offer.id === requestedOfferId
    );
  }

  if (product.data.primaryOfferId) {
    const primaryOffer =
      enabledOffers.find(
        (offer) =>
          offer.id ===
          product.data.primaryOfferId
      );

    if (primaryOffer) {
      return primaryOffer;
    }
  }

  return enabledOffers[0];
}

export function hasEnabledProductOffer(
  product: Product
) {
  return getEnabledProductOffers(product)
    .length > 0;
}
