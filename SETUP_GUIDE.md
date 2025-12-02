# AK Mobiles - Complete Setup Guide

## Prerequisites

Before you start, make sure you have:
- **Node.js** v16 or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** ([Create Free Account](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

## Step-by-Step Setup

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or login
3. Create a new cluster (free tier available)
4. Create a database user with username and password
5. Add your IP to the IP whitelist (or allow all: 0.0.0.0/0)
6. Copy the connection string
7. Replace `<username>` and `<password>` with your credentials

**Connection String Format:**
```
mongodb+srv://username:password@cluster.mongodb.net/ecommerce_db?retryWrites=true&w=majority
```

### 2. Backend Setup

#### Clone and Navigate
```bash
cd ak-mobiles/server
```

#### Install Dependencies
```bash
npm install
```

#### Configure Environment Variables
Create a `.env` file in the `server` directory:

```env
MONGODB_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/ecommerce_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
PORT=5000
NODE_ENV=development
```

**Important:** Replace the values with your actual MongoDB connection string and a secure JWT secret.

#### Start Backend Server
```bash
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: your_cluster.mongodb.net
```

### 3. Frontend Setup

#### Navigate to Client Directory
```bash
cd ../client
```

#### Install Dependencies
```bash
npm install
```

#### Start Frontend Development Server
```bash
npm run dev
```

You should see:
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### 4. Access the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/health

## Testing the Application

### Create Test Account

1. Click "Sign Up" on the home page
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: Test@123
3. Click "Create Account"

### Add Test Products (Admin)

First, create an admin account by modifying the database:

1. Go to MongoDB Atlas
2. Navigate to your cluster
3. Click "Collections"
4. Find the "users" collection
5. Insert a new document:

```json
{
  "name": "Admin User",
  "email": "admin@akmobiles.com",
  "password": "$2a$10$...", // bcrypt hash of "admin123"
  "role": "admin",
  "createdAt": new Date(),
  "updatedAt": new Date()
}
```

Or use the signup form and manually update the role to "admin" in MongoDB.

### Add Sample Products

1. Login as admin
2. Go to `/admin`
3. Click "Manage Products"
4. Click "Add Product"
5. Fill in the form with sample data:

**Example Product 1:**
- Name: iPhone 15 Pro
- Category: (Select from dropdown)
- Description: Latest Apple flagship phone
- Price: 99999
- Stock: 50
- Image URL: https://via.placeholder.com/300x300?text=iPhone+15+Pro

**Example Product 2:**
- Name: Samsung Galaxy S24
- Category: (Select from dropdown)
- Description: Premium Android smartphone
- Price: 79999
- Stock: 40
- Image URL: https://via.placeholder.com/300x300?text=Samsung+S24

### Test Shopping Flow

1. Go to Home page
2. Click on a product
3. Click "Add to Cart"
4. Go to Cart page
5. Click "Proceed to Checkout"
6. Fill in shipping details
7. Click "Place Order"
8. View order confirmation

## Project Structure

```
ak-mobiles/
├── server/
│   ├── src/
│   │   ├── config/db.js          # MongoDB connection
│   │   ├── models/               # Database schemas
│   │   ├── controllers/          # Business logic
│   │   ├── routes/               # API endpoints
│   │   ├── middleware/auth.js    # JWT authentication
│   │   ├── app.js                # Express app setup
│   │   └── server.js             # Server entry point
│   ├── package.json
│   ├── .env                      # Environment variables
│   └── .env.example
│
├── client/
│   ├── src/
│   │   ├── components/           # Reusable components
│   │   ├── pages/                # Page components
│   │   ├── context/              # Auth & Cart state
│   │   ├── router/               # Routes
│   │   ├── styles/               # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
└── README.md
```

## Common Issues & Solutions

### Issue: MongoDB Connection Error
**Solution:**
- Check your connection string in `.env`
- Verify IP whitelist in MongoDB Atlas
- Ensure database user credentials are correct

### Issue: Port 5000 Already in Use
**Solution:**
```bash
# Kill the process using port 5000
# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :5000
kill -9 <PID>
```

### Issue: CORS Error
**Solution:**
- Backend is running on port 5000
- Frontend is running on port 3000
- CORS is configured in `server/src/app.js`

### Issue: Module Not Found
**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Environment Variables Reference

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb+srv://... |
| JWT_SECRET | Secret key for JWT tokens | your_secret_key_here |
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development/production |

### Frontend (vite.config.js)

The frontend automatically proxies API calls to `http://localhost:5000/api`

## Building for Production

### Frontend Build
```bash
cd client
npm run build
# Creates optimized build in dist/ folder
```

### Backend Deployment
```bash
# Set NODE_ENV=production
# Deploy to Heroku, Railway, or your hosting
```

## Database Collections

The application creates these collections automatically:

1. **users** - User accounts and profiles
2. **products** - Product catalog
3. **categories** - Product categories
4. **orders** - Customer orders
5. **carts** - Shopping carts
6. **order_items** - Order line items

## API Documentation

### Authentication Endpoints

**Signup**
```
POST /api/auth/signup
Body: { name, email, password, confirmPassword }
```

**Login**
```
POST /api/auth/login
Body: { email, password }
```

**Get Current User**
```
GET /api/auth/me
Headers: { Authorization: Bearer <token> }
```

### Product Endpoints

**Get All Products**
```
GET /api/products?category=<id>&sort=<type>&search=<query>
```

**Get Single Product**
```
GET /api/products/<id>
```

**Create Product (Admin)**
```
POST /api/products
Headers: { Authorization: Bearer <token> }
Body: { name, description, category, price, stock, image }
```

### Order Endpoints

**Create Order**
```
POST /api/orders
Headers: { Authorization: Bearer <token> }
Body: { shippingAddress: {...} }
```

**Get User Orders**
```
GET /api/orders/user/my-orders
Headers: { Authorization: Bearer <token> }
```

## Support & Help

- Check the main [README.md](./README.md) for more details
- Review API endpoints in backend routes
- Check browser console for frontend errors
- Check server logs for backend errors

## Next Steps

1. ✅ Setup complete!
2. 🛒 Start shopping
3. 📦 Add more products
4. 👥 Manage users
5. 📊 View analytics
6. 🚀 Deploy to production

---

**Happy coding! 🎉**
