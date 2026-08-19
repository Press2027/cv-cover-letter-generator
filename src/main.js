import "./style.css";

const STORAGE_KEY = "pressmashData";

const defaultData = {
  mode: "cv",
  template: "classic",

  personal: {
    name: "Alex Morgan",
    role: "Software Developer",
    email: "alex@example.com",
    phone: "+254 700 000 000",
    location: "Nairobi, Kenya",
    website: "linkedin.com/in/alexmorgan"
  },

  summary:
    "Results-driven software developer with experience building responsive web applications, integrating APIs, and delivering reliable user-focused solutions. Strong communicator with a practical approach to problem solving and continuous learning.",

  skills: [
    "JavaScript",
    "HTML & CSS",
    "Vite",
    "Git & GitHub",
    "REST APIs",
    "Responsive Design"
  ],

  experience: [
    {
      job: "Web Developer",
      company: "Digital Solutions Ltd.",
      dates: "2024 — Present",
      description:
        "Developed responsive web applications using modern JavaScript tools.\nIntegrated REST APIs and improved application usability across desktop and mobile devices.\nCollaborated with designers and stakeholders to deliver production-ready features."
    }
  ],

  education: [
    {
      degree: "Bachelor of Science in Information Technology",
      school: "University / College",
      dates: "2021 — 2025",
      description:
        "Relevant coursework: web development, databases, software testing and information systems."
    }
  ],

  projects: [
    {
      name: "Medicine Finder Web App",
      tech: "Vite • JavaScript • OpenFDA API",
      description:
        "Built a responsive medicine search application with API-powered results, favorites and a clean user interface."
    }
  ],

  certifications: [
    {
      name: "Professional Web Development Certificate",
      issuer: "Training Provider",
      date: "2025"
    }
  ],

  cover: {
    company: "Hiring Company",
    jobTitle: "Software Developer",
    hiringManager: "Hiring Manager",
    date: "",
    jobDescription:
      "We are looking for a motivated software developer who can build reliable web applications, work collaboratively and learn new technologies quickly.",
    tone: "Professional"
  }
};

/* =========================================================
   LOAD DATA
========================================================= */

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return structuredClone(defaultData);
    }

    return {
      ...structuredClone(defaultData),
      ...JSON.parse(saved)
    };
  } catch (error) {
    console.error("Could not load saved data:", error);
    return structuredClone(defaultData);
  }
}

let data = loadData();

/* =========================================================
   AUTOMATIC DATE
========================================================= */

function getCurrentDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}

if (!data.cover.date) {
  data.cover.date = getCurrentDate();
}

/* =========================================================
   APP HTML
========================================================= */

const app = document.querySelector("#app");

if (!app) {
  throw new Error("Could not find #app element.");
}

