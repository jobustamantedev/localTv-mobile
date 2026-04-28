import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@localTv:favorites';

export const StorageUtils = {
  async getFavorites(): Promise<number[]> {
    try {
      const data = await AsyncStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error reading favorites:', error);
      return [];
    }
  },

  async saveFavorites(favorites: number[]): Promise<void> {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  },

  async addFavorite(channelId: number): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      if (!favorites.includes(channelId)) {
        favorites.push(channelId);
        await this.saveFavorites(favorites);
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  },

  async removeFavorite(channelId: number): Promise<void> {
    try {
      const favorites = await this.getFavorites();
      const filtered = favorites.filter(id => id !== channelId);
      await this.saveFavorites(filtered);
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  },

  async clearFavorites(): Promise<void> {
    try {
      await AsyncStorage.removeItem(FAVORITES_KEY);
    } catch (error) {
      console.error('Error clearing favorites:', error);
    }
  },
};
