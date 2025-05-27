
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.290d3f38649649c794a429c4a7296f87',
  appName: 'OdontoLegal',
  webDir: 'dist',
  server: {
    url: 'https://290d3f38-6496-49c7-94a4-29c4a7296f87.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    Camera: {
      permissions: ['camera', 'photos']
    }
  }
};

export default config;
