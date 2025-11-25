import React, { useState, useEffect } from 'react';
import { api } from './services/api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      console.log('🚀 بدء تحميل البيانات...');
      
      const productsRes = await api.getProducts();
      console.log('📦 استجابة المنتجات:', productsRes);
      
      if (productsRes.success) {
        setProducts(productsRes.products);
        console.log(`✅ تم تحميل ${productsRes.products.length} منتج`);
      } else {
        setError('فشل في جلب المنتجات: ' + (productsRes.error || 'Unknown error'));
        console.error('❌ فشل في جلب المنتجات:', productsRes);
      }

      const categoriesRes = await api.getCategories();
      if (categoriesRes.success) setCategories(categoriesRes.categories);

      const statsRes = await api.getStats();
      if (statsRes.success) setStats(statsRes.stats);

    } catch (error) {
      console.error('❌ خطأ في تحميل البيانات:', error);
      setError('حدث خطأ في تحميل البيانات: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>جاري تحميل المتجر...</p>
        <p>⏳ يرجى الانتظار</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>❌ حدث خطأ</h2>
        <p>{error}</p>
        <button onClick={loadInitialData}>إعادة المحاولة</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <h1>🛒 متجر إلكتروني</h1>
          <p>عدد المنتجات: {products.length}</p>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <h2>مرحباً بك في متجرنا</h2>
          <p>اكتشف أفضل المنتجات بأفضل الأسعار</p>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="stats-section">
        <div className="container">
          <h3>📊 إحصائيات المتجر</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <h4>المنتجات</h4>
              <p className="stat-number">{stats.total_products || products.length}</p>
            </div>
            <div className="stat-card">
              <h4>التصنيفات</h4>
              <p className="stat-number">{stats.total_categories || categories.length}</p>
            </div>
          </div>
        </div>
      </section>

      {/* المنتجات */}
      <section className="products-section">
        <div className="container">
          <h3>📦 المنتجات ({products.length})</h3>
          
          {products.length === 0 ? (
            <div className="no-products">
              <h4>❌ لا توجد منتجات</h4>
              <p>لم يتم العثور على أي منتجات في قاعدة البيانات</p>
              <button onClick={loadInitialData}>إعادة تحميل</button>
            </div>
          ) : (
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
          )}
        </div>
      </section>

      {/* التصنيفات */}
      <section className="categories-section">
        <div className="container">
          <h3>📁 التصنيفات ({categories.length})</h3>
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
    </div>
  );
}

export default App;
