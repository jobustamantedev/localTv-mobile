import React, { createContext, useState, useCallback } from 'react';
import channelsData from '../data/channels.json';

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
}

export const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

export const ChannelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [channels] = useState<Channel[]>(channelsData);
  const [currentChannel, setCurrentChannel] = useState<Channel | null>(channelsData[0] || null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = useCallback((channelId: number) => {
    setFavorites(prev =>
      prev.includes(channelId)
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  }, []);

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
