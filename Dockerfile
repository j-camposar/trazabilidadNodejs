FROM node:20-alpine

# Crear carpeta de trabajo
WORKDIR /app

# Instalar una versión estable de npm (evita el bug de idealTree)
RUN npm install -g npm@10.8.2

# Copiar los archivos de dependencias
COPY package*.json ./

# Limpiar caché e instalar dependencias
RUN npm cache clean --force && npm install --omit=dev

# Copiar el resto del código
COPY . .

# Exponer el puerto de tu app
EXPOSE 3001

# Comando para iniciar la app
CMD ["node", "server.js"]
