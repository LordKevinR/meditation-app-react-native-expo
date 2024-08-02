// import { Slot } from "expo-router";

// const RootLayout = () => {
//   return <Slot />;
// };

// export default RootLayout;

import TimerProvider from "@/context/TimerContext";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <TimerProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Ocultar el header en todas las páginas
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, animation: "ios" }}
        />
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: "ios" }}
        />
        <Stack.Screen
          name="meditation/[id]"
          options={{
            headerShown: false,
            animation: "ios",
          }}
        />
        <Stack.Screen
          name="(modal)/adjust-meditation-duration"
          options={{
            headerShown: false,
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </TimerProvider>
  );
};

export default RootLayout;