app.innerHTML = `
  <header class="topbar">

    <div class="brand">
      <div class="logo">P</div>
      <span>Pressmash</span>
    </div>

    <div class="top-actions">

      <button
        class="btn btn-sm"
        id="saveBtn"
        type="button"
      >
        Save
      </button>

      <button
        class="btn btn-sm"
        id="resetBtn"
        type="button"
      >
        Reset
      </button>

      <button
        class="btn btn-primary btn-sm"
        id="printBtn"
        type="button"
      >
        Export / Print PDF
      </button>

    </div>

  </header>

  <div class="layout">

    <aside class="editor">

      <div class="editor-inner">

        <div class="hero">

          <div class="hero-brand">
            <span class="hero-badge">P</span>

            <div>
              <h1>Pressmash CV Builder</h1>

              <p>
                Create a professional CV and tailored cover letter
                from one workspace.
              </p>
            </div>
          </div>

        </div>

        <div class="tabs">

          <button
            class="tab active"
            data-tab="cv"
            type="button"
          >
            CV Builder
          </button>

          <button
            class="tab"
            data-tab="cover"
            type="button"
          >
            Cover Letter
          </button>

        </div>

        <!-- ================= CV PANEL ================= -->

        <section
          class="panel active"
          id="cvPanel"
        >

          <!-- Personal Details -->

          <div class="section-card">

            <div class="section-head">
              <h3>Personal details</h3>
            </div>

            <div class="grid2">

              <div>
                <label for="name">Full name</label>

                <input
                  id="name"
                  data-bind="personal.name"
                  type="text"
                  autocomplete="name"
                >
              </div>

              <div>
                <label for="role">
                  Professional title
                </label>

                <input
                  id="role"
                  data-bind="personal.role"
                  type="text"
                >
              </div>

            </div>

            <div class="grid2">

              <div>
                <label for="email">Email</label>

                <input
                  id="email"
                  data-bind="personal.email"
                  type="email"
                  autocomplete="email"
                >
              </div>

              <div>
                <label for="phone">Phone</label>

                <input
                  id="phone"
                  data-bind="personal.phone"
                  type="tel"
                  autocomplete="tel"
                >
              </div>

            </div>

            <div class="grid2">

              <div>
                <label for="location">
                  Location
                </label>

                <input
                  id="location"
                  data-bind="personal.location"
                  type="text"
                >
              </div>

              <div>
                <label for="website">
                  Website / LinkedIn
                </label>

                <input
                  id="website"
                  data-bind="personal.website"
                  type="text"
                >
              </div>

            </div>

          </div>

          <!-- Summary -->

          <div class="section-card">

            <div class="section-head">
              <h3>Professional summary</h3>
            </div>

            <textarea
              data-bind="summary"
              placeholder="Write a concise 3–5 line professional summary"
            ></textarea>

            <div class="hint">
              Focus on your experience, strengths, achievements
              and the type of role you want.
            </div>

          </div>

          <!-- Skills -->

          <div class="section-card">

            <div class="section-head">

              <h3>Skills</h3>

              <button
                class="btn btn-sm"
                id="addSkill"
                type="button"
              >
                + Add
              </button>

            </div>

            <div id="skillsEditor"></div>

          </div>

          <!-- Experience -->

          <div class="section-card">

            <div class="section-head">

              <h3>Work experience</h3>

              <button
                class="btn btn-sm"
                id="addExperience"
                type="button"
              >
                + Add
              </button>

            </div>

            <div id="experienceEditor"></div>

          </div>

          <!-- Education -->

          <div class="section-card">

            <div class="section-head">

              <h3>Education</h3>

              <button
                class="btn btn-sm"
                id="addEducation"
                type="button"
              >
                + Add
              </button>

            </div>

            <div id="educationEditor"></div>

          </div>

          <!-- Projects -->

          <div class="section-card">

            <div class="section-head">

              <h3>Projects</h3>

              <button
                class="btn btn-sm"
                id="addProject"
                type="button"
              >
                + Add
              </button>

            </div>

            <div id="projectsEditor"></div>

          </div>

          <!-- Certifications -->

          <div class="section-card">

            <div class="section-head">

              <h3>Certifications</h3>

              <button
                class="btn btn-sm"
                id="addCertification"
                type="button"
              >
                + Add
              </button>

            </div>

            <div id="certificationsEditor"></div>

          </div>

        </section>

        <!-- ================= COVER LETTER ================= -->

        <section
          class="panel"
          id="coverPanel"
        >

          <div class="section-card">

            <div class="section-head">
              <h3>AI job tailoring</h3>
            </div>

            <p class="hint">
              Paste the job description below. Pressmash will use
              it to tailor your cover letter and identify relevant
              skills and keywords.
            </p>

            <label for="company">
              Company
            </label>

            <input
              id="company"
              data-bind="cover.company"
              type="text"
            >

            <label for="jobTitle">
              Job title
            </label>

            <input
              id="jobTitle"
              data-bind="cover.jobTitle"
              type="text"
            >

            <label for="hiringManager">
              Hiring manager
            </label>

            <input
              id="hiringManager"
              data-bind="cover.hiringManager"
              type="text"
            >

            <label for="coverDate">
              Date
            </label>

            <input
              id="coverDate"
              data-bind="cover.date"
              type="text"
            >

            <label for="jobDescription">
              Job description
            </label>

            <textarea
              id="jobDescription"
              data-bind="cover.jobDescription"
              style="min-height:180px"
              placeholder="Paste the complete job description here..."
            ></textarea>

            <label for="tone">
              Tone
            </label>

            <select
              id="tone"
              data-bind="cover.tone"
            >
              <option value="Professional">
                Professional
              </option>

              <option value="Confident">
                Confident
              </option>

              <option value="Warm">
                Warm
              </option>

              <option value="Concise">
                Concise
              </option>
            </select>

            <button
              class="btn btn-primary"
              id="generateLetter"
              type="button"
            >
              Generate Tailored Letter
            </button>

          </div>

          <div class="section-card">

            <div class="section-head">
              <h3>Job tailoring</h3>
            </div>

            <div id="tailoringResults">
              <p class="hint">
                Paste a job description and click
                "Generate Tailored Letter".
              </p>
            </div>

          </div>

        </section>

      </div>

    </aside>

    <!-- ================= PREVIEW ================= -->

    <main class="preview-area">

      <div class="preview-toolbar">

        <span id="previewLabel">
          Live CV preview
        </span>

        <button
          class="btn btn-sm"
          id="copyBtn"
          type="button"
        >
          Copy text
        </button>

      </div>

      <article
        class="paper"
        id="preview"
      ></article>

    </main>

  </div>

  <div
    class="toast"
    id="toast"
    role="status"
    aria-live="polite"
  ></div>
`;

