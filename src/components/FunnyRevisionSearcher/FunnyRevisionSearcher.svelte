<script lang="ts">
  import getImmediateRevertEdits from "../../wikiAPI/getImmediateRevertEdits";
  import ErrorMsg from "./ErrorMsg.svelte";

  export let immediateRevisions: number[] | null = null;
  let changeErrorMsg: (newMsg: string) => void;

  let pageToSearch = "";
  let searchForImmediateRevisions = async () => {
    if (pageToSearch === "") {
      changeErrorMsg("Enter a page");
      return;
    }

    const resultOfGetImmediateRevertEdits = await getImmediateRevertEdits(pageToSearch);
    if (resultOfGetImmediateRevertEdits instanceof Error) {
      changeErrorMsg(resultOfGetImmediateRevertEdits.message);
      return;
    } else {
      changeErrorMsg('');
      immediateRevisions = resultOfGetImmediateRevertEdits;
    }
  };
</script>

<div class="flex flex-col items-center w-2/3">
  <input
    bind:value={pageToSearch}
    class="p-1 py-0.5 w-5/6 justify-self-center border-gray-400 border-solid border focus:border-sky-500 shadow-inner outline-0 transition-all"
    type="text"
    placeholder="Enter the funny page"
  />

  <button
    on:click={searchForImmediateRevisions}
    type="button"
    class="w-max justify-self-center text-sky-500 hover:underline"
    >Search for immediate revisions</button
  >

  <ErrorMsg bind:changeErrorMsg={changeErrorMsg} />
</div>
