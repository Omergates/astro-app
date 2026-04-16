import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface UserProfile {
  prenom: string;
  date_naissance: string;
  heure_naissance: string;
  lieu_naissance: string;
}

const TOTAL_STEPS = 3;

export default function OnboardingScreen() {
  const [step, setStep] = useState(1);

  // Champs du profil
  const [prenom, setPrenom] = useState("");
  const [jour, setJour] = useState("");
  const [mois, setMois] = useState("");
  const [annee, setAnnee] = useState("");
  const [heure, setHeure] = useState("");
  const [minute, setMinute] = useState("");
  const [heureInconnue, setHeureInconnue] = useState(false);
  const [lieu, setLieu] = useState("");

  // Validation par étape
  const isStepValid = (): boolean => {
    switch (step) {
      case 1:
        return prenom.trim().length > 0;
      case 2:
        return (
          jour.length > 0 &&
          mois.length > 0 &&
          annee.length === 4 &&
          Number(jour) >= 1 &&
          Number(jour) <= 31 &&
          Number(mois) >= 1 &&
          Number(mois) <= 12
        );
      case 3:
        return lieu.trim().length > 0;
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
      return;
    }

    // Étape finale : sauvegarde et redirection
    const heureNaissance = heureInconnue
      ? "inconnue"
      : `${heure.padStart(2, "0")}:${minute.padStart(2, "0")}`;

    const profile: UserProfile = {
      prenom: prenom.trim(),
      date_naissance: `${annee}-${mois.padStart(2, "0")}-${jour.padStart(2, "0")}`,
      heure_naissance: heureNaissance,
      lieu_naissance: lieu.trim(),
    };

    await AsyncStorage.setItem("user_profile", JSON.stringify(profile));
    router.replace("/(tabs)");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-astro-bg"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-20 pb-10">
          {/* Barre de progression */}
          <View className="flex-row mb-10">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => (
              <View
                key={i}
                className={`flex-1 h-1 rounded-full mx-1 ${
                  i < step ? "bg-astro-violet" : "bg-white/10"
                }`}
              />
            ))}
          </View>

          {/* Contenu de l'étape */}
          {step === 1 && (
            <StepPrenom prenom={prenom} setPrenom={setPrenom} />
          )}
          {step === 2 && (
            <StepDateNaissance
              jour={jour}
              setJour={setJour}
              mois={mois}
              setMois={setMois}
              annee={annee}
              setAnnee={setAnnee}
            />
          )}
          {step === 3 && (
            <StepHeureEtLieu
              heure={heure}
              setHeure={setHeure}
              minute={minute}
              setMinute={setMinute}
              heureInconnue={heureInconnue}
              setHeureInconnue={setHeureInconnue}
              lieu={lieu}
              setLieu={setLieu}
            />
          )}

          {/* Espace flexible */}
          <View className="flex-1" />

          {/* Bouton Continuer */}
          <TouchableOpacity
            onPress={handleNext}
            disabled={!isStepValid()}
            activeOpacity={0.8}
            className={`rounded-2xl py-4 ${
              isStepValid() ? "bg-astro-violet" : "bg-astro-violet/30"
            }`}
          >
            <Text
              className={`text-center text-base font-bold ${
                isStepValid() ? "text-white" : "text-white/40"
              }`}
            >
              {step < TOTAL_STEPS ? "Continuer" : "Découvrir mon thème ✨"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// --- Sous-composants par étape ---

function StepPrenom({
  prenom,
  setPrenom,
}: {
  prenom: string;
  setPrenom: (v: string) => void;
}) {
  return (
    <View>
      <Text className="text-astro-cream text-3xl font-bold mb-2">
        Comment tu t'appelles ?
      </Text>
      <Text className="text-gray-400 text-sm mb-8">
        On personnalise tout pour toi.
      </Text>
      <TextInput
        value={prenom}
        onChangeText={setPrenom}
        placeholder="Ton prénom"
        placeholderTextColor="#6B7280"
        autoFocus
        className="bg-[#1A1A2E] text-astro-cream text-lg rounded-2xl px-5 py-4 border border-astro-violet/20"
      />
    </View>
  );
}

function StepDateNaissance({
  jour,
  setJour,
  mois,
  setMois,
  annee,
  setAnnee,
}: {
  jour: string;
  setJour: (v: string) => void;
  mois: string;
  setMois: (v: string) => void;
  annee: string;
  setAnnee: (v: string) => void;
}) {
  return (
    <View>
      <Text className="text-astro-cream text-3xl font-bold mb-2">
        Ta date de naissance
      </Text>
      <Text className="text-gray-400 text-sm mb-8">
        Indispensable pour calculer ton thème natal.
      </Text>
      <View className="flex-row space-x-3">
        <TextInput
          value={jour}
          onChangeText={(t) => setJour(t.replace(/[^0-9]/g, "").slice(0, 2))}
          placeholder="JJ"
          placeholderTextColor="#6B7280"
          keyboardType="number-pad"
          maxLength={2}
          className="flex-1 bg-[#1A1A2E] text-astro-cream text-lg text-center rounded-2xl px-4 py-4 border border-astro-violet/20 mr-2"
        />
        <TextInput
          value={mois}
          onChangeText={(t) => setMois(t.replace(/[^0-9]/g, "").slice(0, 2))}
          placeholder="MM"
          placeholderTextColor="#6B7280"
          keyboardType="number-pad"
          maxLength={2}
          className="flex-1 bg-[#1A1A2E] text-astro-cream text-lg text-center rounded-2xl px-4 py-4 border border-astro-violet/20 mr-2"
        />
        <TextInput
          value={annee}
          onChangeText={(t) => setAnnee(t.replace(/[^0-9]/g, "").slice(0, 4))}
          placeholder="AAAA"
          placeholderTextColor="#6B7280"
          keyboardType="number-pad"
          maxLength={4}
          className="flex-1 bg-[#1A1A2E] text-astro-cream text-lg text-center rounded-2xl px-4 py-4 border border-astro-violet/20"
        />
      </View>
    </View>
  );
}

function StepHeureEtLieu({
  heure,
  setHeure,
  minute,
  setMinute,
  heureInconnue,
  setHeureInconnue,
  lieu,
  setLieu,
}: {
  heure: string;
  setHeure: (v: string) => void;
  minute: string;
  setMinute: (v: string) => void;
  heureInconnue: boolean;
  setHeureInconnue: (v: boolean) => void;
  lieu: string;
  setLieu: (v: string) => void;
}) {
  return (
    <View>
      <Text className="text-astro-cream text-3xl font-bold mb-2">
        Heure et lieu de naissance
      </Text>
      <Text className="text-gray-400 text-sm mb-8">
        L'heure permet de calculer ton ascendant.
      </Text>

      {/* Heure de naissance */}
      {!heureInconnue && (
        <View className="flex-row mb-3">
          <TextInput
            value={heure}
            onChangeText={(t) =>
              setHeure(t.replace(/[^0-9]/g, "").slice(0, 2))
            }
            placeholder="HH"
            placeholderTextColor="#6B7280"
            keyboardType="number-pad"
            maxLength={2}
            className="flex-1 bg-[#1A1A2E] text-astro-cream text-lg text-center rounded-2xl px-4 py-4 border border-astro-violet/20 mr-2"
          />
          <TextInput
            value={minute}
            onChangeText={(t) =>
              setMinute(t.replace(/[^0-9]/g, "").slice(0, 2))
            }
            placeholder="MM"
            placeholderTextColor="#6B7280"
            keyboardType="number-pad"
            maxLength={2}
            className="flex-1 bg-[#1A1A2E] text-astro-cream text-lg text-center rounded-2xl px-4 py-4 border border-astro-violet/20"
          />
        </View>
      )}

      {/* Toggle "Je ne sais pas" */}
      <TouchableOpacity
        onPress={() => setHeureInconnue(!heureInconnue)}
        className="flex-row items-center mb-8"
      >
        <View
          className={`w-5 h-5 rounded border mr-3 items-center justify-center ${
            heureInconnue
              ? "bg-astro-violet border-astro-violet"
              : "border-gray-500"
          }`}
        >
          {heureInconnue && (
            <Text className="text-white text-xs font-bold">✓</Text>
          )}
        </View>
        <Text className="text-gray-400 text-sm">
          Je ne connais pas mon heure de naissance
        </Text>
      </TouchableOpacity>

      {/* Lieu de naissance */}
      <Text className="text-astro-cream text-sm font-medium mb-2">
        Lieu de naissance
      </Text>
      <TextInput
        value={lieu}
        onChangeText={setLieu}
        placeholder="Ex : Paris, Lyon, Marseille..."
        placeholderTextColor="#6B7280"
        className="bg-[#1A1A2E] text-astro-cream text-lg rounded-2xl px-5 py-4 border border-astro-violet/20"
      />
    </View>
  );
}
