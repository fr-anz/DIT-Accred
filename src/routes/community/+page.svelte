<script>
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
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Overpass:wght@600;700;800&display=swap');

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
    font-weight: 800;
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
</style>