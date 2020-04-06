<script>
  import { onMount } from "svelte";
  import axios from "axios";
  // import tempJson from "./temp.json";

  export let list = undefined;

  let ref;
  let loading;

  onMount(() => {
    ref.focus();
  });

  async function handleSubmit(event) {
    loading = true;
    console.log(event.target.search.value);
    const res = await axios.get(
      `http://localhost:8080/search?kw=${event.target.search.value}`
    );
    // let iherbList = res.iherbList.map(item => ({
    let iherbList = res.data.iherbList.map(item => ({
      ...item,
      // image: "xx" + item.image,
      price: parseInt(item.price),
      rating: parseFloat(item.rating),
      ratingCount: parseInt(item.ratingCount),
      mallName: "아이허브"
    }));
    // let coupangList = res.coupangList.map(item => ({
    let coupangList = res.data.coupangList.map(item => ({
      ...item,
      // image: "xx" + item.image,
      price: parseInt(item.price),
      rating: parseFloat(item.rating),
      ratingCount: parseInt(item.ratingCount),
      mallName: "쿠팡"
    }));
    loading = false;
    list = combineList(iherbList, coupangList);
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
  .wrapper-search {
    width: 14rem;
    margin: 8px auto;
  }
  #search {
    border-left: none;
    border-right: none;
    border-radius: 0;
  }
  #search:focus {
    box-shadow: none;
  }
</style>

<div class="wrapper-search">
  <form on:submit|preventDefault={handleSubmit} class="has-icon-right">
    <input
      id="search"
      class="form-input"
      type="search"
      placeholder="검색"
      bind:this={ref}
      required />
    {#if loading}
      <i class="form-icon loading" />
    {:else}
      <button
        on:submit|preventDefault={handleSubmit}
        class="form-icon icon icon-search btn btn-link" />
    {/if}
  </form>
</div>
