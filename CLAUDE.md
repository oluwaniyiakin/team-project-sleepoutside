# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SleepOutside is an e-commerce web application for outdoor gear (tents, backpacks, sleeping bags). This is a WDD 330 team project built with vanilla JavaScript using ES6 modules and Vite for bundling.

## Development Commands

- **Start dev server**: `npm run start` - Launches Vite dev server with hot reload
- **Build for production**: `npm run build` - Builds to `dist/` directory
- **Preview production build**: `npm run preview` - Previews the production build locally
- **Lint code**: `npm run lint` - Runs ESLint on all JS files
- **Format code**: `npm run format` - Auto-formats code with Prettier
- **Run tests**: `npm test` - Executes Jest test suite

## Architecture

### Module System & File Organization

The project uses a hybrid approach with **ES6 modules (.mjs)** for reusable components and **plain JavaScript (.js)** for page-specific entry points:

- **Reusable modules (.mjs)**: Export classes/functions used across pages
  - `ProductData.mjs` - Data layer for fetching product JSON
  - `ProductList.mjs` - Product listing/card rendering
  - `ProductDetails.mjs` - Individual product detail views
  - `utils.mjs` - Shared utilities (localStorage, DOM helpers, URL params)

- **Page entry points (.js)**: Imported by HTML pages via `<script type="module">`
  - `main.js` - Home page initialization
  - `product.js` - Product detail page initialization
  - `cart.js` - Shopping cart page initialization

### Multi-Page Architecture with Vite

Vite is configured for **multi-page application** (MPA) mode in `vite.config.js`:

```javascript
root: "src/",  // Source files live in src/
build: {
  outDir: "../dist",
  rollupOptions: {
    input: {
      main: resolve(__dirname, "src/index.html"),
      cart: resolve(__dirname, "src/cart/index.html"),
      product: resolve(__dirname, "src/product_pages/index.html")
    }
  }
}
```

Each HTML page is a separate entry point. Vite automatically bundles their dependencies.

### Data Flow Pattern

1. **ProductData** class handles all data fetching from `/public/json/*.json` files
2. **Presentation classes** (ProductList, ProductDetails) consume data and render UI
3. **Page scripts** (.js files) wire up data sources with presentation components
4. **utils.mjs** provides shared functionality (localStorage, URL params, DOM utilities)

### Key Patterns

- **Class-based components**: ProductList, ProductDetails, ProductData use class constructors with `init()` methods
- **Template literals**: HTML generation uses template strings (see `productCardTemplate()` in ProductList.mjs)
- **localStorage cart**: Shopping cart stored in `so-cart` key (see utils.mjs `setLocalStorage`/`getLocalStorage`)
- **URL params for routing**: Product pages use `?product={id}` query params (see `getParams()` in utils.mjs)

## Important Notes

- **Missing modules**: `ExternalServices.mjs`, `ProductListing.mjs`, `alerts.mjs`, and `loadHeaderFooter` are imported in main.js but don't exist in the codebase yet. These need to be implemented or the imports removed.
- **Inconsistent naming**: Note `ProductList.mjs` vs `ProductListing` import in main.js - verify correct class names
- **Static JSON data**: Products are loaded from `/public/json/` directory (tents.json, backpacks.json, sleeping-bags.json)
- **Vite path resolution**: Static assets use absolute paths from `/` (e.g., `/images/`, `/css/`) which resolve to `src/` during dev
- **Test structure**: Tests live in `src/test/` directory using Jest framework

## Code Style

ESLint enforces:
- ES6 module syntax (`import`/`export`)
- Template literals encouraged
- Console usage flagged as warning (rule: `no-console: 1`)
- Double quotes for strings (but template literals allowed)
