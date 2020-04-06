<script>
  const PRICE = "price";
  const RATING = "rating";
  const RATINGCOUNT = "ratingCount";

  export let list;

  let sortInfo = { key: undefined, ascDesc: undefined };

  function handleClickSort(key) {
    let ascDesc = sortInfo.ascDesc;
    sortInfo = { key, ascDesc: ascDesc ? ascDesc * -1 : 1 };
    list = sort(list);
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
</style>

<div class="text-right">
	<div clas	s="btn-group">
		<button
			class="btn btn-link tooltip"
			on:click={() => handleClickSort(PRICE)}
			data-tooltip="가격순 정렬하기">
			가격
			{#if sortInfo.key === PRICE && sortInfo.ascDesc === -1}
				<i class="icon icon-downward" />
			{:else if sortInfo.key === PRICE && sortInfo.ascDesc === 1}
				<i class="icon icon-upward" />
			{/if}
		</button>
		<button
			class="btn btn-link tooltip"
			on:click={() => handleClickSort(RATING)}
			data-tooltip="평가순 정렬하기">
			평가
			{#if sortInfo.key === RATING && sortInfo.ascDesc === -1}
				<i class="icon icon-downward" />
			{:else if sortInfo.key === RATING && sortInfo.ascDesc === 1}
				<i class="icon icon-upward" />
			{/if}
		</button>
		<button
			class="btn btn-link tooltip"
			on:click={() => handleClickSort(RATINGCOUNT)}
			data-tooltip="평가수순 정렬하기">
			평가수
			{#if sortInfo.key === RATINGCOUNT && sortInfo.ascDesc === -1}
				<i class="icon icon-downward" />
			{:else if sortInfo.key === RATINGCOUNT && sortInfo.ascDesc === 1}
				<i class="icon icon-upward" />
			{/if}
		</button>
	</div>
</div>