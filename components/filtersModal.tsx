import React, { useMemo } from "react";
import SectionView, { ColorFilter, CommomFiltersRow } from "./filtersViews";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Filters, FiltersModalProps } from "@/constants/types";
import { BlurView } from "expo-blur";
import { theme } from "@/constants/theme";
import { hp } from "@/helpers/common";
import { data } from "@/constants/data";

const FiltersModal: React.FC<FiltersModalProps> = ({
  modalRef,
  filters,
  setFilters,
  onClose,
  onApply,
  onReset,
}) => {
  const snapPoints = useMemo(() => ["75%"], []);

  return (
    <BottomSheetModal
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backdropComponent={CustomBackdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        <View style={styles.content}>
          <Text style={styles.filterText}>Filtros</Text>
          {Object.keys(sections).map((sectionName) => {
            const SectionComponent = sections[sectionName];
            const translatedTitle =
              data.filtersTranslations.titles[
                sectionName as keyof typeof data.filtersTranslations.titles
              ] || sectionName;
            return (
              <View key={sectionName}>
                <SectionView
                  title={translatedTitle}
                  content={
                    <SectionComponent
                      filterType={sectionName as keyof typeof data.filters}
                      filters={filters}
                      setFilters={setFilters}
                    />
                  }
                />
              </View>
            );
          })}
          <View style={styles.buttonContainer}>
            <Pressable onPress={onReset} style={styles.resetButton}>
              <Text
                style={[
                  styles.buttonText,
                  { color: theme.colors.secondaryText },
                ]}
              >
                Resetear
              </Text>
            </Pressable>
            <Pressable onPress={onApply} style={styles.applyButton}>
              <Text style={[styles.buttonText, { color: theme.colors.white }]}>
                Aplicar
              </Text>
            </Pressable>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const OrderView: React.FC<{
  filterType: keyof typeof data.filters;
  filters: Filters;
  setFilters: (filters: Filters) => void;
}> = ({ filterType, filters, setFilters }) => {
  return (
    <View>
      <Text>Section View</Text>
    </View>
  );
};

const sections: {
  [key: string]: React.FC<{
    filterType: keyof typeof data.filters;
    filters: Filters;
    setFilters: (filters: Filters) => void;
  }>;
} = {
  order: CommomFiltersRow,
  orientation: CommomFiltersRow,
  type: CommomFiltersRow,
  colors: ColorFilter,
};

const CustomBackdrop: React.FC<BottomSheetBackdropProps> = ({
  animatedIndex,
  style,
}) => {
  const containerAnimatedStyle = useAnimatedStyle(() => {
    let opacity = interpolate(
      animatedIndex.value,
      [-1, 0],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const containerStyle = [
    StyleSheet.absoluteFill,
    style,
    styles.overlay,
    containerAnimatedStyle,
  ];

  return (
    <Animated.View style={containerStyle}>
      <BlurView style={StyleSheet.absoluteFill} tint="dark" intensity={25} />
    </Animated.View>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  content: {
    flex: 1,
    gap: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  filterText: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.primaryText,
    marginBottom: 5,
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  applyButton: {
    flex: 1,
    padding: 12,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primary,
  },
  resetButton: {
    flex: 1,
    padding: 12,
    borderRadius: theme.radius.sm,
    borderCurve: "continuous",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.border,
  },
  buttonText: {
    fontSize: hp(2.2),
    color: "white",
    fontWeight: "bold",
  },
});
