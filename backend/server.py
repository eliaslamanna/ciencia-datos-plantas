# server.py
from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
import numpy as np
import io
from PIL import Image
from fastapi.middleware.cors import CORSMiddleware

# Crear la instancia de la aplicación FastAPI
app = FastAPI()

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Agrega tu URL de frontend aquí
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define un modelo de datos para solicitudes o respuestas (opcional)
class Item(BaseModel):
    name: str
    description: str = None
    price: float
    tax: float = None

# Endpoint de prueba para verificar que el servidor funcione
@app.get("/mi-endpoint")
async def mi_endpoint():
    return {"mensaje": "Hola desde FastAPI"}

# Cargar el modelo previamente entrenado
# model = load_model(r"G:\Mi unidad\Facultad\2024\2do cuatrimestre\Ciencia de datos\TPO\model.keras")
model = load_model(r"C:\Users\Elias\Downloads\model.keras")

# Define las clases
class_names = ["astilbe", "bellflower", "black_eyed_susan", "calendula", "california_poppy", "carnation", "common_daisy", "coreopsis", "daffodil", "dandelion", "geranium", "hyacinth", "iris", "jasmine", "lotus", "magnolia", "orchid", "primrose", "rose", "sunflower", "tulip", "verbena", "water_lilly"]

# Función de predicción
def predict_image(img):
    img = img.resize((128, 128)) 

    if img.mode != 'RGB':
        img = img.convert('RGB')

    img_array = img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0  # Normaliza la imagen
    
    try:
        predictions = model.predict(img_array)
        predicted_class = class_names[np.argmax(predictions)]
        confidence = float(np.max(predictions))  # Convert confidence to float
        return predicted_class, confidence
    except Exception as e:
        print("Error during prediction:", e)
        return None, None

# Endpoint para hacer la predicción
@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Leer y procesar la imagen
        image_data = await file.read()
        img = Image.open(io.BytesIO(image_data))      

        # Realizar la predicción
        predicted_class, confidence = predict_image(img)
        if predicted_class is not None:
            return JSONResponse(content={"class": predicted_class, "confidence": confidence})
        else:
            return JSONResponse(content={"error": "No se pudo hacer la predicción"}, status_code=500)
    except Exception as e:
        print("Error general:", e)
        return JSONResponse(content={"error": "Error interno del servidor"}, status_code=500)
