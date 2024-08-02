import { View, ImageBackground, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { GalleryPreviewData } from "@/models/AffirmationCategory";
import AFFIRMATION_GALLERY from "@/constants/affirmation-gallery";
import { AntDesign } from "@expo/vector-icons";
import AppGradient from "@/components/AppGradient";

const AffirmationPractice = () => {
  const { id } = useLocalSearchParams();
  const [affirmation, setAffirmation] = useState<GalleryPreviewData>();

  useEffect(() => {
    for (let idx = 0; idx < AFFIRMATION_GALLERY.length; idx++) {
      const affirmationData = AFFIRMATION_GALLERY[idx].data;
      const affirmationToStart = affirmationData.find(
        (data) => data.id === Number(id)
      );

      if (affirmationToStart) {
        setAffirmation(affirmationToStart);

        return;
      }
    }
  }, []);

  return (
    <View className="flex-1">
      <ImageBackground
        source={affirmation?.image}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient
          colors={[
            "rgba(0,0,0,0.0)",
            "rgba(0,0,0,0.2)",
            "rgba(0,0,0,0.3)",
            "rgba(0,0,0,0.2)",
            "rgba(0,0,0,0.0)",
          ]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-24 z-10 left-6 bg-white/30 p-3 rounded-full"
          >
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>

          <View className="h-full justify-center items-center">
            <Text
              style={{ lineHeight: 50 }}
              className="text-white text-4xl mb-12 font-bold text-center"
            >
              {affirmation?.text}
            </Text>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default AffirmationPractice;
