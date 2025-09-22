# 🚀 FraudGuard – Real-time Banking Transaction Monitoring System

FraudGuard is a **full-stack enterprise-grade banking application** that provides **secure transactions**, **real-time monitoring**, and **fraud detection**.  
It is designed with **React (frontend)**, **Spring Boot (backend)**, **Kafka (messaging)**, **MySQL (database)**, and **WebSockets (real-time updates)**.  

---

## ⚡ Features

- 🔐 **JWT Authentication** – Secure login & signup for Admin and Users.  
- 👨‍💻 **Admin Dashboard** – Monitor all transactions.  
- 👤 **User Dashboard** – View user’s personal transactions.  
- ⚡ **Real-time Updates** – WebSocket with STOMP for instant transaction notifications.  
- 🔎 **Fraud Detection Rules** – Suspicious transactions flagged via Kafka consumer.  
- 💾 **Persistence** – MySQL database for users & transactions.  
- 📨 **Event Streaming** – Kafka ensures reliable and scalable message processing.  

---

## 🛠️ Tech Stack

### Frontend (React)
- React + Redux Toolkit
- Tailwind CSS
- Axios
- SockJS + STOMP for WebSocket

### Backend (Spring Boot)
- Spring Boot (REST + WebSocket + Kafka)
- Spring Security (JWT Auth)
- JPA + Hibernate + MySQL

### Infrastructure
- Apache Kafka + Zookeeper
- MySQL Database
- Docker (optional for Kafka/Zookeeper setup)

---

## ▶️ Setup & Run

### 1️⃣ Clone the repo
```bash
git clone <repo-url>
cd FraudGuard
```

---

### 2️⃣ Backend Setup (Spring Boot)

1. Go to `fruadguard/`  
   ```bash
   cd fruadguard
   ```

2. Configure **application.yml** with your MySQL & Kafka details:
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/fraudguard
       username: root
       password: password
     jpa:
       hibernate:
         ddl-auto: update

   kafka:
     bootstrap-servers: localhost:9092
   ```

3. Run the backend:
   ```bash
   mvn spring-boot:run
   ```

---

### 3️⃣ Frontend Setup (React)

1. Go to `fraud-guard-client/`  
   ```bash
   cd fraud-guard-client
   ```

2. Install dependencies  
   ```bash
   npm install
   ```

3. Start React app  
   ```bash
   npm start
   ```

---

### 4️⃣ Kafka & Zookeeper Setup (via Docker)

```bash
docker-compose up -d
```

This will start **Kafka + Zookeeper**.

---

### 5️⃣ MySQL Setup

```sql
CREATE DATABASE fraudguard_db;
```

---

## 📡 API Endpoints

### Auth
- `POST /api/v1/auth/signup` → Register user  
- `POST /api/v1/auth/login` → Login & get JWT token  

### Transactions
- `POST /api/v1/transactions?username={username}` → Create transaction  
- `GET /api/v1/transactions/sender/{accountNumber}` → Get transactions by sender  
- `GET /api/v1/transactions/receiver/{accountNumber}` → Get transactions by receiver  

### WebSocket
- Connect: `ws://localhost:8080/ws`  
- Topic Subscription: `/topic/transactions/{username}`  

---

## 📸 Demo Screenshots

### 🔑 Login Page
![Login Screenshot](c:\Users\tusha\Pictures\Screenshots\Screenshot 2025-09-22 175338.png)


### 🏠 User Dashboard
![User Dashboard Screenshot](c:\Users\tusha\Pictures\Screenshots\Screenshot 2025-09-22 183404.png)

### 🛠️ Admin Dashboard
![Admin Dashboard Screenshot](c:\Users\tusha\Pictures\Screenshots\Screenshot 2025-09-22 175644.png)

---

## 🔒 Security

- JWT-based authentication  
- Role-based access control (Admin/User)  
- Transactions restricted per user  

---


