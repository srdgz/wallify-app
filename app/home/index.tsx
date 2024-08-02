import React, { useEffect, useRef, useState } from "react";
import Categories from "@/components/categories";
import ImageGrid from "@/components/imageGrid";
import Loader from "@/components/loader";
import FiltersModal from "@/components/filtersModal";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import {
  ClearIcon,
  CloseIcon,
  FilterIcon,
  SearchIcon,
} from "@/components/icons";
import { apiCall } from "@/api";
import {
  Category,
  Texting,
  FetchImagesParams,
  ApiResponse,
  ImageData,
  Filters,
  FilterKey,
} from "@/constants/types";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { data } from "@/constants/data";

const iconPath = require("../../assets/images/wallify-logo.png");

const defaultFilters: Filters = {
  order: [],
  orientation: [],
  type: [],
  colors: [],
};

const HomeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const searchInputRef = useRef<TextInput | null>(null);
  const [search, setSearch] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const modalRef = useRef<BottomSheetModal>(null);
  const translateY = useSharedValue(0);

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
      translateY.value = withTiming(-1000, { duration: 600 });
    }
  };

  const clearSearch = () => {
    setSearch("");
    setImages([]);
    setActiveCategory(null);
    fetchImages({ page: 1, ...filters }, false);
  };

  const handleSearch = (text: Texting) => {
    setSearch(text);
    if (text.length > 2) {
      setImages([]);
      setActiveCategory(null);
      fetchImages({ page: 1, q: text, ...filters }, false);
    } else if (text === "") {
      clearSearch();
      fetchImages({ page: 1, ...filters }, false);
    }
  };

  const handleChangeCategory = (cat: Category) => {
    clearSearch();
    setImages([]);
    const newCategory = activeCategory === cat ? null : cat;
    setActiveCategory(newCategory);
    fetchImages({ page: 1, category: newCategory, ...filters }, false);
  };

  const loaderAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const openFiltersModal = () => {
    modalRef?.current?.present();
  };

  const closeFiltersModal = () => {
    modalRef?.current?.close();
  };

  const applyFilters = () => {
    if (filters) {
      const page = 1;
      setImages([]);
      let params: FetchImagesParams = {
        page,
        ...filters,
      };
      if (activeCategory) {
        params.category = activeCategory;
      }
      if (search) {
        params.q = search;
      }
      fetchImages(params, false);
    }
    closeFiltersModal();
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    fetchImages({ page: 1 }, false);
  };

  const clearThisFilter = (filterKey: FilterKey) => {
    const newFilters: Filters = { ...filters };
    newFilters[filterKey] = [];
    setFilters(newFilters);
    const page = 1;
    setImages([]);
    let params: FetchImagesParams = {
      page,
      ...newFilters,
    };
    if (activeCategory) {
      params.category = activeCategory;
    }
    if (search) {
      params.q = search;
    }
    fetchImages(params, false);
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some((filterValue) => filterValue.length > 0);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <View style={[styles.container, { paddingTop }]}>
      <View style={styles.header}>
        <Pressable style={styles.titleContainer}>
          <Image source={iconPath} style={styles.icon} />
          <Text style={styles.title}>Wallify</Text>
        </Pressable>
        <Pressable onPress={openFiltersModal}>
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
      <View>
        <Categories
          activeCategory={activeCategory}
          handleChangeCategory={handleChangeCategory}
        />
      </View>
      {hasActiveFilters() && (
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filters}
          >
            {Object.keys(filters).map((key) => {
              const filterKey = key as FilterKey;
              const filterValue = filters[filterKey];
              if (filterValue.length === 0) {
                return null;
              }
              return (
                <View key={key} style={styles.filterItem}>
                  {key === "colors" ? (
                    <View
                      style={{
                        height: 20,
                        width: 30,
                        borderRadius: 7,
                        backgroundColor: filterValue[0],
                      }}
                    />
                  ) : (
                    <Text style={styles.filterItemText}>
                      {filterValue
                        .map(
                          (value) => data.filtersTranslations[filterKey][value]
                        )
                        .join(", ")}
                    </Text>
                  )}
                  <Pressable
                    style={styles.filterCloseIcon}
                    onPress={() => clearThisFilter(filterKey)}
                  >
                    <ClearIcon />
                  </Pressable>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
      <View style={styles.content}>
        {loading ? (
          <Animated.View style={[styles.loaderContainer, loaderAnimatedStyle]}>
            <Loader />
          </Animated.View>
        ) : (
          <ScrollView contentContainerStyle={{ gap: 15 }} style={{ flex: 1 }}>
            <View>{images.length > 0 && <ImageGrid images={images} />}</View>
          </ScrollView>
        )}
      </View>
      <FiltersModal
        modalRef={modalRef}
        filters={filters}
        setFilters={setFilters}
        onClose={closeFiltersModal}
        onApply={applyFilters}
        onReset={resetFilters}
      />
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: hp(4),
    height: hp(4),
    marginRight: 8,
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
  filters: {
    padding: wp(4),
    gap: 10,
  },
  filterItem: {
    padding: 3,
    backgroundColor: theme.colors.border,
    flexDirection: "row",
    borderRadius: theme.radius.xs,
    gap: 10,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  filterItemText: {
    fontSize: hp(1.9),
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: theme.radius.xs,
  },
  content: {
    flex: 1,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
    zIndex: 1,
  },
});
