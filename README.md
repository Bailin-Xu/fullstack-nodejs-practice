# Full Stack Open – Part 3 Practice Projects  

### 📚 Node.js, Express, and REST API Integration

This repository contains two small full-stack applications built during **Part 3 of the Full Stack Open course**.  
The focus of this part is to connect a React frontend with a Node.js + Express backend, use RESTful routes, and finally deploy the combined app online.

---

## 📁 Projects Included

### 1️⃣ Notes App (Part 3A)

A simple note-taking app that demonstrates:

- Express backend with REST API routes (`GET`, `POST`, `DELETE`)
- JSON-based data handling
- Morgan middleware for logging HTTP requests
- Serving static files via Express (`app.use(express.static('dist'))`)
- Frontend built using React and fetched from the backend
- Local testing and full CRUD functionality

**Key files:**

```
backend/
├── index.js
├── package.json
└── dist/   ← built React frontend (Notes)
```

**Example request log (Morgan custom token):**

```
POST /api/notes 201 48 - 13.680 ms {"content":"new note","important":true}
```

---

### 2️⃣ Phonebook App (Part 3B)

A complete CRUD phonebook that integrates frontend + backend.

**Features:**

- Add, delete, and list persons with their phone numbers
- Form validation: reject missing or duplicate names
- Custom logging with `morgan.token('body', JSON.stringify(req.body))`
- Full-stack integration: React frontend served by Node backend
- Deployed on Render (see live link below)

**Backend routes:**

| Method | Endpoint           | Description                               |
| :----- | :----------------- | :---------------------------------------- |
| GET    | `/api/persons`     | Return all contacts                       |
| GET    | `/api/persons/:id` | Get one contact by ID                     |
| POST   | `/api/persons`     | Add a new contact                         |
| DELETE | `/api/persons/:id` | Delete a contact                          |
| PUT    | `/api/persons/:id` | Update contact info (for later exercises) |

**Frontend build served via Express:**

```js
app.use(express.static('dist'))
```

**Deployed app:**  
🌐 [https://fullstack-nodejs-practice.onrender.com](https://fullstack-nodejs-practice.onrender.com)

---

## 🧠 Learned Concepts

- Express middleware (`express.json()`, `morgan`, custom tokens)
- Conditional rendering & async data fetching with React
- REST API design and JSON responses
- Connecting frontend and backend (CORS & proxy)
- Serving a React build from an Express server
- Deploying full stack apps on **Render**
- Using environment variables safely (`VITE_` prefix for frontend)

---

## 🧩 Deployment Instructions

### 🔹 Development (local)

```bash
# Start backend
npm run dev

# Start frontend (separate terminal)
npm run dev
```

Frontend runs on `localhost:5173` and connects to backend via proxy.

---

### 🔹 Production build

```bash
# From frontend project
npm run build
# Copy dist folder to backend root
cp -r dist ../backend/
```

### 🔹 Deploy to Render

- Connect GitHub repo to Render
- Set build command:  
  `npm install && npm run build`
- Set start command:  
  `node index.js`
- Add environment variable (if any)
- Deploy and monitor logs

---

## 👨‍💻 Author

**Bailin Xu**  
Concordia University, Montréal  
Full Stack Open 2025 – Part 3 Practice  
