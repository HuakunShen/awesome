// import adapter from "@sveltejs/adapter-auto";
import cfAdapter from '@sveltejs/adapter-cloudflare-workers';
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: vitePreprocess(),

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    // adapter: adapter(),
    adapter: cfAdapter({
      config: 'wrangler.toml',
        platformProxy: {
          configPath: 'wrangler.toml',
          environment: undefined,
          experimentalJsonConfig: false,
          persist: false
        }
    }),
    alias: {
      "@/*": "./src/*",
    },
  },
};

export default config;