/* =========================================================
   HELPERS
========================================================= */

const get = (path) =>
  path
    .split(".")
    .reduce((object, key) => object?.[key], data);

const set = (path, value) => {
  const parts = path.split(".");
  let object = data;

  parts.slice(0, -1).forEach((key) => {
    object = object[key];
  });

  object[parts.at(-1)] = value;
};

function esc(value = "") {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      })[character]
  );
}

/* =========================================================
   SAVE
========================================================= */

function save(showToast = true) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(data)
    );

    if (showToast) {
      toast("Your Pressmash document was saved.");
    }
  } catch (error) {
    console.error("Save error:", error);
    toast("Unable to save your document.");
  }
}

/* =========================================================
   TOAST
========================================================= */

function toast(message) {
  const toastElement =
    document.querySelector("#toast");

  if (!toastElement) return;

  toastElement.textContent = message;
  toastElement.classList.add("show");

  clearTimeout(window.__pressmashToast);

  window.__pressmashToast = setTimeout(() => {
    toastElement.classList.remove("show");
  }, 2500);
}

/* =========================================================
   FIELD BINDING
========================================================= */

function bindFields() {
  document
    .querySelectorAll("[data-bind]")
    .forEach((element) => {

      const value = get(element.dataset.bind);

      element.value = value ?? "";

      element.oninput = () => {
        set(
          element.dataset.bind,
          element.value
        );

        save(false);

        renderPreviewOnly();
      };

      element.onchange = () => {
        set(
          element.dataset.bind,
          element.value
        );

        save(false);

        renderPreviewOnly();
      };
    });
}

/* =========================================================
   LIST EDITOR
========================================================= */

function listEditor(
  type,
  containerId,
  fields
) {
  const container =
    document.querySelector(`#${containerId}`);

  if (!container) return;

  container.innerHTML = "";

  data[type].forEach((item, index) => {

    const wrapper =
      document.createElement("div");

    wrapper.className = "dynamic-item";

    wrapper.innerHTML =
      fields(item, index);

    container.appendChild(wrapper);
  });

  container
    .querySelectorAll("[data-list]")
    .forEach((element) => {

      const [
        typeName,
        index,
        field
      ] = element.dataset.list.split("|");

      element.value =
        data[typeName][Number(index)][field] ?? "";

      element.oninput = () => {

        data[typeName][Number(index)][field] =
          element.value;

        save(false);

        renderPreviewOnly();
      };
    });

  container
    .querySelectorAll("[data-remove]")
    .forEach((button) => {

      button.onclick = () => {

        data[type].splice(
          Number(button.dataset.remove),
          1
        );

        save(false);
        render();
      };
    });
}

