/**
 * Illustrative imagery for layout only - NOT All4One project photos.
 * Real work lives in GALLERY_ITEMS / Instagram.
 *
 * We keep stock usage minimal. When needed, prefer modest suburban
 * homes (ranch, brick, vinyl siding) - not luxury or modern builds.
 */

const publicBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Local hero backdrop - clean porch exterior (reference mood, not a client photo) */
export const HERO_BACKDROP = {
  src: `${publicBasePath}/hero/hero-backdrop.png`,
  alt: "Illustration of a clean, well-maintained home porch and exterior",
};
