<script>
	import Footer from '$lib/components/footer.svelte';
	import AboutDepartmentSection from '$lib/components/home/AboutDepartmentSection.svelte';
	import BentoIntroSection from '$lib/components/home/BentoIntroSection.svelte';
	import HeroSection from '$lib/components/home/HeroSection.svelte';
	import LeadershipSection from '$lib/components/home/LeadershipSection.svelte';
	import ProblemStatementSection from '$lib/components/home/ProblemStatementSection.svelte';
	import QuickLinksSection from '$lib/components/home/QuickLinksSection.svelte';
	import WelcomeSection from '$lib/components/home/WelcomeSection.svelte';
</script>

<HeroSection />
<BentoIntroSection />
<WelcomeSection />
<LeadershipSection />
<AboutDepartmentSection />
<QuickLinksSection />
<ProblemStatementSection />
<Footer />

<style>
	:global(:root) {
		--container-max: 1280px;
		--page-pad: clamp(1rem, 4vw, 4rem);
		--section-space: clamp(3rem, 7vw, 6rem);
		--space-xs: clamp(0.5rem, 1vw, 0.75rem);
		--space-sm: clamp(0.75rem, 1.5vw, 1rem);
		--space-md: clamp(1rem, 2vw, 2rem);
		--space-lg: clamp(2rem, 4vw, 4rem);
		--text-sm: clamp(0.875rem, 1vw, 1rem);
		--text-md: clamp(1rem, 1.5vw, 1.25rem);
		--text-lg: clamp(1.5rem, 3vw, 2.5rem);
		--text-xl: clamp(2rem, 5vw, 4rem);
	}
</style>
