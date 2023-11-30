<script lang="ts">
  import requestRevisionDiff from "../wikiAPI/requestRevisionDiff";

  export let revisions: string[];
  let currentIndex = 0;
  function changeCurrentIndex(change: number) {
    const clamp = (num: number, min: number, max: number) =>
      Math.min(Math.max(num, min), max);
    currentIndex = clamp(currentIndex + change, 0, revisions.length - 1);
  }
  setInterval(() => console.log(currentIndex), 500)
</script>

<div>
  <button
    type="button"
    aria-label="Previous funny"
    on:click={() => changeCurrentIndex(-1)}
  >
    &lt;-
  </button>

  {#await requestRevisionDiff(revisions[currentIndex])}
    loading diff...
  {:then diff}
    {diff}
  {/await}

  <button
    type="button"
    aria-label="Next funny"
    on:click={() => changeCurrentIndex(1)}>-&gt;</button
  >
</div>
