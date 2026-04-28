import React from 'react';
import { ChannelProvider } from './src/context/ChannelContext';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <ChannelProvider>
      <HomeScreen />
    </ChannelProvider>
  );
}
