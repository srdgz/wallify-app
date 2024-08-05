import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ToastConfig } from "react-native-toast-message";
import { theme } from "@/app/constants/theme";
import { hp } from "@/app/helpers/common";

export const CustomToast = ({ text1 }: { text1: string }) => (
  <View style={styles.toast}>
    <Text style={styles.toastText}>{text1}</Text>
  </View>
);

export const toastConfig: ToastConfig = {
  success: ({ text1 }) => <CustomToast text1={text1 || ""} />,
};

const styles = StyleSheet.create({
  toast: {
    padding: 15,
    paddingHorizontal: 30,
    borderRadius: theme.radius.xl,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  toastText: {
    fontSize: hp(1.8),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.white,
  },
});
