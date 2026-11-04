import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const products = [
  {
    id: "pulse-one",
    name: "Pulse One",
    category: "Monitoring",
    price: 2499,
    rating: 4.8,
    reviews: 128,
    badge: "BEST SELLER",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=900&q=85",
    description: "A clean, easy-to-read blood pressure monitor for a home wellness setup.",
    details: ["Large backlit display", "One-button operation", "Stores up to 60 readings"],
    tone: "sage",
  },
  {
    id: "gluco-kit",
    name: "Gluco Kit Mini",
    category: "Monitoring",
    price: 1799,
    rating: 4.6,
    reviews: 84,
    badge: "COMPACT PICK",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
    description: "A compact sample meter kit presented for product interface exploration.",
    details: ["Pocket-size form", "Clear high-contrast display", "Carry case included"],
    tone: "lilac",
  },
  {
    id: "air-note",
    name: "AirNote Thermometer",
    category: "Everyday care",
    price: 899,
    rating: 4.7,
    reviews: 96,
    badge: "EVERYDAY",
    image: "https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=900&q=85",
    description: "A simple digital thermometer concept with a soft-touch finish.",
    details: ["Fast-read display", "Flexible tip", "Protective storage sleeve"],
    tone: "peach",
  },
  {
    id: "calm-wrap",
    name: "CalmWrap Heat Pad",
    category: "Comfort",
    price: 1299,
    rating: 4.5,
    reviews: 62,
    badge: "SOFT TOUCH",
    image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=900&q=85",
    description: "A cozy reusable heat pad concept designed for a calm evening routine.",
    details: ["Soft washable cover", "Flexible wrap shape", "Three heat settings"],
    tone: "blue",
  },
  {
    id: "flow-bottle",
    name: "Flow Hydration Bottle",
    category: "Everyday care",
    price: 649,
    rating: 4.9,
    reviews: 211,
    badge: "COMMUNITY FAVOURITE",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
    description: "A lightweight reusable bottle for keeping hydration close at hand.",
    details: ["700 ml capacity", "Leak-resistant cap", "BPA-free sample specification"],
    tone: "mint",
  },
  {
    id: "rest-mask",
    name: "Rest Soft Eye Mask",
    category: "Comfort",
    price: 499,
    rating: 4.4,
    reviews: 43,
    badge: "TRAVEL READY",
    image: "https://images.unsplash.com/photo-1511295742362-92c96b3e9f49?auto=format&fit=crop&w=900&q=85",
    description: "A lightweight sleep accessory concept with a soft, adjustable band.",
    details: ["Adjustable strap", "Soft-touch lining", "Travel pouch included"],
    tone: "lilac",
  },
];

const categories = ["All items", "Monitoring", "Everyday care", "Comfort"];
const formatPrice = (value) => `₹${value.toLocaleString("en-IN")}`;

