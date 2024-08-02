import React from "react";
import { theme } from "@/constants/theme";
import { SectionViewProps, CommomFiltersRowProps } from "@/constants/types";
import { hp } from "@/helpers/common";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { data } from "@/constants/data";

const SectionView: React.FC<SectionViewProps> = ({ title, content }) => {
  const translatedTitle =
    data.filtersTranslations.titles[
      title as keyof typeof data.filtersTranslations.titles
    ] || title;
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{translatedTitle}</Text>
      <View>{content}</View>
    </View>
  );
};

export const CommomFiltersRow: React.FC<CommomFiltersRowProps> = ({
  filterType,
  filters,
  setFilters,
}) => {
  const filterOptions = data.filters[filterType];
  const filterTranslations = data.filtersTranslations[filterType];

  const onSelect = (item: string) => {
    setFilters({
      ...filters,
      [filterType]: [item],
    });
  };

  return (
    <View style={styles.flexRowWrap}>
      {filterOptions.map((option, index) => {
        const isActive = filters[filterType]?.includes(option);
        const backgroundColor = isActive
          ? theme.colors.secondary
          : theme.colors.white;
        const color = isActive
          ? theme.colors.white
          : theme.colors.secondaryText;
        return (
          <Pressable
            onPress={() => onSelect(option)}
            key={index}
            style={[styles.filterButton, { backgroundColor }]}
          >
            <Text style={[styles.outlinedButtonText, { color }]}>
              {filterTranslations[option as keyof typeof filterTranslations] ||
                option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export const ColorFilter: React.FC<CommomFiltersRowProps> = ({
  filterType,
  filters,
  setFilters,
}) => {
  const filterOptions = data.filters[filterType];

  const onSelect = (item: string) => {
    setFilters({
      ...filters,
      [filterType]: [item],
    });
  };

  return (
    <View style={styles.flexRowWrap}>
      {filterOptions.map((option, index) => {
        const isActive = filters[filterType]?.includes(option);
        const borderColor = isActive ? theme.colors.border : "white";

        return (
          <Pressable onPress={() => onSelect(option)} key={index}>
            <View style={[styles.colorWrapper, { borderColor }]}>
              <View style={[styles.color, { backgroundColor: option }]} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SectionView;

const styles = StyleSheet.create({
  sectionContainer: {
    gap: 8,
  },
  sectionTitle: {
    fontSize: hp(2.4),
    fontWeight: theme.fontWeights.medium,
    color: theme.colors.secondaryText,
  },
  flexRowWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterButton: {
    padding: 8,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.xs,
    borderCurve: "continuous",
    backgroundColor: theme.colors.white,
  },
  outlinedButtonText: {},
  colorWrapper: {
    padding: 3,
    borderRadius: theme.radius.sm,
    borderWidth: 2,
    borderCurve: "continuous",
  },
  color: {
    height: 30,
    width: 40,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
  },
});
