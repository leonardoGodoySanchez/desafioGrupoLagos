# LiquiVerde – Plataforma de Optimización de Compras Sostenibles  
Desarrollada para el desafío técnico de Grupo Lagos.

---

## 1. Tecnologías utilizadas

### Frontend
- React + Vite  
- TypeScript  
- React Router  
- TailwindCSS  
- shadcn/ui  

### Backend
- FastAPI (Python)  
- SQLite / JSON dataset de ejemplo  
- Algoritmos personalizados:
  - Calculo sostenibilidad por producto
  - Optimización multi-criterio tipo mochila
  - Sustitución inteligente de productos sostenibles

### Opcionales implementados
- Docker y Docker Compose  
- API REST completa 
- Separación modular del backend 

---

##  2. Instalación y Uso

# Frontend

1. Entrar a la carpeta: 
 - cd frontend
2. Instalar dependencias:
 - npm install
 - npm install react-router-dom
 - npm install -D @types/node

3. Levantar servidor de desarrollo: 
 - npm run dev

4. Abrir en navegador:
http://localhost:5173/ (o con ctl+click en url de consola)

---

# Backend – FastAPI

## Opción A – Con Docker (Recomendada)

1. Asegurar que Docker Desktop esté ejecutándose.
2. Entrar a la carpeta del backend:
 - cd backend
 - cd liquiverde_back

3. Ejecutar:
 - docker compose up --build

API disponible en:  
http://localhost:8000

Documentación interactiva FastAPI:  
http://localhost:8000/docs

---

## Opción B – Sin Docker (manual)
Entrar a la carpeta del backend:
 - cd backend
 - cd liquiverde_back

1. Activar entorno virtual:
- python -m venv env
- env\Scripts\activate

2. Instalar librerías:
 - pip install -r requirements.txt

3. Ejecutar API:
 - uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

---

## 🧪 3. Endpoints Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/products` | Lista todos los productos con su puntaje de sostenibilidad |
| GET | `/products/{barcode}` | Detalle de un producto por cod.barra|
| POST | `/optimize/` | Optimización multi-criterio según presupuesto |
| POST | `/substitutions/{barcode}` | Alternativas sostenibles del mismo tipo |

---

## 4. Algoritmos Implementados

### 1. Sistema de Scoring de Sostenibilidad
Cada producto tiene un puntaje compuesto por:
- Económico  
- Ambiental  
- Social  
- Global (ponderado)

Lógica implementada en `app/services/scoring.py`.
---

### 2. Optimización multi-criterio (tipo Mochila)
Dado un presupuesto, selecciona productos maximizando una combinación:
valor = impacto_global * factor + (1000 / precio)
fitness = 0.5 * sostenibilidad_global
         + 0.3 * (1/precio)
         + 0.2 * (1/impacto_ambiental)

---

### 3. Sustitución inteligente
Busca productos de la misma categoría cuyo puntaje global de sostenibilidad sea mayor.

---

## 5. Funcionalidades del Frontend

- Listado de productos  
- Detalle de producto por código de barra
- Cálculo de sostenibilidad
- Selección de productos  
- Vista de impacto ambiental
- Comparación antes/después
- Generación de lista optimizada  
- Optimización de compras según presupuesto
- Cálculo simple de ahorro e impacto  
- Recomendación de productos alternativos  

- Métricas de Impacto Ambiental

   Se utilizan dos indicadores para evaluar mejoras:

   Huella ambiental inicial: suma del impacto de los productos seleccionados por el usuario

   Huella ambiental optimizada: impacto de los productos elegidos por el algoritmo
   Huella alta = peor
   Huella baja = más sostenible
---

## 6. Uso de IA

Se utilizó asistencia de copilot únicamente para:
- corrección sintáctica en FastAPI y React  
- sugerencias para UX/UI  
- depuración y recomendaciones de diseño
- revisión de código para 

Toda la lógica y la integración final fue realizada manualmente.
---

## 7. Dataset utilizado

`/backend/liquiverde_back/data/products_sample.json`  
Dataset propio con productos de ejemplo para pruebas del desafío.
Incluye 20 productos con:

Precio realista en CLP

Eco-score

Social-score

Categoría

Código de barras

---

## 8. Estado del proyecto

- Backend funcional 
- Frontend integrado
- Optimización
- Sustitutos
- Docker
---

## 9. Ejecutar todo junto

### Backend en Docker + Frontend local

1. Backend:
 - cd backend
 - cd liquiverde_back
 - docker compose up --build

2. Frontend:
 - cd frontend
 - npm run dev

# ***** DOCKER-COMPOSE ******* 
version: "3.9"

services:
  liquiverde_api:
    build: .
    container_name: liquiverde_back
    restart: always
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    environment:
      - PYTHONUNBUFFERED=1

# *******  DOCKERFILE ********

# Imagen base
FROM python:3.11-slim

# Crear directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivo de dependencias
COPY requirements.txt .

# Instalar dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar toda la aplicación
COPY . .

# Exponer puerto del backend
EXPOSE 8000

# Comando de ejecución
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
