import { ExpoConfig, ConfigContext } from "@expo/config";
import "dotenv/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const pixabayApiKey = process.env.PIXABAY_API_KEY || "";

  return {
    ...config,
    name: "wallify-app",
    slug: "wallify-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/wallify-logo.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/wallify-splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      package: "com.yourcompany.wallifyapp",
      adaptiveIcon: {
        foregroundImage: "./assets/images/wallify-logo.png",
        backgroundColor: "#ffffff",
      },
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/wallify-logo.png",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      pixabayApiKey,
    },
  };
};
