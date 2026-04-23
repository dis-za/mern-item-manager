# 📦 MERN Item Manager — Lab Practice Guide

A full-stack MERN app with separate frontend and backend, ready to deploy on **Railway** (backend) and **Netlify** (frontend).

---

## 📁 Project Structure

```
mern-item-manager/
├── backend/
│   ├── models/Item.js       ← Mongoose schema
│   ├── routes/items.js      ← CRUD API routes
│   ├── server.js            ← Express app entry point
│   ├── .env.example         ← Copy to .env (never commit .env!)
│   └── package.json
└── frontend/
    ├── src/
    │   ├── api/items.js         ← All Axios API calls
    │   ├── components/
    │   │   ├── ItemForm.jsx     ← Add/Edit form
    │   │   └── ItemList.jsx     ← Display items
    │   ├── App.jsx              ← State management
    │   └── index.css
    ├── .env.example             ← Copy to .env
    └── package.json
```

---

## 🚀 STEP 1 — Run Locally

### Backend
```bash
cd backend
npm install
cp .env.example .env        # then edit .env with your MongoDB Atlas URI
npm run dev                 # runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
npm run dev                 # runs on http://localhost:5173
```

Test it works: open the frontend, add/edit/delete items — they should appear in MongoDB Atlas.

---

## 🍃 STEP 2 — MongoDB Atlas Setup

1. Go to https://cloud.mongodb.com → create a free cluster
2. **Database Access** → Add a user with read/write permissions
3. **Network Access** → Add IP `0.0.0.0/0` (allow all — needed for Railway)
4. **Connect** → "Connect your application" → copy the URI
5. Replace `<password>` with your actual password in the URI

---

## 🐙 STEP 3 — Push to GitHub

Push **backend** and **frontend** as **separate repositories** (or as one mono-repo — both work).

### Option A: Two repos (cleaner for deployment)
```bash
# Backend repo
cd backend
git init
git add .
git commit -m "Initial backend"
git remote add origin https://github.com/YOUR_USERNAME/item-manager-backend.git
git push -u origin main

# Frontend repo
cd ../frontend
git init
git add .
git commit -m "Initial frontend"
git remote add origin https://github.com/YOUR_USERNAME/item-manager-frontend.git
git push -u origin main
```

### Option B: One mono-repo
```bash
cd mern-item-manager   # root folder
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/mern-item-manager.git
git push -u origin main
```
> ⚠️ Make sure both `.gitignore` files exist so `node_modules/` and `.env` are NOT uploaded.

---

## 🚂 STEP 4 — Deploy Backend on Railway

1. Go to https://railway.app → sign in with GitHub
2. **New Project** → **Deploy from GitHub repo** → select your backend repo
   - If using mono-repo: set **Root Directory** to `backend`
3. **Variables** tab → add:
   ```
   MONGO_URI = your_mongodb_atlas_uri
   PORT = 5000
   ```
4. Railway auto-detects Node.js and runs `npm start`
5. After deploy, copy your Railway URL:
   ```
   https://your-app-name.up.railway.app
   ```
6. Test it: visit `https://your-app-name.up.railway.app` → should see `{"message":"Item Manager API is running ✅"}`

---

## 🌐 STEP 5 — Deploy Frontend on Netlify

1. **Update your frontend `.env`** with the Railway URL:
   ```
   VITE_API_URL=https://your-app-name.up.railway.app/api
   ```
2. Commit and push this change to GitHub
3. Go to https://netlify.com → **Add new site** → **Import from Git**
4. Select your frontend repo
   - If mono-repo: set **Base directory** to `frontend`
5. Build settings:
   ```
   Build command:  npm run build
   Publish directory: dist
   ```
6. **Environment variables** → add:
   ```
   VITE_API_URL = https://your-app-name.up.railway.app/api
   ```
7. Click **Deploy** — done! ✅

---

## 🧪 API Endpoints (for testing with Postman/Thunder Client)

| Method | URL                              | Body (JSON)                                    |
|--------|----------------------------------|------------------------------------------------|
| GET    | /api/items                       | —                                              |
| GET    | /api/items/:id                   | —                                              |
| POST   | /api/items                       | `{ name, description, quantity, price, category }` |
| PUT    | /api/items/:id                   | any fields to update                           |
| DELETE | /api/items/:id                   | —                                              |

---

## 🆕 How to Add a New Field (Lab Task)

The lab will ask you to add a new field. Here's how:

### 1. Backend — `backend/models/Item.js`
```js
// Add inside itemSchema:
supplier: {
  type: String,
  trim: true,
  default: "Unknown",
},
```

### 2. Frontend Form — `frontend/src/components/ItemForm.jsx`
```jsx
// Add to EMPTY_FORM:
const EMPTY_FORM = { name: "", ..., supplier: "" };

// Add inside <div className="form-grid">:
<label>
  Supplier
  <input name="supplier" value={form.supplier} onChange={handleChange} placeholder="e.g. ABC Supplies" />
</label>
```

### 3. Frontend List — `frontend/src/components/ItemList.jsx`
```jsx
// Add inside .item-meta:
<span>🏭 {item.supplier || "Unknown"}</span>
```

That's it — commit, push, and both Railway & Netlify will auto-redeploy!

---

## ✅ Lab Day Checklist

- [ ] MongoDB Atlas account + connection URI ready
- [ ] GitHub account ready, can create public repos
- [ ] Node.js installed locally (`node -v`, `npm -v`)
- [ ] Can run frontend: `npm run dev` → opens in browser
- [ ] Can run backend: `npm run dev` → API responds
- [ ] Know how to push to GitHub (git add, commit, push)
- [ ] Know where to add env variables in Railway
- [ ] Know where to add env variables in Netlify
- [ ] Arrive **10 minutes early** ⏰

---

## 🆘 Common Issues

| Problem | Fix |
|---------|-----|
| `CORS error` in browser | Check `cors()` is in server.js before routes |
| `Cannot connect to MongoDB` | Check MONGO_URI in .env, whitelist IP in Atlas |
| Netlify shows blank page | Check browser console; ensure `VITE_API_URL` env var is set |
| Railway deploy fails | Check `start` script in package.json is `node server.js` |
| Items not loading after deploy | Make sure Netlify `VITE_API_URL` points to Railway URL |
