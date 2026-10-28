# The World of Mani - installation

This package adds the dark-teal homepage section directly below Our Creations,
plus a dedicated /mani page, live product filtering, and a read-only backend API.
JSX components include their CSS. No extra stylesheet or npm package is needed.

## 1. Copy the new files

Merge the backend and parasmani-catalog folders from this package into your
existing parasmaniv3 project. Only new files are included. Your existing App,
Home and backend app files are not replaced; make the following small edits.

## 2. Register the backend endpoint

In backend/app.js, alongside your other route imports, add:

```js
const maniRoutes = require("./routes/maniRoutes");
```

Below your existing API registrations, before module.exports, add:

```js
app.use("/api/mani", maniRoutes);
```

In your backend environment configuration, set the public origin for image URLs:

```env
PUBLIC_API_URL=https://api.parasmanijewelers.in
```

If testing against a local backend, use its local origin instead. Restart the
backend after changing this setting. The origin should not include /api.

## 3. Add the homepage section exactly below Our Creations

In parasmani-catalog/src/pages/Home.jsx add this import:

```jsx
import WorldOfMani from "../components/WorldOfMani/WorldOfMani";
```

Find the existing FeaturedDesigns/OurCraft components and make the sequence:

```jsx
<FeaturedDesigns />
<WorldOfMani />
<OurCraft />
```

FeaturedDesigns is the component currently titled Our Creations.

## 4. Register the public Mani page

In parasmani-catalog/src/App.jsx add:

```jsx
import Mani from "./pages/Mani";
```

Inside the CUSTOMER route block that begins with
<Route element={<CustomerLayout />}>, add:

```jsx
<Route path="/mani" element={<Mani />} />
```

Place it with /collections and /contact, before the closing customer </Route>.
Do not place it inside ProtectedRoute (the admin-only route block).

## 5. Include the new page in SEO generation

In parasmani-catalog/scripts/generate-seo-files.mjs add the following object
inside the existing const pages = [ ... ] array:

```js
{
  route: "/mani",
  title: "The World of Mani | Parasmani Jewellers",
  description: "Explore Pokal Mani, Bhariv Mani and Wax Mani designs from Parasmani Jewellers in Kolhapur.",
},
```

The existing build script will then generate /mani/index.html and the sitemap
entry. The page component also sets runtime metadata.

## 6. Manage the content through your EXISTING admin panel

Create or edit these three categories. Use the exact lowercase slugs shown:

| Category name | Slug |
| --- | --- |
| Pokal Mani | pokal-mani |
| Bhariv Mani | bhariv-mani |
| Wax Mani | wax-mani |

- Make each category Active.
- Upload an actual representative Mani photo as its category image.
- Add a description if desired; it appears when that type is selected.
- Add products through your existing Add Product form and select the correct
  Mani category. Upload product photos, product codes and descriptions normally.
- Make the products Active to display them.
- The Featured checkbox is not required for Mani. It still controls the existing
  Our Creations carousel, independently.
- Disabling a Mani category hides its card and all its Mani products.
- Missing categories show an empty illustrated preview; no fake designs are
  inserted. An active product image can supply a card cover if no category
  image has been uploaded.
- No SQL migration, database seeding, separate Mani admin login, or additional
  upload system is required. The endpoint reads your existing category/product
  tables. Existing authenticated CRUD endpoints continue to manage all content.

Products currently assigned to other categories are not automatically classified
as Mani; assign their intended Mani category through the admin panel. Matching
uses category IDs and exact category slugs, never guesses from product names.

## 7. Run and verify

Start/restart the backend using its normal npm start or npm run dev command.
Confirm https://api.parasmanijewelers.in/api/mani returns success:true and data.
Then in parasmani-catalog run npm run dev and open /mani.

For a local Mani API only, set this in parasmani-catalog/.env.local, then restart
Vite (replace the example port with your backend port):

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

This optional variable configures the new Mani service. Other existing services
keep their existing configuration.

Finally run npm run build in your normal environment before deploying the
frontend and deploy the three new backend files plus the backend app.js edit.
Existing static-host SPA rewrite behavior must cover /mani as it already does
/collections. Never upload credentials or .env files as part of this package.

## Included files

backend/controllers/maniController.js
backend/routes/maniRoutes.js
backend/utils/maniCatalog.js
backend/tests/maniCatalog.test.js
backend/tests/maniController.test.js
parasmani-catalog/src/components/WorldOfMani/WorldOfMani.jsx
parasmani-catalog/src/pages/Mani.jsx
parasmani-catalog/src/hooks/useManiCatalog.js
parasmani-catalog/src/services/maniService.js

Run backend tests with:
node --test backend/tests/maniCatalog.test.js backend/tests/maniController.test.js

## Validation and limits

Production frontend build and targeted ESLint checks passed using the existing
locally installed dependencies. Seven backend tests passed for category/product
visibility, exact category matching, image URLs, image fallback, sorting, public
controller response and failure handling. No live database was modified.

Browser checks use controlled API fixtures and existing jewellery images for
layout verification only; those fixtures and images are not seeded or packaged
as live products. Your deployed backend/database connection must be verified
after the integration and category setup described above.

Responsive browser validation passed at 320, 375, 768, 1024 and 1440 pixels with
no horizontal overflow. Mani filters, homepage card navigation, error retry,
empty states and runtime checks passed against controlled API fixtures.