/* =========================================================
   EDITORS
========================================================= */

function renderEditors() {

  /* ---------- Skills ---------- */

  const skillBox =
    document.querySelector("#skillsEditor");

  skillBox.innerHTML =
    data.skills
      .map(
        (skill, index) => `
          <div
            class="dynamic-item"
            style="display:flex;gap:7px"
          >

            <input
              data-skill="${index}"
              value="${esc(skill)}"
              style="margin:0"
              type="text"
            >

            <button
              class="btn btn-sm btn-danger"
              data-remove-skill="${index}"
              type="button"
            >
              Remove
            </button>

          </div>
        `
      )
      .join("") ||
    `
      <div class="empty">
        No skills added yet.
      </div>
    `;

  skillBox
    .querySelectorAll("[data-skill]")
    .forEach((element) => {

      element.oninput = () => {

        data.skills[
          Number(element.dataset.skill)
        ] = element.value;

        save(false);

        renderPreviewOnly();
      };
    });

  skillBox
    .querySelectorAll("[data-remove-skill]")
    .forEach((button) => {

      button.onclick = () => {

        data.skills.splice(
          Number(button.dataset.removeSkill),
          1
        );

        save(false);
        render();
      };
    });

  /* ---------- Experience ---------- */

  listEditor(
    "experience",
    "experienceEditor",
    (item, index) => `
      <div class="grid2">

        <div>
          <label>Job title</label>

          <input
            data-list="experience|${index}|job"
            type="text"
          >
        </div>

        <div>
          <label>Company</label>

          <input
            data-list="experience|${index}|company"
            type="text"
          >
        </div>

      </div>

      <label>Dates</label>

      <input
        data-list="experience|${index}|dates"
        type="text"
      >

      <label>
        Responsibilities & achievements
      </label>

      <textarea
        data-list="experience|${index}|description"
      ></textarea>

      <div class="item-actions">

        <button
          class="btn btn-sm btn-danger"
          data-remove="${index}"
          type="button"
        >
          Remove
        </button>

      </div>
    `
  );

  /* ---------- Education ---------- */

  listEditor(
    "education",
    "educationEditor",
    (item, index) => `
      <label>
        Degree / qualification
      </label>

      <input
        data-list="education|${index}|degree"
        type="text"
      >

      <div class="grid2">

        <div>
          <label>School</label>

          <input
            data-list="education|${index}|school"
            type="text"
          >
        </div>

        <div>
          <label>Dates</label>

          <input
            data-list="education|${index}|dates"
            type="text"
          >
        </div>

      </div>

      <label>Details</label>

      <textarea
        data-list="education|${index}|description"
      ></textarea>

      <div class="item-actions">

        <button
          class="btn btn-sm btn-danger"
          data-remove="${index}"
          type="button"
        >
          Remove
        </button>

      </div>
    `
  );

  /* ---------- Projects ---------- */

  listEditor(
    "projects",
    "projectsEditor",
    (item, index) => `
      <label>Project name</label>

      <input
        data-list="projects|${index}|name"
        type="text"
      >

      <label>Technology</label>

      <input
        data-list="projects|${index}|tech"
        type="text"
      >

      <label>Description</label>

      <textarea
        data-list="projects|${index}|description"
      ></textarea>

      <div class="item-actions">

        <button
          class="btn btn-sm btn-danger"
          data-remove="${index}"
          type="button"
        >
          Remove
        </button>

      </div>
    `
  );

  /* ---------- Certifications ---------- */

  listEditor(
    "certifications",
    "certificationsEditor",
    (item, index) => `
      <div class="grid2">

        <div>
          <label>Certification</label>

          <input
            data-list="certifications|${index}|name"
            type="text"
          >
        </div>

        <div>
          <label>Issuer</label>

          <input
            data-list="certifications|${index}|issuer"
            type="text"
          >
        </div>

      </div>

      <label>Date</label>

      <input
        data-list="certifications|${index}|date"
        type="text"
      >

      <div class="item-actions">

        <button
          class="btn btn-sm btn-danger"
          data-remove="${index}"
          type="button"
        >
          Remove
        </button>

      </div>
    `
  );

  bindFields();
}

