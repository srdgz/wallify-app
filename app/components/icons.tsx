import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "@/app/constants/theme";
import { IconProps } from "@/app/constants/types";

export const FilterIcon: React.FC<IconProps> = () => (
  <Ionicons
    name="color-filter-outline"
    size={24}
    color={theme.colors.neutral(0.7)}
  />
);

export const SearchIcon: React.FC<IconProps> = () => (
  <Ionicons name="search-outline" size={24} color={theme.colors.neutral(0.4)} />
);

export const CloseIcon: React.FC<IconProps> = ({
  color = theme.colors.neutral(0.6),
  size = 24,
}) => <Ionicons name="close-circle-outline" size={size} color={color} />;

export const ClearIcon: React.FC<IconProps> = () => (
  <Ionicons name="close-outline" size={14} color={theme.colors.neutral(0.9)} />
);

export const DownloadIcon: React.FC<IconProps> = () => (
  <Ionicons name="download-outline" size={24} color="white" />
);

export const ShareIcon: React.FC<IconProps> = () => (
  <Ionicons name="share-social" size={24} color="white" />
);
