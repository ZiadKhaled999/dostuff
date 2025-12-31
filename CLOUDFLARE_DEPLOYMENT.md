# Cloudflare Pages Deployment Guide

This guide will help you deploy your Do Stuff website to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account
2. The Cloudflare CLI (Wrangler) installed
3. Your project repository connected to Cloudflare Pages

## Files Added for Cloudflare Deployment

The following files have been added to enable Cloudflare Pages deployment:

### 1. `wrangler.toml`
- Main Cloudflare configuration file
- Specifies build command and publish directory
- Configures single-page application (SPA) routing

### 2. `vite.config.prod.ts`
- Production-specific Vite configuration
- Optimized build settings for Cloudflare Pages
- Minification and code splitting configuration

### 3. Updated `package.json`
- Added Cloudflare-specific scripts:
  - `build:prod`: Build with production config
  - `deploy:cloudflare`: Build and deploy to Cloudflare Pages
- Added required dependencies:
  - `@cloudflare/workers-types`
  - `wrangler`

### 4. `.env.example`
- Template for environment variables
- Copy to `.env.local` for local development

## Deployment Steps

### Option 1: Using Cloudflare Dashboard

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Connect your Git repository
3. Configure build settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build:prod`
   - **Build output directory**: `dist`
4. Deploy!

### Option 2: Using Wrangler CLI

1. Install Wrangler (if not already installed):
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   npx wrangler login
   ```

3. Deploy your site:
   ```bash
   npm run deploy:cloudflare
   ```

## Environment Variables

If your application uses environment variables (like `GEMINI_API_KEY`), you can set them in:

1. **Cloudflare Dashboard**: Pages → Settings → Environment Variables
2. **Wrangler CLI**: 
   ```bash
   npx wrangler pages publish --env GEMINI_API_KEY=your_key_here
   ```

## Build Output

The build process will:
- Create a `dist/` directory with optimized production files
- Minify JavaScript and CSS
- Generate source maps (disabled for production)
- Create vendor chunks for better caching

## Troubleshooting

### Common Issues

1. **Build fails**: Check that all dependencies are installed (`npm install`)
2. **Environment variables not working**: Ensure they're set in Cloudflare Pages settings
3. **Routing issues**: The `wrangler.toml` is configured for SPA routing

### Getting Help

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)
- [Vite Documentation](https://vitejs.dev/)