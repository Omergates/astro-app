import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PaywallModal from "@/components/PaywallModal";

// Données statiques fictives — remplacées par l'API LLM en Phase 3
const MESSAGE_DU_JOUR = {
  titre: "Mercure agite ta 3ème maison aujourd'hui",
  insights: [
    "Une conversation inattendue pourrait changer ta perspective sur un projet en cours.",
    "Ta sensibilité lunaire est amplifiée — fais confiance à ton intuition ce matin.",
    "Une opportunité de collaboration se dessine dans ton cercle proche.",
  ],
  question: "Quelle relation mériterait plus d'attention de ta part cette semaine ?",
};

const POSITIONS_PLANETAIRES = [
  { planete: "Soleil", signe: "Bélier", emoji: "☀️" },
  { planete: "Lune", signe: "Cancer", emoji: "🌙" },
  { planete: "Mercure", signe: "Taureau", emoji: "☿️" },
];

export default function HomeScreen() {
  const [prenom, setPrenom] = useState<string>("Sophie");
  const [paywallVisible, setPaywallVisible] = useState(false);

  // Récupère le prénom depuis AsyncStorage (défini lors de l'onboarding)
  useEffect(() => {
    AsyncStorage.getItem("user_profile").then((data) => {
      if (data) {
        const profile = JSON.parse(data) as { prenom: string };
        if (profile.prenom) setPrenom(profile.prenom);
      }
    });
  }, []);

  return (
    <View className="flex-1 bg-astro-bg">
      <ScrollView className="flex-1 px-5 pt-14">
        {/* En-tête */}
        <Text className="text-astro-cream text-2xl font-bold mb-1">
          Bonjour {prenom} ✨
        </Text>
        <Text className="text-gray-400 text-sm mb-6">
          Voici ton message du jour
        </Text>

        {/* Carte message du jour */}
        <View className="bg-[#1A1A2E] rounded-2xl p-5 mb-6 border border-astro-violet/20">
          <Text className="text-astro-gold text-base font-bold mb-3">
            {MESSAGE_DU_JOUR.titre}
          </Text>
          {MESSAGE_DU_JOUR.insights.map((insight, index) => (
            <Text
              key={index}
              className="text-astro-cream text-sm leading-5 mb-2"
            >
              • {insight}
            </Text>
          ))}
          <View className="mt-3 pt-3 border-t border-astro-violet/10">
            <Text className="text-astro-violet-light text-sm italic">
              💭 {MESSAGE_DU_JOUR.question}
            </Text>
          </View>
        </View>

        {/* Positions planétaires */}
        <Text className="text-astro-cream text-lg font-semibold mb-3">
          Positions du jour
        </Text>
        <View className="bg-[#1A1A2E] rounded-2xl p-4 mb-6">
          {POSITIONS_PLANETAIRES.map((pos, index) => (
            <View
              key={index}
              className={`flex-row items-center justify-between py-3 ${
                index < POSITIONS_PLANETAIRES.length - 1
                  ? "border-b border-white/5"
                  : ""
              }`}
            >
              <View className="flex-row items-center">
                <Text className="text-xl mr-3">{pos.emoji}</Text>
                <Text className="text-astro-cream text-base">
                  {pos.planete}
                </Text>
              </View>
              <Text className="text-astro-violet-light text-base font-medium">
                {pos.signe}
              </Text>
            </View>
          ))}
        </View>

        {/* CTA rapport complet */}
        <TouchableOpacity
          onPress={() => setPaywallVisible(true)}
          activeOpacity={0.8}
          className="bg-astro-violet rounded-2xl py-4 mb-10"
        >
          <Text className="text-white text-center text-base font-bold">
            Voir mon rapport complet →
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <PaywallModal
        visible={paywallVisible}
        onClose={() => setPaywallVisible(false)}
      />
    </View>
  );
}
