# 🍔 Food Delivery Web Application

> Designed specifically for a **single restaurant** — full-stack, responsive, and feature-rich.

---

## 📦 Overview

This project is a complete food delivery system with three main components:

### 1. **Frontend (Customer App)**

A customer-facing React application where users can:

- Browse food items by category
- Search for specific dishes
- Add items to cart
- Place orders (Cash on Delivery or Stripe)
- Track order status
- View order history

### 2. **Admin Panel**

A separate React application for restaurant administrators to:

- Add new food items
- List and manage existing items
- Process and update order statuses

### 3. **Backend (API Server)**

A Node.js/Express server that:

- Handles authentication and user management
- Processes orders and payments via Stripe
- Manages the food catalog
- Tracks order statuses

---

## 🛠️ Technology Stack

### Frontend
- React.js (with Vite)
- React Router DOM
- Axios
- React Toastify
- Stripe integration

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- JWT for authentication
- Stripe API

### Admin Panel
- React.js (same stack as frontend)

---

## ✨ Key Features

### Customer Frontend
- User authentication (Login/Signup)
- Interactive food menu with category filtering
- Search functionality
- Shopping cart with local and server sync
- Address-based order placement
- Payment options:
  - 💵 Cash on Delivery
  - 💳 Credit/Debit via Stripe
- Order tracking and history
- Responsive design (mobile-friendly)

### Admin Panel
- Food inventory management
- Image upload for food items
- Order dashboard for real-time management
- Status updates (Processing → Out for Delivery → Delivered)
- Category management

### Backend
- RESTful API for users, food, cart, and orders
- JWT-based user authentication
- Stripe payment processing
- File uploads for images

---

## 🚀 Summary

This full-stack food delivery system provides a complete solution for restaurants or food delivery services — with both customer and admin interfaces, all connected through a robust, secure backend API.
