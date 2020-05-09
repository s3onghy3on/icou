<script>
  import { fade } from "svelte/transition";
  import { searchList } from "./store.js";
  const PRICE = "price";
  const RATING = "rating";
  const RATINGCOUNT = "ratingCount";

  let sortInfo = { key: undefined, ascDesc: undefined };
  function searchInResult(e) {
    const keyword = e.target.value;
    if (keyword) {
      const reg = new RegExp(keyword, "gi");
      searchList.update(list =>
        list.map(item => ({
          ...item,
          hide: !reg.test(item.title)
        }))
      );
    } else {
      searchList.update(list =>
        list.map(item => ({
          ...item,
          hide: false
        }))
      );
    }
  }

  function handleClickSort(key) {
    let ascDesc = sortInfo.ascDesc;
    sortInfo = { key, ascDesc: ascDesc ? ascDesc * -1 : 1 };
    searchList.update(list => sort(list));
  }

  function sort(list) {
    let { key, ascDesc } = sortInfo;
    return list.sort(function(a, b) {
      if (a[key] > b[key]) {
        return 1 * ascDesc;
      }
      if (a[key] < b[key]) {
        return -1 * ascDesc;
      }
      // a must be equal to b
      return 0;
    });
  }
</script>

<style>
  #searchInResult {
    border-left: none;
    border-right: none;
    border-radius: 0;
    background-color: initial;
  }
  #searchInResult:focus {
    border-color: olive;
    box-shadow: none;
  }
  .manipulator-container {
    width: 14rem;
    margin: 0 auto;
  }
</style>

<div class="manipulator-container">
  <div class="btn-group btn-group-block">
    <button
      class="btn btn-link tooltip olive text-left tooltip-bottom"
      on:click={() => handleClickSort(PRICE)}
      data-tooltip="가격순 정렬하기">
      가격
      {#if sortInfo.key === PRICE && sortInfo.ascDesc === -1}
        <i in:fade class="icon icon-downward" />
      {:else if sortInfo.key === PRICE && sortInfo.ascDesc === 1}
        <i in:fade class="icon icon-upward" />
      {/if}
    </button>
    <button
      class="btn btn-link tooltip olive tooltip-bottom"
      on:click={() => handleClickSort(RATINGCOUNT)}
      data-tooltip="평가수순 정렬하기">
      평가수
      {#if sortInfo.key === RATINGCOUNT && sortInfo.ascDesc === -1}
        <i in:fade class="icon icon-downward" />
      {:else if sortInfo.key === RATINGCOUNT && sortInfo.ascDesc === 1}
        <i in:fade class="icon icon-upward" />
      {/if}
    </button>
    <button
      class="btn btn-link tooltip olive text-right tooltip-bottom"
      on:click={() => handleClickSort(RATING)}
      data-tooltip="평가순 정렬하기">
      평가
      {#if sortInfo.key === RATING && sortInfo.ascDesc === -1}
        <i in:fade class="icon icon-downward" />
      {:else if sortInfo.key === RATING && sortInfo.ascDesc === 1}
        <i in:fade class="icon icon-upward" />
      {/if}
    </button>
  </div>
</div>
<div class="manipulator-container">
  <input
    id="searchInResult"
    class="form-input text-center"
    type="search"
    placeholder="결과 내 검색"
    on:input={event => searchInResult(event)}
    required />
</div>
