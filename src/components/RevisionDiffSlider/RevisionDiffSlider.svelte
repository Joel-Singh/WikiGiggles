<script lang="ts">
  import DiffDisplay from "./DiffDisplay.svelte";
  import requestRevisionDiff from "../../wikiAPI/requestRevisionDiff";
  import SliderControls from "./SliderControls.svelte";

  export let revisions: number[];
  let revisionDiffs: Promise<string>[] = [];

  let slideNumber = 1;
  $: finalIndex = revisions.length - 1;

  $: {
    revisionDiffs = [];
    resetSlideNumber();
    updateRevisionDiffs();

    async function updateRevisionDiffs() {
      revisionDiffs = [];
      for (let i = 0; i < revisions.length; i++) {
        const request = requestRevisionDiff(revisions[i]);
        revisionDiffs.push(request);
        await request;
      }
    }
  }

  function resetSlideNumber() {
    slideNumber = 1;
  }
</script>

<div class="flex flex-col w-screen justify-center align-middle items-center">
  <SliderControls bind:slideNumber lastSlideNumber={finalIndex} />

  {#await revisionDiffs[slideNumber - 1]}
    loading diff...
  {:then diff}
    <DiffDisplay {diff} />
  {/await}
</div>

<style>
  button:hover {
    @apply underline;
  }
</style>
