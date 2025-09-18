# Fase 1: Build dell'app Angular SSR
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


# Fase 2: Esecuzione SSR con Node.js
FROM node:alpine

# Imposta la working directory
WORKDIR /app

# Copia i file buildati da Angular
COPY --from=builder /app/dist/webapp /app/dist/webapp
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json ./

# Espone la porta
EXPOSE 4000

# Avvia l'app SSR con Node.js
CMD ["node", "dist/webapp/server/server.mjs"]
