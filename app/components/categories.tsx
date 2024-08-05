import React from "react";
import Animated, { FadeInRight } from "react-native-reanimated";
import { FlatList, Text, StyleSheet, Pressable } from "react-native";
import { data } from "@/app/constants/data";
import { hp, wp } from "@/app/helpers/common";
import { theme } from "@/app/constants/theme";
import { CategoriesProps, CategoryItemProps } from "@/app/constants/types";

const Categories: React.FC<CategoriesProps> = ({
  activeCategory,
  handleChangeCategory,
}) => {
  return (
    <FlatList
      horizontal
      contentContainerStyle={styles.flatlistContainer}
      showsHorizontalScrollIndicator={false}
      data={data.categories}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <CategoryItem
          title={data.categoryTranslations[item]}
          originalTitle={item}
          index={index}
          isActive={activeCategory === item}
          handleChangeCategory={handleChangeCategory}
        />
      )}
    />
  );
};

const CategoryItem: React.FC<CategoryItemProps & { originalTitle: string }> = ({
  title,
  originalTitle,
  index,
  isActive,
  handleChangeCategory,
}) => {
  let color = isActive ? theme.colors.white : theme.colors.neutral(0.8);
  let backgroundColor = isActive ? theme.colors.secondary : theme.colors.white;
  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)
        .duration(1000)
        .springify()
        .damping(14)}
    >
      <Pressable
        style={[styles.category, { backgroundColor }]}
        onPress={() => handleChangeCategory(isActive ? null : originalTitle)}
      >
        <Text style={[styles.title, { color }]}>{title}</Text>
      </Pressable>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  flatlistContainer: {
    paddingHorizontal: wp(4),
    gap: 8,
  },
  category: {
    padding: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
    // backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
  title: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.medium,
  },
});
