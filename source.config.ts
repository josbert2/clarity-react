import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { rehypeCodeDefaultOptions } from "fumadocs-core/mdx-plugins";
import { rehypeComponent } from "./lib/rehype-component";

export const { docs, meta } = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "catppuccin-latte",
        dark: "catppuccin-mocha",
      },
      transformers: [...(rehypeCodeDefaultOptions.transformers ?? [])],
    },
    rehypePlugins: () => [rehypeComponent],
  },
});
