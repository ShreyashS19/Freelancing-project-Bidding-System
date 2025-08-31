# Freelancing Project Bidding System

## 📌 Introduction

The **Freelancing Project Bidding System** is a full-stack web application designed to connect freelancers and clients. Clients can post projects, and freelancers can place bids, enabling smooth collaboration and efficient hiring. The platform includes authentication, project management, bidding features, and a responsive UI.

This project is built with:

* **Backend:** Node.js, Express.js, MongoDB
* **Frontend:** React (Vite) + TypeScript + Tailwind CSS

---

## 📂 Table of Contents

1. [Features](#-features)
2. [Project Structure](#-project-structure)
3. [Installation](#-installation)

   * [Backend Setup](#backend-setup)
   * [Frontend Setup](#frontend-setup)
4. [Environment Variables](#-environment-variables)
5. [Usage](#-usage)
6. [Troubleshooting](#-troubleshooting)
7. [Contributors](#-contributors)
8. [License](#-license)

---

## ✨ Features

* 🔑 User authentication & authorization
* 📋 Project posting by clients
* 💰 Freelancers can place bids on projects
* 📊 Project and bid management system
* 🎨 Responsive UI with Tailwind CSS
* ⚡ Fast frontend bundling with Vite
* 🌐 RESTful API with Express.js

---

## 📂 Project Structure

```
Freelancing-project-Bidding-System/
│── backend/         # Node.js + Express + MongoDB
│   ├── models/      # Mongoose models
│   ├── routes/      # API routes
│   ├── middleware/  # Authentication & other middleware
│   ├── server.js    # Entry point
│   └── package.json
│
│── frontend/        # React + Vite + Tailwind CSS
│   ├── src/         # React components & pages
│   ├── index.html   # Root HTML file
│   ├── vite.config.ts
│   └── package.json
```

---

## ⚙️ Installation

### **Backend Setup**

1. Navigate to backend folder:

   ```bash
   cd backend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/freelanceDB
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:

   ```bash
   npm start
   ```

   or for development:

   ```bash
   npm run dev
   ```

---

### **Frontend Setup**

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the frontend development server:

   ```bash
   npm run dev
   ```
4. Open browser at [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## 🔧 Environment Variables

The backend requires a `.env` file with:

| Variable     | Description                       |
| ------------ | --------------------------------- |
| `PORT`       | Server running port (e.g., 5000)  |
| `MONGO_URI`  | MongoDB connection string         |
| `JWT_SECRET` | Secret key for JWT authentication |

---

## 🚀 Usage

1. Start **backend** server (`npm run dev` in `/backend`)
2. Start **frontend** server (`npm run dev` in `/frontend`)
3. Register as a new user (client or freelancer)
4. Clients can **post projects**
5. Freelancers can **browse projects & place bids**

---

## 🐞 Troubleshooting

* If MongoDB is not running, start it with:

  ```bash
  mongod
  ```
* If `npm run dev` fails, try deleting `node_modules` and `package-lock.json`, then reinstall:

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
* Ensure `.env` variables are correctly set.

---

## 👥 Contributors

* [ShreyashS19](https://github.com/ShreyashS19)

---

## 📜 License

This project is licensed under the **MIT License**.

