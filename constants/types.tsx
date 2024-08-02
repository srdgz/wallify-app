import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { ViewStyle } from "react-native";
import { data } from "./data";

export type Category = string | null;

export type Texting = string;

export type SectionViewProps = {
  title: string;
  content: React.ReactNode;
};

export type FilterKey = keyof Filters;

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
  order?: string[];
  orientation?: string[];
  type?: string[];
  colors?: string[];
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

export interface FiltersModalProps {
  modalRef: React.RefObject<BottomSheetModal>;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  onClose: () => void;
  onApply: () => void;
  onReset: () => void;
}

export interface BottomSheetBackdropProps {
  animatedIndex: unknown;
  style: ViewStyle;
}

export interface Translations {
  [key: string]: string;
}

export interface Filters {
  order: string[];
  orientation: string[];
  type: string[];
  colors: string[];
}

export interface FiltersTranslations {
  order: Translations;
  orientation: Translations;
  type: Translations;
  colors: Translations;
  titles: Translations;
}

export interface CommomFiltersRowProps {
  filterType: keyof typeof data.filters;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}
