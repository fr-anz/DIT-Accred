<script>

  import Footer from '$lib/components/footer.svelte';

  let activeTab = $state(0);
  let showGallery = $state(false);

  const profiles = [
    {
      tabLabel: 'DIGITAL LITERACY',
      title: 'DIGITAL LITERACY AND ETHICAL TECHNOLOGY USE (RESPONSIBLE AI ONBOARDING)',
      partner: 'PARTNER: INVESTMENT PROMOTION OFFICE - NEGOSYO CENTER OF MANDALUYONG CITY',
      challenge: 'Responding directly to emerging corporate concerns regarding generative AI misuse, lack of data privacy, and missing digital ethics parameters.',
      content: 'Facilitated a complete extension cycle—from needs tracking to structured assessment. Instruction pathways covered responsible AI principles (transparency, fairness, privacy, and human oversight) paired with hands-on labs in prompt engineering and foundational AI tools. Participant evaluation logs yielded high satisfaction ratings, confirming the instructional relevance.',
      images: [
        'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800'
      ]
    },
    {
      tabLabel: 'ECONOMIC EMPOWERMENT',
      title: 'DIGITAL ECONOMIC EMPOWERMENT TRACK (E-COMMERCE AND DIGITAL MARKETING)',
      partner: 'PARTNER: COOPERATIVE UNION OF MANDALUYONG CITY (CUMC)',
      challenge: 'Improving productivity, widening market reach, and ensuring the business sustainability of small local distributors.',
      content: 'Designed as a multi-part, structured seminar series that maps and assesses the current technological capabilities of local entrepreneurs. Training tracks explicitly bridge defined skill gaps and guide small business owners through actionable templates for corporate digital tool adoption.',
      images: [
        'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600'
      ]
    },
    {
      tabLabel: 'SOLUTION ENGINEERING',
      title: 'HIGH-MATURITY SOLUTION ENGINEERING (CLARO M. RECTO HIGH SCHOOL EXAMINATION MANAGEMENT SYSTEM)',
      partner: 'PARTNER: CLARO M. RECTO HIGH SCHOOL ADMINISTRATION',
      challenge: 'Eliminating administrative inefficiencies regarding paper-based test preparation, grade logs, and data assessments.',
      content: 'Scheduled for active deployment from 2026 through 2028, this initiative marks a high level of extension maturity by transforming core department research outputs into a deployable software platform. The project features a structured, multi-phase rollout covering software installation, user training, system enhancements, and long-term impact analysis. It embeds specialized Monitoring, Evaluation, Accountability, and Learning (MEAL) mechanisms to guarantee data security and continuous system optimization.',
      images: [
        'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600',
        'https://images.unsplash.com/photo-1568225367115-8b43833bdfc5?auto=format&fit=crop&q=80&w=600'
      ]
    }
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80'
  ];

</script>

