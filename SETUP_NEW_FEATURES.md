# 🔧 Setup Guide - Contact Form & Reviews System

## Quick Start

### Step 1: Restart Your Servers

Since new models and routes have been added, restart both servers:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend  
cd client
npm run dev
```

### Step 2: Access New Pages

**Contact Form:**
```
http://localhost:3000/contact
```

**Reviews Page:**
```
http://localhost:3000/reviews
```

---

## Testing the Features

### Test Contact Form

1. Go to `http://localhost:3000/contact`
2. Fill in the form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Phone: "+91 9876543210"
   - Subject: "Product Inquiry"
   - Message: "I have a question about your products"
3. Click "Send Message"
4. You should see a success toast notification
5. Data is saved to MongoDB

**Verify in Database:**
```bash
# Connect to MongoDB and check
db.contacts.find()
```

### Test Reviews System

1. **Login first** (required to submit reviews)
   - Go to `/login`
   - Use your test credentials

2. Go to `http://localhost:3000/reviews`

3. Click "Write a Review"

4. Fill in the form:
   - Select a product from dropdown
   - Click stars to rate (1-5)
   - Title: "Great Product!"
   - Message: "Excellent quality and fast delivery"

5. Click "Submit Review"

6. Review appears in the list

**Verify in Database:**
```bash
# Connect to MongoDB and check
db.reviews.find()
```

---

## Admin Features Testing

### View Contact Messages (Admin Only)

**Backend API:**
```bash
# Get all contacts
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:5000/api/contact

# Get single contact
curl -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:5000/api/contact/CONTACT_ID

# Update contact status
curl -X PUT \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"status":"read"}' \
  http://localhost:5000/api/contact/CONTACT_ID

# Delete contact
curl -X DELETE \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  http://localhost:5000/api/contact/CONTACT_ID
```

### View All Reviews

**Frontend:**
- Go to `/reviews` (public page)
- All reviews are visible
- Click "Helpful" to mark reviews as helpful

**Backend API:**
```bash
# Get all reviews
curl http://localhost:5000/api/reviews

# Get reviews for specific product
curl http://localhost:5000/api/reviews/product/PRODUCT_ID
```

---

## Database Schema

### Contact Collection

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String, // "new", "read", "resolved"
  createdAt: Date,
  updatedAt: Date
}
```

### Review Collection

```javascript
{
  _id: ObjectId,
  productId: ObjectId,
  userId: ObjectId,
  userName: String,
  userEmail: String,
  rating: Number, // 1-5
  title: String,
  message: String,
  verified: Boolean,
  helpful: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Troubleshooting

### Issue: Contact form not submitting

**Solution:**
1. Check browser console for errors (F12)
2. Verify backend is running on port 5000
3. Check network tab to see API request
4. Verify `/api/contact` route is registered

**Debug:**
```bash
# Test backend health
curl http://localhost:5000/api/health

# Test contact endpoint
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","subject":"Test","message":"Test"}' \
  http://localhost:5000/api/contact
```

### Issue: Reviews page not loading

**Solution:**
1. Clear browser cache
2. Restart frontend server
3. Check if `/reviews` route is in Router.jsx
4. Verify Reviews.jsx component exists

### Issue: Can't submit review without login

**Expected Behavior:**
- Reviews require login
- Non-logged-in users see "Please login to submit a review" message
- This is intentional for data integrity

**To Test:**
1. Logout from your account
2. Try to submit review
3. Should see login prompt

### Issue: MongoDB connection error

**Solution:**
1. Verify MongoDB URI in `.env` file
2. Check internet connection
3. Verify MongoDB Atlas cluster is active
4. Check IP whitelist in MongoDB Atlas

---

## API Testing with Postman

### Contact Form Endpoints

**Create Contact (Public)**
```
POST http://localhost:5000/api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "subject": "Product Inquiry",
  "message": "I have a question about your products"
}
```

**Get All Contacts (Admin)**
```
GET http://localhost:5000/api/contact
Authorization: Bearer YOUR_ADMIN_TOKEN
```

**Update Contact (Admin)**
```
PUT http://localhost:5000/api/contact/CONTACT_ID
Authorization: Bearer YOUR_ADMIN_TOKEN
Content-Type: application/json

{
  "status": "read"
}
```

### Review Endpoints

**Get All Reviews (Public)**
```
GET http://localhost:5000/api/reviews
```

**Get Product Reviews (Public)**
```
GET http://localhost:5000/api/reviews/product/PRODUCT_ID
```

**Create Review (Protected)**
```
POST http://localhost:5000/api/reviews
Authorization: Bearer YOUR_USER_TOKEN
Content-Type: application/json

{
  "productId": "PRODUCT_ID",
  "rating": 5,
  "title": "Great Product!",
  "message": "Excellent quality and fast delivery"
}
```

**Mark Helpful (Public)**
```
PUT http://localhost:5000/api/reviews/REVIEW_ID/helpful
```

---

## Environment Variables

No new environment variables needed. Uses existing:
- `MONGODB_URI` - MongoDB connection
- `JWT_SECRET` - JWT authentication
- `PORT` - Backend port

---

## File Structure

```
server/
├── src/
│   ├── models/
│   │   ├── Contact.js (NEW)
│   │   └── Review.js (NEW)
│   ├── controllers/
│   │   ├── contactController.js (NEW)
│   │   └── reviewController.js (NEW)
│   ├── routes/
│   │   ├── contact.js (NEW)
│   │   └── reviews.js (NEW)
│   └── app.js (UPDATED)

client/
├── src/
│   ├── pages/
│   │   ├── Contact.jsx (NEW)
│   │   └── Reviews.jsx (NEW)
│   ├── router/
│   │   └── Router.jsx (UPDATED)
│   └── components/
│       └── Footer.jsx (UPDATED)
```

---

## Verification Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000
- [ ] MongoDB connection working
- [ ] Contact form page loads at `/contact`
- [ ] Reviews page loads at `/reviews`
- [ ] Contact form submits successfully
- [ ] Contact data saved to MongoDB
- [ ] Can submit review when logged in
- [ ] Review appears in list
- [ ] Review data saved to MongoDB
- [ ] Footer links work
- [ ] Toast notifications appear
- [ ] Mobile responsive

---

## Common Commands

**Check MongoDB Collections:**
```bash
# Connect to MongoDB
mongosh "mongodb+srv://user:pass@cluster.mongodb.net/db"

# View contacts
db.contacts.find()

# View reviews
db.reviews.find()

# Count documents
db.contacts.countDocuments()
db.reviews.countDocuments()
```

**Clear Collections (if needed):**
```bash
db.contacts.deleteMany({})
db.reviews.deleteMany({})
```

---

## Next Steps

1. Test all features thoroughly
2. Verify data is saving to MongoDB
3. Check mobile responsiveness
4. Test admin endpoints
5. Create test data for reviews
6. Verify email notifications (if implemented)

---

## Support

If you encounter any issues:

1. Check browser console (F12)
2. Check backend logs
3. Verify MongoDB connection
4. Check API endpoints with Postman
5. Review error messages in toast notifications

---

**All features are ready to use!** 🚀
