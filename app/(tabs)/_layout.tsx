import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import TabBar from "@/components/TabBar";
import { usePathname } from "expo-router";

const TabsLayout = () => {
  const pathname = usePathname();

  //   console.log(pathname);
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} pathname={pathname} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="nature-meditate"
        options={{
          tabBarLabel: "Meditate",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="flower-tulip-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="affirmations"
        options={{
          tabBarLabel: "Affirmations",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="book-open-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
