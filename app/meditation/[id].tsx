import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import meditationImages from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { useLocalSearchParams, router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { Audio } from "expo-av";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/meditation-data";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { TimerContext } from "@/context/TimerContext";
import { useIsFocused } from "@react-navigation/native";

const Meditate = () => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const { id } = useLocalSearchParams();

  const { duration: secondsRemaining, setDuration } = useContext(TimerContext);
  const [isMeditating, setIsMeditating] = useState(false);
  const [audioSound, setAudioSound] = useState<Audio.Sound>();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      stopAllAudio();
    }
  }, [isFocused]);

  const stopAllAudio = async () => {
    try {
      // Detiene el audio actual si existe
      if (audioSound) {
        await audioSound.stopAsync();
      }

      // Detiene todos los sonidos que puedan estar reproduciéndose
      await Audio.setIsEnabledAsync(false);
      await Audio.setIsEnabledAsync(true);
    } catch (error) {
      console.error("Error al detener el audio:", error);
    }
  };

  useEffect(() => {
    setDuration(30);
    initializeSound();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsRemaining > 0 && isMeditating === true) {
        setDuration(secondsRemaining - 1);
      } else {
        clearInterval(interval);
        setIsMeditating(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    if (isMeditating) {
      audioSound?.stopAsync();
    }
  }, [isMeditating]);

  useEffect(() => {
    if (secondsRemaining === 0) {
      audioSound?.stopAsync();
    }
  }, [secondsRemaining]);

  //Formar the time left to ensure two diggits are shown
  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");

  const toggleMeditationSessionStatus = async () => {
    if (secondsRemaining === 0) return;
    setIsMeditating(!isMeditating);
    await ToggleSound();
  };

  const ToggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status.isLoaded && !isMeditating) {
      await sound.playAsync();
    } else {
      await sound.pauseAsync();
    }
  };

  const initializeSound = async () => {
    await stopAllAudio(); // Detiene cualquier audio previo

    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;
    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setAudioSound(sound);
    return sound;
  };

  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: isMeditating ? 1.25 : 1,
      useNativeDriver: true,
    }).start();
  }, [isMeditating]);

  const handleAdjustDuration = () => {
    stopAllAudio();
    setIsMeditating(false);
    router.push("/(modal)/adjust-meditation-duration");
  };

  return (
    <View className="flex-1">
      <ImageBackground
        source={meditationImages[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient
          colors={[
            "rgba(0,0,0,0.3)",
            "rgba(0,0,0,0.2)",
            "rgba(0,0,0,0.2)",
            "rgba(0,0,0,0.0)",
            "rgba(0,0,0,0.0)",
          ]}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute top-24 z-10 left-6 bg-white/30 p-3 rounded-full"
          >
            <AntDesign name="left" size={30} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center justify-center">
            <TouchableOpacity onPress={handleAdjustDuration}>
              <Animated.View
                style={[
                  {
                    width: 176,
                    height: 176,
                    borderRadius: 88,
                    backgroundColor: "rgba(229, 229, 234, 0.5)",
                    justifyContent: "center",
                    alignItems: "center",
                    transform: [{ scale: scaleAnim }],
                  },
                ]}
              >
                <Text className="text-4xl text-white">
                  {formattedTimeMinutes}:{formattedTimeSeconds}
                </Text>
                {!isMeditating ? (
                  <MaterialIcons name="touch-app" size={40} color="white" />
                ) : null}
              </Animated.View>
            </TouchableOpacity>
          </View>

          <View className="mb-5">
            <CustomButton
              onPress={toggleMeditationSessionStatus}
              title={isMeditating ? "Stop Meditation" : "Start Meditation"}
              containerStyle="mt-4"
            ></CustomButton>
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
