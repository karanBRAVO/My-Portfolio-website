import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    server: {
      port: process.env.PORT || "5500",
      proxy: {
        "/api": {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/api/, process.env.VITE_API_BASE_URL + "/api"),
        },
      },
    },
    plugins: [react()],
  });
};
