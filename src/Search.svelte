<script>
  import { onMount } from "svelte";
  import { searchList, stateSearchSubmitted } from "./store.js";
  import axios from "axios";

  export let env;
  export let keyword = false;

  const baseUrl =
    env === "dev"
      ? "http://localhost:8080/search?kw="
      : "https://atagl.com/search?kw=";

  $: fullTitle = keyword ? `${keyword} - ATAGL 검색` : "ATAGL";
  let ref;
  let loading;
  let process;

  onMount(() => {
    autocomplete(ref);
    ref.focus();
  });

  function handleSubmit(event) {
    clearInterval(process);
    stateSearchSubmitted.set(true);
    loading = true;
    keyword = event.target.search.value.trim().replace(/\s\s+/g, "+");
    // console.log(keyword);
    process = setTimeout(async () => {
      const res = await axios.get(baseUrl + keyword);
      let iherbList = res.data.iherbList.map(item => ({
        ...item,
        price: parseInt(item.price),
        rating: item.rating ? parseFloat(item.rating) : 0,
        ratingCount: item.ratingCount ? parseInt(item.ratingCount) : 0,
        mallName: "iHerb"
      }));
      let coupangList = res.data.coupangList.map(item => ({
        ...item,
        price: parseInt(item.price),
        rating: item.rating ? parseFloat(item.rating) : 0,
        ratingCount: item.ratingCount ? parseInt(item.ratingCount) : 0,
        mallName: "Coupang"
      }));
      loading = false;
      let list = combineList(iherbList, coupangList);
      searchList.set(list);
    }, 300);
  }

  function combineList(a, b) {
    let aLen = a.length;
    let bLen = b.length;

    if (!aLen && !bLen) return [];
    if (!aLen) return b;
    if (!bLen) return a;

    let combineList = [];
    let more, less;

    if (aLen === bLen) {
      for (let i = 0; i < aLen; i++) combineList.push(a[i], b[i]);
      return combineList;
    }

    if (aLen < bLen) {
      more = b;
      less = a;
    } else {
      more = a;
      less = b;
    }

    let n, d;
    for (n = 0; n < less.length; n++) combineList.push(a[n], b[n]);
    for (d = n; d < more.length; d++) combineList.push(more[d]);

    return combineList;
  }
</script>

<style>
  #search {
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: initial;
  }
  #search:focus {
    border-color: olive;
    box-shadow: none;
  }
  .loading::after {
    border: 0.1rem solid olive;
    border-radius: 50%;
    border-right-color: transparent;
    border-top-color: transparent;
  }
  .has-icon-right .form-icon {
    top: 18px;
  }
</style>

<svelte:head>
  <title>{fullTitle}</title>
</svelte:head>
<form
  on:submit|preventDefault={handleSubmit}
  autocomplete="off"
  class="has-icon-right">
  <div class="autocomplete">
    <input
      id="search"
      class="form-input"
      type="search"
      placeholder="검색"
      bind:this={ref}
      required />
    {#if loading}
      <i class="form-icon loading olive" />
    {:else}
      <button
        on:submit|preventDefault={handleSubmit}
        class="form-icon icon icon-search btn btn-link olive" />
    {/if}
  </div>
</form>
