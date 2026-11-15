const clickEvents = new Set(['affiliate_click', 'official_link_click', 'contact_click', 'directions_click', 'link_click']);
const categories = new Set(['mo-tai-khoan', 'the-tin-dung', 'vay-tien-mat', 'vi-dien-tu', 'dang-ky-doi-tac']);

function payload(event, data, pagePath, consentChoice) {
  if (consentChoice !== 'granted') return null;
  const path = pagePath.split(/[?#]/, 1)[0];
  const category = path.split('/')[1];
  return {
    event,
    product_id: data.productId || '',
    product_name: data.productName || '',
    offer_id: data.offerId || '',
    offer_channel: data.offerChannel || '',
    affiliate_network: data.affiliateNetwork || '',
    cta_position: data.ctaPosition || '',
    affiliate: data.affiliate === 'true',
    destination_hostname: '',
    contact_type: '',
    page_path: path,
    category_slug: categories.has(category) ? category : '',
  };
}

export function clickTrackingPayload(link, pagePath, consentChoice) {
  const event = link.dataset.event || 'link_click';
  if (!clickEvents.has(event)) return null;
  const result = payload(event, link.dataset, pagePath, consentChoice);
  if (!result) return null;
  try {
    const destination = new URL(link.href);
    result.destination_hostname = destination.hostname;
    if (event === 'contact_click') {
      result.contact_type = destination.protocol === 'tel:' ? 'phone'
        : destination.protocol === 'mailto:' ? 'email'
          : destination.hostname === 'zalo.me' ? 'zalo' : 'other';
    }
  } catch { /* The event still identifies the action without collecting the raw URL. */ }
  return result;
}

export function referralCopyPayload(data, pagePath, consentChoice) {
  return payload('referral_code_copy', data, pagePath, consentChoice);
}

export function searchTrackingPayload(count, pagePath, consentChoice) {
  if (!Number.isInteger(count) || count < 0) return null;
  const result = payload('site_search', {}, pagePath, consentChoice);
  return result ? { ...result, result_count: count } : null;
}
