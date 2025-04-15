# 🏪 Roxiler Store Rating App

This is a full-stack web application where users can rate stores, store owners can view ratings for their stores, and admins can manage users and stores. Built with **React**, **Node.js**, **Express**, **PostgreSQL**, and **Sequelize**.

---

## 🚀 Features

- Role-based dashboards:
  - **Admin**: Add/view users and stores, view ratings.
  - **User**: View and rate stores.
  - **Store Owner**: View ratings submitted by users.
- JWT-based authentication.
- PostgreSQL database integration.
- Minimal, clean, responsive UI.

---

## 🛠 Tech Stack

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL, Sequelize ORM
- **Authentication**: JWT (JSON Web Token)

---

## ⚙️ Prerequisites

- Node.js & npm
- PostgreSQL
- Git

---

## 📥 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/roxiler-store-rating-app.git
cd roxiler-store-rating-app
```

---

### 2. Setup the Backend

```bash
cd backend
npm install
```

#### 📄 Create a `.env` file:

Create a file named `.env` inside the `backend` folder and paste the following:

```env
DB_URL=postgres://your_username:your_password@localhost:5432/your_db_name
JWT_SECRET=your_secret_key
PORT=5000

# Default admin credentials
DEFAULT_ADMIN_EMAIL=admin@example.com
DEFAULT_ADMIN_PASSWORD=admin@123
```

> ⚠️ Replace the values accordingly.

#### ✅ Start the Backend Server

```bash
npm start
```

> This will also automatically create an admin user (only if no admin exists already) with the credentials provided in `.env`.

---

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
```

#### 🚀 Start the React App

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

---

## 👤 Default Admin Credentials

These will be created automatically if no admin exists in the database:

```
Email: admin@example.com
Password: admin123
```

---

## 📝 Notes

- Make sure PostgreSQL is running and the database mentioned in `.env` exists.
- You can create the database manually using pgAdmin or:

```sql
CREATE DATABASE your_db_name;
```

---

## 🧑‍💻 Author

**Rahul Santhosh**