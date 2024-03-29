import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Inspect from "vite-plugin-inspect";
import { swapToApolloClient } from "./swapToApolloClientPlugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [Inspect(), swapToApolloClient(), react()],
});
