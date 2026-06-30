export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  service: string;
  caption: string;
}

/** Work photos sourced from @all4one.exteriorsolutions on Instagram — real project photos only. */
export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "siding-before-after",
    src: "/gallery/siding-before-after.jpg",
    alt: "Before and after siding cleaning on a home in the Norman area",
    service: "Siding Cleaning",
    caption:
      "Before & after siding wash — dirt and mildew gone, curb appeal restored.",
  },
  {
    id: "trash-cans-deep-clean",
    src: "/gallery/trash-cans-deep-clean.jpg",
    alt: "Deep cleaned and sanitized residential trash cans",
    service: "Trash Can Cleaning",
    caption:
      "Deep clean and sanitize — even the toughest, smelliest cans look fresh again.",
  },
  {
    id: "trash-cans-sanitize",
    src: "/gallery/trash-cans-sanitize.jpg",
    alt: "Sanitized trash cans free of odors and grime",
    service: "Trash Can Cleaning",
    caption:
      "Odors and grime handled. Same-day cleaning available.",
  },
];

