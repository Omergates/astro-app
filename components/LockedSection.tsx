import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface LockedSectionProps {
  children: React.ReactNode;
  title: string;
  onPress?: () => void;
}

/**
 * Section verrouillée avec contenu flouté et icône cadenas.
 * Au tap, déclenche onPress (typiquement l'ouverture du PaywallModal).
 */
export default function LockedSection({
  children,
  title,
  onPress,
}: LockedSectionProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className="my-3 overflow-hidden rounded-2xl"
    >
      {/* Titre de la section */}
      <View className="px-4 pt-4 pb-2 bg-astro-bg">
        <Text className="text-astro-cream text-lg font-semibold">{title}</Text>
      </View>

      {/* Contenu flouté */}
      <View className="relative">
        <View className="opacity-30">{children}</View>

        {/* Superposition sombre + cadenas */}
        <View className="absolute inset-0 items-center justify-center bg-black/50 rounded-b-2xl">
          <View className="items-center">
            <FontAwesome name="lock" size={32} color="#F59E0B" />
            <Text className="text-astro-gold-light text-sm mt-2 font-medium">
              Débloquer
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
