import React, { useEffect, useRef, useState } from "react";

import Categories from "@/components/categories";
import ImageGrid from "@/components/imageGrid";
import SkeletonLoader from "@/components/skeletonLoader";
import Animated, { FadeInDown } from "react-native-reanimated";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/icons";
import { apiCall, ApiResponse, ImageData } from "@/api";

type Category = string | null;
type Texting = string;

interface FetchImagesParams {
  page?: number;
  q?: string;
  category?: string | null;
}

const HomeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const searchInputRef = useRef<TextInput | null>(null);
  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchImages = async (
    params: FetchImagesParams = { page: 1 },
    append = true
  ) => {
    setLoading(true);
    try {
      const res: ApiResponse = await apiCall(params);

      if (res.success && res.data?.hits) {
        setImages((prevImages) => {
          if (res.data && res.data.hits) {
            return append ? [...prevImages, ...res.data.hits] : res.data.hits;
          }
          return prevImages;
        });
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setSearch("");
    setImages([]);
    setActiveCategory(null);
    fetchImages({ page: 1 }, false);
  };

  const handleSearch = (text: Texting) => {
    setSearch(text);
    if (text.length > 2) {
      setPage(1);
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page: 1, q: text }, false);
    } else if (text === "") {
      clearSearch();
    }
  };

  const handleChangeCategory = (cat: Category) => {
    clearSearch();
    setPage(1);
    setImages([]);
    const newCategory = activeCategory === cat ? null : cat;
    setActiveCategory(newCategory);
    fetchImages({ page: 1, category: newCategory }, false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.title}>Wallify</Text>
        </Pressable>
        <Pressable>
          <FilterIcon />
        </Pressable>
      </View>
      <View style={styles.searchBar}>
        <View style={styles.searchIcon}>
          <SearchIcon />
        </View>
        <TextInput
          placeholder="Busca tu foto..."
          value={search}
          ref={searchInputRef}
          onChangeText={handleSearch}
          style={styles.searchInput}
        />
        {search && (
          <Pressable style={styles.closeIcon} onPress={clearSearch}>
            <CloseIcon />
          </Pressable>
        )}
      </View>
      <View style={styles.categories}>
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
      <Animated.ScrollView
        contentContainerStyle={{ gap: 15 }}
        entering={FadeInDown.duration(800)}
        style={{ flex: 1 }}
      >
        <View>
          {loading ? (
            <SkeletonLoader />
          ) : (
            images.length > 0 && <ImageGrid images={images} />
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9),
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 8,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    padding: 8,
    borderRadius: theme.radius.sm,
  },
  categories: {},
});
