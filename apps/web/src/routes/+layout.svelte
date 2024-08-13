<script>
  import "../app.css";
  import { ThemeWrapper, ModeWatcher } from "@kksh/svelte";
</script>

<ModeWatcher />
<ThemeWrapper>
  <slot></slot>
</ThemeWrapper>
