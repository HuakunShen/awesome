<script>
	import "../app.css"
	import { ModeWatcher, ThemeWrapper } from "@kksh/svelte"
</script>

<ModeWatcher />
<ThemeWrapper>
	<slot></slot>
</ThemeWrapper>
