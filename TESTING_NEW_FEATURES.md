# 🧪 Testing Guide - New Features

## Quick Test Checklist

### 1. FAQ Page Test
**URL**: `http://localhost:3000/faq`

- [ ] Page loads without errors
- [ ] Header displays "Frequently Asked Questions"
- [ ] All 8 questions visible
- [ ] Click question to expand answer
- [ ] Click again to collapse
- [ ] Chevron icon rotates
- [ ] WhatsApp button at bottom works
- [ ] Mobile responsive (test on 375px width)

**Expected**: Smooth accordion with all questions expandable

---

### 2. Shipping Page Test
**URL**: `http://localhost:3000/shipping`

- [ ] Page loads with gradient header
- [ ] 4 shipping option cards visible
- [ ] Shipping charges table displays correctly
- [ ] Table shows all 3 price ranges
- [ ] Delivery process shows 4 steps
- [ ] City list shows 12+ cities
- [ ] All links functional
- [ ] Mobile responsive

**Expected**: Professional shipping information page

---

### 3. Privacy Policy Test
**URL**: `http://localhost:3000/privacy`

- [ ] Page loads correctly
- [ ] All sections visible
- [ ] Shield icon displays
- [ ] Information collection section complete
- [ ] Data security section with lock icon
- [ ] Contact section at bottom
- [ ] Email and phone visible
- [ ] Mobile responsive

**Expected**: Complete privacy policy with all sections

---

### 4. Terms & Conditions Test
**URL**: `http://localhost:3000/terms`

- [ ] Page loads without errors
- [ ] All sections display
- [ ] FileText icon visible
- [ ] Return policy section complete
- [ ] Warranty information present
- [ ] User conduct guidelines visible
- [ ] Contact section at bottom
- [ ] Mobile responsive

**Expected**: Complete terms with all legal information

---

### 5. About Us Page Test
**URL**: `http://localhost:3000/about`

- [ ] Page loads correctly
- [ ] Statistics display (50K+, 1000+, 24/7, 100%)
- [ ] Company story section readable
- [ ] 4 core values cards visible
- [ ] "Why Choose Us" section shows 6 reasons
- [ ] Team member cards display (3 members)
- [ ] Contact information visible
- [ ] Mobile responsive

**Expected**: Professional about page with company info

---

### 6. Admin Categories Test
**URL**: `http://localhost:3000/admin/categories` (Must be logged in as admin)

#### Add Category
- [ ] Click "Add Category" button
- [ ] Form appears
- [ ] Fill in category name (e.g., "Laptops")
- [ ] Fill in description
- [ ] Enter image URL
- [ ] Click "Create Category"
- [ ] Toast notification appears
- [ ] New category appears in grid

#### Edit Category
- [ ] Click edit button on any category
- [ ] Form shows "Edit Category" title
- [ ] Fields populate with category data
- [ ] Modify values
- [ ] Click "Update Category"
- [ ] Toast notification appears
- [ ] Changes reflect in grid

#### Delete Category
- [ ] Click delete button
- [ ] Confirmation dialog appears
- [ ] Click confirm
- [ ] Toast notification appears
- [ ] Category removed from grid

**Expected**: Full CRUD functionality for categories

---

### 7. Admin Products Edit Test
**URL**: `http://localhost:3000/admin/products` (Must be logged in as admin)

#### Edit Product
- [ ] Click edit icon (pencil) on any product
- [ ] Form appears with "Edit Product" title
- [ ] All product fields populated:
  - [ ] Name
  - [ ] Category (dropdown)
  - [ ] Description
  - [ ] Price
  - [ ] Stock
  - [ ] Image URL
- [ ] Modify any field (e.g., change price)
- [ ] Click "Update Product" button
- [ ] Toast notification: "Product updated successfully!"
- [ ] Form closes
- [ ] Product table updates with new values

#### Add Product (Still Works)
- [ ] Click "Add Product" button
- [ ] Form shows "Add New Product" title
- [ ] Fill in all fields
- [ ] Click "Add Product" button
- [ ] Toast notification: "Product added successfully!"
- [ ] New product appears in table

#### Cancel Edit
- [ ] Click edit on a product
- [ ] Click "Cancel Edit" button
- [ ] Form closes
- [ ] Fields reset

