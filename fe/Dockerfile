# Fase 1: Build dell'app Angular
FROM node:alpine AS builder

# Imposta la working directory
WORKDIR /app

# Copia package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file del progetto
COPY . .

# Compila l'app Angular (produzione)
RUN npm run build -- --configuration=production


# Fase 2: Servire l'app con NGINX
FROM nginx:alpine

# Copia il file di configurazione personalizzato di NGINX (opzionale)
# COPY nginx.conf /etc/nginx/nginx.conf

# Rimuove i file di default
RUN rm -rf /usr/share/nginx/html/*

# Copia i file buildati da Angular
COPY --from=builder /app/dist/webapp /usr/share/nginx/html

# Espone la porta
EXPOSE 80

# Avvia NGINX
CMD ["nginx", "-g", "daemon off;"]
