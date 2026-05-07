# Stage 1 — Build the React app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY client/package*.json ./

# Install exact locked dependencies (same as CI)
RUN npm ci

# Copy source and build production bundle
COPY client/ .
RUN npm run build

# Stage 2 — Serve with nginx (minimal production image)
FROM nginx:alpine

# Remove nginx default page
RUN rm -rf /usr/share/nginx/html/*

# Copy compiled React build from stage 1
COPY --from=builder /app/build /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
