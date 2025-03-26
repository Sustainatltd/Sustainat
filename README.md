# 🌱 Sustainat

**Sustainat** is a full-stack web application designed to empower users with job tracking and application features—built with sustainability and global collaboration in mind.

---

## 🚀 Project Overview

Sustainat is a modern MERN-based (MongoDB, Express, React, Node.js) application with Kubernetes-native deployment, CI/CD automation, and observability features. This architecture supports developers collaborating from around the world via Docker and GitHub.

---

## 🛠 Tech Stack

### 🔹 Frontend
- React (Vite)
- Dockerized and deployed via Kubernetes (Minikube)
- Served using **NGINX**

### 🔹 Backend
- Node.js + Express
- MongoDB with Mongoose ORM
- Prometheus metrics exposed at `/metrics`

### 🔹 Infrastructure
- Kubernetes (Minikube)
- GitHub Actions for CI/CD
- Docker Hub for container registry

### 🔹 Monitoring & Observability
- Prometheus (metrics scraping)
- Grafana (visual dashboards for backend metrics)

---

## 📦 Project Structure

```bash
Sustainat-project/
├── .github/workflows/           # GitHub Actions for CI/CD
├── client/                      # React frontend
│   └── Dockerfile               # Builds and serves frontend
├── server/                      # Node.js backend
│   └── Dockerfile               # Exposes REST API + Prometheus metrics
├── k8s/                         # Kubernetes manifests
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   ├── monitoring/
│   │   ├── prometheus.yaml
│   │   └── grafana.yaml
├── docker-compose.yml          # For local development (optional)
└── .gitignore
