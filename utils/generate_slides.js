const fs = require('fs');
const path = require('path');

// Paths
const srcPath = path.join(__dirname, '..', 'proposal', 'sales_presentation.md');
const destPath = path.join(__dirname, '..', 'proposal', 'sales_presentation.html');

function generateSlides() {
  try {
    // Read markdown
    if (!fs.existsSync(srcPath)) {
      console.error(`Error: Source file not found at ${srcPath}`);
      return;
    }
    const markdown = fs.readFileSync(srcPath, 'utf8');

    // Split markdown by slide separator (---)
    // Trim spaces and filter empty chunks
    const rawSlides = markdown.split(/\n---\r?\n/);
    const slides = rawSlides
      .map(slide => slide.trim())
      .filter(slide => slide.length > 0);

    // HTML Template
    const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentación Comercial - Fashion Pets PZ</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    :root {
      --bg-main: #f8fafc;
      --panel-bg: #ffffff;
      --panel-border: #e2e8f0;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --primary: #0d9488;       /* Teal */
      --secondary: #0ea5e9;     /* Sky Blue */
      --success: #10b981;
      --warning: #f59e0b;
      --primary-glow: rgba(13, 148, 136, 0.08);
      --font-title: 'Outfit', sans-serif;
      --font-body: 'Inter', sans-serif;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background: radial-gradient(circle at top right, #f1f5f9, var(--bg-main));
      color: var(--text-main);
      font-family: var(--font-body);
      height: 100vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    /* Presentation Header */
    header {
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--panel-border);
      background: #ffffff;
      z-index: 10;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .brand-icon {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      width: 32px;
      height: 32px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .brand-title {
      font-family: var(--font-title);
      font-weight: 700;
      font-size: 1.1rem;
      color: var(--text-main);
    }

    /* Slides Deck container */
    .deck-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px;
      position: relative;
    }

    .slide-canvas {
      width: 100%;
      max-width: 1100px;
      aspect-ratio: 16/9;
      background: var(--panel-bg);
      border: 1px solid var(--panel-border);
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
      padding: 48px;
      display: flex;
      position: relative;
      overflow: hidden;
      transition: transform 0.4s ease, opacity 0.4s ease;
    }

    /* Slide Content Splitting (Responsive Flex) */
    .slide-layout {
      display: flex;
      width: 100%;
      height: 100%;
      gap: 40px;
    }

    .slide-text-col {
      flex: 1.2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 20px;
      overflow-y: auto;
    }

    .slide-image-col {
      flex: 1.5;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border-radius: 12px;
      border: 1px solid var(--panel-border);
      box-shadow: 0 4px 12px rgba(0,0,0,0.02);
      background: #f8fafc;
    }

    .slide-image-col img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      transition: transform 0.3s ease;
    }

    .slide-image-col img:hover {
      transform: scale(1.02);
    }

    /* Slide content text styling */
    .slide-text-col h1 {
      font-family: var(--font-title);
      font-weight: 700;
      font-size: 2.2rem;
      line-height: 1.25;
      background: linear-gradient(135deg, var(--text-main), var(--primary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .slide-text-col p {
      font-size: 1.15rem;
      line-height: 1.6;
      color: var(--text-muted);
    }

    .slide-text-col ul {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .slide-text-col li {
      font-size: 1.05rem;
      color: var(--text-main);
      display: flex;
      align-items: flex-start;
      gap: 12px;
      line-height: 1.5;
    }

    .slide-text-col li::before {
      content: "✓";
      color: var(--primary);
      font-weight: 700;
      font-size: 1.1rem;
    }

    .slide-text-col table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }

    .slide-text-col th, .slide-text-col td {
      padding: 12px;
      border-bottom: 1px solid var(--panel-border);
      font-size: 0.9rem;
    }

    .slide-text-col th {
      font-family: var(--font-title);
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 0.75rem;
    }

    /* Controls & Footer */
    footer {
      padding: 20px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #ffffff;
      border-top: 1px solid var(--panel-border);
      z-index: 10;
    }

    .nav-controls {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .btn-nav {
      background: #ffffff;
      border: 1px solid var(--panel-border);
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: var(--text-muted);
      transition: all 0.2s ease;
      box-shadow: var(--shadow-sm);
    }

    .btn-nav:hover {
      color: var(--primary);
      border-color: var(--primary);
      background: var(--primary-glow);
    }

    .slide-progress-container {
      flex: 1;
      max-width: 400px;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      margin: 0 40px;
      position: relative;
      overflow: hidden;
    }

    .slide-progress-bar {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0%;
      background: linear-gradient(to right, var(--primary), var(--secondary));
      border-radius: 3px;
      transition: width 0.3s ease;
    }

    .slide-counter {
      font-family: var(--font-title);
      font-weight: 600;
      font-size: 1rem;
      color: var(--text-muted);
    }

    /* Slide transition effects */
    .fade-out {
      opacity: 0;
      transform: translateY(10px);
    }

    .fade-in {
      opacity: 1;
      transform: translateY(0);
    }
  </style>
</head>
<body>

  <header>
    <div class="brand">
      <div class="brand-icon">
        <i data-lucide="scissors" style="width: 16px; height: 16px;"></i>
      </div>
      <span class="brand-title">Fashion Pets PZ</span>
    </div>
    <div style="font-size: 0.9rem; font-weight: 500; color: var(--text-muted);">
      Propuesta Comercial de Estética Veterinaria
    </div>
  </header>

  <div class="deck-container">
    <div class="slide-canvas" id="slide-canvas">
      <!-- Dynamic slide layout injected here -->
    </div>
  </div>

  <footer>
    <div class="slide-counter" id="slide-counter">
      Slide 1 / 10
    </div>
    <div class="slide-progress-container">
      <div class="slide-progress-bar" id="slide-progress-bar"></div>
    </div>
    <div class="nav-controls">
      <button class="btn-nav" id="btn-prev" title="Diapositiva Anterior">
        <i data-lucide="chevron-left"></i>
      </button>
      <button class="btn-nav" id="btn-next" title="Diapositiva Siguiente">
        <i data-lucide="chevron-right"></i>
      </button>
    </div>
  </footer>

  <script>
    // Embedded slide raw markdown content array
    const slidesData = ${JSON.stringify(slides);};
    let currentSlideIndex = 0;

    function renderSlide(index) {
      const canvas = document.getElementById("slide-canvas");
      
      // Slide transition fade-out
      canvas.classList.add("fade-out");
      
      setTimeout(() => {
        const mdText = slidesData[index];
        
        // Custom parser to split Image and Text into columns
        let htmlContent = "";
        
        // Find markdown image links: ![alt](url)
        const imgRegex = /\\!\\[([^\\]]*)\\]\\(([^\\)]+)\\)/;
        const match = mdText.match(imgRegex);
        
        if (match) {
          // Extract image link out of raw text
          const imgHTML = \`<div class="slide-image-col"><img src="\${match[2]}" alt="\${match[1]}"></div>\`;
          
          // Clear image link from text to prevent duplicate rendering
          const textMd = mdText.replace(imgRegex, '');
          const textHTML = \`<div class="slide-text-col">\${marked.parse(textMd)}</div>\`;
          
          htmlContent = \`<div class="slide-layout">\${textHTML}\${imgHTML}</div>\`;
        } else {
          // Full width layout
          htmlContent = \`<div class="slide-layout"><div class="slide-text-col" style="flex: 1;">\${marked.parse(mdText)}</div></div>\`;
        }
        
        canvas.innerHTML = htmlContent;
        
        // Re-compile vector icons
        lucide.createIcons();
        
        // Update stats
        document.getElementById("slide-counter").textContent = \`Diapositiva \${index + 1} de \${slidesData.length}\`;
        const percentage = ((index + 1) / slidesData.length) * 100;
        document.getElementById("slide-progress-bar").style.width = \`\${percentage}%\`;
        
        // Fade-in
        canvas.classList.remove("fade-out");
        canvas.classList.add("fade-in");
      }, 250);
    }

    // Nav actions
    function nextSlide() {
      if (currentSlideIndex < slidesData.length - 1) {
        currentSlideIndex++;
        renderSlide(currentSlideIndex);
      }
    }

    function prevSlide() {
      if (currentSlideIndex > 0) {
        currentSlideIndex--;
        renderSlide(currentSlideIndex);
      }
    }

    // Register Button Listeners
    document.getElementById("btn-prev").addEventListener("click", prevSlide);
    document.getElementById("btn-next").addEventListener("click", nextSlide);

    // Register Keyboard Listeners
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        prevSlide();
      }
    });

    // Initialize first slide
    renderSlide(currentSlideIndex);
  </script>
</body>
</html>`;

    // Write to destination
    fs.writeFileSync(destPath, htmlTemplate, 'utf8');
    console.log(`Success: Generated slide presentation HTML at ${destPath}`);

  } catch (err) {
    console.error(`Error compiling slides presentation: ${err.message}`);
  }
}

generateSlides();