**Expected**: Full edit functionality working smoothly

---

### 8. Footer Links Test
**From any page**: Check footer

- [ ] "About" link → `/about`
- [ ] "FAQ" link → `/faq`
- [ ] "Shipping" link → `/shipping`
- [ ] "Privacy Policy" link → `/privacy`
- [ ] "Terms & Conditions" link → `/terms`
- [ ] "Contact Us" link → WhatsApp
- [ ] All links work correctly

**Expected**: All footer links navigate correctly

---

### 9. Mobile Responsiveness Test

**Test on mobile (375px width)**:
- [ ] FAQ page - questions readable
- [ ] Shipping page - cards stack vertically
- [ ] Privacy page - text readable
- [ ] Terms page - sections clear
- [ ] About page - stats visible
- [ ] Admin categories - form responsive
- [ ] Admin products - table scrollable

**Expected**: All pages responsive and mobile-friendly

---

### 10. Form Validation Test

**Admin Categories**:
- [ ] Try submitting empty form
- [ ] Category name required validation works
- [ ] Submit with valid data works

**Admin Products Edit**:
- [ ] Edit product with valid data
- [ ] Update successful
- [ ] Toast notification appears

**Expected**: All validations working correctly

---

## Performance Checklist

- [ ] Pages load quickly (< 2 seconds)
- [ ] No console errors
- [ ] No console warnings (except Tailwind)
- [ ] Images load properly
- [ ] Animations smooth
- [ ] No lag on interactions

---

## Browser Compatibility Test

Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

**Expected**: All pages work on all browsers

---

## Accessibility Test

- [ ] All text readable
- [ ] Color contrast sufficient
- [ ] Buttons clickable
- [ ] Forms usable with keyboard
- [ ] Links have hover states

**Expected**: Good accessibility

---

## Error Handling Test

- [ ] Try accessing `/admin/categories` without login
- [ ] Should redirect to home or login
- [ ] Try accessing `/admin/products` as regular user
- [ ] Should redirect (not admin)

**Expected**: Proper access control

---

## Integration Test

**Complete User Flow**:
1. [ ] Go to home page
2. [ ] Click "About" in footer → `/about`
3. [ ] Click "FAQ" in footer → `/faq`
4. [ ] Click "Shipping" in footer → `/shipping`
5. [ ] Click "Privacy Policy" in footer → `/privacy`
6. [ ] Click "Terms & Conditions" in footer → `/terms`
7. [ ] Login as admin
8. [ ] Go to `/admin`
9. [ ] Click "Manage Categories"
10. [ ] Add a test category
11. [ ] Go to `/admin/products`
12. [ ] Edit a product
13. [ ] Verify changes

**Expected**: All features work together seamlessly

---

## Test Results Template

```
Date: ___________
Tester: ___________
Browser: ___________
Device: ___________

FAQ Page: ✓ / ✗
Shipping Page: ✓ / ✗
Privacy Page: ✓ / ✗
Terms Page: ✓ / ✗
About Page: ✓ / ✗
Admin Categories: ✓ / ✗
Admin Products Edit: ✓ / ✗
Footer Links: ✓ / ✗
Mobile Responsive: ✓ / ✗
Form Validation: ✓ / ✗

Issues Found:
1. ___________
2. ___________
3. ___________

Overall Status: ✓ PASS / ✗ FAIL
```

---

## Common Issues & Solutions

### Issue: Edit button doesn't work
**Solution**: Clear browser cache, refresh page

### Issue: Form doesn't submit
**Solution**: Check console for errors, verify all required fields filled

### Issue: Page not found
**Solution**: Verify routes in Router.jsx, restart dev server

### Issue: Mobile layout broken
**Solution**: Check Tailwind responsive classes, test on actual device

### Issue: Admin pages not accessible
**Solution**: Verify user is logged in as admin, check role in database

---

## Quick Debug Commands

**Check if backend is running**:
```bash
curl http://localhost:5000/api/products
```

**Check if frontend is running**:
```bash
curl http://localhost:3000
```

**View browser console**:
- Press F12 or Ctrl+Shift+I
- Check Console tab for errors

**Check network requests**:
- Open DevTools
- Go to Network tab
- Perform action
- Check for failed requests

---

**Happy Testing! 🚀**
