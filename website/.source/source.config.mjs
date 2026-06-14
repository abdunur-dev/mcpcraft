// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { createCssVariablesTheme } from "shiki/core";
var mcpcraftTheme = createCssVariablesTheme({
  name: "mcpcraft-dark",
  variablePrefix: "--shiki-"
});
var docs = defineDocs({
  dir: "content/docs"
});
var source_config_default = defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: mcpcraftTheme
      },
      defaultColor: "dark"
    }
  }
});
export {
  source_config_default as default,
  docs
};
