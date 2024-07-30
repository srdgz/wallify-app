import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const pixabayApiKey = process.env.PIXABAY_API_KEY || "";

  return {
    ...config,
    extra: {
      pixabayApiKey,
    },
    name: config.name || "Default App Name",
    description: config.description || "Default App Description",
    slug: config.slug || "default-app-slug",
  };
};
