from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()

static_dir = os.path.join(os.path.dirname(__file__), "static")
if os.path.exists(static_dir):
    app.mount("/static", StaticFiles(directory="static"), name="static")

templates_dir = os.path.join(os.path.dirname(__file__), "templates")
templates = Jinja2Templates(directory="templates") if os.path.exists(templates_dir) else None

@app.get("/")
async def home(request: Request):
    if templates:
        try:
            return templates.TemplateResponse("index.html", {"request": request})
        except:
            pass
    return {"message": "Site en ligne", "status": "ok"}

@app.get("/api/health")
async def health():
    return {"status": "ok"}
