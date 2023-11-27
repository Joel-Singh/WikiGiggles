<script lang="ts">
  import getImmediateRevertEdits from "./wikiAPI/getImmediateRevertEdits";

  let pageToSearch = "";
  let immediateRevisions = "";
  let searchForImmediateRevisions = async () => {
    // @ts-ignore
    immediateRevisions = await getImmediateRevertEdits(pageToSearch);
  };
</script>

<main>
  <input bind:value={pageToSearch} class="page-to-search" type="text" />
  <button on:click={searchForImmediateRevisions} type="button"
    >Search for immediate revisions</button
  >
  <div id="immediate-revisions">{immediateRevisions}</div>
</main>

<style>
</style>
