<script lang="ts">
	import {
		Button,
		ModeDropdown,
		ModeToggle,
		themeConfigStore,
		ThemeCustomizer,
		ThemeCustomizerButton,
		ThemeWrapper,
		updateTheme,
		type ThemeConfig
	} from "@kksh/svelte"
	import { get } from "svelte/store"

	// init this config with persisted data from a persisted store in production, this is just a demo
	let config: ThemeConfig = {
		radius: get(themeConfigStore).radius,
		theme: get(themeConfigStore).theme,
		lightMode: get(themeConfigStore).lightMode
	}

	$: updateTheme(config)
</script>

<pre>{JSON.stringify(config, null, 2)}</pre>
<!-- <ThemeCustomizer bind:config /> -->
<ThemeCustomizerButton bind:config />
<Button>Hello</Button>
