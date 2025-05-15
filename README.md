# 📚 Express MongoDB Library API

Sebuah aplikasi API sederhana berbasis Express dan MongoDB untuk sistem **perpustakaan**, di mana user dapat mendaftar, login, dan mengelola koleksi bukunya sendiri.

---

## 🚀 Fitur Utama

- ✅ Register & Login dengan token JWT
- ✅ Menambahkan buku
- ✅ Melihat semua buku
- ✅ Melihat detail buku
- ✅ Mengupdate & menghapus buku milik sendiri
- ✅ Swagger UI untuk dokumentasi API
- ✅ Unit Test dengan Jest + Supertest
- ✅ Struktur kode mengikuti Domain-Driven Design (DDD)

---

## 📦 Instalasi

1. **Clone repositori**

```bash
git clone <link_repo_anda>
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

4. **Buat file `.env` (jika dibutuhkan)**

```env
PORT=3000
JWT_SECRET=SECRET
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

## 🗂️ Struktur Folder

```
src/
├── application/
│   └── useCases/
├── config/
├── domain/
│   ├── entities/
│   └── models/
├── infrastructure/
│   └── repositories/
├── interfaces/
│   ├── controllers/
│   ├── middlewares/
│   └── routes/
├── app/
│   └── setupApp.js
tests/
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

## 👨‍💻 Kontribusi

Silakan fork, pull request, atau diskusi jika ingin berkontribusi.

---

## 📄 Lisensi

MIT © 2025
