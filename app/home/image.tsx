import React, { useState } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import Toast from "react-native-toast-message";
import { hp, wp } from "@/app/helpers/common";
import { BlurView } from "expo-blur";
import {
  ActivityIndicator,
  Alert,
  Platform,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { theme } from "@/app/constants/theme";
import { CloseIcon, DownloadIcon, ShareIcon } from "@/app/components/icons";
import { showToast } from "../toast/showToast";
import { toastConfig } from "../toast/toastConfig";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";

const ImageScreen: React.FC = () => {
  const [status, setStatus] = useState("");
  const router = useRouter();
  const item = useLocalSearchParams();
  let uri = item?.webformatURL;
  const previewURL = item?.previewURL;
  const fileName =
    typeof previewURL === "string" ? previewURL.split("/").pop() : undefined;
  const imageUrl = uri;
  const filePath = `${FileSystem.documentDirectory}${fileName}`;

  if (!imageUrl || typeof imageUrl !== "string") {
    Alert.alert("Error", "La URL de la imagen no es válida.");
    return;
  }

  const getSize = () => {
    const aspectRatio = Number(item?.imageWidth) / Number(item?.imageHeight);
    const maxWidth = Platform.OS == "web" ? wp(50) : wp(92);
    let calculatedHeight = maxWidth / aspectRatio;
    let calculatedWidth = maxWidth;

    if (aspectRatio < 1) {
      calculatedWidth = calculatedHeight * aspectRatio;
    }
    return {
      width: calculatedWidth,
      height: calculatedHeight,
    };
  };

  const onLoad = () => {
    setStatus("");
  };

  const downloadFile = async () => {
    try {
      const { uri } = await FileSystem.downloadAsync(imageUrl, filePath);
      setStatus("");
      return uri;
    } catch (error: unknown) {
      console.error("Error: ", (error as Error).message);
      setStatus("");
      Alert.alert(
        "Error",
        "Hubo un error al descargar la imagen. Inténtalo más tarde."
      );
      return null;
    }
  };

  const handleDownloadImage = async () => {
    if (Platform.OS == "web") {
      const anchor = document.createElement("a");
      anchor.href = imageUrl;
      anchor.target = "_blank";
      anchor.download = fileName || "download";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } else {
      setStatus("downloading");
      let uri = await downloadFile();
      if (uri) {
        showToast({ message: "Imagen descargada" });
      }
    }
  };

  const handleShareImage = async () => {
    if (Platform.OS == "web") {
      showToast({ message: "Link copiado" });
    } else {
      setStatus("sharing");
      let uri = await downloadFile();
      if (uri) {
        await Sharing.shareAsync(uri);
      }
    }
  };

  return (
    <BlurView tint="dark" intensity={60} style={styles.container}>
      <View style={getSize()}>
        <View style={styles.loading}>
          {status == "loading" && (
            <ActivityIndicator size="large" color="white" />
          )}
        </View>
        <Image
          transition={100}
          style={[styles.image, getSize()]}
          source={uri}
          onLoad={onLoad}
        />
      </View>
      <View style={styles.buttons}>
        <Animated.View entering={FadeInDown.springify()}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <CloseIcon color="white" />
          </Pressable>
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(100)}>
          {status == "downloading" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleDownloadImage}>
              <DownloadIcon />
            </Pressable>
          )}
        </Animated.View>
        <Animated.View entering={FadeInDown.springify().delay(200)}>
          {status == "sharing" ? (
            <View style={styles.button}>
              <ActivityIndicator size="small" color="white" />
            </View>
          ) : (
            <Pressable style={styles.button} onPress={handleShareImage}>
              <ShareIcon />
            </Pressable>
          )}
        </Animated.View>
      </View>
      <Toast config={toastConfig} visibilityTime={2500} />
    </BlurView>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp(4),
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  image: {
    borderRadius: theme.radius.lg,
    borderWidth: 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  loading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 50,
  },
  button: {
    height: hp(6),
    width: hp(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: theme.radius.lg,
    borderCurve: "continuous",
  },
});
