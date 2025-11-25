const API_BASE_URL = 'https://mohamedalamin.wuaze.com/api';

export const api = {
  async getProducts(params = {}) {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/products?${queryString}`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      return { success: false, products: [] };
    }
  },

  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { success: false, categories: [] };
    }
  },

  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/stats`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching stats:', error);
      return { success: false, stats: {} };
    }
  },

  async getFeaturedProducts() {
    try {
      const response = await fetch(`${API_BASE_URL}/featured-products`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching featured products:', error);
      return { success: false, products: [] };
    }
  }
};
