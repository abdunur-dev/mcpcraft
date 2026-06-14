import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { createCssVariablesTheme } from "shiki/core";

const mcpcraftTheme = createCssVariablesTheme({
  name: "mcpcraft-dark",
  variablePrefix: "--shiki-",
});

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: mcpcraftTheme,
      },
      defaultColor: "dark",
    },
  },
});
