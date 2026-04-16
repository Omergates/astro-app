import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import LockedSection from "@/components/LockedSection";
import PaywallModal from "@/components/PaywallModal";

// Données statiques fictives — remplacées par le calcul éphéméride en Phase 3
const SIGNES_CLES = [
  { label: "Signe Solaire", valeur: "Lion", emoji: "☀️", detail: "Charisme naturel, confiance et créativité" },
  { label: "Signe Lunaire", valeur: "Scorpion", emoji: "🌙", detail: "Émotions profondes et intuition puissante" },
  { label: "Ascendant", valeur: "Vierge", emoji: "⬆️", detail: "Rigueur, sens du détail et fiabilité" },
];

export default function ThemeScreen() {
  const [paywallVisible, setPaywallVisible] = useState(false);

  const openPaywall = () => setPaywallVisible(true);

  return (
    <View className="flex-1 bg-astro-bg">
      <ScrollView className="flex-1 px-5 pt-14">
        <Text className="text-astro-cream text-2xl font-bold mb-1">
          Mon Thème
        </Text>
        <Text className="text-gray-400 text-sm mb-6">
          Votre carte du ciel personnelle
        </Text>

        {/* 3 cartes signes clés — accès gratuit */}
        {SIGNES_CLES.map((signe, index) => (
          <View
            key={index}
            className="bg-[#1A1A2E] rounded-2xl p-5 mb-4 border border-astro-violet/20"
          >
            <View className="flex-row items-center mb-2">
              <Text className="text-2xl mr-3">{signe.emoji}</Text>
              <View>
                <Text className="text-gray-400 text-xs uppercase tracking-wider">
                  {signe.label}
                </Text>
                <Text className="text-astro-cream text-xl font-bold">
                  {signe.valeur}
                </Text>
              </View>
            </View>
            <Text className="text-astro-violet-light text-sm">
              {signe.detail}
            </Text>
          </View>
        ))}

        {/* Section Maisons astrales — verrouillée */}
        <LockedSection title="🏠 Maisons astrales" onPress={openPaywall}>
          <View className="bg-[#1A1A2E] p-4">
            <Text className="text-astro-cream text-sm mb-2">
              Maison I — Apparence et personnalité
            </Text>
            <Text className="text-astro-cream text-sm mb-2">
              Maison IV — Foyer et racines
            </Text>
            <Text className="text-astro-cream text-sm mb-2">
              Maison VII — Relations et partenariats
            </Text>
            <Text className="text-astro-cream text-sm">
              Maison X — Carrière et ambitions
            </Text>
          </View>
        </LockedSection>

        {/* Section Aspects planétaires — verrouillée */}
        <LockedSection title="🔗 Aspects planétaires" onPress={openPaywall}>
          <View className="bg-[#1A1A2E] p-4">
            <Text className="text-astro-cream text-sm mb-2">
              Soleil trigone Lune — Harmonie intérieure
            </Text>
            <Text className="text-astro-cream text-sm mb-2">
              Vénus carré Mars — Tension créative en amour
            </Text>
            <Text className="text-astro-cream text-sm mb-2">
              Jupiter sextile Saturne — Croissance structurée
            </Text>
            <Text className="text-astro-cream text-sm">
              Mercure opposition Neptune — Clarté vs intuition
            </Text>
          </View>
        </LockedSection>

        {/* Espace en bas */}
        <View className="h-10" />
      </ScrollView>

      <PaywallModal
        visible={paywallVisible}
        onClose={() => setPaywallVisible(false)}
      />
    </View>
  );
}
