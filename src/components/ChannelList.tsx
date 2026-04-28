import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { useChannels } from '../context/ChannelContext';

export const ChannelList: React.FC = () => {
  const { channels, currentChannel, setCurrentChannel, isFavorite, toggleFavorite } =
    useChannels();

  const handleSelectChannel = (channelId: number) => {
    const channel = channels.find(c => c.id === channelId);
    if (channel) {
      setCurrentChannel(channel);
    }
  };

  const renderChannelItem = ({ item }) => {
    const isSelected = currentChannel?.id === item.id;
    const favorited = isFavorite(item.id);

    return (
      <TouchableOpacity
        style={[styles.channelCard, isSelected && styles.selectedCard]}
        onPress={() => handleSelectChannel(item.id)}
      >
        <View style={styles.channelContent}>
          <View style={styles.info}>
            <Text style={styles.channelName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={styles.statusDot}>
              {item.is_active && <View style={styles.liveDot} />}
              <Text style={styles.liveText}>{item.is_active ? 'EN VIVO' : 'Offline'}</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={() => toggleFavorite(item.id)}
          >
            <Text style={styles.starIcon}>{favorited ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={channels}
      renderItem={renderChannelItem}
      keyExtractor={item => item.id.toString()}
      numColumns={1}
      scrollEnabled={true}
      nestedScrollEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  channelCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    marginBottom: 12,
    marginHorizontal: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  selectedCard: {
    borderColor: '#ea4335',
    backgroundColor: '#1a1a1a',
  },
  channelContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  info: {
    flex: 1,
  },
  channelName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusDot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
  },
  liveText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '500',
  },
  favoriteBtn: {
    padding: 8,
    marginLeft: 16,
  },
  starIcon: {
    fontSize: 24,
    color: '#fbbf24',
  },
});
