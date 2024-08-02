import { View, Text, Pressable, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import AppGradient from "@/components/AppGradient";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { TimerContext } from "@/context/TimerContext";

const AdjustMeditationDuration = () => {
  const { setDuration } = useContext(TimerContext);

  const handlePress = (duration: Number) => {
    setDuration(duration);
    router.back();
  };

  return (
    <View className="flex-1 relative">
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-24 z-10 left-6 bg-white/30 p-3 rounded-full"
        >
          <AntDesign name="left" size={30} color="white" />
        </TouchableOpacity>

        <View className="justify-center h-4/5">
          <Text className="text-center font-bold text-3xl text-white mb-8">
            Adjust your meditation duration
          </Text>

          <View className="items-center">
            <CustomButton
              title="5 minutes"
              onPress={() => handlePress(5 * 60)}
              containerStyle="w-56 mb-3"
            ></CustomButton>
            <CustomButton
              title="10 minutes"
              onPress={() => handlePress(10 * 60)}
              containerStyle="w-56 mb-3"
            ></CustomButton>
            <CustomButton
              title="20 minutes"
              onPress={() => handlePress(20 * 60)}
              containerStyle="w-56 mb-3"
            ></CustomButton>
            <CustomButton
              title="30 minutes"
              onPress={() => handlePress(30 * 60)}
              containerStyle="w-56 mb-3"
            ></CustomButton>
          </View>
        </View>
      </AppGradient>
    </View>
  );
};

export default AdjustMeditationDuration;
