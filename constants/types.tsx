export type Category = string | null;
export type Texting = string;

export interface Params {
  [key: string]: string | number;
}

export interface ImageData {
  id: number;
  webformatURL: string;
  imageHeight: number;
  imageWidth: number;
}

export interface ApiResponse {
  success: boolean;
  data?: {
    hits: ImageData[];
  };
  msg?: string;
}

export interface FetchImagesParams {
  page?: number;
  q?: string;
  category?: string | null;
}

export interface CategoriesProps {
  activeCategory: string | null;
  handleChangeCategory: (category: string | null) => void;
}

export interface CategoryItemProps {
  title: string;
  index: number;
  isActive: boolean;
  handleChangeCategory: (category: string | null) => void;
}

export interface IconProps {
  name?: string;
  size?: number;
  color?: string;
}

export interface ImageCardProps {
  item: ImageData;
  index: number;
  columns: number;
}

export interface ImageGridProps {
  images: ImageData[];
}
