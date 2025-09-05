# 💼 DealinTech Server

This is the backend service for **DealinTech**, built using **Node.js**, **Express**, and **MongoDB**. The architecture follows modular design patterns using modern JavaScript (ESM + OOP), with a focus on scalability and maintainability.

---

## 🚀 Features

* ✅ RESTful API with Express
* ✅ MongoDB integration with Mongoose
* ✅ DTO validation using Joi
* ✅ Logger (Winston + Morgan)
* ✅ Centralized error handling
* ✅ Service/Controller architecture
* ✅ Environment-based configuration
* ✅ Scalable project structure
* ✅ Clean and modern JavaScript (OOP + ES Modules)

---

## 📁 Project Structure

```
src/
├── app.js               # Express app setup
├── server.js            # Entry point
├── config/              # DB and environment configuration
├── constants/           # App-wide constants
├── controllers/         # Route handlers
├── dtos/                # Data Transfer Objects
├── logger/              # Winston + Morgan setup
├── middlewares/         # Error handler, logging, etc.
├── models/              # Mongoose models
├── routes/              # API route files
├── services/            # Business logic
├── utils/               # Utility functions
├── validators/          # Joi schemas
```

---

## ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v18+)
* [MongoDB](https://www.mongodb.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon) (for development)

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Dealin-Tech/dealintech.server.git
cd dealintech.server

# Install dependencies
npm install
```

---

## ⚙️ Environment Setup

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit the values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/dealintech_db
NODE_ENV=development
```

---

## 🧪 Running the Project

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

---

## 📬 API Example: Contact

### Endpoint

```
POST /api/contact
```

### Functionality

* Validate DTO input using Joi
* Store contact in MongoDB
* Log request and handle errors
* Send success response

### Layers Used

* Controller
* DTO
* Service
* Middleware
* Logger

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create your branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

---

## 🐛 Issues

To report bugs or request features, use the [issue tracker](https://github.com/Dealin-Tech/dealintech.server/issues).

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).

---

## 🌐 Links

* 🔗 [Project Homepage](https://github.com/Dealin-Tech/dealintech.server)
* 🐞 [Issue Tracker](https://github.com/Dealin-Tech/dealintech.server/issues)
