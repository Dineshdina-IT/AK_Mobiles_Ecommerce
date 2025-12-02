# AK Mobiles - Quick Start (5 Minutes)

## ⚡ Fast Setup

### 1. Backend (Terminal 1)
```bash
cd server
npm install
npm run dev
```
✅ Backend running on http://localhost:5000

### 2. Frontend (Terminal 2)
```bash
cd client
npm install
npm run dev
```
✅ Frontend running on http://localhost:3000

### 3. Open Browser
```
http://localhost:3000
```

## 🧪 Quick Test

### Sign Up
- Click "Sign Up"
- Email: test@example.com
- Password: Test@123

### Browse Products
- Click "Shop"
- View products
- Click on any product

### Add to Cart
- Click "Add to Cart"
- Go to Cart page
- See items

### Checkout
- Click "Proceed to Checkout"
- Fill shipping details
- Click "Place Order"

## 🔑 Admin Access

To access admin panel (`/admin`):

1. Create admin user in MongoDB:
   - Go to MongoDB Atlas
   - Find "users" collection
   - Add user with `"role": "admin"`

2. Login with admin account
3. Go to `/admin`
4. Manage products, orders, users

## 📝 Important Files

- **Backend**: `server/src/server.js`
- **Frontend**: `client/src/main.jsx`
- **Config**: `server/.env`
- **Routes**: `server/src/routes/`
- **Pages**: `client/src/pages/`

## 🆘 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Module errors?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**MongoDB connection error?**
- Check `.env` file
- Verify MongoDB Atlas IP whitelist
- Check credentials

## 📚 Full Documentation

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed setup
See [README.md](./README.md) for complete documentation

---

**You're all set! Happy coding! 🚀**
