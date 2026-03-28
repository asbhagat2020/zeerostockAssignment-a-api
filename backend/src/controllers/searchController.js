import { products } from "../data/products.js";

export const searchProducts = (req, res) => {
  let { q, category, minPrice, maxPrice } = req.query;

  let result = [...products];

  // ✅ Edge Case: Invalid price range
  if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
    return res.status(400).json({ error: "Invalid price range" });
  }

  // ✅ Case-insensitive product name search
  if (q && q.trim() !== "") {
    result = result.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase())
    );
  }

  // ✅ Category filter (case-insensitive)
  if (category && category.trim() !== "") {
    result = result.filter(p =>
      p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // ✅ Price filters
  if (minPrice) {
    result = result.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    result = result.filter(p => p.price <= Number(maxPrice));
  }

  // ✅ If no filters → return all (handled automatically)

  res.json(result);
};