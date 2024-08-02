import React from "react";
import { Stack } from "expo-router";

const AffirmationsLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, animation: "ios" }}
      />
      <Stack.Screen
        name="[id]"
        options={{ headerShown: false, animation: "ios" }}
      />
    </Stack>
  );
};

export default AffirmationsLayout;
