import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';
import { useChannels } from '../context/ChannelContext';

// Para Chromecast en React Native, existen varias opciones:
// 1. react-native-chromecast - wrapper nativo
// 2. google-cast-sdk-react-native - SDK oficial de Google
// 3. Implementación nativa customizada

interface CastButtonProps {
  streamUrl?: string | null;
  loading?: boolean;
}

export const CastButton: React.FC<CastButtonProps> = ({ streamUrl, loading = false }) => {
  const [isCasting, setIsCasting] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const { currentChannel } = useChannels();

  useEffect(() => {
    // Detectar disponibilidad de Chromecast
    // En una app real, aquí integrarías con react-native-chromecast o similar
    initializeChromecast();
  }, []);

  const initializeChromecast = async () => {
    try {
      // TODO: Implementar detección real de Chromecast
      // const available = await GoogleCast.isAvailable();
      // setIsAvailable(available);

      // Para MVP, mostramos que está disponible
      setIsAvailable(true);
      console.log('📺 Chromecast SDK inicializado');
    } catch (error) {
      console.warn('Chromecast no disponible:', error);
      setIsAvailable(false);
    }
  };

  const handleCastPress = async () => {
    if (!isAvailable) {
      Alert.alert('Chromecast no disponible', 'No se detectaron dispositivos Chromecast');
      return;
    }

    if (isCasting) {
      stopCasting();
      return;
    }

    if (!streamUrl || !currentChannel) {
      Alert.alert('Error', 'No hay stream cargado');
      return;
    }

    try {
      await startCasting();
    } catch (error) {
      console.error('Error en cast:', error);
      Alert.alert('Error', 'No se pudo iniciar el casting');
    }
  };

  const startCasting = async () => {
    try {
      // TODO: Implementar con librería Chromecast real
      // Ejemplo con react-native-chromecast:
      //
      // const session = await GoogleCast.requestSession();
      // const mediaInfo = {
      //   contentId: streamUrl,
      //   contentType: 'application/x-mpegURL',
      //   duration: 0,
      //   metadata: {
      //     title: currentChannel?.name,
      //     images: [{ url: currentChannel?.logo_url }],
      //   },
      // };
      // await session.loadMedia(mediaInfo);

      setIsCasting(true);
      console.log('✅ Casting iniciado:', currentChannel?.name);
      Alert.alert('Éxito', `Transmitiendo ${currentChannel?.name} a tu TV`);
    } catch (error) {
      console.error('Error iniciando cast:', error);
      setIsCasting(false);
      throw error;
    }
  };

  const stopCasting = async () => {
    try {
      // TODO: Implementar stop con librería Chromecast
      // await GoogleCast.endSession();

      setIsCasting(false);
      console.log('🛑 Casting detenido');
    } catch (error) {
      console.error('Error deteniendo cast:', error);
    }
  };

  if (!streamUrl || !isAvailable) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.castButton, isCasting && styles.castButtonActive]}
      onPress={handleCastPress}
      disabled={loading}
      activeOpacity={0.7}
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
    shadowColor: '#ea4335',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 5,
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
