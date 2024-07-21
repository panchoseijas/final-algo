from fastapi import FastAPI
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.templating import Jinja2Templates
from fastapi import Request
import uvicorn
from calcular_probabilidades_areas import calcular_probabilidades_areas

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/resultado", response_class=JSONResponse)
async def post_resultado(request: Request):
    print("hola")
    respuestas = await request.json()
    return calcular_probabilidades_areas(respuestas)

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
