import { View, TouchableOpacity, Text } from "react-native";

export default function TabBar({
  state,
  descriptors,
  navigation,
  pathname,
}: any) {
  // console.log(pathname);
  return (
    <View
      className={`absolute bottom-4 flex-row bg-white/70 mx-10 p-4 rounded-full ${
        pathname.includes("/affirmations/") ? "hidden" : ""
      }`}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center"
            style={{ flex: 1 }}
          >
            <Text
              className="text-xl px-5 py-2 rounded-3xl"
              style={{
                color: isFocused ? "white" : "#222",
                backgroundColor: isFocused
                  ? "rgba(22, 78, 99, 0.7)"
                  : "transparent",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
