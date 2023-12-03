<script lang="ts">
  export let diff: string;

  function makeDiffPretty(diff: string) {
    return removeHeader(diff);

    function removeHeader(diff: string) {
      const lines = diff.split('\n');
      const headerRemoved = lines.slice(1);

      return headerRemoved.join('\n');
    }
  }

  $: prettyDiff = makeDiffPretty(diff);
</script>

<p class="diff-display w-4/5 h-[70vh] break-words overflow-y-scroll" style="outline: solid red 1px;">
  {@html prettyDiff}
</p>

<style>
</style>
