# ACM Student Chapter – Diwali Seasonal Home

A mobile-first React seasonal homepage designed for an existing ACM Student Chapter website. It uses Bootstrap utility/grid classes plus custom CSS. The supplied MITS logo is included in `public/assets/mits-logo.png`.

## Add to your existing React project

1. Copy `src/components/DiwaliHome.jsx` and `src/components/DiwaliHome.css` into your project.
2. Copy `public/assets/mits-logo.png` into your project's `public/assets/` folder.
3. Ensure Bootstrap CSS is already imported by your app (for example, in `src/main.jsx` or `src/index.js`):
   `import "bootstrap/dist/css/bootstrap.min.css";`
4. Render the seasonal homepage where your normal homepage is currently rendered:

   ```jsx
   import DiwaliHome from "./components/DiwaliHome";

   function App() {
     return <DiwaliHome />;
   }

   export default App;
   ```

5. Run your usual development command (`npm run dev` for Vite or `npm start` for Create React App).

## Notes

- No ACM logo is used; the chapter identity is typeset as text.
- The MITS logo is used in the lower brand signature.
- The gift-box intro auto-opens once per mount and can be skipped by tapping/clicking.
- The animation respects `prefers-reduced-motion`.
- Edit the CSS variables at the top of `DiwaliHome.css` to tune the palette.
- The page is self-contained and does not change your existing router or global app layout.
