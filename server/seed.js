require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./src/models/Category');
const Product = require('./src/models/Product');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Create categories
    const categories = await Category.create([
      {
        name: 'Smartphones',
        description: 'Latest smartphones and mobile phones',
        image: 'https://via.placeholder.com/300x300?text=Smartphones',
      },
      {
        name: 'Tablets',
        description: 'Tablets and iPad devices',
        image: 'https://via.placeholder.com/300x300?text=Tablets',
      },
      {
        name: 'Accessories',
        description: 'Mobile accessories and chargers',
        image: 'https://via.placeholder.com/300x300?text=Accessories',
      },
    ]);
    console.log('✅ Created 3 categories');

    // Create products
    const products = await Product.create([
      {
        name: 'iPhone 15 Pro Max',
        description: 'Latest Apple flagship with A17 Pro chip, 48MP camera, and titanium design',
        category: categories[0]._id,
        price: 139999,
        stock: 50,
        image: 'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max',
        images: [
          'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max+1',
          'https://via.placeholder.com/300x300?text=iPhone+15+Pro+Max+2',
        ],
        variants: [
          { ram: '8GB', storage: '256GB', color: 'Black', priceDiff: 0, stock: 20 },
          { ram: '8GB', storage: '512GB', color: 'Black', priceDiff: 10000, stock: 15 },
          { ram: '8GB', storage: '256GB', color: 'Gold', priceDiff: 0, stock: 15 },
        ],
        rating: 4.8,
        numReviews: 245,
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Premium Android phone with 200MP camera and AI features',
        category: categories[0]._id,
        price: 129999,
        stock: 40,
        image: 'https://via.placeholder.com/300x300?text=Samsung+S24+Ultra',
        images: [
          'https://via.placeholder.com/300x300?text=Samsung+S24+Ultra+1',
          'https://via.placeholder.com/300x300?text=Samsung+S24+Ultra+2',
        ],
        variants: [
          { ram: '12GB', storage: '256GB', color: 'Titanium Black', priceDiff: 0, stock: 20 },
          { ram: '12GB', storage: '512GB', color: 'Titanium Black', priceDiff: 8000, stock: 20 },
        ],
        rating: 4.7,
        numReviews: 189,
      },
      {
        name: 'Google Pixel 8 Pro',
        description: 'Google flagship with advanced AI photography and pure Android',
        category: categories[0]._id,
        price: 99999,
        stock: 35,
        image: 'https://via.placeholder.com/300x300?text=Google+Pixel+8+Pro',
        images: [
          'https://via.placeholder.com/300x300?text=Google+Pixel+8+Pro+1',
        ],
        variants: [
          { ram: '12GB', storage: '128GB', color: 'Obsidian', priceDiff: 0, stock: 35 },
        ],
        rating: 4.6,
        numReviews: 156,
      },
      {
        name: 'OnePlus 12',
        description: 'Fast and smooth Android experience with 120Hz display',
        category: categories[0]._id,
        price: 64999,
        stock: 60,
        image: 'https://via.placeholder.com/300x300?text=OnePlus+12',
        images: [
          'https://via.placeholder.com/300x300?text=OnePlus+12+1',
        ],
        variants: [
          { ram: '12GB', storage: '256GB', color: 'Black', priceDiff: 0, stock: 60 },
        ],
        rating: 4.5,
        numReviews: 234,
      },
      {
        name: 'Xiaomi 14 Ultra',
        description: 'Flagship killer with Leica camera and powerful processor',
        category: categories[0]._id,
        price: 79999,
        stock: 45,
        image: 'https://via.placeholder.com/300x300?text=Xiaomi+14+Ultra',
        images: [
          'https://via.placeholder.com/300x300?text=Xiaomi+14+Ultra+1',
        ],
        variants: [
          { ram: '16GB', storage: '512GB', color: 'Black', priceDiff: 0, stock: 45 },
        ],
        rating: 4.4,
        numReviews: 178,
      },
      {
        name: 'iPad Pro 12.9"',
        description: 'Powerful tablet with M2 chip and stunning display',
        category: categories[1]._id,
        price: 119999,
        stock: 30,
        image: 'https://via.placeholder.com/300x300?text=iPad+Pro',
        images: [
          'https://via.placeholder.com/300x300?text=iPad+Pro+1',
        ],
        variants: [
          { ram: '8GB', storage: '128GB', color: 'Space Gray', priceDiff: 0, stock: 30 },
        ],
        rating: 4.7,
        numReviews: 145,
      },
      {
        name: 'Samsung Galaxy Tab S9 Ultra',
        description: 'Premium Android tablet with 14.6" display',
        category: categories[1]._id,
        price: 89999,
        stock: 25,
        image: 'https://via.placeholder.com/300x300?text=Galaxy+Tab+S9',
        images: [
          'https://via.placeholder.com/300x300?text=Galaxy+Tab+S9+1',
        ],
        variants: [
          { ram: '12GB', storage: '256GB', color: 'Graphite', priceDiff: 0, stock: 25 },
        ],
        rating: 4.6,
        numReviews: 98,
      },
      {
        name: 'USB-C Fast Charger 65W',
        description: 'Universal fast charger compatible with all devices',
        category: categories[2]._id,
        price: 1999,
        stock: 200,
        image: 'https://via.placeholder.com/300x300?text=USB+Charger',
        images: [],
        variants: [],
        rating: 4.8,
        numReviews: 567,
      },
      {
        name: 'Premium Phone Case',
        description: 'Durable protective case with premium materials',
        category: categories[2]._id,
        price: 799,
        stock: 300,
        image: 'https://via.placeholder.com/300x300?text=Phone+Case',
        images: [],
        variants: [
          { ram: '', storage: '', color: 'Black', priceDiff: 0, stock: 100 },
          { ram: '', storage: '', color: 'Blue', priceDiff: 0, stock: 100 },
          { ram: '', storage: '', color: 'Red', priceDiff: 0, stock: 100 },
        ],
        rating: 4.5,
        numReviews: 234,
      },
    ]);
    console.log('✅ Created 9 products');

    console.log('\n🎉 Sample data seeded successfully!');
    console.log(`📦 Categories: ${categories.length}`);
    console.log(`📱 Products: ${products.length}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

seedData();