<main>
  <section class="community-hero">
    <div class="hero-bg"></div> 
    <h1 class="hero-title">COMMUNITY</h1>
  </section>

  <section id="community-extension-agenda" class="strategic-agenda">

    <header class="agenda-header">
      <div class="accent-square"></div>
      <h2>COMMUNITY EXTENSION POLICY AND STRATEGIC AGENDA</h2>
    </header>

    <div class="agenda-content-grid">

      <div class="agenda-panel panel-red">
        <h3>SOCIAL STANCE & SERVICE ORIENTATION</h3>
        <hr class="accent-line" />
        <p>
          The Bachelor of Science in Information Technology (BSIT) program demonstrates a sustained and well-documented commitment to community development. Through technology-driven extension initiatives, the department applies its information technology expertise to promote digital inclusion, capacity building, and organizational modernization across local government units, cooperatives, public schools, and community-based organizations.
        </p>
      </div>

      <div class="agenda-panel panel-gold">
        <h3>EXPERIENTIAL LEARNING INTEGRATION</h3>
        <hr class="accent-line" />
        <p>
          Extension projects consistently exhibit strong faculty leadership and active student involvement, seamlessly linking community service with instructional objectives. Faculty members serve as project leaders, trainers, system developers, and evaluators, while IT undergraduate students participate as facilitators, moderators, and technical assistants—reinforcing experiential learning and civic social responsibility.
        </p>
      </div>

    </div>

    <div class="maturity-framework">
      <div class="framework-header">
        <h2>EVOLUTION OF EXTENSION MATURITY FRAMEWORK</h2>
        <hr class="framework-divider" />
        <p class="framework-description">
          The department’s extension agenda operates as a strategic, needs-driven, and technology-enabled cycle. The program has systematically transitioned away from episodic awareness campaigns toward highly scalable, sustainable ICT interventions divided into three core pillars:
        </p>
      </div>

      <div class="framework-cards-grid">

        <div class="pillar-card card-bg-1">
          <span class="card-number">0 1</span>
          <div class="card-content">
            <h4>Awareness & Digital Ethics</h4>
            <p>Addressing emerging digital concerns, data privacy, and ethical technology adoption.</p>
          </div>
        </div>

        <div class="pillar-card card-bg-2">
          <span class="card-number">0 2</span>
          <div class="card-content">
            <h4>Economic & Skills Empowerment Seminars</h4>
            <p>Assessing technological skill gaps of local distributors and micro-enterprises to guide them toward digital adoption.</p>
          </div>
        </div>

        <div class="pillar-card card-bg-3">
          <span class="card-number">0 3</span>
          <div class="card-content">
            <h4>Applied Technical Solution Deployment</h4>
            <p>Translating faculty research and student configurations into practical, deployable systems that automate manual organizational workflows.</p>
          </div>
        </div>

      </div>
    </div>

    <div class="verification-bar">
      <div class="verification-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="badge-icon"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.76 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
        <span>DATA VERIFICATION: STRATEGIC PLAN</span>
      </div>
      <div class="verification-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="badge-icon"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.76 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/></svg>
        <span>VERIFICATION: INTEGRATION LOGS</span>
      </div>
    </div>

  </section>

  <section class="technical-profiles">
    <header class="section-header">
      <div class="icon-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
      </div>
      <h2>TECHNICAL PROFILES</h2>
    </header>

    <hr class="header-divider" />

    <div class="tab-container">
      <div class="tabs">
        {#each profiles as profile, index}
          <button 
            class="tab-btn {activeTab === index ? 'active' : ''}" 
            on:click={() => activeTab = index}>
            {profile.tabLabel}
          </button>
        {/each}
      </div>

      <div class="profile-card">
        <div class="card-header-split">
          <div class="header-left">
            <div class="badge">FEATURED</div>
            <h3 class="profile-title">{profiles[activeTab].title}</h3>
            <p class="partner-text">{profiles[activeTab].partner}</p>
          </div>
          
          <div class="header-right">
            <h4 class="archives-title">DEPLOYMENT ARCHIVES</h4>
          </div>
        </div>

        <div class="card-content-split">
          <div class="content-left">
            <div class="info-box">
              <h4>STRATEGIC CHALLENGE</h4>
              <p>{profiles[activeTab].challenge}</p>
            </div>

            <div class="info-box">
              <h4>TECHNICAL CONTENT</h4>
              <p>{profiles[activeTab].content}</p>
            </div>
          </div>

          <div class="content-right">
            <div class="image-grid {profiles[activeTab].images.length === 5 ? 'grid-5' : profiles[activeTab].images.length === 4 ? 'grid-4' : 'grid-2'}">
              {#each profiles[activeTab].images as img}
                <div class="img-wrapper">
                  <img src={img} alt="Deployment Archive" />
                </div>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="ivote-showcase">
    <div class="ivote-left">
      <div class="ivote-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef9b08" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
        <h2>PUP IVOTE++</h2>
      </div>
      
      <h3 class="ivote-sub">High-Impact Special Deployment<br/>Showcase: The PUP iVOTE++ System</h3>
      
      <div class="ivote-divider">
        <h4>SYSTEM OVERVIEW & ARCHITECTURAL PURPOSE</h4>
        <hr />
      </div>

      <p class="ivote-desc">
        The PUP iVOTE++ system is a secure, technology-enabled digital voting platform designed, configured, and deployed by the BSIT program. The system modernizes and secures the administrative election loops of large cooperative and institutional bodies, eliminating manual counting errors, accelerating transparency, and expanding democratic accessibility.
      </p>

      <div class="ivote-cards-container">
        <div class="ivote-card">
          <div class="iv-card-bg" style="background-image: url('https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80');"></div>
          <div class="iv-card-content">
            <h5>HYBRID<br/>OPERATIONS</h5>
            <span>100% RELIABLE</span>
            <p>Fully supports simultaneous secure on-site and online remote voting.</p>
          </div>
        </div>
        
        <div class="ivote-card">
          <div class="iv-card-bg" style="background-image: url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80');"></div>
          <div class="iv-card-content">
            <h5>CROSS-BRANCH</h5>
            <span>ALL ACCESS</span>
            <p>Enabled secure remote voting for across-campus members, establishing a blueprint for inclusive digital governance.</p>
          </div>
        </div>
        
        <div class="ivote-card">
          <div class="iv-card-bg" style="background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80');"></div>
          <div class="iv-card-content">
            <h5>TECH-TRANSFER</h5>
            <span>COMMUNITY LEAD</span>
            <p>Beyond installation, faculty and students completed training, code verification, and orientation to build digital confidence and governance acceptance.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="ivote-right">
      <h3 class="archive-heading">REAL-TIME ELECTION ARCHIVE</h3>
      
      <div class="archive-slider-wrapper">
        <div class="archive-slider-track">
          <img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80" alt="Archive Slide" />
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" alt="Archive Slide" />
          <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Archive Slide" />
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" alt="Archive Slide" />
          <img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80" alt="Archive Slide" />
          <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" alt="Archive Slide" />
          <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Archive Slide" />
          <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" alt="Archive Slide" />
        </div>
      </div>

      <button class="gallery-link" on:click={() => showGallery = true}>VIEW FULL GALLERY</button>
    </div>
  </section>

  <section class="motto-text-section">
    <div class="motto-content">
      <h1 class="motto-title">
        <span class="keep-together">Mula sa'yo,</span><br/>
        <span class="keep-together">para sa bayan</span>
      </h1>
      <p class="motto-subtitle">
        Bridging <span class="text-yellow">technology and people</span> through open-source collaboration, digital literacy outreach, and tech workshops.
      </p>
    </div>
  </section>

  <section class="motto-image-strip">
    <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80" alt="Activity 1" />
    <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80" alt="Activity 2" />
    <img src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80" alt="Activity 3" />
    <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80" alt="Activity 4" />
    <img src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80" alt="Activity 5" />
  </section>

  {#if showGallery}
    <div class="gallery-modal-overlay" on:click={() => showGallery = false}>
      <div class="gallery-modal-content" on:click|stopPropagation>
        <button class="close-modal" on:click={() => showGallery = false}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <div class="gallery-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6a1316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M9 10h6"/><path d="M9 14h6"/></svg>
          <h2>PUP IVOTE++ GALLERY</h2>
        </div>

        <div class="gallery-grid-container">
          {#each galleryImages as img}
            <div class="gallery-img-box">
              <img src={img} alt="Gallery item" />
            </div>
          {/each}
        </div>
      </div>
    </div>
  {/if}

  <Footer />

</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Overpass:wght@600;700;800&display=swap');

  /* --- HERO SECTION --- */
  .community-hero {
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
  }

  .strategic-agenda {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh; 
    justify-content: space-between; 
  }

  .agenda-header {
    background: linear-gradient(to right, #420607 0%, #000000 80%);
    padding: 24px 5%;
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .accent-square {
    width: 20px;
    height: 20px;
    background-color: #555555; 
  }

  .agenda-header h2 {
    font-family: 'Overpass', sans-serif; 
    color: #ef9b08; 
    font-size: 1.25rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    margin: 0;
  }

  .agenda-content-grid {
    display: grid;
    grid-template-columns: 1fr 1fr; 
    width: 100%;
  }

  .agenda-panel {
    padding: 60px 10%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .agenda-panel h3 {
    font-family: 'Overpass', sans-serif; 
    font-size: 1.15rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    margin: 0;
  }

  .accent-line {
    border: none;
    height: 1px;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }

  .agenda-panel p {
    font-family: 'Inter', sans-serif; 
    font-size: 1rem;
    line-height: 1.6;
    margin: 0;
  }


  .panel-red {
    background-color: #941518;
    color: #FFFFFF;
  }

  .panel-gold {
    background-color: #f8b209; 
    color: #FFFFFF;
  }

  .panel-red { background-color: #941518; color: #FFFFFF; }
  .panel-gold { background-color: #f8b209; color: #FFFFFF; }

  /* --- MATURITY FRAMEWORK --- */

  .maturity-framework {
    background: linear-gradient(135deg, #fcedeb 0%, #f4e8cf 100%);
    padding: 60px 10%;
    color: #1A1515;
  }

  .framework-header h2 {
    font-family: 'Overpass', sans-serif;
    font-size: 1.5rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    letter-spacing: 0.02em;
  }

  .framework-divider {
    border: none;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.3);
    margin: 0 0 24px 0;
  }

  .framework-description {
    font-family: 'Inter', sans-serif;
    font-size: 1.05rem;
    line-height: 1.6;
    max-width: 900px;
    margin-bottom: 40px;
  }

  .framework-cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .pillar-card {
    position: relative;
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between; 
    min-height: 340px; 
    color: #FFFFFF;
    background-color: #6a1316; 
    background-size: cover;
    background-position: center;
    overflow: hidden;
  }

  .pillar-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(106, 19, 22, 0.4) 0%, rgba(106, 19, 22, 0.95) 100%);
    z-index: 1;
  }

  .card-number {
    font-family: 'Overpass', sans-serif;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    align-self: flex-end; 
    position: relative;
    z-index: 2; 
  }

  .card-content {
    position: relative;
    z-index: 2; 
  }

  .card-content h4 {
    font-family: 'Overpass', sans-serif;
    color: #ef9b08; 
    font-size: 1.15rem;
    font-weight: 800;
    margin: 0 0 16px 0;
    line-height: 1.4;
  }

  .card-content p {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
    color: #f0f0f0;
  }

  .card-bg-1 { background-image: url('https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80'); }
  .card-bg-2 { background-image: url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80'); }
  .card-bg-3 { background-image: url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80'); }

  .verification-bar {
    background-color: #312b27; 
    padding: 24px 10%;
    display: flex;
    align-items: center;
    gap: 60px; 
  }

  .verification-item {
    display: flex;
    align-items: center;
    gap: 12px;
    color: #FFFFFF;
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    font-size: 0.95rem;
    letter-spacing: 0.05em;
  }


  .badge-icon {
    width: 24px;
    height: 24px;
    color: #FFFFFF;
  }

  @media (max-width: 1024px) {
    .agenda-content-grid {
      grid-template-columns: 1fr; 
    }
    .framework-cards-grid {
      grid-template-columns: 1fr; 
    }
    .verification-bar {
      flex-direction: column;
      align-items: flex-start;
      gap: 20px;
    }
  }

  .badge-icon { width: 24px; height: 24px; color: #FFFFFF; }

  /* --- TECHNICAL PROFILES SECTION --- */
  .technical-profiles {
    padding: 80px 10%;
    background-color: #FFFFFF;
    width: 100%;
    margin-bottom: 80px; 
  }
  .section-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }
  .icon-box {
    color: #941518;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .section-header h2 {
    font-family: 'Overpass', sans-serif;
    color: #c98e16;
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 0.15em;
    margin: 0;
  }
  .header-divider {
    border: none;
    height: 1px;
    background-color: #d1d1d1;
    margin-bottom: 40px;
  }
  .tab-container {
    display: flex;
    flex-direction: column;
  }
  .tabs {
    display: flex;
    gap: 4px;
    padding-left: 0; 
    position: relative; 
    z-index: 10;
  }
  .tab-btn {
    font-family: 'Overpass', sans-serif;
    font-size: 0.95rem;
    font-weight: 500; 
    letter-spacing: 0.05em;
    color: #FFFFFF;
    background-color: #b87910;
    border: none;
    border-top: 3px solid transparent; 
    padding: 16px 24px;
    border-radius: 8px 8px 0 0;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .tab-btn:hover { background-color: #9c660c; }
  .tab-btn.active {
    background-color: #6a1316;
    font-weight: 800; 
    border-top: 3px solid #ef9b08; 
    position: relative;
    z-index: 2;
  }
  .profile-card {
    background: linear-gradient(135deg, #6a1316 0%, #201a1a 100%);
    border-radius: 0 12px 12px 12px; 
    padding: 48px;
    color: #FFFFFF;
    position: relative;
    z-index: 1;
    margin-top: -1px; 
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }
  .card-header-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    margin-bottom: 40px;
  }
  .header-left {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .header-right {
    display: flex;
    align-items: flex-end; 
    justify-content: flex-end;
  }
  .badge {
    font-family: 'Overpass', sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #ef9b08; 
    border: 1px solid #ef9b08; 
    padding: 6px 12px;
    border-radius: 4px;
    margin-bottom: 24px;
  }
  .profile-title {
    font-family: 'Overpass', sans-serif;
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1.4;
    letter-spacing: 0.05em;
    margin: 0 0 12px 0;
  }
  .partner-text {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-style: italic;
    color: #d1d1d1;
    margin: 0; 
  }
  .archives-title {
    font-family: 'Overpass', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    margin: 0; 
    color: #e5e5e5;
  }

  .card-content-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
  }
  .content-left {
    display: flex;
    flex-direction: column;
  }
  .content-right {
    position: relative; 
    width: 100%;
  }
  .info-box {
    background-color: #FFFFFF;
    color: #1A1515;
    padding: 24px 32px;
    border-left: 8px solid #d49814;
    margin-bottom: 24px;
    border-radius: 0 8px 8px 0;
    width: 100%;
  }
  .info-box:last-child {
    margin-bottom: 0;
  }
  .info-box h4 {
    font-family: 'Overpass', sans-serif;
    color: #d49814;
    font-size: 1.1rem;
    font-weight: 800;
    letter-spacing: 0.1em;
    margin: 0 0 16px 0;
  }
  .info-box p {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0;
  }

  .image-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    display: grid;
    gap: 16px;
  }
  .grid-2, .grid-4 { grid-template-columns: repeat(2, 1fr); }
  
  .grid-5 { 
    grid-template-columns: repeat(3, 1fr); 
    grid-template-rows: repeat(2, 1fr); 
  }
  .grid-5 .img-wrapper:nth-child(1) { grid-column: 1 / 2; grid-row: 1 / 2; }
  .grid-5 .img-wrapper:nth-child(2) { grid-column: 2 / 3; grid-row: 1 / 2; }
  .grid-5 .img-wrapper:nth-child(3) { grid-column: 3 / 4; grid-row: 1 / 2; }
  .grid-5 .img-wrapper:nth-child(4) { grid-column: 1 / 2; grid-row: 2 / 3; }
  .grid-5 .img-wrapper:nth-child(5) { grid-column: 2 / 4; grid-row: 2 / 3; }
  
  .img-wrapper {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    background-color: #3a2525; 
  }
  .img-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }
  .img-wrapper img:hover { opacity: 1; }

  /* --- PUP IVOTE++ SHOWCASE SECTION --- */
  .ivote-showcase {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    width: 100%;
    min-height: 80vh;
  }
  .ivote-left {
    background-color: #271f1a;
    padding: 80px 10%;
    color: #FFFFFF;
  }
  .ivote-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 24px;
  }
  .ivote-header h2 {
    font-family: 'Overpass', sans-serif;
    color: #ef9b08;
    font-size: 1.2rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    margin: 0;
  }
  .ivote-sub {
    font-family: 'Inter', sans-serif;
    font-size: 1.35rem;
    font-weight: 400;
    line-height: 1.4;
    margin: 0 0 48px 0;
  }
  .ivote-divider h4 {
    font-family: 'Overpass', sans-serif;
    font-size: 1.1rem;
    font-weight: 800;
    margin: 0 0 16px 0;
  }
  .ivote-divider hr {
    border: none;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-bottom: 24px;
  }
  .ivote-desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #d1d1d1;
    margin-bottom: 40px;
  }
  .ivote-cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  /* --- YELLOW BOX OVERLAY FIX --- */
  .ivote-card {
    position: relative;
    background-color: #e5b95a;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    min-height: 280px;
    overflow: hidden;
  }
  .iv-card-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-size: cover;
    background-position: center;
    z-index: 0;
  }
  .iv-card-bg::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to bottom, rgba(229, 185, 90, 0.65) 0%, rgba(229, 185, 90, 0.75) 100%);
  }
  .iv-card-content {
    position: relative;
    z-index: 1;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .iv-card-content h5 {
    font-family: 'Overpass', sans-serif;
    font-size: 1.35rem;
    font-weight: 800;
    color: #941518;
    margin: 0 0 8px 0;
    line-height: 1.2;
    letter-spacing: 0.05em;
  }
  .iv-card-content span {
    display: block;
    font-family: 'Inter', sans-serif;
    font-size: 1rem;
    font-style: italic;
    color: #4a3821;
    margin-bottom: 24px;
  }
  .iv-card-content p {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    line-height: 1.5;
    color: #1a1515;
    margin: auto 0 0 0;
  }

  .ivote-right {
    background-color: #941518;
    background-image: radial-gradient(#ffffff22 2px, transparent 2px);
    background-size: 24px 24px;
    padding: 80px 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden; 
  }
  .archive-heading {
    font-family: 'Overpass', sans-serif;
    color: #FFFFFF;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    margin: 0 0 40px 0;
  }

  /* CONTINUOUS MARQUEE SLIDER */
  .archive-slider-wrapper {
    width: 100%;
    overflow: hidden;
    position: relative;
    margin-bottom: 40px;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }
  .archive-slider-track {
    display: flex;
    gap: 16px;
    width: max-content;
    animation: slideMarquee 15s linear infinite;
  }
  .archive-slider-track img {
    width: 250px;
    aspect-ratio: 4/5;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.3);
  }
  @keyframes slideMarquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(calc(-50% - 8px)); } 
  }

  .gallery-link {
    font-family: 'Overpass', sans-serif;
    color: #FFFFFF;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-decoration: underline;
    align-self: flex-end;
    transition: color 0.2s ease;
  }
  .gallery-link:hover {
    color: #ef9b08;
  }

  /* --- MULA SA'YO TEXT SECTION --- */
  .motto-text-section {
    width: 100%;
    background-color: #FFFFFF;
    padding-top: 120px; 
    padding-bottom: 80px; 
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .motto-content {
    text-align: center;
    width: 100%;
    max-width: 1400px; 
    padding: 0 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .motto-title {
    font-family: 'Overpass', Arial, sans-serif;
    font-size: clamp(3rem, 11vw, 9rem); 
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    margin: 0 0 24px 0;
    background-image: url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80');
    background-size: cover;
    background-position: center;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    filter: drop-shadow(0px 8px 12px rgba(0,0,0,0.15));
  }

  .keep-together {
    display: inline-block;
    white-space: nowrap;
  }
  
  .motto-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    font-style: italic;
    color: #1A1515;
    line-height: 1.5;
    margin: 0;
    max-width: 600px; 
  }
  
  .text-yellow {
    color: #c98e16;
    font-weight: 600;
  }

  /* --- BOTTOM IMAGE STRIP --- */
  .motto-image-strip {
    display: flex;
    width: 100%;
    height: 250px;
    margin-bottom: 120px;
  }
  .motto-image-strip img {
    width: 20%;
    height: 100%;
    object-fit: cover;
  }

  /* --- MODAL GALLERY STYLES --- */
  .gallery-modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.85);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    animation: fadeIn 0.2s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .gallery-modal-content {
    background: radial-gradient(circle at center, #fcedeb 0%, #f4e8cf 100%);
    padding: 40px;
    border-radius: 16px;
    max-width: 1100px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  }
  .close-modal {
    position: absolute;
    top: 24px;
    right: 24px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #6a1316;
    transition: transform 0.2s ease;
  }
  .close-modal:hover {
    transform: scale(1.1);
  }
  .gallery-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
  }
  .gallery-header h2 {
    font-family: 'Overpass', sans-serif;
    color: #6a1316;
    font-size: 1.25rem;
    font-weight: 800;
    letter-spacing: 0.2em;
    margin: 0;
  }
  .gallery-grid-container {
    background-color: #2a1f1b;
    border-radius: 16px;
    padding: 24px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    background-image: 
      linear-gradient(to right, rgba(255,255,255,0.1) 2px, transparent 2px),
      linear-gradient(to bottom, rgba(255,255,255,0.1) 2px, transparent 2px);
    background-size: calc(25% - 4px) calc(50% - 8px);
    background-position: 12px 12px; 
  }
  .gallery-img-box {
    width: 100%;
    aspect-ratio: 1/1;
    background-color: #1a1515;
    padding: 8px;
  }
  .gallery-img-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* --- RESPONSIVE ADJUSTMENTS --- */
  @media (max-width: 1024px) {
    .card-header-split, .card-content-split, .agenda-content-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .header-right { justify-content: flex-start; }
    .tabs { flex-wrap: wrap; }
    
    .image-grid {
      position: relative;
      height: 500px; 
    }
    .grid-5 { 
      grid-template-columns: repeat(2, 1fr); 
      grid-template-rows: auto;
    }
    .grid-5 .img-wrapper:nth-child(n) { grid-column: auto; grid-row: auto; }
    .grid-5 .img-wrapper:last-child { grid-column: span 2; }
    
    .ivote-showcase { grid-template-columns: 1fr; }
    .ivote-cards-container { grid-template-columns: 1fr; }
    .gallery-grid-container { grid-template-columns: repeat(2, 1fr); }
    
    .gallery-modal-overlay { padding: 16px; }
    .gallery-modal-content { padding: 24px; }
  }

</style>