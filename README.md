# Restaurant Management System 🍽️

Backend API to manage restaurant menu, orders, and items using **Node.js + Express + MongoDB**.

## 🚀 Features
- Create & manage menu items  
- Place orders  
- Calculate total price  
- Populate menu items inside orders  
- Update/delete items  
- RESTful API  

## 🛠 Tech Stack
- Node.js  
- Express.js  
- MongoDB  

## 📌 API Endpoints

### Menu
- GET /menu  
- POST /menu  
- PUT /menu/:id  

### Orders
- POST /orders  
- GET /orders  
- GET /orders/:id (with populate)

---

## ▶ Run the Project

```
npm install
npm start
```

`.env`:
```
MONGO_URI=your_mongo_url
```

---

## 📁 Folder Structure
```
/models
/controllers
/routes
server.js
```

---

## 📝 License
Free to use.
