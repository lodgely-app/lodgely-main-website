// Prices shown on /developer/pricing and /facility/pricing, read from the
// NEXT_PUBLIC_* env vars (see .env.example). NEXT_PUBLIC_ values are baked in
// at build time, so after changing one the site has to be rebuilt/redeployed.
// Each falls back to the current price when the variable is missing or invalid.
//
// Keep these in step with the real charges: Developer plans live in
// developer-service (Back Office → Developer → Plans) and the Facility fee in
// payment-service (Back Office → Facility → Fees).

function num(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return value !== undefined && value.trim() !== '' && Number.isFinite(n) && n >= 0 ? n : fallback;
}

// Each process.env.NEXT_PUBLIC_* must be written out in full so Next.js can inline it.
export const DEVELOPER_PRICING = {
  /** ₦ per user per month, billed monthly. */
  proMonthly: num(process.env.NEXT_PUBLIC_DEV_PRO_MONTHLY_PRICE, 3500),
  /** ₦ per user per month, billed yearly. */
  proYearly: num(process.env.NEXT_PUBLIC_DEV_PRO_YEARLY_PRICE, 3000),
  proStorageGb: num(process.env.NEXT_PUBLIC_DEV_PRO_STORAGE_GB, 50),
  storageBlockGb: num(process.env.NEXT_PUBLIC_DEV_STORAGE_BLOCK_GB, 10),
  /** ₦ per storage block per month. */
  storageBlockMonthly: num(process.env.NEXT_PUBLIC_DEV_STORAGE_BLOCK_PRICE, 500),
  freeUsers: num(process.env.NEXT_PUBLIC_DEV_FREE_USERS, 1),
  freeProjects: num(process.env.NEXT_PUBLIC_DEV_FREE_PROJECTS, 3),
  freeBoqs: num(process.env.NEXT_PUBLIC_DEV_FREE_BOQS, 3),
  freeStorageGb: num(process.env.NEXT_PUBLIC_DEV_FREE_STORAGE_GB, 3),
};

export const FACILITY_PRICING = {
  /** Platform fee, % of each resident payment. */
  feePercent: num(process.env.NEXT_PUBLIC_FACILITY_FEE_PERCENT, 3),
};

export const naira = (n: number) => `₦${Math.round(n).toLocaleString('en-NG')}`;

/** "Save 14%" on the yearly toggle, worked out from the two prices. */
export const yearlySavePercent = () => {
  const { proMonthly, proYearly } = DEVELOPER_PRICING;
  return proMonthly > 0 ? Math.max(0, Math.round(((proMonthly - proYearly) / proMonthly) * 100)) : 0;
};

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;
