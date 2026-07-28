import random
from typing import Dict, Any, List

ELDER_GREETINGS = [
    "Ah, my young seeker of truth... Gather round and listen closely.",
    "Greetings, young scholar! In all my years of experience, this is a question worth exploring.",
    "Come, sit by the warm fire of knowledge. Let me share what the wisdom of ages and modern neural networks teach us about this.",
    "Ah, what a fine inquiry! Let an old master share these timeless insights with you."
]

ELDER_CLOSINGS = [
    "Always remember: true mastery comes from sharing knowledge with patience.",
    "Keep searching, young scholar. The mind that never stops questioning will always shine bright.",
    "Take these points to heart, and build great things with this wisdom."
]

def transform_to_old_man_persona(raw_text: str, query: str, category: str, source: str) -> Dict[str, Any]:
    """
    Returns clean direct response without boilerplate patterns.
    """
    clean_response = raw_text.strip() if raw_text else "No answer content found."

    return {
        "response": clean_response,
        "query": query,
        "category": category,
        "source": source
    }
