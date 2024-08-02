import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Content from "./Content";

interface IAppgradient {
  children: any;
  colors: string[];
}

const AppGradient = ({ children, colors }: IAppgradient) => {
  return (
    <LinearGradient colors={colors} className="flex-1">
      <Content>{children}</Content>
    </LinearGradient>
  );
};

export default AppGradient;
