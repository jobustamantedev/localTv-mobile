import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useChannels } from '../context/ChannelContext';

interface CastButtonProps {
  streamUrl?: string | null;
  loading?: boolean;
}

export const CastButton: React.FC<CastButtonProps> = ({ streamUrl, loading = false }) => {
  const [isCasting, setIsCasting] = useState(false);
  const { currentChannel } = useChannels();

  const handleCastPress = async () => {
    if (isCasting) {
      // Stop casting
      setIsCasting(false);
      return;
    }

    if (!streamUrl || !currentChannel) {
      return;
    }

    // TODO: Implementar Chromecast para React Native
    // Opciones:
    // 1. google-cast-sdk-react-native
    // 2. react-native-chromecast
    // 3. Exposición nativa a través de JSI

    try {
      setIsCasting(true);
      // Aquí iría la lógica de Chromecast
      console.log('📺 Iniciando cast de:', currentChannel.name);
    } catch (error) {
      console.error('Error en cast:', error);
      setIsCasting(false);
    }
  };

  if (!streamUrl) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.castButton, isCasting && styles.castButtonActive]}
      onPress={handleCastPress}
      disabled={loading}
    >
      <Text style={styles.castIcon}>📺</Text>
      {isCasting && <View style={styles.dot} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  castButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  castButtonActive: {
    backgroundColor: '#ea4335',
    borderColor: '#ea4335',
  },
  castIcon: {
    fontSize: 24,
  },
  dot: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
});
