// PRODUCT SEEDER SCRIPT
// This script will add Poorvika products to your database
// Run this script to populate your database with real products

const mongoose = require('mongoose');
const poorvikaProducts = require('./poorvika-products-template.js');

// Import your models (adjust paths as needed)
const Product = require('./src/models/Product');
const Category = require('./src/models/Category');

async function seedProducts() {
  try {
    // Connect to MongoDB Atlas (same as your server)
    await mongoose.connect('mongodb+srv://dinesh57399_db_user:yilbxleBxe3gWgVE@ecommerce-mern.ea1kktw.mongodb.net/?appName=ecommerce-mern', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Get or create categories
    const categories = ['Mobiles', 'Laptops', 'Tablets', 'Accessories'];
    const categoryDocs = {};

    for (const categoryName of categories) {
      let category = await Category.findOne({ name: categoryName });
      
      if (!category) {
        category = new Category({ name: categoryName });
        await category.save();
        console.log(`✅ Created category: ${categoryName}`);
      }
      
      categoryDocs[categoryName] = category;
    }

    // Clear existing products (optional - remove if you want to keep existing data)
    await Product.deleteMany({});
    console.log('✅ Cleared existing products');

    // Add products from Poorvika data
    const allProducts = [];
    
    for (const [categoryName, products] of Object.entries(poorvikaProducts)) {
      // Fix case sensitivity - capitalize first letter
      const formattedCategoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      const category = categoryDocs[formattedCategoryName];
      
      console.log(`Processing category: ${categoryName} -> ${formattedCategoryName}, products: ${products.length}`);
      
      if (!category || !category._id) {
        console.error(`❌ Category not found for: ${categoryName}`);
        continue;
      }
      
      for (const productData of products) {
        const product = new Product({
          name: productData.name,
          price: productData.price,
          oldPrice: productData.oldPrice,
          description: productData.description,
          category: category._id,
          brand: productData.brand,
          image: productData.image,
          specifications: productData.specifications,
          stock: productData.stock,
          rating: productData.rating,
          reviews: [], // Empty array for reviews, not a number
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        allProducts.push(product);
      }
    }

    // Insert all products
    const insertedProducts = await Product.insertMany(allProducts);
    console.log(`✅ Successfully added ${insertedProducts.length} products to database`);

    // Display summary
    console.log('\n📊 PRODUCT SUMMARY:');
    for (const categoryName of categories) {
      const count = insertedProducts.filter(p => {
        return p.category.toString() === categoryDocs[categoryName]._id.toString();
      }).length;
      console.log(`${categoryName}: ${count} products`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Alternative: Export as JSON for manual import
function exportAsJSON() {
  const fs = require('fs');
  
  // Convert to array format for easy import
  const allProducts = [];
  
  for (const [categoryName, products] of Object.entries(poorvikaProducts)) {
    for (const productData of products) {
      allProducts.push({
        ...productData,
        category: categoryName, // Keep as string for now
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }
  
  // Save to JSON file
  fs.writeFileSync('poorvika-products-json.json', JSON.stringify(allProducts, null, 2));
  console.log('✅ Products exported to poorvika-products-json.json');
}

// Run the seeder
if (require.main === module) {
  console.log('🚀 Starting product seeding...');
  seedProducts();
  
  // Also export as JSON backup
  exportAsJSON();
}

module.exports = { seedProducts, exportAsJSON };
