export interface IAffirmationCategory {
  title: string;
  data: GalleryPreviewData[];
}

export interface GalleryPreviewData {
  id: number;
  text: string;
  image: any;
}
