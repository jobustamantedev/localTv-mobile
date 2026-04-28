import React, { useState, useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Video, ResizeMode } from 'expo-video';
import { useChannels } from '../context/ChannelContext';

export const VideoPlayer: React.FC = () => {
  const { currentChannel } = useChannels();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    if (!currentChannel) {
      setStreamUrl(null);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      setStreamUrl(currentChannel.stream_url);
      setIsPlaying(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error cargando stream');
    } finally {
      setLoading(false);
    }
  }, [currentChannel]);

  const handlePlaybackStatusUpdate = (status: any) => {
    if (status.error) {
      setError(status.error);
    }
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (!currentChannel) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>Selecciona un canal</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>⚠️ Error cargando stream</Text>
        <Text style={styles.errorSubtext}>{currentChannel.name}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {streamUrl && (
        <>
          <View style={styles.videoWrapper}>
            <Video
              ref={videoRef}
              source={{ uri: streamUrl }}
              style={styles.video}
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay={isPlaying}
              onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
              progressUpdateIntervalMillis={500}
              rate={1.0}
              volume={1.0}
            />
            {loading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color="#ea4335" />
                <Text style={styles.loadingText}>Conectando...</Text>
              </View>
            )}
            <View style={styles.controlsOverlay}>
              <TouchableOpacity style={styles.playButton} onPress={togglePlayPause}>
                <Text style={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
              </TouchableOpacity>
            </View>
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
  videoWrapper: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
  },
  loadingText: {
    color: '#fff',
    marginTop: 12,
    fontSize: 14,
  },
  controlsOverlay: {
    position: 'absolute',
    inset: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 4,
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  playIcon: {
    fontSize: 28,
    color: '#fff',
  },
  info: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#333',
    backgroundColor: '#1a1a1a',
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
    marginBottom: 8,
  },
  errorSubtext: {
    color: '#f87171',
    fontSize: 14,
    textAlign: 'center',
  },
});
