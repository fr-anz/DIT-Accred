<script>
	let videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
</script>

<header class="video-container">
	<video src={videoUrl} autoplay loop muted playsinline class="video-home"></video>
</header>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.video-container {
		position: relative;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.video-home {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
		z-index: 1;
	}
</style>
