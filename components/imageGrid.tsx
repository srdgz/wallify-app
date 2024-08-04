import React from "react";
import ImageCard from "./imageCard";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { MasonryFlashList } from "@shopify/flash-list";
import { wp } from "@/helpers/common";
import { ImageGridProps } from "@/constants/types";

const ImageGrid: React.FC<ImageGridProps> = ({ images, router }) => {
  const { width: deviceWidth, height: deviceHeight } = useWindowDimensions();

  const getColumnCount = (): number => {
    if (deviceWidth >= 1024) {
      return 4;
    } else if (deviceWidth >= 768) {
      return 3;
    } else {
      return 2;
    }
  };

  const columns = getColumnCount();

  return (
    <View style={styles.container}>
      <MasonryFlashList
        data={images}
        numColumns={columns}
        contentContainerStyle={styles.listContainerStyle}
        renderItem={({ item, index }) => (
          <ImageCard
            item={item}
            index={index}
            columns={columns}
            router={router}
          />
        )}
        estimatedItemSize={200}
      />
    </View>
  );
};

export default ImageGrid;

const styles = StyleSheet.create({
  container: {
    minHeight: 3,
    width: wp(100),
  },
  listContainerStyle: {
    paddingHorizontal: wp(4),
  },
});
