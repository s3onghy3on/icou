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
  h1.logo-font {
    font-size: 5.6rem;
    transition: font-size 0.3s;
  }
  .logo-font > a {
    color: #000;
    text-decoration: none;
  }
  .search {
    font-size: 3rem !important;
  }
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
  <h1 class="logo-font mb-0" class:search={$stateSearchSubmitted}>
    <a class="" href="https://atagl.com" title="Atagl">At a gl.</a>
  </h1>
  <Search env={ENV} />
  {#if $searchList.length}
    <TableManipulator />
    <CompareTable />
    <button
      class="btn btn-action tooltip tooltip-left"
      id="btnGoTop"
      on:click={goTop}
      data-tooltip="페이지 맨 위로">
      <i class="icon icon-arrow-up" />
    </button>
    <footer class="no-select text-center mt-4 mb-5">
      <h2 class="logo-font mb-0" title="Atagl">At a gl.</h2>
      <small title="contact@atagl.com">contact@atagl.com</small>
    </footer>
  {/if}
</main>
