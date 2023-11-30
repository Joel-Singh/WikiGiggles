<script lang="ts">
  import getImmediateRevertEdits from "../wikiAPI/getImmediateRevertEdits";

  let pageToSearch = "";
  export let immediateRevisions: number[] = [];
  let searchForImmediateRevisions = async () => {
    immediateRevisions = await getImmediateRevertEdits(pageToSearch);
  };
</script>

<input
  bind:value={pageToSearch}
  class="p-1 py-0.5 w-5/6 justify-self-center border-gray-400 border-solid border focus:border-sky-500 shadow-inner outline-0 transition-all"
  type="text"
  placeholder="Enter the funny page"
/>

<button
  on:click={searchForImmediateRevisions}
  type="button"
  class="w-2/5 justify-self-center text-sky-500 hover:underline"
  >Search for immediate revisions</button
>
