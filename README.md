# 🌱 Sustainat

> A full-stack job application platform focused on sustainability 🌍  
> Built with ❤️ by **Sumanth Moparthi** and **ChatGPT (OpenAI)**  
> 📅 Last updated: 2025-03-26

---

## 📌 Overview

**Sustainat** is a scalable full-stack application that allows users to register, post, and manage job applications related to sustainability careers. It is built using the **MERN stack**, containerized with **Docker**, orchestrated with **Kubernetes**, and monitored using **Prometheus & Grafana**.

---

## 🚀 Features

- 🔐 User Authentication (JWT-based)
- 📋 Job posting and application tracking
- 📁 CSV export of applications
- ⚙️ Fully containerized (Docker)
- ☸️ Deployed with Kubernetes (Minikube)
- 📈 Monitored with Prometheus and Grafana
- 🌐 CI/CD automated using GitHub Actions

---

## 🧰 Tech Stack

| Layer        | Technology                     |
| ------------ | ------------------------------ |
| Frontend     | React.js, Axios, NGINX         |
| Backend      | Node.js, Express, MongoDB      |
| Database     | MongoDB Atlas                  |
| Auth         | JWT, Bcrypt                    |
| DevOps       | Docker, Kubernetes (Minikube)  |
| Monitoring   | Prometheus, Grafana            |
| CI/CD        | GitHub Actions + Docker Hub    |

---

## 📦 Project Structure

```bash
Sustainat-project/
├── client/                     # React frontend
├── server/                     # Node.js backend with Express & MongoDB
├── k8s/                        # Kubernetes deployment & services
│   ├── monitoring/             # Prometheus & Grafana configs
├── .github/workflows/         # GitHub Actions workflow for CI/CD
├── .env.example                # Sample environment file
└── README.md                   # You’re reading it!
