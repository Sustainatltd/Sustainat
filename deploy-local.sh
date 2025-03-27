#!/bin/bash

# 🛡️ Safe shell setting: Exit if any command fails
set -e

echo "🚀 Deploying to Minikube Kubernetes Cluster (Namespace: sustainat)..."

# 🐳 Apply backend resources
kubectl apply -f k8s/backend-deployment.yaml -n sustainat
kubectl apply -f k8s/backend-service.yaml -n sustainat

# 🎨 Apply frontend resources
kubectl apply -f k8s/frontend-deployment.yaml -n sustainat
kubectl apply -f k8s/frontend-service.yaml -n sustainat

echo "✅ All resources applied successfully!"
echo "🌐 To access the app, run: minikube service sustainat-frontend-service -n sustainat"
