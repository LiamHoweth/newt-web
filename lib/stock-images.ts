/**
 * Illustrative imagery for layout only - NOT All4One project photos.
 * Real work lives in GALLERY_ITEMS / Instagram.
 *
 * We keep stock usage minimal. When needed, prefer modest suburban
 * homes (ranch, brick, vinyl siding) - not luxury or modern builds.
 */

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Local hero backdrop — illustrative before/after driveway wash (not a client photo) */
export const HERO_BACKDROP = {
  src: `${publicBasePath}/hero/hero-backdrop.png`,
  alt: "Before and after comparison of a pressure-washed concrete driveway",
};
