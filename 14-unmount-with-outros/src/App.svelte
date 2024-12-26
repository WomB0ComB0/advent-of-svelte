<script lang="ts">
  import { mount, unmount } from 'svelte';
  import Santa from './Santa.svelte'; 

  let target: HTMLElement;
  let component: ReturnType<typeof mount> | null;
</script>

<button
  disabled={!!component}
  onclick={() => {
    component = mount(Santa, { target })
  }}
>
mount
</button>


<button
  disabled={!component}
  onclick={async () => {
    await unmount(component!, { outro: true });
    component = null
  }}
>
  unmount
</button>

<div bind:this={target}></div>