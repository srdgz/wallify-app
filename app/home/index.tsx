import React, { useRef, useState } from "react";

import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "@/constants/theme";
import { hp, wp } from "@/helpers/common";
import { CloseIcon, FilterIcon, SearchIcon } from "@/components/icons";
import { ScrollView } from "react-native-gesture-handler";

const HomeScreen: React.FC = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const [search, setSearch] = useState("");
  const searchInputRef = useRef<TextInput | null>(null);

  const clearSearch = () => {
    setSearch("");
    if (searchInputRef.current) {
      searchInputRef.current.clear();
    }
  };

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
            onChangeText={(value) => setSearch(value)}
            style={styles.searchInput}
          />
          {search && (
            <Pressable style={styles.closeIcon} onPress={clearSearch}>
              <CloseIcon />
            </Pressable>
          )}
        </View>
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
});
