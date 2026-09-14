<script>
  import Footer from '$lib/components/footer.svelte';
  
  // Import your custom SVG cable asset
  import cablesSvg from '$lib/assets/Cables.svg';

  // Svelte 5 Runes
  let scrollY = $state(0);
  let innerHeight = $state(0);
  let timelineContainer = $state();
  
  // Store DOM references to each row to track their positions
  let rowElements = $state([]);

  // Calculate vertical height for the scrolling dot and the growing green trail
  let progress = $derived.by(() => {
    const currentScroll = scrollY; 
    if (!timelineContainer || !innerHeight) return 0;
    
    const rect = timelineContainer.getBoundingClientRect();
    const screenMiddle = innerHeight / 2;
    
    // Constant for our start offset to align calculations
    const startOffsetPx = 35;
    const startPercent = (startOffsetPx / rect.height) * 100;

    // 1. Hover / Active state: Snaps exactly to the center of the active row to prevent misalignment
    if (activeArea !== null) {
      const el = rowElements[activeArea - 1];
      if (el) {
        const rowRect = el.getBoundingClientRect();
        const centerY = (rowRect.top - rect.top) + (rowRect.height / 2);
        return Math.max(startPercent, Math.min(100, (centerY / rect.height) * 100));
      }
    }
    
    // 2. Scroll state: Follows the middle of the screen smoothly, clamped to start at fanning point
    let rawProgress = ((screenMiddle - rect.top) / rect.height) * 100;
    return Math.max(startPercent, Math.min(100, rawProgress));
  });

  // Calculate the height of the growing green spine starting from the convergence point
  let progressSpineHeight = $derived.by(() => {
    if (!timelineContainer) return 0;
    const rect = timelineContainer.getBoundingClientRect();
    const startPercent = (45 / rect.height) * 100;
    return Math.max(0, progress - startPercent);
  });

  // Calculate which area is currently in the middle of the screen (Scroll-based active state)
  let activeArea = $derived.by(() => {
    const currentScroll = scrollY; // Force reactivity
    if (!timelineContainer || !innerHeight) return null;
    
    const screenMiddle = innerHeight / 2;
    
    for (let i = 0; i < complianceAreas.length; i++) {
      const el = rowElements[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        const rowMiddle = rect.top + rect.height / 2;
        
        // If the center of the screen is within half a row's height, activate it!
        if (Math.abs(screenMiddle - rowMiddle) < 60) {
          return complianceAreas[i].id;
        }
      }
    }
    return null;
  });

  const complianceAreas = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    side: (i + 1) % 2 === 0 ? 'left' : 'right'
  }));
</script>

<svelte:head>
  <title>Compliance | DIT-PUP</title>
</svelte:head>

<svelte:window bind:scrollY bind:innerHeight />

