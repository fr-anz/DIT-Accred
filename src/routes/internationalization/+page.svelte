<script>
  import Footer from '$lib/components/footer.svelte';

  // Data for the university partners
  const partners = [
    {
      logo: 'src/lib/assets/internationalization/binus.png',
      name: 'Bina Nusantara University',
      location: 'West Jakarta, Indonesia'
    },
    {
      logo: 'src/lib/assets/internationalization/unpam.png',
      name: 'Pamulang University',
      location: 'South Tangerang, Indonesia'
    },
    {
      logo: 'src/lib/assets/internationalization/umpsa.png',
      name: 'Universiti Malaysia Pahang Al-Sultan Abdullah',
      location: 'Pekan Pahang, Malaysia'
    }
  ];
</script>

<svelte:head>
  <title>Internationalization | DIT-PUP</title>
</svelte:head>

<main>
  <section class="hero-section">
    <div class="hero-bg"></div> 
    <h1 class="hero-title">INTERNATIONALIZATION</h1>
  </section>

  <section class="partners-section">
    
    <div class="partners-header">
      <div class="partners-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="partners-icon"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span>GLOBAL PARTNERS & ACADEMIC COLLABORATIONS</span>
      </div>
      <hr class="partners-hr" />
    </div>

    <p class="partners-description">
      The BSIT program builds sustained cross-border academic collaborations with foreign HEIs through CCIS and the Office of International Affairs (OIA), enhancing the global competencies and employability of IT undergraduates.
    </p>

    <div class="partners-grid">
      {#each partners as partner}
        <div class="partner-card">
          <img src={partner.logo} alt="{partner.name} Logo" class="partner-card-logo" />
          
          <hr class="card-divider" />

          <h3 class="partner-card-name">{partner.name}</h3>
          <p class="partner-card-location">{partner.location}</p>
        </div>
      {/each}
    </div>

  </section>

  <Footer />
</main>

<style>
  /* ── DESIGN TOKENS ── */
  :root {
    --color-maroon: #8c0f13;
    --color-gold: #cfa83a;
    --font-body: 'Inter', sans-serif;
    --font-heading: 'Overpass', sans-serif;
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
    background-color: #f0f0f0; 
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
    font-family: 'Helvetica', Arial, sans-serif; 
    font-size: clamp(4rem, 8vw, 8rem); 
    font-weight: 600;
    letter-spacing: 0.05em;
    margin: 0;
    background: linear-gradient(to right, #000000 0%, #941518 80%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    text-align: center;
    padding: 0 5%;
  }

  /* ── PARTNERS CONTENT SECTION ── */
  .partners-section {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 5%;
    flex-grow: 1;

    min-height: 100vh; 
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .partners-header {
    width: 100%;
    margin-bottom: 40px;
    text-align: left; 
  }

  .partners-label {
    display: flex;
    align-items: center;
    justify-content: flex-start; 
    gap: 12px;
    font-family: var(--font-heading);
    font-weight: 500; 
    font-size: 1.5rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 24px;
  }

  .partners-description {
    font-family: var(--font-body);
    font-size: 1.15rem;
    color: #000000;
    line-height: 1.8;
    
    max-width: 100%; 
    
    text-align: left; 
    margin: 0 0 80px 0; 
  }


  .partners-label span {
    background: linear-gradient(to right, #fac549, #d18a0f);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }

  .partners-icon {
    color: var(--color-maroon);
  }

  .partners-hr {
    border: none;
    height: 1px;
    background-color: #000000;
    margin: 0;
  }

  /* ── PARTNER CARD GRID & STYLES ── */
  .partners-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-bottom: 60px;
  }

  .partner-card {
    background-color: #ffffff;
    border: 1.9px solid #941518;
    border-radius: 12px;
    
    padding: 50px 24px 40px; 
    min-height: 400px; 
    
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: flex-start;

    box-shadow: 
      4px 6px 16px rgba(207, 168, 58, 0.2), 
      -2px -2px 12px rgba(140, 15, 19, 0.05); 
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }

  .partner-card:hover {
    transform: translateY(-5px);
    box-shadow: 
      6px 8px 20px rgba(207, 168, 58, 0.3), 
      -2px -2px 15px rgba(140, 15, 19, 0.1);
  }

.partner-card-logo {
    height: 150px; 
    width: auto;
    max-width: 100%;
    object-fit: contain;
    margin-bottom: 24px;
    display: block;
  }

  /* gray line */
  .card-divider {
    width: 150px;
    height: 1px;
    background-color: #000000;
    border: none;
    margin: 0 0 24px 0;
  }

.partner-card-name {
    color: #941518;
    font-family: var(--font-heading);
    font-size: 1.8rem; 
    font-weight: 700;
    margin: auto 0 0 0; 
    line-height: 1.35;
  }

.partner-card-location {
    color: #1a1a1a;
    font-family: var(--font-body);
    font-size: 1.05rem;
    font-weight: 400;
    
    margin: auto 0 0 0; 
    
    font-style: italic;
  }

  /* RESPONSIVE BREAKPOINTS */
  @media (max-width: 1024px) {
    .partners-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .partners-grid {
      grid-template-columns: 1fr;
    }
  }
</style>