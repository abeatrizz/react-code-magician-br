
import { Preferences } from '@capacitor/preferences';

export const Storage = {
  async setItem(key: string, value: string): Promise<void> {
    await Preferences.set({ key, value });
  },

  async getItem(key: string): Promise<string | null> {
    const { value } = await Preferences.get({ key });
    return value;
  },

  async removeItem(key: string): Promise<void> {
    await Preferences.remove({ key });
  },

  async clear(): Promise<void> {
    await Preferences.clear();
  }
};
