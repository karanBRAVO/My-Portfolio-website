import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    server: {
      proxy: {
        "/api": {
          target: "https://my-portfolio-my-blog.onrender.com",
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/api/, "https://my-portfolio-my-blog.onrender.com" + "/api"),
        },
      },
    },
    plugins: [react()],
  });
};
