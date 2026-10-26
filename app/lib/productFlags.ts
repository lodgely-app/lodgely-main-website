// Products that aren't publicly ready yet. Flipping the matching env var to
// 'true' (and redeploying) is the only thing needed to bring a product back
// — nothing about these apps is deleted, only their discoverability (nav,
// product cards/sections, footer, search) and their own route's visibility.
//
// NEXT_PUBLIC_* so the same value is available in both server and client
// components — Next.js inlines these at build time either way.
export const SHOW_REALTOR = process.env.NEXT_PUBLIC_SHOW_REALTOR === 'true';
export const SHOW_INVESTMENT = process.env.NEXT_PUBLIC_SHOW_INVESTMENT === 'true';
export const SHOW_OWNER = process.env.NEXT_PUBLIC_SHOW_OWNER === 'true';

export type ProductId = 'developer' | 'facility' | 'realtor' | 'investment' | 'resident' | 'owner';

// Human-readable name + role-noun forms, reused anywhere marketing copy
// needs to list the currently-visible products/roles without hardcoding
// which ones happen to be live right now.
export const PRODUCT_META: Record<ProductId, { name: string; role: string; visible: boolean }> = {
  developer: { name: 'Developer', role: 'developers', visible: true },
  facility: { name: 'Facility', role: 'facility managers', visible: true },
  realtor: { name: 'Realtor', role: 'realtors', visible: SHOW_REALTOR },
  investment: { name: 'Investment', role: 'investors', visible: SHOW_INVESTMENT },
  resident: { name: 'Resident', role: 'residents', visible: true },
  owner: { name: 'Owner', role: 'owners', visible: SHOW_OWNER },
};

export function isProductVisible(id: string): boolean {
  return PRODUCT_META[id as ProductId]?.visible ?? true;
}

export const VISIBLE_PRODUCT_IDS: ProductId[] = (
  Object.keys(PRODUCT_META) as ProductId[]
).filter((id) => PRODUCT_META[id].visible);

export const VISIBLE_PRODUCT_NAMES = VISIBLE_PRODUCT_IDS.map((id) => PRODUCT_META[id].name);
export const VISIBLE_PRODUCT_ROLES = VISIBLE_PRODUCT_IDS.map((id) => PRODUCT_META[id].role);

// "Developer, Facility and Resident" / "Developer, Facility, Realtor and
// Resident" — an Oxford-comma-free "A, B and C" join, used wherever copy
// lists the live products/roles by name.
export function joinWithAnd(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  return `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`;
}
