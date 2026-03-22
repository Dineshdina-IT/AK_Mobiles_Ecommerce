# AK Mobiles - Modern MERN eCommerce Platform

A complete, production-ready eCommerce website for mobile phones built with React, Node.js, Express, and MongoDB Atlas.

##  Features

### Frontend (React + Tailwind CSS)
- **Responsive Mobile-First Design** - Works perfectly on all devices
- **Modern UI/UX** - Orange & White theme inspired by AKmobile(Own Shop)
- **Product Catalog** - Browse, search, filter, and sort products
- **Product Details** - Image carousel, variants, reviews, ratings
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout** - Shipping address form, order summary
- **User Authentication** - Login, signup, profile management
- **Order History** - View past orders and status
- **Admin Panel** - Manage products, orders, users, and view analytics
- **WhatsApp Integration** - Floating contact button

### Backend (Node.js + Express)
- **RESTful API** - Clean, scalable architecture
- **JWT Authentication** - Secure user sessions
- **Role-Based Access** - Admin and user roles
- **Product Management** - CRUD operations with variants
- **Order Management** - Order creation and status tracking
- **Cart Management** - Session-based cart operations
- **User Management** - Profile updates and authentication
- **Analytics** - Sales data and dashboard statistics

### Database (MongoDB Atlas)
- **Collections**: Users, Products, Categories, Orders, Carts
- **Relationships**: Proper indexing and references
- **Scalability**: Cloud-based MongoDB Atlas

## Project Structure

```
ak-mobiles/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth & Cart contexts
│   │   ├── router/        # Route configuration
│   │   ├── styles/        # Global styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── server/                 # Node.js Backend
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Business logic
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Auth & validation
│   │   ├── utils/         # Helper functions
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account

### Installation

#### 1. Clone the repository
```bash
cd ak-mobiles
```

#### 2. Setup Backend
```bash
cd server
npm install
```

Create `.env` file:
```
MONGODB_URI=mongodb+srv://<db_user>:<db_password>@ecommerce-mern.ea1kktw.mongodb.net/?appName=ecommerce-mern
JWT_SECRET=your_key
PORT=5000
NODE_ENV=development
```

Start backend server:
```bash
npm run dev
```

#### 3. Setup Frontend
```bash
cd ../client
npm install
```

Start frontend dev server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add review

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:itemId` - Update cart item
- `DELETE /api/cart/:itemId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/user/my-orders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order status (Admin)
- `DELETE /api/orders/:id` - Delete order (Admin)

### Admin
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/sales` - Get sales data
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user

## Key Pages

### User Pages
- **Home** - Hero banner, categories, trending products
- **Shop** - Product listing with filters and sorting
- **Product Detail** - Full product info, reviews, variants
- **Cart** - Cart items, quantities, checkout button
- **Checkout** - Shipping form, order summary
- **Order Success** - Order confirmation
- **Login/Signup** - Authentication pages
- **Dashboard** - User profile and order history

### Admin Pages
- **Admin Dashboard** - Stats, sales chart, quick actions
- **Manage Products** - Add, edit, delete products
- **Manage Orders** - View and update order status
- **Manage Users** - View and delete users

## 🎨 Design System

### Colors
- **Primary**: #F97316 (Orange)
- **Secondary**: #1F2937 (Dark Gray)
- **Accent**: #F5F5F5 (Light Gray)
- **White**: #FFFFFF

### Fonts
- **Primary**: Poppins (Body text)
- **Headings**: Montserrat (Bold titles)

### Components
- Buttons (Primary, Secondary, Outline)
- Cards with hover effects
- Input fields with validation
- Toast notifications
- Product cards with ratings
- Order cards with status

## 🔐 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcryptjs for password security
- **Role-Based Access Control** - Admin and user roles
- **Protected Routes** - Middleware for route protection
- **Input Validation** - Server-side validation


## Deployment

### Frontend (Netlify/Vercel)
```bash
npm run build
# Deploy the dist folder
```

### Backend (Heroku/Railway)
```bash
git push heroku main
```

## Environment Variables

### Server (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
NODE_ENV=production
```

### Client (.env.local)
```
VITE_API_URL=http://localhost:5000/api
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Query

For Query, email dinesh57399@gmail.com or contact via WhatsApp: +91 8940457399

## Acknowledgments

- Built with React, Node.js, Express, MongoDB
- UI components with Tailwind CSS
- Icons from Lucide React
- Charts with Chart.js

---

**Made with ❤️ by AK Mobiles **
