# Menggunakan image node.js sebagai base image
FROM node:18

# Membuat direktori kerja di dalam container
WORKDIR /usr/src/app

# Mengkopi package.json dan package-lock.json ke direktori kerja di dalam container
COPY package*.json ./

# Menjalankan perintah untuk menginstall dependensi
RUN npm install

# Mengkopi semua file ke direktori kerja di dalam container
COPY . .

# Menjalankan aplikasi saat container dijalankan
CMD ["npm", "start"]
