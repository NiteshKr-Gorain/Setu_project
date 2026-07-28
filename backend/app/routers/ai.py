from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any

from app.services.keras_model import keras_classifier
from app.services.search_engine import dual_check_search
from app.services.old_man_persona import transform_to_old_man_persona

router = APIRouter(prefix="", tags=["ai"])

class ChatRequest(BaseModel):
    prompt: str
    category: Optional[str] = "General"
    local_context: Optional[Dict[str, Any]] = None

class ClassifyRequest(BaseModel):
    prompt: str

@router.get("/api/health")
@router.get("/health/ai")
def ai_health_check():
    return {
        "status": "online",
        "keras_model": "loaded",
        "dual_search": "active",
        "engine": "FastAPI + Keras 3 + Google Web Search",
        "persona": "Wise Knowledge Master"
    }

@router.post("/api/classify")
def classify_prompt(req: ClassifyRequest):
    """Endpoint for classifying user prompts with Keras deep learning model."""
    result = keras_classifier.classify_and_vectorize(req.prompt)
    return result

@router.post("/api/chat")
def process_chat(req: ChatRequest):
    """
    Dual-Check AI Pipeline Endpoint:
    1. Runs Keras Neural Intent Classification.
    2. Executes Dual Search: checks BOTH Local Storage/Knowledge AND Google Web Search.
    3. Synthesizes a unified response with source badges for both.
    """
    prompt = req.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    # 1. Keras Classification & Semantic Vector Analysis
    keras_info = keras_classifier.classify_and_vectorize(prompt)
    detected_category = keras_info["category"]

    # 2. Dual Search Pipeline: Check Local Knowledge & Google Web Search
    dual_res = dual_check_search(prompt, req.local_context)

    raw_text = dual_res["response"]
    local_match = dual_res["local_match"]
    google_match = dual_res["google_match"]
    sources = dual_res["sources"]

    # 3. Output Payload Formatting
    persona_output = transform_to_old_man_persona(
        raw_text=raw_text,
        query=prompt,
        category=detected_category,
        source="Dual Search (Local Data + Google)"
    )

    persona_output["local_match"] = local_match
    persona_output["google_match"] = google_match
    persona_output["sources"] = sources
    persona_output["keras_metadata"] = {
        "category": detected_category,
        "confidence": keras_info["confidence"],
        "vector_norm": keras_info["vector_norm"]
    }

    return persona_output
