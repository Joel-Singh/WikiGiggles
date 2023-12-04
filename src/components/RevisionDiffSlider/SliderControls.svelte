<script lang="ts">
  export let lastSlideNumber: number;
  export let slideNumber = 1;

  function changeCurrentIndex(change: number) {
    slideNumber += change;

    if (slideNumber < 1) {
      slideNumber = 1;
    }

    if (slideNumber > lastSlideNumber) {
      slideNumber = lastSlideNumber;
    }
  }
</script>

<nav class="text-sky-500 flex flex-row gap-10">
  <button
    type="button"
    aria-label="Previous funny"
    on:click={() => changeCurrentIndex(-1)}
  >
    &lt;-
  </button>
  <p>{slideNumber} / {lastSlideNumber}</p>
  <button
    type="button"
    aria-label="Next funny"
    on:click={() => changeCurrentIndex(1)}>-&gt;</button
  >
</nav>
