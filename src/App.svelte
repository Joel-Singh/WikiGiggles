<script lang="ts">
  import getImmediateRevertEdits from "./wikiAPI/getImmediateRevertEdits";

  let pageToSearch = "";
  let immediateRevisions = "";
  let searchForImmediateRevisions = async () => {
    // @ts-ignore
    immediateRevisions = await getImmediateRevertEdits(pageToSearch);
  };
</script>

<main class="h-full pt-3 flex flex-col items-center gap-2">
  <input
    bind:value={pageToSearch}
    class="p-1 py-0.5 w-5/6 justify-self-center"
    type="text"
  />
  <button
    on:click={searchForImmediateRevisions}
    type="button"
    class="w-2/5 justify-self-center">Search for immediate revisions</button
  >

  <div id="immediate-revisions">{immediateRevisions}</div>
</main>
