import React from "react";
import { theme } from "@/constants/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

interface FilterIconProps {
  name?: string;
  size?: number;
  color?: string;
}

export const FilterIcon: React.FC<FilterIconProps> = () => (
  <Ionicons
    name="color-filter-outline"
    size={22}
    color={theme.colors.neutral(0.7)}
  />
);
