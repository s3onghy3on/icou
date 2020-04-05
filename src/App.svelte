<script>
  import axios from "axios";

  let list;
  let ascDescPrice;
  let ascDescRating;
  let ascDescRatingCount;
  let loading;

  async function handleSubmit(event) {
    loading = true;
    console.log(event.target.search.value);
    const res = await axios.get(
      `http://localhost:8080/search?kw=${event.target.search.value}`
    );

    let iherbList = res.data.iherbList.map(item => ({
      ...item,
      price: parseInt(item.price),
      rating: parseFloat(item.rating),
      ratingCount: parseInt(item.ratingCount),
      mallName: "아이허브"
    }));
    let coupangList = res.data.coupangList.map(item => ({
      ...item,
      price: parseInt(item.price),
      rating: parseFloat(item.rating),
      ratingCount: parseInt(item.ratingCount),
      mallName: "쿠팡"
    }));
    loading = false;
    list = [...iherbList, ...coupangList];
  }

  function handleClickSort(key) {
    let ascDesc;
    switch (key) {
      case "price":
        ascDescRating = null;
        ascDescRatingCount = null;
        ascDescPrice = ascDescPrice ? ascDescPrice * -1 : 1;
        list = sort(list, key, ascDescPrice);
        break;
      case "rating":
        ascDescPrice = null;
        ascDescRatingCount = null;
        ascDescRating = !ascDescRating ? 1 : ascDescRating * -1;
        list = sort(list, key, ascDescRating);
        break;
      case "ratingCount":
        ascDescPrice = null;
        ascDescRating = null;
        ascDescRatingCount = !ascDescRatingCount ? 1 : ascDescRatingCount * -1;
        list = sort(list, key, ascDescRatingCount);
        break;
      default:
        break;
    }
  }

  function sort(items, key, ascDesc) {
    return items.sort(function(a, b) {
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
  .logo {
    width: 6.4rem;
  }
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
  /* #compareTable th:nth-child(1) {
    width: 120px;
  }
  #compareTable th:nth-child(2) {
    max-width: 50rem;
  } */
  #compareTable td {
    text-align: center;
  }
  #compareTable td:nth-child(1) img {
    margin: 0 auto;
  }
  #compareTable td:nth-child(2) {
    text-align: left;
  }
  #compareTable td:nth-child(3) {
    text-align: right;
  }
</style>

<main class="container grid-lg lang-ko text-center">
  <h1 class="mb-0">icou</h1>
  <img
    class="logo"
    src="/bacteriophage.svg"
    alt="icou logo"
    title="icou Bacteriophage" />
  <div class="wrapper-search">
    <form on:submit|preventDefault={handleSubmit} class="has-icon-right">
      <input
        id="search"
        class="form-input"
        type="search"
        placeholder="검색"
        autofocus
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

  {#if list}
    <div class="btn-group">
      <button
        class="btn btn-link tooltip"
        on:click={() => handleClickSort('price')}
        data-tooltip="가격순 정렬하기">
        가격
        {#if ascDescPrice === -1}
          <i class="icon icon-downward" />
        {:else if ascDescPrice === 1}
          <i class="icon icon-upward" />
        {/if}
      </button>
      <button
        class="btn btn-link tooltip"
        on:click={() => handleClickSort('rating')}
        data-tooltip="평가순 정렬하기">
        평가
        {#if ascDescRating === -1}
          <i class="icon icon-downward" />
        {:else if ascDescRating === 1}
          <i class="icon icon-upward" />
        {/if}
      </button>
      <button
        class="btn btn-link tooltip"
        on:click={() => handleClickSort('ratingCount')}
        data-tooltip="평가수순 정렬하기">
        평가수
        {#if ascDescRatingCount === -1}
          <i class="icon icon-downward" />
        {:else if ascDescRatingCount === 1}
          <i class="icon icon-upward" />
        {/if}
      </button>
      <!-- <button class="btn btn-link"></button>
      <button class="btn btn-link">평가수</button> -->
    </div>
    <table id="compareTable" class="table table-hover">
      <!-- <thead class="text-center">
        <tr>
          <th nowrap>이미지</th>
          <th nowrap>제목</th>
          <th nowrap>
            <button
              class="btn btn-link tooltip"
              on:click={() => handleClickSort('price')}
              data-tooltip="가격순 정렬하기">
              가격
              {#if ascDesc === -1}
                <i class="icon icon-downward" />
              {:else if ascDesc === 1}
                <i class="icon icon-upward" />
              {/if}
            </button>
          </th>
          <th nowrap>평가</th>
          <th nowrap>링크</th>
          <th nowrap>숨기기</th>
        </tr>
      </thead> -->
      <tbody>
        {#each list as { image, title, link, price, rating, ratingCount, mallName }}
          <tr>
            <td>
              <img class="img-responsive" src={image} alt={title} />
            </td>
            <td>{title}</td>
            <td>
              <!-- {#if price === -1}
                <small>가격 정보 없음</small>
              {:else}₩{price.toLocaleString()}{/if} -->
              ₩{price.toLocaleString()}
            </td>
            <td>
              {#if rating}
                {rating}
                <br />
                ({ratingCount})
              {/if}
            </td>
            <td>
              <a href={link} target="_blank" title="{mallName}에서 보기">
                <i class="icon icon-link" />
              </a>
            </td>
            <td>
              <i class="icon icon-cross" />
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</main>
