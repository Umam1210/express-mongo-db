# 📚 Express MongoDB Library API

Aplikasi RESTful API berbasis **Express.js** dan **MongoDB** untuk sistem **perpustakaan digital**. User dapat **mendaftar**, **login**, dan **mengelola koleksi buku pribadi**.

---

## 💻 Persyaratan Sistem

- Node.js (disarankan versi terbaru)
- npm
- MongoDB (lokal atau remote)

---

## 📦 Instalasi

### 1. Clone Repositori

```bash
git clone https://github.com/Umam1210/express-mongo-db.git
cd express-mongo-db
```

### 2. Install Dependency

```bash
npm install
```

## ⚙️ Menjalankan MongoDB

### 🔹 Linux

```bash
sudo systemctl start mongod
```

### 🔹 Windows

Buka Command Prompt:

```bash
net start MongoDB
```

Atau buka dari **MongoDB Compass**/**Services** jika Anda menginstalnya dengan GUI.

---

## 🏁 Menjalankan Aplikasi

```bash
node index.js
```

Jika Anda telah menginstall nodemon, jalankan:

```bash
nodemon
```

Aplikasi akan berjalan di:

👉 `http://localhost:3000`

---

## 🧪 Menjalankan Unit Test

```bash
npm test
```

---

## 📘 Dokumentasi API (Swagger)

Swagger UI tersedia di:

👉 `http://localhost:3000/api-docs`

---
