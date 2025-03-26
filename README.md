# ♻️ Sustainat

> **Empowering sustainable careers & conscious hiring.**  
> A full-stack web application that connects eco-conscious job seekers with green companies.

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Docker & Kubernetes Setup](#docker--kubernetes-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Monitoring (Prometheus & Grafana)](#monitoring-prometheus--grafana)
- [Setup Instructions](#setup-instructions)
- [Screenshots](#screenshots)
- [Authors](#authors)

---

## 📖 About the Project

**Sustainat** is a sustainability-focused job board and recruitment platform built with the mission to support climate-positive careers. It streamlines job applications, company tracking, and analytics for both candidates and employers in the green tech space.

---

## ✨ Features

- 🔐 User Authentication (JWT-based)
- 📄 Job Posting & Application Tracking
- 📊 Dashboard to track company applications
- 🔍 CSV export of job applications
- 🐳 Dockerized frontend and backend
- ☸️ Deployed on Kubernetes via Minikube
- 📈 Metrics via Prometheus
- 📊 Visualization via Grafana
- ⚙️ CI/CD automation using GitHub Actions

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)

### DevOps & Monitoring
- Docker & Docker Hub
- Kubernetes (Minikube)
- Prometheus
- Grafana
- GitHub Actions

---

## 🏗️ Architecture

```bash
📦 Sustainat-project
├── client               # React frontend
├── server               # Node.js backend with MongoDB
├── k8s                  # Kubernetes manifests
│   ├── frontend-deployment.yaml
│   ├── backend-deployment.yaml
│   └── monitoring/
│       ├── prometheus.yaml
│       └── grafana.yaml
├── .github/workflows    # GitHub Actions CI/CD
│   └── docker-publish.yml
├── docker-compose.yml   # For local development (optional)
└── README.md
