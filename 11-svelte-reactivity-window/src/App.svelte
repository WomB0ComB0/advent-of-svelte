<script>
  import { innerHeight, innerWidth } from "svelte/reactivity/window";
</script>

<div>
  {innerWidth.current}x{innerHeight.current}px
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: max(1em, min(8vmin, 8em));
  }
</style>