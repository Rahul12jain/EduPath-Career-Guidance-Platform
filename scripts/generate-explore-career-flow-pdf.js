const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const docsDir = path.join(root, "docs");
const pdfPath = path.join(docsDir, "explore-career-flow.pdf");
const svgPath = path.join(docsDir, "explore-career-flow-structure.svg");

fs.mkdirSync(docsDir, { recursive: true });

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="760" viewBox="0 0 1100 760">
  <defs>
    <style>
      .title { font: 700 34px Arial, sans-serif; fill: #111827; }
      .subtitle { font: 18px Arial, sans-serif; fill: #4b5563; }
      .boxTitle { font: 700 20px Arial, sans-serif; fill: #111827; }
      .boxText { font: 15px Arial, sans-serif; fill: #4b5563; }
      .small { font: 14px Arial, sans-serif; fill: #374151; }
      .arrow { stroke: #2563eb; stroke-width: 4; fill: none; marker-end: url(#arrowhead); }
      .card { fill: #ffffff; stroke: #dbeafe; stroke-width: 3; }
      .route { fill: #eff6ff; stroke: #60a5fa; stroke-width: 3; }
      .data { fill: #f0fdf4; stroke: #22c55e; stroke-width: 3; }
      .detail { fill: #fff7ed; stroke: #f97316; stroke-width: 3; }
    </style>
    <marker id="arrowhead" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
      <path d="M 0 0 L 12 4 L 0 8 z" fill="#2563eb"/>
    </marker>
  </defs>

  <rect width="1100" height="760" fill="#f9fafb"/>
  <text x="60" y="62" class="title">Explore Career Section Flow</text>
  <text x="60" y="96" class="subtitle">How users move from career cards to detailed guidance pages</text>

  <rect x="70" y="145" width="280" height="95" rx="8" class="card"/>
  <text x="95" y="182" class="boxTitle">Navbar / Home Cards</text>
  <text x="95" y="212" class="boxText">User clicks Explore Career</text>

  <path d="M 350 192 L 440 192" class="arrow"/>

  <rect x="460" y="145" width="270" height="95" rx="8" class="route"/>
  <text x="485" y="182" class="boxTitle">/explorecareer</text>
  <text x="485" y="212" class="boxText">React Router opens page</text>

  <path d="M 730 192 L 820 192" class="arrow"/>

  <rect x="840" y="145" width="210" height="95" rx="8" class="card"/>
  <text x="865" y="182" class="boxTitle">Career Cards</text>
  <text x="865" y="212" class="boxText">Fields shown in grid</text>

  <path d="M 945 240 L 945 320" class="arrow"/>

  <rect x="790" y="340" width="260" height="105" rx="8" class="data"/>
  <text x="815" y="378" class="boxTitle">careerFields.js</text>
  <text x="815" y="408" class="boxText">One data source for cards,</text>
  <text x="815" y="430" class="boxText">scope, exams, skills, guidance</text>

  <path d="M 790 392 L 690 392" class="arrow"/>

  <rect x="430" y="340" width="250" height="105" rx="8" class="card"/>
  <text x="455" y="378" class="boxTitle">User Selects Field</text>
  <text x="455" y="408" class="boxText">Example: Engineering</text>
  <text x="455" y="430" class="boxText">Link uses field.id</text>

  <path d="M 430 392 L 330 392" class="arrow"/>

  <rect x="70" y="340" width="250" height="105" rx="8" class="route"/>
  <text x="95" y="378" class="boxTitle">/explorecareer/:id</text>
  <text x="95" y="408" class="boxText">Route loads CareerDetail</text>
  <text x="95" y="430" class="boxText">useParams reads the id</text>

  <path d="M 195 445 L 195 525" class="arrow"/>

  <rect x="70" y="545" width="430" height="125" rx="8" class="detail"/>
  <text x="95" y="584" class="boxTitle">CareerDetail.jsx</text>
  <text x="95" y="614" class="boxText">Finds matching field by id and displays</text>
  <text x="95" y="638" class="boxText">overview, scope, pathway, exams, skills,</text>
  <text x="95" y="662" class="boxText">career options, guidance, and next step.</text>

  <rect x="560" y="545" width="410" height="125" rx="8" fill="#fef2f2" stroke="#f87171" stroke-width="3"/>
  <text x="585" y="584" class="boxTitle">Wrong URL Fallback</text>
  <text x="585" y="614" class="boxText">If no field matches the id, the page shows</text>
  <text x="585" y="638" class="boxText">Career field not found with a back button.</text>

  <text x="60" y="720" class="small">Main idea: add or update a career in careerFields.js, and the card plus detail page update from the same data.</text>
</svg>`;

fs.writeFileSync(svgPath, svg);

class Pdf {
  constructor() {
    this.objects = [];
    this.pages = [];
  }

  addObject(body) {
    this.objects.push(body);
    return this.objects.length;
  }

  stream(commands) {
    const body = commands.join("\n");
    return `<< /Length ${Buffer.byteLength(body, "binary")} >>\nstream\n${body}\nendstream`;
  }

  text(x, y, text, size = 11, color = [0.17, 0.24, 0.31], font = "F1") {
    return [
      `${color[0]} ${color[1]} ${color[2]} rg`,
      `BT /${font} ${size} Tf ${x} ${y} Td (${escapePdf(text)}) Tj ET`,
    ].join("\n");
  }

  wrappedText(x, y, text, maxChars, size = 11, lineHeight = 16, color) {
    return wrap(text, maxChars)
      .map((line, index) => this.text(x, y - index * lineHeight, line, size, color))
      .join("\n");
  }

  rect(x, y, w, h, fill, stroke = [0.82, 0.88, 0.96]) {
    return [
      `${fill[0]} ${fill[1]} ${fill[2]} rg`,
      `${stroke[0]} ${stroke[1]} ${stroke[2]} RG`,
      "1.5 w",
      `${x} ${y} ${w} ${h} re B`,
    ].join("\n");
  }

  line(x1, y1, x2, y2, color = [0.15, 0.39, 0.92]) {
    return [
      `${color[0]} ${color[1]} ${color[2]} RG`,
      "1.8 w",
      `${x1} ${y1} m ${x2} ${y2} l S`,
    ].join("\n");
  }

  arrowDown(x, y1, y2) {
    return [
      this.line(x, y1, x, y2),
      "0.15 0.39 0.92 rg",
      `${x - 5} ${y2 + 8} m ${x + 5} ${y2 + 8} l ${x} ${y2} l f`,
    ].join("\n");
  }

  addPage(commands) {
    const contentId = this.addObject(this.stream(commands));
    this.pages.push(contentId);
  }

  save(file) {
    const catalogId = this.objects.length + 1;
    const pagesId = this.objects.length + 2;
    const fontId = this.objects.length + 3;
    const boldFontId = this.objects.length + 4;

    const pageObjects = this.pages.map((contentId) =>
      this.addObject(
        `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R /F2 ${boldFontId} 0 R >> >> /Contents ${contentId} 0 R >>`,
      ),
    );

    this.addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);
    this.addObject(`<< /Type /Pages /Kids [${pageObjects.map((id) => `${id} 0 R`).join(" ")}] /Count ${pageObjects.length} >>`);
    this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
    this.addObject("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

    const chunks = ["%PDF-1.4\n"];
    const offsets = [0];
    for (let i = 0; i < this.objects.length; i += 1) {
      offsets.push(Buffer.byteLength(chunks.join(""), "binary"));
      chunks.push(`${i + 1} 0 obj\n${this.objects[i]}\nendobj\n`);
    }
    const xrefOffset = Buffer.byteLength(chunks.join(""), "binary");
    chunks.push(`xref\n0 ${this.objects.length + 1}\n0000000000 65535 f \n`);
    for (let i = 1; i < offsets.length; i += 1) {
      chunks.push(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
    }
    chunks.push(`trailer\n<< /Size ${this.objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`);

    fs.writeFileSync(file, chunks.join(""), "binary");
  }
}

function escapePdf(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function box(pdf, x, y, w, h, title, body, fill) {
  return [
    pdf.rect(x, y, w, h, fill),
    pdf.text(x + 16, y + h - 27, title, 13, [0.07, 0.09, 0.15], "F2"),
    pdf.wrappedText(x + 16, y + h - 50, body, 33, 9.5, 13, [0.29, 0.33, 0.39]),
  ].join("\n");
}

const pdf = new Pdf();

pdf.addPage([
  pdf.text(48, 742, "Explore Career Section Flow", 24, [0.07, 0.09, 0.15], "F2"),
  pdf.text(48, 714, "A saved reference for how the new section works in EduPath.", 12, [0.29, 0.33, 0.39]),
  box(pdf, 76, 628, 190, 62, "1. Navbar / Home", "User clicks Explore Career or a career card on the home page.", [1, 1, 1]),
  pdf.arrowDown(171, 628, 596),
  box(pdf, 76, 516, 190, 62, "2. /explorecareer", "React Router opens the ExploreCareer page.", [0.94, 0.97, 1]),
  pdf.arrowDown(171, 516, 484),
  box(pdf, 76, 404, 190, 62, "3. Career Cards", "The page maps careerFields data into clickable cards.", [1, 1, 1]),
  pdf.arrowDown(171, 404, 372),
  box(pdf, 76, 292, 190, 62, "4. Click Field", "Example: Engineering sends the user to /explorecareer/engineering.", [1, 1, 1]),
  pdf.arrowDown(171, 292, 260),
  box(pdf, 76, 180, 190, 62, "5. Detail Route", "The /explorecareer/:id route loads CareerDetail.jsx.", [0.94, 0.97, 1]),
  pdf.arrowDown(171, 180, 148),
  box(pdf, 76, 68, 190, 62, "6. Full Guidance", "CareerDetail finds the id and shows scope, exams, skills, pathway, and guidance.", [1, 0.97, 0.93]),
  box(pdf, 338, 488, 198, 88, "careerFields.js", "Single data source for title, image, overview, scope, pathway, exams, skills, career options, and guidance.", [0.94, 0.99, 0.96]),
  pdf.line(338, 532, 266, 435),
  box(pdf, 338, 296, 198, 88, "Wrong URL Fallback", "If the id does not match any field, the page shows Career field not found and a back button.", [1, 0.95, 0.95]),
  pdf.text(338, 226, "Visual flow image included above", 14, [0.07, 0.09, 0.15], "F2"),
  pdf.wrappedText(
    338,
    202,
    "Main idea: adding a new career object in careerFields.js automatically gives the app a new card and a matching detail page.",
    36,
    10.5,
    14,
    [0.29, 0.33, 0.39],
  ),
]);

const bulletLines = [
  "1. Navbar Entry: The user clicks Explore Career in the navbar. The app navigates to /explorecareer.",
  "2. Route Handling: App.jsx maps /explorecareer to ExploreCareer.jsx.",
  "3. Explore Career Page: ExploreCareer.jsx displays all career fields as cards.",
  "4. Data Source: careerFields.js stores all card and detail information in one array.",
  "5. Card Click: A selected card uses its id to open a URL like /explorecareer/engineering.",
  "6. Detail Route: App.jsx maps /explorecareer/:id to CareerDetail.jsx.",
  "7. Reading the ID: CareerDetail.jsx uses useParams to read the selected id from the URL.",
  "8. Finding the Data: getCareerFieldById(id) finds the matching object from careerFields.js.",
  "9. Showing Guidance: The page displays overview, scope, how to complete it, exams, skills, career options, guidance, and next step.",
  "10. Fallback: If the URL id is wrong, the page shows Career field not found and a back button.",
  "11. Home Page Connection: CareerFields.jsx on the home page also links to the same detail pages.",
];

let y = 690;
const page2 = [
  pdf.text(48, 742, "Detailed Flow Notes", 22, [0.07, 0.09, 0.15], "F2"),
  pdf.text(48, 714, "Use this when you need to remember how the Explore Career feature is connected.", 11, [0.29, 0.33, 0.39]),
];

for (const line of bulletLines) {
  const wrapped = wrap(line, 88);
  wrapped.forEach((text, index) => {
    page2.push(pdf.text(58, y - index * 15, text, 10.5, [0.17, 0.24, 0.31]));
  });
  y -= wrapped.length * 15 + 10;
}

page2.push(pdf.text(48, 74, "Important files:", 13, [0.07, 0.09, 0.15], "F2"));
page2.push(pdf.text(58, 52, "App.jsx, Navbar.jsx, ExploreCareer.jsx, CareerDetail.jsx, CareerFields.jsx, careerFields.js", 10, [0.17, 0.24, 0.31]));

pdf.addPage(page2);
pdf.save(pdfPath);

console.log(`Created ${pdfPath}`);
console.log(`Created ${svgPath}`);
