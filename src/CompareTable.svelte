<script>
  import { fly } from "svelte/transition";
  import { searchList } from "./store.js";

  let toastMsg = false;
  let toastTimeoutID;

  function showToast(msg) {
    clearTimeout(toastTimeoutID);
    toastMsg = msg;
    toastTimeoutID = setTimeout(function() {
      toastMsg = false;
    }, 3000);
  }

  function linkMall(mallName, link) {
    switch (mallName) {
      case "iHerb":
        console.log(link);
        window.open(link, "_blank");
        break;
      case "Coupang":
        console.log(link);
        window.open(link, "_blank");
        break;
      default:
        break;
    }
  }

  function removeItem(item) {
    showToast(`"${item.title}" 항목을 제외하였습니다.`);
    searchList.update(list => list.filter(i => i !== item));
  }
</script>

<style>
  button {
    border: 0 none;
    background-color: transparent;
    cursor: pointer;
  }
  .product-img {
    margin: 0 auto;
    display: block;
    height: auto;
    max-width: 100%;
  }
  .item {
    position: relative;
    background-color: #fff;
    padding: 0.8rem 0;
  }
  .badge[data-badge]::after {
    background-color: rgba(256, 256, 256, 0.3);
    color: #3b4351;
    box-shadow: none;
    border-radius: 0.1rem;
    transform: none;
  }
  .title {
    word-break: keep-all;
  }
  .title:hover {
    color: olive;
  }
  @media (min-width: 768px) {
    .title,
    .price {
      text-align: left;
    }
  }
  .price {
    margin-top: 0.9rem;
  }
  .btn-hide {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 1.5rem;
    color: #000;
    text-shadow: 0 1px 0 #fff;
  }
  .btn-hide:focus {
    box-shadow: none;
  }
  .toast {
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>

<div class="mt-3" transition:fly={{ y: 200, duration: 900 }}>
  {#each $searchList as item, i}
    {#if !item.hide}
      <div class="row item">
        <button
          class="col-12 col-sm-12 col-md-3 badge"
          data-badge={`${item.rating}(${item.ratingCount})`}
          on:click={() => linkMall(item.mallName, item.link)}
          title="{item.mallName}에서 보기">
          <img
            class="product-img"
            src={item.image}
            alt={item.title}
            loading="lazy" />
        </button>
        <div class="align-self-center col-12 col-sm-12 col-md-9 no-gutters">
          <button
            class="h5 title col"
            on:click={() => linkMall(item.mallName, item.link)}
            title="{item.mallName}에서 보기">
            {item.title}
          </button>
          <div class="text-bold price olive col">
            ₩{item.price.toLocaleString()}
          </div>
        </div>
        <button
          on:click={() => removeItem(item)}
          class="btn btn-link btn-hide tooltip tooltip-left"
          data-tooltip="항목 제외하기">
          &times;
        </button>
        <div class="col text-gray ">-</div>
      </div>
    {/if}
  {/each}
</div>
{#if toastMsg}
  <div class="toast" transition:fly={{ y: 42, duration: 1000 }}>{toastMsg}</div>
{/if}
