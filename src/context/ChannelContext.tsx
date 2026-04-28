import React, { createContext, useState, useCallback, useEffect } from 'react';
import channelsData from '../data/channels.json';
import { StorageUtils } from '../utils/storage';

export interface Channel {
  id: number;
  name: string;
  slug: string;
  stream_url: string;
  logo_url: string;
  category: string;
  is_active: boolean;
}

interface ChannelContextType {
  channels: Channel[];
  currentChannel: Channel | null;
  setCurrentChannel: (channel: Channel) => void;
  favorites: number[];
  toggleFavorite: (channelId: number) => void;
  isFavorite: (channelId: number) => boolean;
  loading: boolean;
}

export const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [channels] = useState<Channel[]>(channelsData);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(channelsData[0] || null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar favoritos al iniciar
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const saved = await StorageUtils.getFavorites();
        setFavorites(saved);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const toggleFavorite = useCallback(async (channelId: number) => {
    const newFavorites = favorites.includes(channelId)
      ? favorites.filter(id => id !== channelId)
      : [...favorites, channelId];

    setFavorites(newFavorites);

    // Guardar en storage
    if (newFavorites.includes(channelId)) {
      await StorageUtils.addFavorite(channelId);
    } else {
      await StorageUtils.removeFavorite(channelId);
    }
  }, [favorites]);

  const isFavorite = useCallback((channelId: number) => {
    return favorites.includes(channelId);
  }, [favorites]);

  return (
    <ChannelContext.Provider
      value={{
        channels,
        currentChannel,
        setCurrentChannel,
        favorites,
        toggleFavorite,
        isFavorite,
        loading,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannels = () => {
  const context = React.useContext(ChannelContext);
  if (!context) {
    throw new Error('useChannels must be used within ChannelProvider');
  }
  return context;
};
