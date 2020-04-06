<script>
	import { zoom } from "./zoom.js";

	export let list;
	export let removedList = [];

	function remove(item) {
	  removedList = [...removedList, item];
	  list = list.filter(i => i !== item);
	  console.log(removedList);
	}
</script>

<style>
  table td {
    text-align: center;
  }
  table td:nth-child(1) img {
    width: 9rem;
    margin: 0 auto;
  }
  table td:nth-child(2) {
    text-align: left;
  }
  table td:nth-child(3) {
    text-align: right;
  }
</style>

<table class="table table-hover">
	<tbody>
		{#each list as item}
		<tr>
			<td>
				<img use:zoom class="img-responsive" src={item.image} alt={item.title} onerror="this.src='/Noimage.svg'" />
			</td>
			<td>{item.title}</td>
			<td>₩{item.price.toLocaleString()}</td>
			<td>
				{#if item.rating}
				{item.rating}
				<br />
				({item.ratingCount})
				{/if}
			</td>
			<td>
				<a href={item.link} target="_blank" title="{item.mallName}에서 보기">
					<i class="icon icon-link" />
				</a>
			</td>
			<td>
				<button on:click={() => remove(item)} class="icon icon-cross btn btn-link" />
			</td>
		</tr>
		{/each}
	</tbody>
</table>