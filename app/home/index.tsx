import React, { useCallback, useEffect, useRef, useState } from "react";

import Categories from "@/components/categories";
import ImageGrid from "@/components/imageGrid";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/icons";
import { ScrollView } from "react-native-gesture-handler";
import { apiCall, ApiResponse, ImageData } from "@/api";
import { debounce } from "lodash";

type Category = string | null;
type Texting = string;

const HomeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const searchInputRef = useRef<TextInput | null>(null);
  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [page, setPage] = useState<number>(1);

  const fetchImages = async (
    params: { page?: number; q?: string } = { page: 1 },
    append = true
  ) => {
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
    }
  };

  const clearSearch = () => {
    setSearch("");
    if (searchInputRef.current) {
      searchInputRef.current.clear();
    }
  };

  const handleSearch = (text: Texting) => {
    setSearch(text);
    if (text.length > 2) {
      setPage(1);
      setImages([]);
      fetchImages({ page, q: text });
    }
    if (text == "") {
      setPage(1);
      searchInputRef?.current?.clear();
      setImages([]);
      fetchImages({ page });
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  const handleChangeCategory = (cat: Category) => {
    setActiveCategory((prevCategory) => (prevCategory === cat ? null : cat));
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
      <ScrollView contentContainerStyle={{ gap: 15 }}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <SearchIcon />
          </View>
          <TextInput
            placeholder="Busca tu foto..."
            value={search}
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
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
        <View>{images.length > 0 && <ImageGrid images={images} />}</View>
      </ScrollView>
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
