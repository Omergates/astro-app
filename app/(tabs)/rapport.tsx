import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import PaywallModal from "@/components/PaywallModal";

/**
 * Écran "Mon Rapport" — verrouillé par défaut.
 * Après achat (Phase 4), affichera le PDF via PdfViewer.
 */
export default function RapportScreen() {
  const [paywallVisible, setPaywallVisible] = useState(false);

  return (
    <View className="flex-1 bg-astro-bg items-center justify-center px-6">
      {/* Illustration */}
      <Text className="text-6xl mb-6">📜</Text>

      {/* Texte d'invitation */}
      <Text className="text-astro-cream text-2xl font-bold text-center mb-3">
        Votre rapport personnel{"\n"}vous attend
      </Text>
      <Text className="text-gray-400 text-sm text-center mb-8 leading-5">
        Rapport natal complet avec analyse de vos signes,{"\n"}
        maisons astrales et prévisions sur 30 jours.
      </Text>

      {/* Bouton principal — débloquer */}
      <TouchableOpacity
        onPress={() => setPaywallVisible(true)}
        activeOpacity={0.8}
        className="bg-astro-violet rounded-2xl py-4 px-8 mb-6 w-full"
      >
        <Text className="text-white text-center text-base font-bold">
          Débloquer mon rapport — 4,99 €
        </Text>
      </TouchableOpacity>

      {/*
        Phase 3 : composant PdfViewer ici
        Après validation du paiement, cet écran affichera le PDF généré
        via expo-file-system et un composant de rendu PDF.
        Le state "verrouillé" sera conditionné par premier_achat_effectue.
      */}

      {/* Bannière upsell abonnement — désactivée visuellement */}
      <View className="w-full bg-[#1A1A2E] rounded-2xl p-4 opacity-50 border border-astro-violet/10">
        <View className="flex-row items-center justify-center mb-1">
          <FontAwesome name="diamond" size={14} color="#A78BFA" />
          <Text className="text-astro-violet-light text-sm font-semibold ml-2">
            Abonnement Premium
          </Text>
        </View>
        <Text className="text-astro-cream text-center text-base font-bold">
          6,99 €/mois
        </Text>
        <Text className="text-gray-400 text-center text-xs mt-1">
          Résiliable en un clic
        </Text>
      </View>

      <PaywallModal
        visible={paywallVisible}
        onClose={() => setPaywallVisible(false)}
      />
    </View>
  );
}
