# StoryLab

A responsive creative studio website built with React, Vite and Tailwind CSS v4.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

Deploy `dist/` to any static hosting provider. No server secrets or environment variables are required.

## Content and interactions

- Content, INR prices, project videos and contact details are adapted from the supplied StoryLab website.
- The visual direction takes inspiration from Rovenlabs, with an original ivory, charcoal and muted gold treatment.
- Portfolio category filters and inline video controls support keyboard use. Films play directly in the page without popups.
- Selecting a pricing package preselects it in the contact form.
- Enquiries are prepared locally. Visitors explicitly continue to WhatsApp to review and send. There is no backend form submission.
- Hero video is compressed locally; project posters avoid downloading videos until preview or playback.
- Scroll reveals and marquee respect reduced-motion preferences; the background video has a pause control.
- Studio photograph is hosted by Unsplash. Fonts load from Google Fonts with system fallbacks.

Edit services, projects and packages in `src/App.jsx`, and visual styles in `src/styles.css`.
