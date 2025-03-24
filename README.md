# Next.js + Tailwind CSS + DaisyUI Starter Template

🚀 **A simple starter template for Next.js with Tailwind CSS and DaisyUI.**  
This template helps you quickly set up a modern Next.js project with **Tailwind CSS** and **DaisyUI** for faster UI development.

---

## Getting Started


### Option 1: Use This Template (Recommended)
1. Click the "Use this template" button at the top of this repository.
2. Create a new repository. 
3. Clone your new repository:
```shell
git clone https://github.com/YOUR-USERNAME/YOUR-NEW-REPO.git my-project
cd my-project
```
### Option 2: Clone This Repository Directly
```shell
git clone https://github.com/crzbread/nextjs-daisyui.git my-project
cd my-project
````

### Install dependencies
```shell
yarn install
```
### Start the development server
```shell
yarn dev
```
Your app will be available at http://localhost:3000 


## Tailwind & DaisyUI Setup

This template follows the official [DaisyUI Next.js setup guide.](https://daisyui.com/docs/install/nextjs/)

PostCSS Configuration
Ensure your postcss.config.mjs contains:

```js
/** @type {import('postcss-load-config').Config} */
const config = {
        plugins: {
            '@tailwindcss/postcss': {},
        }};
export default config;

```

Global CSS Setup
Inside app/globals.css (or styles/globals.css for older versions):

```css
@import "tailwindcss";
@plugin "daisyui";
```

## License
This project is open-source and licensed under the MIT License.