/* =========================================================
   CV PREVIEW
========================================================= */

function cvHTML() {

  const personal = data.personal;

  const section = (
    title,
    body
  ) =>
    body
      ? `
        <section class="cv-section">

          <h2>${title}</h2>

          ${body}

        </section>
      `
      : "";

  const experiences =
    data.experience
      .filter(
        (item) =>
          item.job ||
          item.company ||
          item.description
      )
      .map(
        (item) => `
          <div class="cv-item">

            <div class="item-top">

              <div>

                <div class="item-title">
                  ${esc(item.job)}
                </div>

                <div class="item-company">
                  ${esc(item.company)}
                </div>

              </div>

              <div class="item-date">
                ${esc(item.dates)}
              </div>

            </div>

            <div class="item-desc">
              ${esc(item.description)}
            </div>

          </div>
        `
      )
      .join("");

  const education =
    data.education
      .filter(
        (item) =>
          item.degree ||
          item.school ||
          item.description
      )
      .map(
        (item) => `
          <div class="cv-item">

            <div class="item-top">

              <div>

                <div class="item-title">
                  ${esc(item.degree)}
                </div>

                <div class="item-company">
                  ${esc(item.school)}
                </div>

              </div>

              <div class="item-date">
                ${esc(item.dates)}
              </div>

            </div>

            <div class="item-desc">
              ${esc(item.description)}
            </div>

          </div>
        `
      )
      .join("");

  const projects =
    data.projects
      .filter(
        (item) =>
          item.name ||
          item.tech ||
          item.description
      )
      .map(
        (item) => `
          <div class="cv-item">

            <div class="item-title">
              ${esc(item.name)}
            </div>

            <div class="item-company">
              ${esc(item.tech)}
            </div>

            <div class="item-desc">
              ${esc(item.description)}
            </div>

          </div>
        `
      )
      .join("");

  const certifications =
    data.certifications
      .filter(
        (item) =>
          item.name ||
          item.issuer
      )
      .map(
        (item) => `
          <div class="cv-item">

            <div class="item-title">
              ${esc(item.name)}
            </div>

            <div class="item-company">
              ${esc(item.issuer)}
              ${item.date ? ` · ${esc(item.date)}` : ""}
            </div>

          </div>
        `
      )
      .join("");

  const skills =
    data.skills
      .filter(Boolean)
      .map(
        (skill) =>
          `<span class="skill">${esc(skill)}</span>`
      )
      .join("");

  const contact = [
    personal.email,
    personal.phone,
    personal.location,
    personal.website
  ]
    .filter(Boolean)
    .map((item) => `<span>${esc(item)}</span>`)
    .join("<span>•</span>");

  return `
    <header class="cv-head">

      <h1 class="cv-name">
        ${esc(personal.name)}
      </h1>

      <div class="cv-role">
        ${esc(personal.role)}
      </div>

      <div class="contact">
        ${contact}
      </div>

    </header>

    ${section(
      "Profile",
      `
        <div class="summary">
          ${esc(data.summary)}
        </div>
      `
    )}

    ${section("Experience", experiences)}

    ${section("Education", education)}

    ${section("Projects", projects)}

    ${section(
      "Skills",
      `<div class="skills">${skills}</div>`
    )}

    ${section(
      "Certifications",
      certifications
    )}
  `;
}

/* =========================================================
   JOB KEYWORD ANALYSIS
========================================================= */

