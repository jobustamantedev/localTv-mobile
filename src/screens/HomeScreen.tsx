import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { VideoPlayer } from '../components/VideoPlayer';
import { ChannelList } from '../components/ChannelList';
import { CastButton } from '../components/CastButton';
import { useChannels } from '../context/ChannelContext';

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const { currentChannel, favorites } = useChannels();
  const [streamUrl, setStreamUrl] = useState<string | null>(null);

  React.useEffect(() => {
    if (currentChannel) {
      setStreamUrl(currentChannel.stream_url);
    }
  }, [currentChannel]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>localTv</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Player Section */}
        <View style={styles.playerSection}>
          <View style={styles.playerContainer}>
            <VideoPlayer />
            {streamUrl && (
              <View style={styles.castButtonContainer}>
                <CastButton streamUrl={streamUrl} />
              </View>
            )}
          </View>
        </View>

        {/* Channels List Section */}
        <View style={styles.channelsSection}>
          <Text style={styles.sectionTitle}>Todos los Canales</Text>
          <ChannelList />
        </View>

        {/* Spacer */}
        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  playerSection: {
    padding: 12,
  },
  playerContainer: {
    position: 'relative',
  },
  castButtonContainer: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
  },
  channelsSection: {
    paddingVertical: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginHorizontal: 12,
  },
  spacer: {
    height: 20,
  },
});
