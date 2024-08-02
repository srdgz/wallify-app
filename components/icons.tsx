import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { theme } from "@/constants/theme";
import { IconProps } from "@/constants/types";

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

export const CloseIcon: React.FC<IconProps> = () => (
  <Ionicons
    name="close-circle-outline"
    size={24}
    color={theme.colors.neutral(0.6)}
  />
);