function extractKeywords(jobDescription) {

  const commonWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "are",
    "you",
    "your",
    "our",
    "will",
    "have",
    "has",
    "who",
    "their",
    "they",
    "can",
    "job",
    "role",
    "work",
    "working",
    "years",
    "year",
    "using",
    "about",
    "into",
    "within",
    "required",
    "requirements",
    "experience",
    "responsibilities"
  ]);

  return [
    ...new Set(
      jobDescription
        .toLowerCase()
        .replace(/[^a-z0-9+#.\- ]/g, " ")
        .split(/\s+/)
        .filter(
          (word) =>
            word.length >= 3 &&
            !commonWords.has(word)
        )
    )
  ].slice(0, 30);
}

/* =========================================================
   TAILORING
========================================================= */

function analyzeJobDescription() {

  const jobDescription =
    data.cover.jobDescription.trim();

  if (!jobDescription) {
    return {
      matched: [],
      missing: [],
      keywords: []
    };
  }

  const keywords =
    extractKeywords(jobDescription);

  const cvText = `
    ${data.personal.role}
    ${data.summary}
    ${data.skills.join(" ")}
    ${data.experience
      .map(
        (item) =>
          `${item.job} ${item.company} ${item.description}`
      )
      .join(" ")}
    ${data.projects
      .map(
        (item) =>
          `${item.name} ${item.tech} ${item.description}`
      )
      .join(" ")}
  `.toLowerCase();

  const matched = keywords.filter(
    (keyword) =>
      cvText.includes(keyword)
  );

  const missing = keywords.filter(
    (keyword) =>
      !cvText.includes(keyword)
  );

  return {
    matched,
    missing,
    keywords
  };
}

function renderTailoringResults() {

  const container =
    document.querySelector("#tailoringResults");

  if (!container) return;

  const result =
    analyzeJobDescription();

  if (!data.cover.jobDescription.trim()) {

    container.innerHTML = `
      <p class="hint">
        Paste a job description to see keyword
        matching results.
      </p>
    `;

    return;
  }

  const total =
    result.keywords.length;

  const score =
    total === 0
      ? 0
      : Math.round(
          (result.matched.length / total) * 100
        );

  container.innerHTML = `
    <div class="tailoring-score">

      <strong>
        ATS Match Score: ${score}%
      </strong>

    </div>

    <div class="tailoring-section">

      <h4>Matched keywords</h4>

      <div class="skills">
        ${
          result.matched.length
            ? result.matched
                .map(
                  (keyword) =>
                    `<span class="skill">${esc(keyword)}</span>`
                )
                .join("")
            : "<p>No matching keywords found yet.</p>"
        }
      </div>

    </div>

    <div class="tailoring-section">

      <h4>Potential keywords to consider</h4>

      <div class="skills">
        ${
          result.missing.length
            ? result.missing
                .map(
                  (keyword) =>
                    `<span class="skill">${esc(keyword)}</span>`
                )
                .join("")
            : "<p>Your CV already covers the detected keywords.</p>"
        }
      </div>

    </div>
  `;
}

/* =========================================================
   COVER LETTER
========================================================= */

function generateCoverText() {

  const cover = data.cover;
  const personal = data.personal;

  const skills =
    data.skills
      .filter(Boolean)
      .slice(0, 6)
      .join(", ");

  const latest =
    data.experience[0]?.job ||
    "my previous role";

  const tone =
    cover.tone === "Warm"
      ? "warm and personable"
      : cover.tone === "Confident"
      ? "confident and results-focused"
      : cover.tone === "Concise"
      ? "concise and direct"
      : "professional and polished";

  const company =
    cover.company ||
    "your organization";

  const jobTitle =
    cover.jobTitle ||
    "the position";

  return `Dear ${
    cover.hiringManager ||
    "Hiring Manager"
  },

I am writing to express my interest in the ${jobTitle} opportunity at ${company}. With experience as a ${
    personal.role || "professional"
  } and a background that includes ${
    skills || "relevant professional skills"
  }, I am excited about the opportunity to contribute to your team.

In my recent work as ${latest}, I have developed practical experience solving problems, delivering projects and working with modern tools. I bring a strong combination of technical ability, attention to detail and a commitment to producing reliable, user-focused results.

After reviewing the job description, I believe my experience with ${
    skills || "problem solving and professional development"
  } aligns well with the needs of this position. I am particularly interested in contributing my skills while continuing to grow professionally.

I would welcome the opportunity to discuss how my background and skills align with the needs of ${company}. Thank you for considering my application. I look forward to hearing from you.

Kind regards,

${personal.name}

${personal.email}
${personal.phone}`;
}

/* =========================================================
   COVER LETTER PREVIEW
========================================================= */

function coverHTML() {

  const cover = data.cover;

  const paragraphs =
    generateCoverText()
      .split("\n\n")
      .map(
        (paragraph) => `
          <p>
            ${esc(paragraph).replace(
              /\n/g,
              "<br>"
            )}
          </p>
        `
      )
      .join("");

  return `
    <div class="cover-letter">

      <h1>
        ${esc(
          cover.jobTitle ||
          "Job Application"
        )}
      </h1>

      <div class="cover-meta">

        ${esc(cover.date)}

        <br>

        ${esc(cover.company)}

        <br>

        ${esc(
          cover.hiringManager ||
          "Hiring Manager"
        )}

      </div>

      ${paragraphs}

    </div>
  `;
}

/* =========================================================
   PREVIEW
========================================================= */

function renderPreviewOnly() {

  const preview =
    document.querySelector("#preview");

  const previewLabel =
    document.querySelector("#previewLabel");

  if (!preview) return;

  preview.innerHTML =
    data.mode === "cv"
      ? cvHTML()
      : coverHTML();

  if (previewLabel) {
    previewLabel.textContent =
      data.mode === "cv"
        ? "Live CV preview"
        : "Live cover letter preview";
  }

  renderTailoringResults();
}

function render() {
  renderEditors();
  renderPreviewOnly();
}

/* =========================================================
   TABS
========================================================= */

document
  .querySelectorAll(".tab")
  .forEach((tab) => {

    tab.onclick = () => {

      data.mode =
        tab.dataset.tab;

      document
        .querySelectorAll(".tab")
        .forEach((item) => {
          item.classList.toggle(
            "active",
            item === tab
          );
        });

      document
        .querySelectorAll(".panel")
        .forEach((panel) => {
          panel.classList.remove(
            "active"
          );
        });

      document
        .querySelector(
          `#${data.mode}Panel`
        )
        .classList.add("active");

      renderPreviewOnly();
    };
  });

/* =========================================================
   ADD SKILL
========================================================= */

document.querySelector("#addSkill").onclick =
  () => {

    data.skills.push("New skill");

    save(false);
    render();
  };

/* =========================================================
   ADD EXPERIENCE
========================================================= */

document.querySelector("#addExperience").onclick =
  () => {

    data.experience.push({
      job: "Job title",
      company: "Company",
      dates: "2026 — Present",
      description:
        "Describe your responsibilities and measurable achievements."
    });

    save(false);
    render();
  };

/* =========================================================
   ADD EDUCATION
========================================================= */

document.querySelector("#addEducation").onclick =
  () => {

    data.education.push({
      degree: "Qualification",
      school: "School / University",
      dates: "2026",
      description:
        "Add relevant education details."
    });

    save(false);
    render();
  };

/* =========================================================
   ADD PROJECT
========================================================= */

document.querySelector("#addProject").onclick =
  () => {

    data.projects.push({
      name: "Project name",
      tech: "Technologies",
      description:
        "Describe the project and its impact."
    });

    save(false);
    render();
  };

/* =========================================================
   ADD CERTIFICATION
========================================================= */

document.querySelector("#addCertification").onclick =
  () => {

    data.certifications.push({
      name: "Certification",
      issuer: "Issuer",
      date: "2026"
    });

    save(false);
    render();
  };

/* =========================================================
   GENERATE TAILORED LETTER
========================================================= */

document
  .querySelector("#generateLetter")
  .onclick = () => {

    if (
      !data.cover.jobDescription.trim()
    ) {
      toast(
        "Please paste the job description first."
      );

      return;
    }

    data.mode = "cover";

    document
      .querySelectorAll(".tab")
      .forEach((tab) => {

        tab.classList.toggle(
          "active",
          tab.dataset.tab === "cover"
        );
      });

    document
      .querySelectorAll(".panel")
      .forEach((panel) => {
        panel.classList.remove(
          "active"
        );
      });

    document
      .querySelector("#coverPanel")
      .classList.add("active");

    save(false);
    renderPreviewOnly();

    toast(
      "Your cover letter has been tailored."
    );
  };

/* =========================================================
   SAVE
========================================================= */

document.querySelector("#saveBtn").onclick =
  () => save(true);

/* =========================================================
   PRINT / PDF
========================================================= */

document.querySelector("#printBtn").onclick =
  () => {
    window.print();
  };

/* =========================================================
   RESET
========================================================= */

document.querySelector("#resetBtn").onclick =
  () => {

    const confirmed =
      window.confirm(
        "Reset all Pressmash CV and cover letter data?"
      );

    if (!confirmed) return;

    data =
      structuredClone(defaultData);

    data.cover.date =
      getCurrentDate();

    localStorage.removeItem(
      STORAGE_KEY
    );

    render();

    toast(
      "Pressmash data has been reset."
    );
  };

/* =========================================================
   COPY
========================================================= */

document.querySelector("#copyBtn").onclick =
  async () => {

    const preview =
      document.querySelector("#preview");

    const text =
      preview?.innerText || "";

    if (!text) {
      toast("There is nothing to copy.");
      return;
    }

    try {

      await navigator.clipboard.writeText(
        text
      );

      toast(
        "Preview text copied."
      );

    } catch (error) {

      console.error(
        "Clipboard error:",
        error
      );

      toast(
        "Copy is not available in this browser."
      );
    }
  };

/* =========================================================
   PRESSMASH FOOTER
========================================================= */

function renderPressmashFooter() {

  const existingFooter =
    document.querySelector(
      ".pressmash-footer"
    );

  if (existingFooter) {
    existingFooter.remove();
  }

  const footer =
    document.createElement("footer");

  footer.className =
    "pressmash-footer";

  footer.innerHTML = `
    <div class="footer-container">

      <div class="footer-brand">

        <div class="footer-logo">
          P
        </div>

        <div>
          <h3>Pressmash</h3>

          <p>
            Professional CV & Cover Letter Generator
          </p>
        </div>

      </div>

      <div class="footer-info">

        <p>
          ©
          <span id="copyrightYear"></span>
          Pressmash.
          All rights reserved.
        </p>

        <a
          href="https://wa.me/254724074619"
          target="_blank"
          rel="noopener noreferrer"
          class="whatsapp-link"
        >
          💬 WhatsApp:
          +254 724 074 619
        </a>

      </div>

    </div>
  `;

  document.body.appendChild(footer);

  const year =
    document.querySelector(
      "#copyrightYear"
    );

  if (year) {
    year.textContent =
      new Date().getFullYear();
  }
}

/* =========================================================
   DATE & TIME
========================================================= */

function updateDateTime() {

  const now = new Date();

  const dateElement =
    document.querySelector(
      "#currentDate"
    );

  const timeElement =
    document.querySelector(
      "#currentTime"
    );

  if (dateElement) {

    dateElement.textContent =
      now.toLocaleDateString(
        undefined,
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        }
      );
  }

  if (timeElement) {

    timeElement.textContent =
      now.toLocaleTimeString(
        undefined,
        {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit"
        }
      );
  }
}

/* =========================================================
   START APPLICATION
========================================================= */

updateDateTime();

setInterval(
  updateDateTime,
  1000
);

render();

renderPressmashFooter();