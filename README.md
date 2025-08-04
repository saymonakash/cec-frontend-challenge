# Frontend Challenge

## 🚀 Project Structure

Inside of this Astro project, you'll see the following folders and files:

```
├── public
│   └── favicon.svg
├── src
│   ├── assets
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components
│   │   ├── Cart.vue
│   │   ├── CategoriesSidebar.vue
│   │   ├── Footer.astro
│   │   ├── GlobalHeroSection.astro
│   │   ├── Header.vue
│   │   ├── Logo.vue
│   │   ├── Pagination.vue
│   │   ├── PaymentSuccessPopup.vue
│   │   ├── ProductCard.vue
│   │   ├── ProductDetailsButtons.vue
│   │   ├── ProductDetailsCard.astro
│   │   ├── ProductGridSection.vue
│   │   └── Spacer.vue
│   ├── composables
│   │   └── useProductsData.ts
│   ├── layouts
│   │   └── Layout.astro
│   ├── pages
│   │   ├── product
│   │   │   └── [...slug].astro
│   │   ├── index.astro
│   │   └── products.astro
│   ├── store
│   │   └── store.ts
│   ├── styles
│   │   └── tailwind.css
│   ├── types
│   │   └── index.ts
│   └── utils
│       └── formateSlug.ts
├── .gitignore
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

# Frontend Challenge

Welcome to the CEC's Frontend Challenge! This test aims to evaluate your web development skills using the [Astro](https://astro.build/), [TailwindCSS](https://tailwindcss.com/), and [Vue](https://vuejs.org/). Your task is to build a product catalog that fetches and displays data from the Fake Store API.

## Requirements

1. **Product Catalog**: Create a product catalog that consumes the [Fake Store API](https://fakestoreapi.com/).
2. **Sidebar with Categories**: The catalog must have a sidebar list with all categories.
3. **Product List**: Display products in a grid format.
4. **Pagination**: Implement pagination for the product list.
5. **Category Filtering**: When clicking on a category link, display only the products in that category.
6. **Product Display**: Each product in the list should display the title, image, and rating.
7. **Product Detail Page**: Create a page for each product that displays all its details, including those shown in the product listing.

## Stack

- **Astro**: Use the Astro framework to generate a static site.
- **TailwindCSS**: Use TailwindCSS for styling.
- **Vue**: Use Vue.js to create components.

## Submission

- Fork the repository containing this README.
- Provide a link to the public repository containing your code.
- Ensure your repository includes a README with instructions on how to run the project locally.

## Evaluation Criteria

- **Code Quality**: Clean, readable, and well-documented code.
- **Functionality**: All listed features work as expected.
- **UI/UX**: The user interface is intuitive and visually appealing.
- **Performance**: Efficient data fetching and rendering.
- **Completion**: Adherence to the requirements and stack specified.

## Doubts?

Do you have any doubts related to the process? Open an [issue](https://github.com/Cutting-Edge-Concepts/cec-frontend-challenge/issues) and we'll be happy to help.

Good luck, and happy coding!

---

If you have any questions, feel free to reach out.
