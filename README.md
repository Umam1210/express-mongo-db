# 📚 Express MongoDB Library API

Sebuah aplikasi API sederhana berbasis Express dan MongoDB untuk sistem **perpustakaan**, di mana user dapat mendaftar, login, dan mengelola koleksi bukunya sendiri.

## 📦 Instalasi

1. **Clone repositori**

```bash
git clone https://github.com/Umam1210/express-mongo-db.git
cd express
```

2. **Install dependencies**

```bash
npm install
```

3. **Jalankan MongoDB**
   Pastikan MongoDB berjalan secara lokal. Untuk Ubuntu:

```bash
sudo systemctl start mongod
```

---

## 🏁 Menjalankan Aplikasi

```bash
npm run dev
```

Akses di: `http://localhost:3000`

---

## 📘 Dokumentasi API (Swagger)

Swagger tersedia di:

```
http://localhost:3000/api-docs
```

---

## 🧪 Menjalankan Unit Test

```bash
npm test
```

---

## ✍️ Contoh Request

### Register

```http
POST /auth/register
Body: {
  "name": "John",
  "email": "john@mail.com",
  "password": "12345678"
}
```

### Login

```http
POST /auth/login
Body: {
  "email": "john@mail.com",
  "password": "12345678"
}
```

Gunakan token dari login sebagai Bearer Token di endpoint lain.

---
