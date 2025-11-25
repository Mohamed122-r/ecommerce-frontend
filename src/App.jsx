import React, { useState, useEffect } from 'react';
import { api } from './services/api';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const [productsRes, categoriesRes, statsRes] = await Promise.all([
        api.getProducts(),
        api.getCategories(),
        api.getStats()
      ]);

      if (productsRes.success) setProducts(productsRes.products);
      if (categoriesRes.success) setCategories(categoriesRes.categories);
      if (statsRes.success) setStats(statsRes.stats);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري تحميل المتجر...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <h1>🛒 متجر إلكتروني</h1>
          <nav>
            <a href="#products">المنتجات</a>
            <a href="#categories">التصنيفات</a>
            <a href="#stats">الإحصائيات</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h2>مرحباً بك في متجرنا</h2>
          <p>اكتشف أفضل المنتجات بأفضل الأسعار</p>
        </div>
      </section>

      {/* Stats */}
      <section id="stats" className="stats-section">
        <div className="container">
          <h3>📊 إحصائيات المتجر</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>المنتجات</h4>
              <p className="stat-number">{stats.total_products || 0}</p>
            </div>
            <div className="stat-card">
              <h4>التصنيفات</h4>
              <p className="stat-number">{stats.total_categories || 0}</p>
            </div>
            <div className="stat-card">
              <h4>المميزة</h4>
              <p className="stat-number">{stats.featured_products || 0}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="products-section">
        <div className="container">
          <h3>📦 المنتجات ({products.length})</h3>
          <div className="products-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/300'} 
                  alt={product.name}
                />
                <div className="product-info">
                  <h4>{product.name}</h4>
                  <p className="category">{product.category_name}</p>
                  <div className="price">
                    {product.has_discount ? (
                      <>
                        <span className="old-price">{product.price} ر.س</span>
                        <span className="current-price">{product.final_price} ر.س</span>
                        <span className="discount">-{product.discount_percentage}%</span>
                      </>
                    ) : (
                      <span className="current-price">{product.final_price} ر.س</span>
                    )}
                  </div>
                  <button className="add-to-cart">أضف إلى السلة</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="categories-section">
        <div className="container">
          <h3>📁 التصنيفات</h3>
          <div className="categories-grid">
            {categories.map(category => (
              <div key={category.id} className="category-card">
                <h4>{category.name}</h4>
                <p>{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>© 2024 متجر إلكتروني. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
