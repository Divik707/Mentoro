# 🎓 CourseVerse

A modern, secure, and full-stack Course Selling Application built with **Node.js**, **TypeScript**, **Express**, **MongoDB**, and **Zod** for validation. This platform allows admins to upload and manage courses, and users to securely purchase and access them.

---

## 🚀 Features

- 🔐 JWT-based admin authentication (signup & login)
- ✅ Zod validation for input safety
- 🎓 Admin course upload functionality
- 📚 Users can browse all available courses
- 💳 Course purchase and purchase history tracking
- 🛡️ Middleware-protected routes for authorization
- 📁 Modular route and model structure

---

## 🧱 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (with Mongoose ODM)
- **Validation:** Zod
- **Authentication:** JWT + Bcrypt
- **Environment Management:** dotenv
- **Dev Tools:** Nodemon, ts-node, concurrently

---

## 📂 Project Structure

/src
├── routes/
│ ├── admin/
│ │ └── auth.ts
│ └── user/
│ └── courses.ts
├── lib/
│ └── verifyUser.ts
├── database/
│ └── db.ts
├── server.ts
└── .env

yaml
Copy
Edit

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Divik707/courseverse.git
cd my-app
2. Install Dependencies
bash
Copy
Edit
npm install
3. Create a .env File
env
Copy
Edit
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=3000
4. Run the Application
bash
Copy
Edit
npm run dev
🧪 API Endpoints
Admin Auth
Route	Method	Description
/admin/signup	POST	Signup a new admin
/admin/signin	POST	Login and get JWT token

Course Management
Route	Method	Description
/upload	POST	Upload a course (admin only)
/courses	GET	Get all courses
/courses/:id	GET	Get course by ID
/course/:id/purchase	POST	Purchase course (user only)
/purchases	GET	Get purchased courses for a user

🙋‍♂️ Author
Divik Saxena
Backend Developer | Full-Stack Enthusiast
LinkedIn | GitHub

📄 License
This project is open source and available under the MIT License.

---
