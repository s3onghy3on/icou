<script>
  import { searchList, stateSearchSubmitted } from "./store.js";
  import Search from "./Search.svelte";
  import TableManipulator from "./TableManipulator.svelte";
  import CompareTable from "./CompareTable.svelte";

  export let ENV;

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
</script>

<style>
  .logo {
    width: 14rem;
    transition: width 0.3s;
  }
  .search {
    width: 6rem;
  }
  /* .divider[data-content]::after {
    background: #fff !important;
  } */
  #btnGoTop {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    border-color: #bcc3ce;
    mask-border-width: 0.05rem;
    color: olive;
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
  #btnGoTop:hover {
    background-color: olive;
    color: #fff;
  }
</style>

<main class="container text-center">
  <img
    class="logo"
    src="https://icousvelte.z12.web.core.windows.net/logo/logo_transparent.png"
    alt="ATAGL LOGO"
    title="ATAGL"
    class:search={$stateSearchSubmitted} />
  <Search env={ENV} />
  {#if $searchList.length}
    <TableManipulator />
    <!-- <div class="divider text-center" data-content={$searchList.length} /> -->
    <CompareTable />
    <button
      class="btn btn-action tooltip tooltip-left"
      id="btnGoTop"
      on:click={goTop}
      data-tooltip="페이지 맨 위로">
      <i class="icon icon-arrow-up" />
    </button>
  {/if}
</main>
