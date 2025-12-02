# AK Mobiles - Deployment Guide

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] All features tested locally
- [ ] No console errors or warnings
- [ ] Environment variables configured
- [ ] Database backups created
- [ ] Code committed to Git
- [ ] README and documentation updated

### Backend Deployment

#### Option 1: Deploy to Heroku

**Prerequisites:**
- Heroku account
- Heroku CLI installed

**Steps:**

1. **Login to Heroku**
```bash
heroku login
```

2. **Create Heroku App**
```bash
cd server
heroku create ak-mobiles-api
```

3. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set NODE_ENV=production
```

4. **Deploy**
```bash
git push heroku main
```

5. **View Logs**
```bash
heroku logs --tail
```

#### Option 2: Deploy to Railway

**Prerequisites:**
- Railway account
- Railway CLI installed

**Steps:**

1. **Connect Repository**
   - Go to railway.app
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your repository

2. **Configure Environment**
   - Add environment variables in Railway dashboard
   - MONGODB_URI
   - JWT_SECRET
   - NODE_ENV=production

3. **Deploy**
   - Railway automatically deploys on push

#### Option 3: Deploy to AWS EC2

**Prerequisites:**
- AWS account
- EC2 instance running Ubuntu

**Steps:**

1. **SSH into Instance**
```bash
ssh -i your-key.pem ubuntu@your-instance-ip
```

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install nodejs npm git
```

3. **Clone Repository**
```bash
git clone your-repo-url
cd ak-mobiles/server
```

4. **Install and Setup**
```bash
npm install
echo "MONGODB_URI=..." > .env
echo "JWT_SECRET=..." >> .env
```

5. **Install PM2 (Process Manager)**
```bash
npm install -g pm2
pm2 start src/server.js --name "ak-mobiles-api"
pm2 save
```

6. **Setup Nginx Reverse Proxy**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/default
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Restart Nginx**
```bash
sudo systemctl restart nginx
```

### Frontend Deployment

#### Option 1: Deploy to Netlify

**Prerequisites:**
- Netlify account
- Netlify CLI installed

**Steps:**

1. **Build Project**
```bash
cd client
npm run build
```

2. **Deploy via CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

Or **Deploy via GitHub:**
1. Push code to GitHub
2. Go to netlify.com
3. Click "New site from Git"
4. Select GitHub repository
5. Set build command: `npm run build`
6. Set publish directory: `dist`
7. Click Deploy

#### Option 2: Deploy to Vercel

**Prerequisites:**
- Vercel account

**Steps:**

1. **Connect Repository**
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository

2. **Configure**
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Environment Variables**
   - Add `VITE_API_URL` pointing to your backend

4. **Deploy**
   - Vercel automatically deploys on push

#### Option 3: Deploy to GitHub Pages

**Steps:**

1. **Update vite.config.js**
```javascript
export default {
  base: '/ak-mobiles/',
  // ... rest of config
}
```

2. **Build**
```bash
npm run build
```

3. **Deploy**
```bash
npm install -g gh-pages
gh-pages -d dist
```

### Database Deployment

#### MongoDB Atlas (Already Configured)

Your MongoDB Atlas is already set up with:
- Cluster: ecommerce-mern
- Database: ecommerce_db
- User: dinesh57399_db_user

**Backup:**
```bash
# Export data
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/ecommerce_db"

# Import data
mongorestore --uri "mongodb+srv://user:pass@cluster.mongodb.net/ecommerce_db" dump/
```

## 🔧 Production Configuration

### Backend (.env Production)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/ecommerce_db
JWT_SECRET=use_a_very_strong_random_secret_key_here
PORT=5000
NODE_ENV=production
```

### Frontend (Environment)
```env
VITE_API_URL=https://your-backend-domain.com/api
```

## 📊 Performance Optimization

### Frontend
```bash
# Analyze bundle size
npm install -g webpack-bundle-analyzer

# Build with analysis
npm run build -- --analyze
```

### Backend
- Enable compression middleware
- Use Redis for caching
- Implement rate limiting
- Use CDN for static assets

## 🔒 Security Checklist

- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] JWT secrets are strong
- [ ] Database credentials secured
- [ ] Environment variables not in code
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Mongoose)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented
- [ ] Rate limiting configured

## 📈 Monitoring & Logging

### Backend Monitoring
```bash
# Install monitoring tools
npm install winston
npm install express-async-errors
```

### Frontend Monitoring
```bash
# Install error tracking
npm install @sentry/react
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install & Build Backend
        run: |
          cd server
          npm install
          npm run build
      
      - name: Install & Build Frontend
        run: |
          cd client
          npm install
          npm run build
      
      - name: Deploy to Heroku
        env:
          HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}
        run: |
          git push heroku main
```

## 📱 Domain Setup

### Custom Domain on Netlify
1. Go to Site Settings
2. Click "Domain Management"
3. Add custom domain
4. Update DNS records

### Custom Domain on Heroku
1. Add domain: `heroku domains:add www.yourdomain.com`
2. Update DNS CNAME to Heroku

## 🆘 Troubleshooting Deployment

### Backend Not Starting
```bash
# Check logs
heroku logs --tail

# Restart dyno
heroku restart
```

### Frontend Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Database Connection Error
- Verify MongoDB Atlas IP whitelist
- Check connection string
- Verify credentials

### CORS Errors
- Update CORS configuration in backend
- Check frontend API URL
- Verify headers

## 📊 Post-Deployment

### Testing
- [ ] Test all pages
- [ ] Test user authentication
- [ ] Test product operations
- [ ] Test cart and checkout
- [ ] Test admin panel
- [ ] Test on mobile devices

### Monitoring
- [ ] Setup error tracking
- [ ] Monitor API response times
- [ ] Check database performance
- [ ] Monitor server resources

### Maintenance
- [ ] Regular backups
- [ ] Update dependencies
- [ ] Monitor security
- [ ] Analyze user behavior

## 🎯 Performance Targets

- **Frontend Load Time**: < 3 seconds
- **API Response Time**: < 200ms
- **Database Query Time**: < 100ms
- **Lighthouse Score**: > 90

## 📞 Support & Help

For deployment issues:
1. Check logs
2. Review error messages
3. Consult documentation
4. Contact hosting provider support

## 🎉 Deployment Complete!

Once deployed:
1. Test all features
2. Monitor performance
3. Gather user feedback
4. Plan improvements

---

**Happy Deploying! 🚀**
