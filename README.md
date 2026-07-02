# 🎒 IITK Lost & Found Portal

A full-stack Lost & Found web application developed for the IIT Kanpur community. The platform enables students to securely report, search, and recover lost or found items using IITK email authentication.

---

## ✨ Features

- 🔐 IITK Email OTP Authentication
- 🛡️ JWT-based Authentication & Protected Routes
- 👤 User Profile Management
- 📌 Report Lost Items
- 📌 Report Found Items
- 🔍 Search Lost & Found Items
- 📋 My Posts Dashboard
- ✏️ Edit Profile
- 🗑️ Delete Reported Posts
- ✅ Mark Items as Returned
- 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

### Backend
- Node.js
- Express.js
- Firebase Firestore
- Firebase Admin SDK
- JWT Authentication
- Nodemailer (OTP Verification)

### Database
- Firebase Firestore

---

## 📂 Project Structure

```
iitk-lostAndfound/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/iitk-lostAndfound.git
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Environment Variables

Create a `.env` file inside the backend folder and configure:

```
JWT_SECRET=
EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Firebase Admin SDK credentials are also required.

---

## 📌 Current Features

- OTP Login
- JWT Authentication
- Protected Routes
- Dashboard
- Lost Items
- Found Items
- Search Functionality
- Report Item
- My Posts
- User Profile
- Delete Item
- Mark Returned
- Logout

---

## 🚧 Future Enhancements

- Image Upload
- Claim Request System
- Notifications
- Admin Dashboard
- AI-based Lost & Found Matching
- Email Notifications
- Advanced Filters

---

## 👨‍💻 Author

**Nikhil Prajapati**

B.Tech Civil Engineering, IIT Kanpur

GitHub: https://github.com/YOUR_USERNAME

---

⭐ If you find this project useful, consider giving it a star.