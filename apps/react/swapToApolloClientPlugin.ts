import MagicString from "magic-string";
import type { Plugin } from "vite";

export function swapToApolloClient(): Plugin {
  return {
    name: "vite-plugin-swap",

    enforce: "pre",

    apply: "serve",

    config: () => {
      return {
        optimizeDeps: {
          include: ["react-dom"],
        },
      };
    },

    transform: (code, id) => {
      if (id.endsWith(".tsx")) {
        const str = new MagicString(code);

        if (code.includes("@shopify/react-graphql")) {
          str.replace("@shopify/react-graphql", "@apollo/client");
        }

        return {
          code: str.toString(),
          map: str.generateMap({
            source: id,
            includeContent: true,
          }),
        };
      }
    },
  };
}
