import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useChannels } from '../context/ChannelContext';

interface StreamResponse {
  url: string;
  channel: string;
  headers: {
    'User-Agent': string;
    'Referer': string;
  };
}

export const VideoPlayer: React.FC = () => {
  const { currentChannel } = useChannels();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  // NOTE: En una app real, usarías react-native-video o expo-video
  // Para este MVP, mostramos solo el estado
  useEffect(() => {
    if (!currentChannel) {
      setStreamUrl(null);
      setError(null);
      return;
    }

    const fetchStream = async () => {
      setLoading(true);
      setError(null);

      try {
        // En producción, consultar backend para obtener stream real
        // Por ahora, usar el stream_url directamente
        setStreamUrl(currentChannel.stream_url);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error cargando stream');
      } finally {
        setLoading(false);
      }
    };

    fetchStream();
  }, [currentChannel]);

  if (!currentChannel) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>Selecciona un canal</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ea4335" />
        <Text style={styles.loadingText}>Cargando stream...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {streamUrl && (
        <>
          {/* En producción, aquí iría el Video player real */}
          <View style={styles.playerPlaceholder}>
            <Text style={styles.channelInfo}>{currentChannel.name}</Text>
            <Text style={styles.streamInfo}>Stream: {currentChannel.slug}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.infoText}>{currentChannel.name}</Text>
            <Text style={styles.statusText}>
              {currentChannel.is_active ? '🔴 EN VIVO' : '⚪ Offline'}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    overflow: 'hidden',
  },
  playerPlaceholder: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  channelInfo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  streamInfo: {
    color: '#9ca3af',
    fontSize: 14,
  },
  info: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  infoText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusText: {
    color: '#9ca3af',
    fontSize: 14,
  },
  placeholder: {
    color: '#9ca3af',
    fontSize: 16,
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
  },
  errorContainer: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: '#7c2d2d',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
