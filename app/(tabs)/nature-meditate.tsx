import { View, Text, FlatList, Pressable, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import AppGradient from "@/components/AppGradient";
import { StatusBar } from "expo-status-bar";
import { MEDITATION_DATA } from "@/constants/meditation-data";
import meditationImages from "@/constants/meditation-images";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const NatureMeditate = () => {
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <AppGradient colors={["#161b2e", "#0a4d4a", "#766e67"]}>
        <View className="mb-6">
          <Text className="text-gray-200 mb-3 font-bold text-4xl text-left">
            Welcome
          </Text>
          <Text className="text-indigo-100 text-xl font-medium">
            Start your meditation practice today
          </Text>
        </View>
        <View>
          <FlatList
            data={MEDITATION_DATA}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => router.push(`/meditation/${item.id}`)}
                className={`h-48 my-3 rounded-3xl overflow-hidden ${
                  index === MEDITATION_DATA.length - 1 ? "mb-64" : ""
                }`}
              >
                <ImageBackground
                  source={meditationImages[item.id - 1]}
                  resizeMode="cover"
                  className="flex-1 rounded-lg justify-center"
                >
                  <LinearGradient
                    className="flex-1 justify-center items-center"
                    colors={["transparent", "rgba(0,0,0,0.8)"]}
                  >
                    <Text className="text-gray-100 text-3xl font-bold text-center">
                      {item.title}
                    </Text>
                  </LinearGradient>
                </ImageBackground>
              </Pressable>
            )}
          />
        </View>
      </AppGradient>
    </View>
  );
};

export default NatureMeditate;
