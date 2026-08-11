const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'proposal', 'fashion_pets_proposal.md');
const destPath = path.join(__dirname, '..', 'proposal', 'fashion_pets_proposal.html');

function generateProposalHTML() {
  try {
    if (!fs.existsSync(srcPath)) {
      console.error(`Error: Source proposal markdown not found at ${srcPath}`);
      return;
    }
    const markdown = fs.readFileSync(srcPath, 'utf8');

    const htmlTemplate = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Propuesta Comercial - Fashion Pets PZ</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap">
  <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    :root {
      --primary: #0d9488;       /* Teal */
      --secondary: #0ea5e9;     /* Sky Blue */
      --text-main: #0f172a;
      --text-muted: #475569;
      --border-color: #cbd5e1;
      --bg-light: #f8fafc;
      --font-title: 'Outfit', sans-serif;
      --font-body: 'Inter', sans-serif;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      background-color: #f1f5f9;
      font-family: var(--font-body);
      color: var(--text-main);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    /* Floating PDF button */
    .print-btn-container {
      position: fixed;
      top: 24px;
      right: 24px;
      z-index: 100;
    }

    .btn-action {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      color: white;
      border: none;
      padding: 14px 24px;
      border-radius: 30px;
      font-family: var(--font-title);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      box-shadow: 0 10px 15px -3px rgba(13, 148, 136, 0.3);
      transition: transform 0.2s ease;
    }

    .btn-action:hover {
      transform: translateY(-2px);
    }

    /* Page Setup */
    .document-page {
      background: white;
      width: 8.5in;
      min-height: 11in;
      margin: 40px auto;
      padding: 1in;
      box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);
      position: relative;
      display: flex;
      flex-direction: column;
    }

    /* Cover Page Specific styling */
    .cover-page {
      justify-content: space-between;
    }

    .cover-header {
      border-left: 6px solid var(--primary);
      padding-left: 24px;
      margin-top: 80px;
    }

    .cover-logo {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      width: 64px;
      height: 64px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-bottom: 24px;
    }

    .cover-title {
      font-family: var(--font-title);
      font-size: 3rem;
      font-weight: 800;
      line-height: 1.15;
      margin-bottom: 16px;
    }

    .cover-subtitle {
      font-size: 1.3rem;
      color: var(--text-muted);
      font-weight: 400;
    }

    .cover-footer {
      border-top: 1px solid var(--border-color);
      padding-top: 24px;
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
    }

    .meta-item {
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .meta-label {
      font-weight: 600;
      color: var(--text-muted);
      text-transform: uppercase;
      font-size: 0.75rem;
      letter-spacing: 0.05em;
    }

    .meta-value {
      font-family: var(--font-title);
      font-weight: 600;
      font-size: 1.05rem;
    }

    /* Markdown styling inside document pages */
    .doc-content h2 {
      font-family: var(--font-title);
      font-size: 1.6rem;
      font-weight: 700;
      color: var(--primary);
      border-bottom: 2px solid var(--bg-light);
      padding-bottom: 8px;
      margin-top: 32px;
      margin-bottom: 16px;
      page-break-after: avoid;
    }

    .doc-content h2:first-of-type {
      margin-top: 0;
    }

    .doc-content p {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-main);
      margin-bottom: 14px;
    }

    .doc-content ul {
      margin-left: 20px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .doc-content li {
      font-size: 0.95rem;
      line-height: 1.5;
    }

    .doc-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }

    .doc-content th, .doc-content td {
      padding: 10px 12px;
      text-align: left;
      border-bottom: 1px solid var(--border-color);
      font-size: 0.9rem;
    }

    .doc-content th {
      font-family: var(--font-title);
      font-weight: 600;
      color: var(--text-muted);
      background-color: var(--bg-light);
      font-size: 0.8rem;
      text-transform: uppercase;
    }

    /* Alert Banner formatting */
    .doc-content blockquote {
      background: var(--bg-light);
      border-left: 4px solid var(--primary);
      padding: 16px;
      margin: 16px 0;
      border-radius: 0 8px 8px 0;
    }

    .doc-content blockquote p {
      margin-bottom: 0;
      font-size: 0.95rem;
      font-weight: 500;
    }

    /* Signatures Section */
    .signatures-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 60px;
      margin-top: 60px;
      page-break-inside: avoid;
    }

    .signature-block {
      border-top: 1px solid var(--text-main);
      padding-top: 12px;
      text-align: center;
      font-size: 0.9rem;
    }

    /* Print styling rules */
    @media print {
      body {
        background-color: white;
      }

      .print-btn-container {
        display: none;
      }

      .document-page {
        margin: 0;
        padding: 0;
        box-shadow: none;
        width: 100%;
        min-height: 0;
        page-break-after: always;
      }

      .document-page:last-child {
        page-break-after: avoid;
      }
    }
  </style>
</head>
<body>

  <div class="print-btn-container">
    <button class="btn-action" onclick="window.print()">
      <i data-lucide="download"></i> Guardar como PDF
    </button>
  </div>

  <!-- PAGE 1: COVER PAGE -->
  <div class="document-page cover-page">
    <div class="cover-header">
      <div class="cover-logo">
        <i data-lucide="scissors" style="width: 32px; height: 32px;"></i>
      </div>
      <h1 class="cover-title">Propuesta de<br>Plataforma Digital</h1>
      <p class="cover-subtitle">Sistema de Control Operativo y Citas Inteligentes</p>
    </div>

    <div class="cover-footer">
      <div class="meta-item">
        <div class="meta-label">Preparado Para</div>
        <div class="meta-value">Fashion Pets PZ</div>
      </div>
      <div class="meta-item" style="text-align: right;">
        <div class="meta-label">Fecha del Proyecto</div>
        <div class="meta-value">Inicio: 17 de Agosto, 2026</div>
      </div>
    </div>
  </div>

  <!-- PAGE 2: CONTENT & TIMELINE -->
  <div class="document-page">
    <div class="doc-content" id="doc-content-p1">
      <!-- Dynamic markdown content injected here -->
    </div>
  </div>

  <!-- PAGE 3: BUDGET & TERMS -->
  <div class="document-page" style="justify-content: space-between;">
    <div class="doc-content" id="doc-content-p2">
      <!-- Dynamic markdown content injected here -->
    </div>

    <!-- Signatures -->
    <div>
      <div class="signatures-grid">
        <div class="signature-block">
          <p style="font-weight: 600;">Desarrollador de Software</p>
          <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px;">jonnexusinsights-lab</p>
        </div>
        <div class="signature-block">
          <p style="font-weight: 600;">Representante Legal</p>
          <p style="color: var(--text-muted); font-size: 0.8rem; margin-top: 4px;">Fashion Pets PZ</p>
        </div>
      </div>
    </div>
  </div>

  <script>
    // Embed proposal markdown content
    const markdownData = \`${markdown.replace(/`/g, '\\`').replace(/\$/g, '\\$')}\`;

    // Process markdown structure
    // Split sections by --- to divide pages cleanly
    const sections = markdownData.split(/\\n---\\r?\\n/);

    // Render Section 1 (Resoluciones & Cronograma) on Page 2
    const page1Content = sections.slice(0, 2).join('\\n');
    document.getElementById("doc-content-p1").innerHTML = marked.parse(page1Content);

    // Render Section 2 (Presupuesto, Local Setup, Soporte) on Page 3
    const page2Content = sections.slice(2).join('\\n');
    document.getElementById("doc-content-p2").innerHTML = marked.parse(page2Content);

    // Compile Icons
    lucide.createIcons();
  </script>
</body>
</html>`;

    fs.writeFileSync(destPath, htmlTemplate, 'utf8');
    console.log(`Success: Generated proposal HTML at ${destPath}`);
  } catch (err) {
    console.error(`Error compiling proposal PDF: ${err.message}`);
  }
}

generateProposalHTML();
