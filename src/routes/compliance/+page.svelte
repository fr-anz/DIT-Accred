<script>
  import Footer from '$lib/components/footer.svelte';
  import cablesSvg from '$lib/assets/Cables.svg';

  // Svelte 5 Runes
  let scrollY = $state(0);
  let innerHeight = $state(0);
  let timelineContainer = $state();
  
  // Base container width
  let timelineWidth = $state(1300); 
  
  // ── GEOMETRY ENGINE ──
  let svgRenderedWidth = $derived(timelineWidth * 0.8);
  let scale = $derived(svgRenderedWidth / 900); 
  
  let svgStartOffset = $derived(46.5 * scale);
  let rowHeight = $derived(115 * scale);
  let svgBottomSpacing = $derived(71 * scale);

  // NEW: Adjust THIS value (e.g., -5 to move UP, 5 to move DOWN) to move ONLY the green line/dot
  let lineStartNudgeY = -15; 
  let lineStartY = $derived((46.5 * scale) + lineStartNudgeY);

  let progress = $derived.by(() => {
    if (!timelineContainer || !innerHeight) return 0;
    
    const rect = timelineContainer.getBoundingClientRect();
    const screenMiddle = innerHeight / 2;
    // Uses lineStartY so it tracks perfectly with your manual adjustments
    const startPercent = (lineStartY / rect.height) * 100;

    if (activeArea !== null) {
      const el = rowElements[activeArea - 1];
      if (el) {
        const rowRect = el.getBoundingClientRect();
        const branchCenterY = (rowRect.top - rect.top) + (rowHeight / 2);
        return Math.max(startPercent, Math.min(100, (branchCenterY / rect.height) * 100));
      }
    }
    
    let rawProgress = ((screenMiddle - rect.top) / rect.height) * 100;
    return Math.max(startPercent, Math.min(100, rawProgress));
  });

  let progressSpineHeight = $derived.by(() => {
    if (!timelineContainer) return 0;
    const rect = timelineContainer.getBoundingClientRect();
    // Uses lineStartY so the green trail originates from the newly adjusted position
    const startPercent = (lineStartY / rect.height) * 100;
    return Math.max(0, progress - startPercent);
  });

  let rowElements = $state([]);
  let activeArea = $derived.by(() => {
    const currentScroll = scrollY; 
    if (!timelineContainer || !innerHeight) return null;
    
    const screenMiddle = innerHeight / 2;
    
    for (let i = 0; i < complianceAreas.length; i++) {
      const el = rowElements[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        const branchMiddle = rect.top + (rowHeight / 2);
        
        if (Math.abs(screenMiddle - branchMiddle) < (rowHeight / 1.1)) {
          return complianceAreas[i].id;
        }
      }
    }
    return null;
  });

  const titles = [
    "Data Privacy and Information Security",
    "Governance, Risk, and Compliance Frameworks",
    "Policies, Standards, and Operational Procedures",
    "Infrastructure, Cloud Operations, and Resilience",
    "Identity, Authentication, and Access Management",
    "Incident Response, Forensics, and Mitigation",
    "Vulnerability Assessment and Threat Management",
    "Application Security Architecture and DevSecOps",
    "Business Continuity and Disaster Recovery Planning",
    "Regulatory Audits, Assurance, and Verification"
  ];

  const complianceAreas = titles.map((titleText, i) => ({
    id: i + 1,
    title: titleText,
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
      
      <!-- Top Router Header -->
      <div class="cap-box header {activeArea !== null || progress > 1 ? 'header-active' : ''}">
        <h2 class="brown-title">People connects technology</h2>
        <span class="italic-sub">because</span>
      </div>

      <!-- Main Timeline -->
      <div 
        class="timeline" 
        bind:this={timelineContainer} 
        bind:clientWidth={timelineWidth}
        style="--scale: {scale}; --svg-start-offset: {svgStartOffset}px; --row-height: {rowHeight}px; --svg-bottom-spacing: {svgBottomSpacing}px; --line-start-y: {lineStartY}px;"
      >
        
        <!-- SVG is bound to 80% width, height fills the proportionately scaled container -->
        <div class="cables-background">
          <img src={cablesSvg} alt="Connection Cables" class="cables-img" />
        </div>

        <div class="progress-spine" style="height: {progressSpineHeight}%;"></div>
        <div class="ambient-scroll-light" style="top: {progress}%;"></div>

        {#each complianceAreas as area, i}
          <div class="area-row {activeArea === area.id ? 'scroll-active' : ''}" bind:this={rowElements[i]}>

            <!-- LEFT SIDE -->
            <div class="area-half left-half">
              {#if area.side === 'left'}
                <div class="area-card left-card">
                  <div class="info-section">
                    <span class="area-label">Area {area.id}</span>
                    <div class="dots-grid">
                      {#each Array(10) as _, j}
                        <div class="dot {j < area.id ? 'green' : 'red'}"></div>
                      {/each}
                    </div>
                  </div>
                  <div class="content-box">
                    <span class="title-text">{area.title}</span>
                  </div>
                  <div class="port-column">
                    <div class="port-box"><div class="port"></div></div>
                  </div>
                </div>
                <!-- Precision Connection Wire -->
                <div class="wire wire-left"></div>
              {/if}
            </div>

            <!-- RIGHT SIDE -->
            <div class="area-half right-half">
              {#if area.side === 'right'}
                <div class="wire wire-right"></div>
                <div class="area-card right-card">
                  <div class="port-column">
                    <div class="port-box"><div class="port"></div></div>
                  </div>
                  <div class="info-section">
                    <span class="area-label">Area {area.id}</span>
                    <div class="dots-grid">
                      {#each Array(10) as _, j}
                        <div class="dot {j < area.id ? 'green' : 'red'}"></div>
                      {/each}
                    </div>
                  </div>
                  <div class="content-box">
                    <span class="title-text">{area.title}</span>
                  </div>
                </div>
              {/if}
            </div>

          </div>
        {/each}
      </div>

      <!-- Bottom Footer Node -->
      <div class="cap-box footer-cap">
        <div class="dot top {progress > 98 ? 'active-dot' : ''}"></div>
        <h2 class="brown-title">technology connects people</h2>
      </div>
      
    </div>
  </section>

  <Footer />
</main>

<style>
  :root {
    --color-maroon: #941518;
    --color-gold: #cfa83a;
    --color-green: #4caf50;
    --font-body: 'Inter', sans-serif;
    --font-heading: 'Overpass', sans-serif;
  }

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

  .hero-title {
    position: relative;
    z-index: 1;
    text-align: center;
    padding: 0 5%;
  }

  .compliance-section {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 80px 5%;
    background-color: #fefefe;
    flex-grow: 1;
    overflow-x: auto; 
    overflow-y: hidden;
  }

  .compliance-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    min-width: 1100px; 
    max-width: 1500px; 
  }

  /* ── ROUTER BOXES ── */
  .cap-box {
    background: linear-gradient(180deg, #dfb75f 0%, #c49635 100%);
    border: 2px solid #a68430;
    border-radius: 12px;
    padding: 25px 80px; 
    min-width: 500px;   
    text-align: center;
    position: relative;
    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
    z-index: 200;
    transition: all 0.4s ease;
    margin: 0; 
  }

  .header { z-index: 400; margin-bottom: -4px; }
  .header-active {
    box-shadow: 0 0 35px 8px rgba(76, 175, 80, 0.4);
    border-color: var(--color-green);
  }

  .brown-title {
    color: #5a1910;
    font-family: var(--font-heading);
    margin: 0;
    font-weight: 900;
    font-size: 2.2rem; 
    letter-spacing: 0.5px;
    white-space: nowrap; 
  }
  .italic-sub { 
    color: #5a1910; 
    font-family: var(--font-body); 
    font-style: italic; 
    font-size: 1.15rem; 
    display: block; 
    margin-top: 4px; 
  }

  .footer-cap { padding: 20px 60px; margin-top: -4px; }
  .footer-cap .dot.top {
    width: 14px;
    height: 14px;
    background-color: #111; 
    border-radius: 50%;
    position: absolute;
    top: -11px;
    left: calc(50% - 3px);
    transform: translateX(-50%);
    transition: all 0.3s ease;
  }
  .footer-cap .dot.top.active-dot {
    background-color: var(--color-green);
    box-shadow: 0 0 20px var(--color-green);
  }

  /* ── TIMELINE ENGINE ── */
  .timeline {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding-top: var(--svg-start-offset); 
    padding-bottom: var(--svg-bottom-spacing);
    
    --card-distance: calc(50px * var(--scale)); 
    --spine-nudge-x: -3px;   
  }

  .cables-background {
    position: absolute;
    top: 0; bottom: 0; left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 100%;
    z-index: 0; 
    display: flex;
    pointer-events: none; 
  }
  .cables-img { height: 100%; width: 100%; object-fit: fill; } 

  .progress-spine {
    position: absolute;
    top: var(--line-start-y);
    left: calc(50% + var(--spine-nudge-x)); 
    width: 4px;
    background-color: var(--color-green);
    box-shadow: 0 0 12px var(--color-green);
    transform: translateX(-50%);
    z-index: 2;
    transition: height 0.1s linear;
  }

  .ambient-scroll-light {
    position: absolute;
    left: calc(50% + var(--spine-nudge-x)); 
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: var(--color-green);
    border-radius: 50%;
    box-shadow: 0 0 24px 10px rgba(76, 175, 80, 0.9), 0 0 50px 20px rgba(76, 175, 80, 0.5);
    z-index: 3; 
    transition: top 0.1s linear; 
    pointer-events: none; 
  }

  .area-row {
    display: flex;
    width: 100%;
    height: var(--row-height); 
    align-items: flex-start; 
    position: relative;
    scroll-snap-align: center;
    scroll-snap-stop: always;
  }

  .area-half { width: 50%; display: flex; align-items: flex-start; }
  .left-half { justify-content: flex-end; padding-right: var(--card-distance); }
  .right-half { justify-content: flex-start; padding-left: var(--card-distance); }

  /* ── WIDE CARDS ── */
  .area-card {
    display: flex;
    background: linear-gradient(180deg, #dfb75f 0%, #c49635 100%);
    border: 2px solid #a68430;
    border-radius: 16px;
    padding: 16px 24px;
    gap: 20px;
    width: 100%;
    max-width: 680px; 
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease, border-color 0.3s ease;
    z-index: 5; 
    
    margin-top: calc((var(--row-height) / 2) - 42px);
  }

  .left-card { flex-direction: row; text-align: left; }
  .right-card { flex-direction: row; text-align: left; }

  .info-section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 12px;
    min-width: 100px; 
    flex-shrink: 0;
    padding-top: 4px; 
  }

  .area-label {
    font-family: var(--font-heading);
    font-size: 1.6rem;
    font-weight: 900;
    color: #111;
    letter-spacing: 0.5px;
    margin: 0;
  }

  .dots-grid {
    display: grid;
    grid-template-columns: repeat(5, max-content);
    gap: 8px;
  }

  .dot { width: 12px; height: 12px; border-radius: 50%; }
  .dot.green { background-color: var(--color-green); box-shadow: 0 0 8px rgba(76,175,80,0.6); }
  .dot.red { background-color: #941518; }

  .content-box {
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px solid #c09d3b;
    border-radius: 10px;
    flex: 1; 
    min-height: 75px; 
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 12px 20px;
  }

  .title-text {
    font-family: var(--font-heading);
    font-size: 1.8rem;
    font-weight: 700;
    line-height: 1.3;
    color: #111;
  }

  .port-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start; 
    flex-shrink: 0;
  }

  .port-box {
    background-color: #cda44b;
    border: 1px solid #a68430;
    border-radius: 12px;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    box-shadow: inset 0 2px 6px rgba(0,0,0,0.15);
  }

  .port {
    width: 16px;
    height: 16px;
    background-color: #111;
    border-radius: 50%;
    transition: all 0.3s ease;
  }

  /* ── GEOMETRICALLY PERFECT WIRES ── */
  .wire {
    width: calc(var(--card-distance) + 50px);
    height: 4px;
    background-color: #553f22; 
    position: absolute; 
    top: 50%; 
    transform: translateY(-50%);
    z-index: 1; 
    transition: all 0.3s ease;
  }

  .wire-left { right: calc(50% - var(--spine-nudge-x)); }
  .wire-right { left: calc(50% + var(--spine-nudge-x)); }
  
  /* ── ANIMATIONS ── */
  .area-row.scroll-active .area-card {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15), 0 0 30px rgba(76, 175, 80, 0.25);
    border-color: var(--color-green);
  }

  .area-row.scroll-active .port {
    background-color: var(--color-green);
    box-shadow: 0 0 20px var(--color-green);
    transform: scale(1.25);
  }

  .area-row.scroll-active .wire {
    background-color: var(--color-green);
    box-shadow: 0 0 16px var(--color-green);
  }
</style>