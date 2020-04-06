<script>
  import Search from "./Search.svelte";
  import TableManipulator from "./TableManipulator.svelte";
  import CompareTable from "./CompareTable.svelte";
  import InfoFooter from "./InfoFooter.svelte";

  let list = [];
  let removedList = [];
</script>

<style>
  .logo {
    width: 6.4rem;
  }
</style>

<main class="container grid-lg lang-ko text-center">
  <!-- <h1 class="mb-0">icou</h1> -->
  <img
    class="logo"
    src="/bacteriophage.svg"
    alt="icou logo"
    title="icou Bacteriophage" />
  <Search bind:list/>
  {#if list.length}
    <TableManipulator bind:list/>
    <div class="divider"></div>
    <CompareTable {list} bind:removedList/>
  {/if}
</main>
<InfoFooter listLen={list.length} removedLen={removedList.length} />