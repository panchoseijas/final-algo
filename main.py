from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from calcular_probabilidades_areas import calcular_probabilidades_areas
from consultar_preguntas import consultar_preguntas
from consultar_carreras import consultar_carreras


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/preguntas", response_class=JSONResponse)
async def read_root(request: Request):
    return consultar_preguntas()

@app.post("/resultado", response_class=JSONResponse)
async def post_resultado(request: Request):
    respuestas = await request.json()
    return calcular_probabilidades_areas(respuestas)

@app.post("/carreras", response_class=JSONResponse)
async def post_resultado(request: Request):
    area = await request.json()
    return consultar_carreras(area)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
