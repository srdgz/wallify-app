import { Dimensions, useWindowDimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const wp = (percentage: number): number => {
  const width = deviceWidth;
  return (percentage * width) / 100;
};

export const hp = (percentage: number): number => {
  const height = deviceHeight;
  return (percentage * height) / 100;
};

export const getImageSize = (height: number, width: number): number => {
  if (width > height) {
    return 250;
  } else if (width < height) {
    return 300;
  } else {
    return 200;
  }
};

export const capitalize = (str: string): string => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};