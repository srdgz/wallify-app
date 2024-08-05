import { TextStyle } from "react-native";

interface Colors {
  primary: string;
  secondary: string;
  background: string;
  primaryText: string;
  secondaryText: string;
  white: string;
  border: string;
  neutral: (opacity: number) => string;
}

interface FontWeights {
  medium: TextStyle["fontWeight"];
  semibold: TextStyle["fontWeight"];
  bold: TextStyle["fontWeight"];
}

interface Radius {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface Theme {
  colors: Colors;
  fontWeights: FontWeights;
  radius: Radius;
}

export const theme: Theme = {
  colors: {
    primary: "#FF6F61",
    secondary: "#6B4FBA",
    background: "#F5F5F5",
    primaryText: "#333333",
    secondaryText: "#757575",
    white: "#FFFFFF",
    border: "#E0E0E0",
    neutral: (opacity: number) => `rgba(10, 10, 10, ${opacity})`,
  },
  fontWeights: {
    medium: "500" as TextStyle["fontWeight"],
    semibold: "600" as TextStyle["fontWeight"],
    bold: "700" as TextStyle["fontWeight"],
  },
  radius: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
  },
};
