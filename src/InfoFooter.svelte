<script>
  export let listLen;
  export let removedLen;
</script>

<style>
  footer {
    width: 100%;
    bottom: 0;
  }
</style>

<footer class="navbar p-fixed bg-gray">
	<section class="navbar-section">
      검색된 항목:{listLen}
      제외된 항목:{removedLen}
	</section>
	<section class="navbar-center">
		<!-- centered logo or brand -->
	</section>
	<section class="navbar-section">
	</section>
</footer>