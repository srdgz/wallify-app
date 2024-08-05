import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { getImageSize, wp } from "@/app/helpers/common";
import { theme } from "@/app/constants/theme";
import { ImageCardProps } from "@/app/constants/types";

const ImageCard: React.FC<ImageCardProps> = ({
  item,
  index,
  columns,
  router,
}) => {
  const getImageHeight = () => {
    let { imageHeight: height, imageWidth: width } = item;
    return { height: getImageSize(height, width) };
  };

  const isLastInRow = () => {
    return (index + 1) % columns === 0;
  };

  return (
    <Pressable
      style={[styles.imageWrapper, !isLastInRow() && styles.spacing]}
      onPress={() =>
        router.push({ pathname: "home/image", params: { ...item } })
      }
    >
      <Image
        style={[styles.image, getImageHeight()]}
        source={item?.webformatURL}
        transition={100}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    backgroundColor: theme.colors.border,
    borderRadius: theme.radius.xl,
    borderCurve: "continuous",
    overflow: "hidden",
    marginBottom: wp(2),
  },
  spacing: {
    marginRight: wp(2),
  },
  image: {
    width: "100%",
    height: 300,
  },
});

export default ImageCard;