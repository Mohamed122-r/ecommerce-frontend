// src/services/api.js - الإصدار المحدث
const API_BASE_URL = 'https://mohamedalamin.wuaze.com/api';

export const api = {
  async getProducts(params = {}) {
    try {
      console.log('🔍 جاري جلب المنتجات من:', API_BASE_URL);
      
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${API_BASE_URL}/products?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('📦 بيانات المنتجات:', data);
      
      return data;
    } catch (error) {
      console.error('❌ خطأ في جلب المنتجات:', error);
      return { 
        success: false, 
        products: [],
        error: error.message 
      };
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
  }
};