<main>
  <section class="hero-section">
    <div class="hero-bg"></div> 
    <h1 class="t_display hero-title">COMPLIANCE</h1>
  </section>

  <section class="compliance-section">
    <div class="compliance-container">
      
      <!-- Top Header Node (Router) -->
      <div class="cap-box header {activeArea !== null || progress > 1 ? 'header-active' : ''}">
        <h2 class="brown-title">People connects technology</h2>
        <span class="italic-sub">because</span>
      </div>

      <!-- Main Timeline -->
      <div class="timeline" bind:this={timelineContainer}>
        
        <!-- 1. YOUR CUSTOM CABLES SVG BACKGROUND -->
        <div class="cables-background">
          <img src={cablesSvg} alt="Connection Cables" class="cables-img" />
        </div>

        <!-- 2. THE GROWING GREEN TRAIL (From Router to Dot) -->
        <div class="progress-spine" style="height: {progressSpineHeight}%;"></div>

        <!-- 3. AMBIENT SCROLL DOT -->
        <div class="ambient-scroll-light" style="top: {progress}%;"></div>

        {#each complianceAreas as area, i}
          <!-- The row gets a 'scroll-active' class when it hits the center of the screen -->
          <div class="area-row {activeArea === area.id ? 'scroll-active' : ''}" bind:this={rowElements[i]}>

            <!-- LEFT HALF -->
            <div class="area-half left-half">
              {#if area.side === 'left'}
                <div class="area-card">
                  <div class="content-box"><span class="placeholder">...</span></div>
                  <div class="info-section">
                    <span class="area-label">AREA {area.id}</span>
                    <div class="dots-grid">
                      {#each Array(10) as _, j}
                        <div class="dot {j < area.id ? 'green' : 'red'}"></div>
                      {/each}
                    </div>
                  </div>
                  <!-- The port circle inside the box -->
                  <div class="port-box"><div class="port"></div></div>
                </div>
                <!-- Invisible overlay wire that lights up on scroll -->
                <div class="wire wire-left"></div>
              {/if}
            </div>

            <!-- RIGHT HALF -->
            <div class="area-half right-half">
              {#if area.side === 'right'}
                <!-- Invisible overlay wire that lights up on scroll -->
                <div class="wire wire-right"></div>
                <div class="area-card">
                  <div class="port-box"><div class="port"></div></div>
                  <div class="info-section">
                    <span class="area-label">AREA {area.id}</span>
                    <div class="dots-grid">
                      {#each Array(10) as _, j}
                        <div class="dot {j < area.id ? 'green' : 'red'}"></div>
                      {/each}
                    </div>
                  </div>
                  <div class="content-box"><span class="placeholder">...</span></div>
                </div>
              {/if}
            </div>

          </div>
        {/each}
      </div>

      <!-- Bottom Footer Node -->
      <div class="cap-box footer-cap">
        <!-- Added the active-dot class condition -->
        <div class="dot top {progress > 98 ? 'active-dot' : ''}"></div>
        <h2 class="brown-title small">technology connects people</h2>
      </div>
      
    </div>
  </section>

  <Footer />
</main>

<style>
  /* ── DESIGN TOKENS ── */
  :root {
    --color-maroon: #941518;
    --color-gold: #cfa83a;
    --color-green: #4caf50;
    --font-body: 'Inter', sans-serif;
    --font-heading: 'Overpass', sans-serif;
  }

  /* Global HTML Scroll Snapping settings for a premium presentation feel */
  :global(html) {
    scroll-snap-type: y proximity;
    scroll-behavior: smooth;
  }

  main {
    background-color: #ffffff;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── HERO SECTION ── */
  .hero-section {
    position: relative;
    width: 100%;
    height: 100vh; 
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8; 
    overflow: hidden;
  }

  .hero-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-size: cover;
    background-position: center;
    opacity: 0.3; 
    z-index: 0;
  }

  /* Font, weight, tracking and the black→maroon gradient come from the global
     .t_display role. Only the stacking context and page padding stay here. */
  .hero-title {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 5%;
  }

  /* ── CONTENT WRAPPER ── */
  .compliance-section {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 80px 5%;
    background-color: #fefefe;
    flex-grow: 1;
  }

  .compliance-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 900px;
    gap: 0; 
  }

  /* ── GOLD CAP BOXES ── */
  .cap-box {
    background: linear-gradient(180deg, #dfb75f 0%, #c49635 100%);
    border: 1px solid #a68430;
    border-radius: 8px;
    padding: 20px 60px;
    text-align: center;
    position: relative;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    z-index: 200;
    transition: all 0.4s ease;
  }

  .header { z-index: 400; }

  /* Light up the header when scrolling */
  .header-active {
    box-shadow: 0 0 25px 5px rgba(76, 175, 80, 0.4);
    border-color: var(--color-green);
  }

  .brown-title {
    color: #7b2a1a;
    font-family: var(--font-heading);
    margin: 0;
    font-weight: 800;
    font-size: 1.6rem;
    letter-spacing: 0.5px;
  }
  .brown-title.small { font-size: 1.2rem; }
  .italic-sub { color: #7b2a1a; font-family: var(--font-body); font-style: italic; font-size: 1rem; display: block; margin-top: 4px; }

  .footer-cap .dot.top {
    width: 10px;
    height: 10px;
    background-color: #111; 
    border-radius: 50%;
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-60%);
    transition: all 0.3s ease; /* Smooth transition */
  }

  /* Green state (Active) */
  .footer-cap .dot.top.active-dot {
    background-color: var(--color-green);
    box-shadow: 0 0 10px var(--color-green);
  }
  .footer-cap{
    padding: 20px 60px; 
    margin-top: -5px;
  }

  /* ── TIMELINE CONTAINER & ALIGNMENT CONTROLS ── */
  .timeline {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 0px; 
    margin-bottom: 0px; 

    /* 1. Structural Spacing (Matches the SVG scale) */
    --svg-start-offset: 46.5px;    /* IMPORTANT: How far down does Area 1 start from the router? */
    --row-height: 115px;          /* IMPORTANT: What is the exact distance between branches in your Figma file? If they drift down, decrease this. If they drift up, increase this. */
    --svg-bottom-spacing: 71px;   /* Pushes the Footer away from Area 10 */
    --card-distance: 60px;        /* How far left/right the cards sit from the center */
    
    /* 2. Visual Overlays & Nudges (Pixel-perfect fine-tuning) */
    --wire-length: 68px;          /* How long the horizontal green line should be */
    --wire-nudge-y: 0px;          /* Move horizontal green wire UP (-px) or DOWN (px) */
    --spine-nudge-x: -1px;         /* Move vertical green line LEFT (-px) or RIGHT (px) */
    
    /* ========================================================== */
    
    padding-top: var(--svg-start-offset); 
    padding-bottom: var(--svg-bottom-spacing);
    gap: 0; /* Gap is set to 0 because we use fixed row-heights now for mathematical perfection */
  }

  /* ── CABLES SVG BACKGROUND ── */
  .cables-background {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50.2%;
    transform: translateX(-50%);
    width: 100%;
    height: 100%;
    z-index: 0; 
    display: flex;
    justify-content: center;
    pointer-events: none; 
  }

  .cables-img {
    height: 100%; 
    width: 100%;
    /* Fill forces the SVG to exactly match the HTML bounds we set above */
    object-fit: fill; 
  }

  /* ── THE GROWING GREEN TRAIL (ROUTER TO DOT) ── */
  .progress-spine {
    position: absolute;
    top: var(--svg-start-offset); /* Starts precisely at the fanning convergence point */
    /* Apply vertical spine nudge */
    left: calc(50% + var(--spine-nudge-x)); 
    width: 4px;
    background-color: var(--color-green);
    box-shadow: 0 0 10px var(--color-green);
    transform: translateX(-50%);
    z-index: 20;
    transition: height 0.1s linear;
  }

  /* ── AMBIENT SCROLL DOT CSS ── */
  .ambient-scroll-light {
    position: absolute;
    /* Apply vertical spine nudge so dot stays perfectly centered on the line */
    left: calc(50% + var(--spine-nudge-x)); 
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background-color: var(--color-green);
    border-radius: 50%;
    box-shadow: 0 0 20px 8px rgba(76, 175, 80, 0.9), 0 0 45px 15px rgba(76, 175, 80, 0.5);
    z-index: 100; 
    transition: top 0.1s linear; 
    pointer-events: none; 
  }

  /* ── ROWS & CONTIGUOUS SPACING ── */
  .area-row {
    display: flex;
    width: 100%;
    /* Forces every row to be exactly the same height so it never drifts from the SVG */
    height: var(--row-height);
    align-items: center;
    position: relative;
    z-index: 1;
    transition: all 0.3s ease;
    
    /* Configures proximity-based scroll snapping alignment */
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  .area-half {
    width: 50%;
    display: flex;
    align-items: center;
  }

  /* Apply Card Distance */
  .left-half { justify-content: flex-end; padding-right: var(--card-distance); }
  .right-half { justify-content: flex-start; padding-left: var(--card-distance); }

  /* ── UNIFIED GOLD CARD ── */
  .area-card {
    display: flex;
    align-items: center;
    background: linear-gradient(180deg, #dfb75f 0%, #c49635 100%);
    border: 2px solid #a68430;
    border-radius: 12px;
    padding: 10px;
    gap: 15px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    z-index: 5; 
  }

  /* ── INTERNAL CARD ELEMENTS ── */
  .port-box {
    background-color: #cda44b;
    border: 1px solid #a68430;
    border-radius: 8px;
    width: 35px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
  }

  .port {
    width: 12px;
    height: 12px;
    background-color: #111;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  .info-section {
    display: flex;
    flex-direction: column;
    justify-content: center; /* This keeps the label and grid centered vertically */
    height: 200%;            /* Ensure it fills the card height */
    gap: 4px;
  }

  .area-label {
    font-family: var(--font-heading);
    font-size: 0.85rem;
    font-weight: 800;
    color: #111;
    margin-bottom: 4px;
    letter-spacing: 0.5px;
  }

  .dots-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
  }

  .dot { width: 7px; height: 7px; border-radius: 50%; }
  .dot.green { background-color: var(--color-green); }
  .dot.red { background-color: #941518; }

  .content-box {
    background-color: #e2e2e2;
    border: 1px solid #a0a0a0;
    border-radius: 6px;
    height: 55px;
    width: 200px; 
    display: flex;
    align-items: center;
    justify-content: center;
    color: #888;
  }

  /* ── SEAMLESS WIRES (INVISIBLE UNTIL SCROLL ACTIVE) ── */
  .wire {
    width: var(--wire-length);
    height: 4px;
    background-color: transparent; 
    position: absolute; 
    z-index: 10; 
    /* Apply horizontal wire Y-nudge */
    margin-top: var(--wire-nudge-y);
    transition: all 0.3s ease;
  }

  .wire-left { right: 50%; }
  .wire-right { left: 50%; }
  
  .area-row.scroll-active .area-card {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0,0,0,0.15), 0 0 15px rgba(76, 175, 80, 0.2);
    border-color: var(--color-green);
  }

  .area-row.scroll-active .port {
    background-color: var(--color-green);
    box-shadow: 0 0 12px var(--color-green);
    transform: scale(1.2);
  }

  .area-row.scroll-active .wire {
    background-color: var(--color-green);
    box-shadow: 0 0 12px var(--color-green);
  }

  
</style>