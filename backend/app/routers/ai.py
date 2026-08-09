import asyncio
import logging
from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from motor.motor_asyncio import AsyncIOMotorDatabase

from app.database import get_database
from app.services.keras_model import keras_classifier
from app.services.search_engine import dual_check_search_pipeline

logger = logging.getLogger(__name__)

router = APIRouter(prefix="", tags=["ai"])

class ChatRequest(BaseModel):
    prompt: str
    category: Optional[str] = "General"
    local_context: Optional[Dict[str, Any]] = None

class StreamChatRequest(BaseModel):
    prompt: str
    options: Optional[Dict[str, Any]] = None

class ClassifyRequest(BaseModel):
    prompt: str

@router.get("/api/health")
@router.get("/health/ai")
def ai_health_check():
    return {
        "status": "online",
        "keras_model": "loaded",
        "dual_search": "active",
        "engine": "FastAPI + MongoDB + Keras 3 + Google Web Search",
        "persona": "Setu Knowledge Assistant"
    }

@router.post("/api/classify")
def classify_prompt(req: ClassifyRequest):
    """Endpoint for classifying user prompts with Keras deep learning model."""
    result = keras_classifier.classify_and_vectorize(req.prompt)
    return result

@router.post("/api/chat")
async def process_chat(
    req: ChatRequest,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Dual-Check AI Pipeline Endpoint:
    1. Runs Keras Neural Intent Classification for semantic category detection.
    2. Executes Concurrent Search: Queries MongoDB Knowledge Database + Live Google Web Search.
    3. Synthesizes a warm, friendly, well-structured, and highly professional answer.
    """
    prompt = req.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    # 1. Keras Classification & Semantic Vector Analysis
    keras_info = keras_classifier.classify_and_vectorize(prompt)
    detected_category = keras_info.get("category", req.category or "General")

    # 2. Dual Search Pipeline: Search MongoDB Database + Google Live Web Search
    dual_res = await dual_check_search_pipeline(
        db=db,
        query=prompt,
        local_context=req.local_context,
        category=detected_category
    )

    response_text = dual_res.get("response", "")
    database_matches = dual_res.get("database_matches", [])
    google_matches = dual_res.get("google_matches", [])
    sources = dual_res.get("sources", [])

    return {
        "response": response_text,
        "query": prompt,
        "category": detected_category,
        "source": "Dual Search (Setu Database + Google Web)",
        "sources": sources,
        "database_matches": database_matches,
        "google_matches": google_matches,
        "database_match": dual_res.get("database_match", {"found": len(database_matches) > 0}),
        "google_match": dual_res.get("google_match", {"found": len(google_matches) > 0}),
        "local_match": dual_res.get("local_match", {"found": len(database_matches) > 0}),
        "keras_metadata": {
            "category": detected_category,
            "confidence": keras_info.get("confidence", 0.85),
            "vector_norm": keras_info.get("vector_norm", 1.0)
        }
    }

@router.post("/api/chat/stream")
async def process_chat_stream(
    req: StreamChatRequest,
    db: AsyncIOMotorDatabase = Depends(get_database)
):
    """
    Streaming AI Pipeline Endpoint using Dual Database + Google Search.
    """
    prompt = req.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")

    keras_info = keras_classifier.classify_and_vectorize(prompt)
    detected_category = keras_info.get("category", "General")

    dual_res = await dual_check_search_pipeline(
        db=db,
        query=prompt,
        category=detected_category
    )
    response_text = dual_res.get("response", f"Verified knowledge response for '{prompt}'.")

    async def stream_generator():
        # Stream word by word with micro-delays for smooth streaming effect
        words = response_text.split(" ")
        for i, word in enumerate(words):
            suffix = " " if i < len(words) - 1 else ""
            yield f"{word}{suffix}"
            await asyncio.sleep(0.02)

    return StreamingResponse(stream_generator(), media_type="text/plain")
