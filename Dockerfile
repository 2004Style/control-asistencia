# Etapa 1: Construir la aplicación Angular
FROM node:20.11-alpine AS build
WORKDIR /app
COPY package*.json ./
# Instalar pnpm y luego las dependencias
RUN npm install -g pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:alpine
COPY --from=build /app/dist/control-asistencia/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
