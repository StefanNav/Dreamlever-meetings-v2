# GitHub Setup & Deployment Guide

Follow these steps to push your project to GitHub and get a free sharable link.

## Step 1: Commit Your Changes

First, make sure all your changes are committed:

```bash
cd dreamlever-meetings
git add .
git commit -m "Initial commit: DreamLever Meetings Page"
```

## Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name it (e.g., `dreamlever-meetings` or `dreamlever-meetings-page`)
5. **DO NOT** initialize with README, .gitignore, or license (since you already have these)
6. Click "Create repository"

## Step 3: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Use these (replace `YOUR_USERNAME` and `YOUR_REPO_NAME`):

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel (Free Hosting)

Vercel offers free hosting for Next.js projects with automatic deployments:

1. Go to [vercel.com](https://vercel.com) and sign in with your GitHub account
2. Click "Add New Project"
3. Import your GitHub repository (it should appear in the list)
4. Vercel will auto-detect it's a Next.js project
5. Click "Deploy" (you can leave all settings as default)
6. Wait 1-2 minutes for the build to complete
7. **You'll get a free sharable link** like: `https://your-project-name.vercel.app`

### Alternative: Deploy via Vercel CLI

If you prefer command line:

```bash
npm i -g vercel
cd dreamlever-meetings
vercel
```

Follow the prompts, and you'll get a deployment URL.

## Step 5: Automatic Updates

Once connected to Vercel:
- Every time you push to GitHub, Vercel will automatically deploy your changes
- You'll get a new deployment URL for each push
- The main URL stays the same and always shows your latest version

## Troubleshooting

If you encounter permission issues with git:
- Make sure no other git processes are running
- Try closing your IDE/editor and running git commands in a fresh terminal
- Check file permissions: `ls -la .git/`
