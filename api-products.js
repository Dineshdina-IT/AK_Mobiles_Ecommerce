// API ENDPOINT FOR POORVIKA PRODUCTS
// Use this if you want to serve products directly from the data file
// Add this to your server routes

const express = require('express');
const poorvikaProducts = require('./poorvika-products-template.js');

const router = express.Router();

// Get all products
router.get('/api/products', (req, res) => {
  try {
    const { category, sort, search, limit = 50 } = req.query;
    
    let allProducts = [];
    
    // Flatten all products into one array
    for (const [categoryName, products] of Object.entries(poorvikaProducts)) {
      for (const product of products) {
        allProducts.push({
          ...product,
          _id: Math.random().toString(36).substr(2, 9), // Generate random ID
          category: categoryName
        });
      }
    }
    
    // Filter by category
    if (category && category !== '') {
      allProducts = allProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Search functionality
    if (search && search !== '') {
      allProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.brand.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Sort functionality
    if (sort) {
      switch (sort) {
        case 'price-low':
          allProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          allProducts.sort((a, b) => b.price - a.price);
          break;
        case 'popularity':
          allProducts.sort((a, b) => b.reviews - a.reviews);
          break;
        case 'newest':
        default:
          // Keep original order or sort by date if you have timestamps
          break;
      }
    }
    
    // Limit results
    const limitedProducts = allProducts.slice(0, parseInt(limit));
    
    res.json({
      success: true,
      products: limitedProducts,
      total: allProducts.length
    });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products'
    });
  }
});

// Get categories
router.get('/api/categories', (req, res) => {
  try {
    const categories = Object.keys(poorvikaProducts).map(categoryName => ({
      _id: Math.random().toString(36).substr(2, 9),
      name: categoryName,
      productCount: poorvikaProducts[categoryName].length
    }));
    
    res.json({
      success: true,
      categories
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories'
    });
  }
});

// Get single product by ID (mock implementation)
router.get('/api/products/:id', (req, res) => {
  try {
    const { id } = req.params;
    
    // Find product by ID (this is a simple implementation)
    let foundProduct = null;
    
    for (const [categoryName, products] of Object.entries(poorvikaProducts)) {
      for (const product of products) {
        const productWithId = {
          ...product,
          _id: Math.random().toString(36).substr(2, 9),
          category: categoryName
        };
        
        if (productWithId._id === id) {
          foundProduct = productWithId;
          break;
        }
      }
      if (foundProduct) break;
    }
    
    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.json({
      success: true,
      product: foundProduct
    });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product'
    });
  }
});

module.exports = router;
