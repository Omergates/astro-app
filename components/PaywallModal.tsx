import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface PaywallModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * Modal de paywall pour l'achat one-off du rapport complet à 4,99 €.
 * Respecte les règles tarifaires : jamais 9,99 € ni 12,99 €.
 */
export default function PaywallModal({ visible, onClose }: PaywallModalProps) {
  const handlePurchase = () => {
    // Phase 4 : brancher RevenueCat ici
    console.log("ACHAT_INITIE");
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable
        className="flex-1 justify-end bg-black/60"
        onPress={onClose}
      >
        <Pressable
          className="bg-[#1A1A2E] rounded-t-3xl px-6 pt-8 pb-10"
          onPress={() => {}}
        >
          {/* Icône décorative */}
          <View className="items-center mb-4">
            <View className="w-16 h-16 rounded-full bg-astro-violet/20 items-center justify-center">
              <FontAwesome name="star" size={28} color="#A78BFA" />
            </View>
          </View>

          {/* Titre */}
          <Text className="text-astro-cream text-2xl font-bold text-center mb-2">
            Débloquez votre thème complet
          </Text>

          {/* Sous-titre */}
          <Text className="text-astro-violet-light text-base text-center mb-6">
            Rapport natal complet + Prévisions 30 jours
          </Text>

          {/* Liste des avantages */}
          <View className="mb-6 space-y-3">
            <FeatureRow text="Analyse solaire, lunaire et ascendant" />
            <FeatureRow text="Maisons astrales détaillées" />
            <FeatureRow text="Aspects planétaires du mois" />
            <FeatureRow text="Prévisions amour, travail et finances" />
          </View>

          {/* Prix */}
          <View className="items-center mb-6">
            <Text className="text-astro-gold text-4xl font-bold">4,99 €</Text>
            <Text className="text-gray-400 text-sm mt-1">Paiement unique</Text>
          </View>

          {/* Bouton primaire — gradient simulé avec fond violet/doré */}
          <TouchableOpacity
            onPress={handlePurchase}
            activeOpacity={0.8}
            className="bg-astro-violet rounded-2xl py-4 mb-3"
          >
            <Text className="text-white text-center text-lg font-bold">
              Obtenir mon rapport — 4,99 €
            </Text>
          </TouchableOpacity>

          {/* Bouton ghost "Non merci" — visible immédiatement sur ce composant */}
          <TouchableOpacity onPress={onClose} className="py-3">
            <Text className="text-gray-500 text-center text-base">
              Non merci
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

/** Ligne d'avantage avec icône check */
function FeatureRow({ text }: { text: string }) {
  return (
    <View className="flex-row items-center mb-2">
      <FontAwesome name="check-circle" size={16} color="#F59E0B" />
      <Text className="text-astro-cream text-sm ml-3">{text}</Text>
    </View>
  );
}
