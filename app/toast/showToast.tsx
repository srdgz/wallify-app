import Toast from "react-native-toast-message";
import { ToastProps } from "../constants/types";

export const showToast = ({ message }: ToastProps) => {
  Toast.show({
    type: "success",
    text1: message,
    position: "bottom",
  });
};