function readSaved() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem("catalog-saved") || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All items");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [saved, setSaved] = useState(readSaved);
  const [showSaved, setShowSaved] = useState(false);
  const [selected, setSelected] = useState(null);
  const [compare, setCompare] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    try {
      window.localStorage.setItem("catalog-saved", JSON.stringify(saved));
    } catch {
      // Saved items remain available for the current session when storage is blocked.
    }
  }, [saved]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }
      if (event.key === "Escape") {
        setSelected(null);
        setCompareOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesQuery = `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(query.trim().toLowerCase());
      return (
        matchesQuery &&
        (category === "All items" || product.category === category) &&
        product.price <= maxPrice &&
        (!showSaved || saved.includes(product.id))
      );
    });
    if (sort === "price-low") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price-high") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "rating") result = [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }, [category, maxPrice, query, saved, showSaved, sort]);

  const toggleSaved = (id) =>
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );

  const toggleCompare = (id) =>
    setCompare((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : current.length < 3
          ? [...current, id]
          : current,
    );

  const comparedProducts = products.filter((product) => compare.includes(product.id));

  return (
    <div className="storefront">
      <div className="announcement">A little more thoughtful, every day <span>✳</span> Free delivery on sample orders over ₹1,499</div>
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Wellnest home"><span className="mark">w.</span><span>wellnest</span></a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="active" href="#catalog">Shop all</a>
          <a href="#catalog" onClick={() => setCategory("Everyday care")}>Everyday care</a>
          <a href="#about">Our approach</a>
        </nav>
        <div className="top-actions">
          <button className={`icon-button saved-nav ${showSaved ? "is-active" : ""}`} onClick={() => { setShowSaved((value) => !value); document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" }); }} aria-label={`Show saved items, ${saved.length} saved`} title="Saved items"><span aria-hidden="true">♡</span><small>{saved.length}</small></button>
          <button className="bag-button" onClick={() => setCompareOpen(true)} aria-label={`Open comparison, ${compare.length} items`}><span aria-hidden="true">▤</span><span>Compare</span><b>{compare.length}</b></button>
        </div>
      </header>

      <main id="home">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> WELLNESS, MADE SIMPLE</div>
            <h1 id="hero-title">Small rituals.<br /><em>Better days.</em></h1>
            <p>Thoughtful everyday essentials for a little more ease in your routine. Explore the collection and find what feels right for you.</p>
            <a className="primary-button" href="#catalog">Explore the collection <span aria-hidden="true">↘</span></a>
            <div className="hero-note"><span className="sparkle">✳</span><span>Curated for everyday living<br /><b>Designed to feel like you</b></span></div>
          </div>
          <div className="hero-art" role="img" aria-label="Sunlit wellness essentials arranged on a warm neutral surface">
            <div className="hero-photo" />
            <div className="hero-sticker"><span>GOOD<br />THINGS<br />AHEAD</span><b>✳</b></div>
            <div className="hero-caption"><span>01 / 03</span><span>THE EVERYDAY EDIT</span></div>
          </div>
          <div className="hero-side-label">A SLOWER KIND OF CARE — EST. 2024</div>
        </section>

        <section className="trust-strip" aria-label="Our values">
          <div><span>✳</span> Thoughtfully selected</div><div><span>⌂</span> Made for real routines</div><div><span>↗</span> Easy to explore</div><div><span>♡</span> A little care goes far</div>
        </section>

        <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> THE WELLNEST EDIT</div><h2 id="catalog-title">Find your <em>everyday.</em></h2></div>
            <p>Good things that make room for a better routine.<br />Take a look around.</p>
          </div>

          <div className="catalog-controls">
            <label className="search-box"><span aria-hidden="true">⌕</span><input ref={searchRef} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the collection" aria-label="Search the collection" /><kbd>⌘ K</kbd></label>
            <label className="sort-control"><span>Sort by</span><select value={sort} onChange={(event) => setSort(event.target.value)} aria-label="Sort products"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="rating">Top rated</option></select></label>
          </div>

          <div className="catalog-layout">
            <aside className="filters" aria-label="Product filters">
              <div className="filter-block"><h3>Categories</h3>{categories.map((item) => <button key={item} className={`category-option ${category === item ? "selected" : ""}`} onClick={() => setCategory(item)}>{item}<span>{item === "All items" ? products.length : products.filter((product) => product.category === item).length}</span></button>)}</div>
              <div className="filter-block price-block"><h3>Price range</h3><div className="price-values"><span>₹0</span><b>{formatPrice(maxPrice)}</b></div><input type="range" min="500" max="3000" step="100" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} aria-label="Maximum price" /><div className="price-hint">Adjust to find your fit</div></div>
              <div className="filter-aside-note"><span>✳</span><p>Good choices<br />start with <em>you.</em></p></div>
            </aside>

            <div className="products-area">
              <div className="results-line"><p><b>{visibleProducts.length.toString().padStart(2, "0")}</b> pieces to explore{showSaved && <span className="saved-filter-label"> · Saved for later <button onClick={() => setShowSaved(false)} aria-label="Clear saved filter">×</button></span>}</p><span>All prices in INR</span></div>
              {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product, index) => <article className="product-card" key={product.id} style={{ "--card-index": index }}>
                <div className={`product-image ${product.tone}`}>
                  <img src={product.image} alt="" loading="lazy" />
                  <span className="product-badge">{product.badge}</span>
                  <button className={`favorite-button ${saved.includes(product.id) ? "favorited" : ""}`} onClick={() => toggleSaved(product.id)} aria-label={`${saved.includes(product.id) ? "Remove" : "Save"} ${product.name}`} aria-pressed={saved.includes(product.id)}>{saved.includes(product.id) ? "♥" : "♡"}</button>
                  <button className="quick-view" onClick={() => setSelected(product)}>Quick view <span aria-hidden="true">↗</span></button>
                </div>
                <div className="product-meta"><span>{product.category}</span><span className="rating">★ {product.rating} <small>({product.reviews})</small></span></div>
                <div className="product-title-row"><button className="product-title" onClick={() => setSelected(product)}>{product.name}</button><b className="product-price">{formatPrice(product.price)}</b></div>
                <p className="product-description">{product.description}</p>
                <label className="compare-check"><input type="checkbox" checked={compare.includes(product.id)} onChange={() => toggleCompare(product.id)} disabled={!compare.includes(product.id) && compare.length >= 3} /><span>Add to compare</span></label>
              </article>)}</div> : <div className="empty-state"><span>✳</span><h3>No pieces found</h3><p>Try a different search or open up your filters a little.</p><button className="text-button" onClick={() => { setQuery(""); setCategory("All items"); setMaxPrice(3000); setShowSaved(false); }}>Clear all filters ↗</button></div>}
              <div className="catalog-footnote"><span>✳</span> Showing an illustrative sample catalog for interface exploration.</div>
            </div>
          </div>
        </section>

        <section className="story-section" id="about"><div className="story-mark">w.</div><div><div className="eyebrow"><span className="eyebrow-line" /> A NOTE FROM WELLNEST</div><h2>Care should feel<br /><em>like coming home.</em></h2></div><p>We believe the best routines aren't complicated. They're made of small, thoughtful choices that fit into the life you're already living. That's the feeling behind this collection.</p><a className="story-link" href="#catalog">Get to know the collection <span>↗</span></a><div className="story-decoration" aria-hidden="true">✳</div></section>
      </main>

      <footer className="footer"><a className="wordmark" href="#home"><span className="mark">w.</span><span>wellnest</span></a><p>A thoughtful little catalog concept.<br /><span>Made with care, for everyday.</span></p><div className="footer-links"><a href="#catalog">Explore</a><a href="#about">Our approach</a><a href="#home">Back to top ↑</a></div><div className="footer-bottom"><span>© 2025 WELLNEST STUDIO</span><span>INTERFACE SHOWCASE · SAMPLE CATALOG</span><span>MADE FOR THE EVERYDAY ✳</span></div></footer>

      {selected && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><section className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close details">×</button><div className={`modal-image ${selected.tone}`}><img src={selected.image} alt="" /></div><div className="modal-copy"><div className="eyebrow"><span className="eyebrow-line" /> {selected.category.toUpperCase()}</div><h2 id="modal-title">{selected.name}</h2><div className="modal-rating">★ {selected.rating} <span>({selected.reviews} notes)</span><b>{formatPrice(selected.price)}</b></div><p>{selected.description}</p><div className="modal-detail-heading">A few thoughtful details</div><ul>{selected.details.map((detail) => <li key={detail}><span>✳</span>{detail}</li>)}</ul><p className="modal-disclaimer">Illustrative sample listing. Product details and availability are examples for this interface showcase.</p><button className={`primary-button modal-save ${saved.includes(selected.id) ? "saved" : ""}`} onClick={() => toggleSaved(selected.id)}>{saved.includes(selected.id) ? "Saved to your list" : "Save for later"}<span>{saved.includes(selected.id) ? "♥" : "♡"}</span></button></div></section></div>}

      {compareOpen && <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setCompareOpen(false); }}><section className="compare-modal" role="dialog" aria-modal="true" aria-labelledby="compare-title"><div className="compare-header"><div><div className="eyebrow"><span className="eyebrow-line" /> SIDE BY SIDE</div><h2 id="compare-title">A closer <em>look.</em></h2></div><button className="modal-close" onClick={() => setCompareOpen(false)} aria-label="Close comparison">×</button></div>{comparedProducts.length ? <div className="compare-table"><div className="compare-row compare-head"><span>DETAIL</span>{comparedProducts.map((product) => <strong key={product.id}>{product.name}</strong>)}</div><div className="compare-row"><span>Category</span>{comparedProducts.map((product) => <span key={product.id}>{product.category}</span>)}</div><div className="compare-row"><span>Price</span>{comparedProducts.map((product) => <strong key={product.id}>{formatPrice(product.price)}</strong>)}</div><div className="compare-row"><span>Rating</span>{comparedProducts.map((product) => <span key={product.id}>★ {product.rating} <small>({product.reviews})</small></span>)}</div><div className="compare-row"><span>Details</span>{comparedProducts.map((product) => <span key={product.id}>{product.details[0]}</span>)}</div></div> : <div className="compare-empty"><span>▤</span><p>Choose up to three pieces and compare them side by side.</p><button className="text-button" onClick={() => setCompareOpen(false)}>Browse the collection ↗</button></div>}<div className="compare-footer"><span>{compare.length}/3 pieces selected</span>{comparedProducts.map((product) => <button key={product.id} onClick={() => toggleCompare(product.id)}>{product.name} ×</button>)}</div></section></div>}
    </div>
  );
}

export default App;
