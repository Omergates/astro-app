import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function HomeScreen() {
  useEffect(() => {
    supabase.from('users').select('*').then(({ error }) => {
      if (error) console.error('❌ Supabase erreur:', error.message);
      else console.log('✅ Supabase connecté !');
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello, astro 🌙</Text>
    </View>
  );
}