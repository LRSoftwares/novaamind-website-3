# Content manager (write, edit, and publish)

The site has a content manager at `/admin/` built on [Decap CMS](https://decapcms.org).
It edits the same Markdown files in `src/content/`, so nothing else in the site changes.

## What you can do

**Resources** (the library at `/resources/`)
- Write a new resource: title, category, format, status, description, reader, sections, and the full article.
- Upload a PDF for a gated resource. It is saved to `public/downloads/`.
- Add images to an article. They are saved to `public/uploads/`.
- Change the status from *In preparation* to *Published*. A published free article shows its full text on the page. A published gated PDF downloads after the form.
- Edit or delete any existing resource. Filter the list by status or group it by category.

**Insights** (articles at `/insights/`)
- Write, edit, and delete articles. Turn on *Hide from the live site* to keep a draft private.

The editor has a live preview, a rich-text and Markdown mode, and a Publish menu
(*Publish now*, *Publish and create new*, *Publish and duplicate*).

## On your computer

Run these in two terminals from the project folder:

```bash
npm run dev    # the website, http://localhost:4321
npm run cms    # the content manager's local file server, port 8081
```

Open http://localhost:4321/admin/index.html and click **Login**. No password is needed locally.
Publishing writes the file straight into `src/content/`, and the page updates in a few seconds.
Commit and push the change to put it live.

## On the live site (one-time setup)

1. Put this project in its own GitHub repository and connect it to Vercel.
2. In `public/admin/config.yml`, set `backend.repo` to that repository, for example `novaamind/website`.
3. On GitHub, go to Settings → Developer settings → OAuth Apps → New OAuth App:
   - Homepage URL: `https://novaamind.com`
   - Authorization callback URL: `https://novaamind.com/api/callback`
4. In Vercel → Project → Settings → Environment Variables, add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` from that app, then redeploy.
5. Open `https://novaamind.com/admin/` and log in with GitHub. Anyone who should publish needs write access to the repository.

Each **Publish** on the live site becomes a commit to `main`. Vercel rebuilds the site, and the change is live in about a minute.
