# Pressmash — CV & Cover Letter Generator

A professional, dependency-light CV and cover-letter generator built with Vite, HTML, CSS and vanilla JavaScript.

## Features

- Live CV preview
- Tailored cover-letter generator
- Personal details, summary, skills, experience, education, projects and certifications
- LocalStorage persistence
- Responsive design
- Print / Save as PDF using the browser print dialog
- Copy generated document text
- No backend required

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Production build

```bash
npm run build
npm run preview
```

## Deploy

The generated `dist` folder can be deployed to Render, Netlify, Vercel, GitHub Pages, or another static hosting service.

### Render

- Build command: `npm install && npm run build`
- Publish directory: `dist`

## PDF export

Click **Export / Print PDF**, then select **Save as PDF** in the browser print dialog.

## Notes

The cover-letter generator is intentionally client-side and does not call an AI API. It creates a professional template using the information entered by the user. An AI API can be added later for deeper job-description analysis and stronger tailoring.
