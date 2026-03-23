import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.hottacos.restaurant",
  appName: "Hot Tacos",
  webDir: "out",
  server: {
    androidScheme: "https",
    cleartext: true,
  },
};

export default config;