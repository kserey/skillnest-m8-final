# skillnest-m8-final
# API REST - Portafolio y Gestión de Usuarios

Este proyecto es el backend para una aplicación de gestión de perfiles de usuario. Incluye autenticación segura mediante **JWT**, encriptación de contraseñas y **subida de imágenes** al servidor.

## 📋 Características

* **CRUD de Usuarios:** Crear, Leer, Actualizar y Eliminar perfiles.
* **Seguridad:** Autenticación vía Token (JWT) y contraseñas hasheadas (Bcryptjs).
* **Manejo de Archivos:** Carga de imágenes de perfil con validación de tipo y tamaño (express-fileupload).
* **Arquitectura:** MVC Modular (Modelos, Vistas -JSON-, Controladores).

## 🚀 Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/kserey/skillnest-m8-final
    cd portafolio-api
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto basándote en el ejemplo (`.env.example`) o usa:
    ```env
    PORT=3000
    JWT_SECRET=tu_clave_secreta_aqui
    ```

4.  **Iniciar el servidor:**
    * Modo desarrollo: `npm run dev`
    * Modo producción: `npm start`

El servidor correrá en: `http://localhost:3000`

## 🔗 Endpoints de la API

### 🔓 Rutas Públicas

* **POST** `/usuarios`: Registrar un nuevo usuario.
    * *Body:* `{ "nombre": "...", "email": "...", "password": "..." }`
* **POST** `/usuarios/login`: Iniciar sesión.
    * *Body:* `{ "email": "...", "password": "..." }`
    * *Respuesta:* Devuelve un `token` JWT necesario para las rutas privadas.

### 🔒 Rutas Privadas (Requieren Header `Authorization: Bearer <TOKEN>`)

* **GET** `/usuarios/:id`: Ver perfil de un usuario.
* **PUT** `/usuarios/:id`: Actualizar datos (nombre, email).
* **DELETE** `/usuarios/:id`: Eliminar cuenta.
* **POST** `/usuarios/:id/imagen`: Subir foto de perfil.
    * *Form-data:* Key `imagen` (tipo File).

## 🛠️ Tecnologías

* Node.js & Express
* JSON Web Tokens (JWT)
* Bcryptjs
* Express-Fileupload
* Dotenv

## ✍🏽Autor
Irina Serey - Desarrolladora Full Stack en formación
