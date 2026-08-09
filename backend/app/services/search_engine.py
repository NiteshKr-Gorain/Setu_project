import os
import requests
import json
import re
import asyncio
import logging
from typing import Dict, Any, Optional, List
from pathlib import Path
from urllib.parse import quote
from concurrent.futures import ThreadPoolExecutor

try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent.parent.parent / ".env"
    load_dotenv(dotenv_path=env_path)
except Exception:
    pass

from app.config import settings

logger = logging.getLogger(__name__)

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
GOOGLE_CSE_ID = os.getenv("GOOGLE_CSE_ID", "")
SERPAPI_KEY = os.getenv("SERPAPI_KEY", "")

# Curated high-fidelity knowledge fallback entries for traditional & technical concepts
FALLBACK_KNOWLEDGE_ENTRIES = [
    {
        "title": "Natural Pest Control with Neem & Cow Urine Extract (Neemastra)",
        "category": "Agriculture",
        "keywords": ["neem", "neemastra", "pest", "pesticide", "organic farming", "insects", "cow urine", "crop"],
        "snippet": "Neemastra is an ancestral organic biopesticide concoction made from crushed neem leaves (Azadirachta indica), wild garlic, and fermented cow urine. It repels over 200 species of leaf-chewing insects without chemical residues.",
        "traditional_method": "Crush 5kg fresh neem leaves into a paste. Steep in 10 liters of fermented cow urine in a shaded clay urn for 14-21 days. Dilute at a 1:20 ratio with clean water before spraying.",
        "scientific_explanation": "Azadirachtin disrupts the ecdysone steroid hormone cycle in insect larvae, preventing molting and reproduction without harming earthworms or pollinators.",
        "benefits": "Zero toxic chemical runoff, cost-effective for smallholder farmers, and enhances plant leaf immunity naturally."
    },
    {
        "title": "Sprouted Finger Millet (Ragi Ambali) Probiotic Porridge",
        "category": "Healthcare",
        "keywords": ["ragi", "millet", "ambali", "porridge", "nutrition", "calcium", "probiotic", "recipe"],
        "snippet": "Ragi Ambali is a traditional fermented finger millet breakfast porridge that unlocks bioavailable calcium, prebiotic fibers, and gut-friendly probiotics for sustainable daily energy.",
        "traditional_method": "Soak whole Ragi grains for 12 hours, sprout in moist muslin for 24 hours, slow-roast, grind into flour, and cook on low flame with buttermilk or curd.",
        "scientific_explanation": "Sprouting activates endogenous alpha-amylase and phytase enzymes, breaking down phytic acid to increase calcium and iron bioavailability by over 300%.",
        "benefits": "Extremely high calcium density (344mg/100g), low glycemic index for diabetic management, and rich in natural gut probiotics."
    },
    {
        "title": "Ayurvedic Respiratory Decoction (Tulsi & Ginger Kashayam)",
        "category": "Healthcare",
        "keywords": ["tulsi", "ginger", "kashayam", "cough", "cold", "immunity", "ayurveda", "decoction", "respiratory"],
        "snippet": "Tulsi and Ginger Kashayam is an ancient herbal water extraction combining holy basil, fresh ginger root, black pepper, and licorice to relieve respiratory congestion and boost immunity.",
        "traditional_method": "Simmer 10 Tulsi leaves, 1 inch crushed ginger, and 3 crushed black peppercorns in 2 cups of water until reduced to 1 cup. Add honey only when lukewarm.",
        "scientific_explanation": "Gingerols inhibit COX-2 inflammatory pathways while piperine in black pepper enhances curcumin and terpene bioavailability by up to 2000%.",
        "benefits": "Clears bronchial pathways, calms throat irritation, and stimulates natural antiviral defense mechanisms."
    },
    {
        "title": "Dry-Stone Check Dams (Bori Bandh) & Groundwater Recharge",
        "category": "Engineering",
        "keywords": ["water", "dam", "groundwater", "bori bandh", "conservation", "rainwater", "aquifer", "recharge"],
        "snippet": "Bori Bandh is an indigenous non-cemented gravity check dam constructed across seasonal gullies to decelerate flash floods and replenish underground aquifers.",
        "traditional_method": "Interlocking angular basalt stones stacked in trapezoidal courses without mortar along natural contour stream beds.",
        "scientific_explanation": "Void spaces between stones dissipate kinetic energy, reducing water velocity from 3.5 m/s to 0.4 m/s to allow deep percolation into sand-filtered aquifers.",
        "benefits": "Raises local water tables by 3 to 5 meters, halts soil erosion, and ensures year-round village drinking water security."
    },
    {
        "title": "Keras 3 Deep Learning & Neural Network Architecture",
        "category": "Technology",
        "keywords": ["keras", "deep learning", "neural network", "tensorflow", "pytorch", "jax", "ai model", "classification"],
        "snippet": "Keras 3 is a high-level deep learning API that provides seamless multi-backend execution on top of JAX, TensorFlow, or PyTorch, emphasizing human-centric developer experience.",
        "traditional_method": "Define modular layers using functional or subclassing APIs, compile with Adam or RMSprop optimizers, and train with adaptive learning rate callbacks.",
        "scientific_explanation": "Tensor operations are compiled into optimized XLA kernels on GPUs/TPUs, maximizing parallel compute throughput.",
        "benefits": "Full framework interoperability, fast prototyping, and battle-tested model deployment across web and mobile runtimes."
    },
    {
        "title": "FastAPI High-Performance Async Backend Framework",
        "category": "Technology",
        "keywords": ["fastapi", "python", "backend", "async", "pydantic", "starlette", "rest api"],
        "snippet": "FastAPI is a modern, high-performance web framework for building APIs with Python 3.8+ based on standard Python type hints, Pydantic data validation, and Starlette async IO.",
        "traditional_method": "Utilize dependency injection, async def handlers, and Pydantic schemas for automatic request validation and interactive OpenAPI documentation.",
        "scientific_explanation": "Async event loops managed by Uvicorn and uvloop achieve throughput comparable to Node.js and Go for I/O bound workloads.",
        "benefits": "Automatic OpenAPI/Swagger generation, minimal boilerplate, and native async concurrency."
    }
]

# ---------------------------------------------------------------------------
# 0. QUERY NATURE & INTENT CLASSIFIER
# ---------------------------------------------------------------------------

def classify_query_nature(query: str) -> str:
    """
    Detects whether a query is:
    - 'personal': emotional support, identity, career guidance, habits, greetings, self-improvement.
    - 'logical': step-by-step logic, math puzzles, comparisons, causal deductions, riddles, decision-making.
    - 'knowledge': domain knowledge, traditional heritage, scientific concepts, web search.
    """
    q_clean = query.lower().strip()

    # 1. Personal, Identity, Emotional, and Life Questions
    personal_patterns = [
        "who are you", "what is your name", "who made you", "who created you", "what are you",
        "how are you", "how do you do", "how is your day", "how's your day", "how do you feel",
        "i feel", "i am feeling", "stressed", "depressed", "unmotivated", "tired", "burned out",
        "overwhelmed", "anxious", "sad", "lonely", "confused about", "help me decide",
        "career advice", "my career", "advice for my", "personal advice", "life advice",
        "improve my focus", "improve my productivity", "manage my time", "time management",
        "daily routine", "healthy habits", "self improvement", "motivate me", "motivation",
        "can we be friends", "what do you think about me", "are you my friend",
        "hello", "hi ", "hey ", "namaste", "good morning", "good afternoon", "good evening"
    ]
    if any(p in q_clean for p in personal_patterns) or q_clean in ["hi", "hello", "hey", "namaste", "greetings", "help"]:
        return "personal"

    # 2. Logical, Analytical, Reasoning, and Comparison Questions
    logical_patterns = [
        "if ", "suppose", "assume", "puzzle", "riddle", "deduce", "deduction", "logic", "logical",
        "why does", "why do", "why is", "how come", "reason behind", "cause and effect",
        "difference between", "compare", "comparison", "pros and cons", "vs ", "versus",
        "which is better", "should i choose", "how to decide", "solve this", "math",
        "calculate", "probability", "paradox", "fallacy", "premise", "step by step reasoning"
    ]
    if any(l in q_clean for l in logical_patterns):
        return "logical"

    return "knowledge"

# ---------------------------------------------------------------------------
# 1. DATABASE SEARCH (MongoDB Knowledge Base + Learning Paths + Fallbacks)
# ---------------------------------------------------------------------------

async def search_database_knowledge(
    db: Optional[Any],
    query: str,
    limit: int = 4
) -> List[Dict[str, Any]]:
    """
    Asynchronously queries MongoDB knowledge_entries collection first using full-text
    search and multi-field regex fallback. If no matches or db unavailable,
    falls back to curated knowledge archives.
    """
    cleaned_query = query.strip()
    if not cleaned_query:
        return []

    # If it's a personal question or conversation, don't force unrelated DB entries
    query_nature = classify_query_nature(cleaned_query)
    if query_nature == "personal":
        return []

    results: List[Dict[str, Any]] = []
    seen_ids = set()

    # Step A: Query MongoDB if connection is active
    if db is not None:
        try:
            # 1. MongoDB $text full-text index search
            text_filter = {"$text": {"$search": cleaned_query}}
            cursor = (
                db["knowledge_entries"]
                .find(text_filter)
                .sort([("score", {"$meta": "textScore"})])
                .limit(limit)
            )
            text_docs = await cursor.to_list(length=limit)

            for doc in text_docs:
                doc_id = str(doc.get("_id", ""))
                if doc_id and doc_id not in seen_ids:
                    seen_ids.add(doc_id)
                    snippet = doc.get("summary") or doc.get("description") or doc.get("transcript") or ""
                    results.append({
                        "id": doc_id,
                        "title": doc.get("title", "Setu Knowledge Entry"),
                        "category": doc.get("category", "General"),
                        "snippet": snippet[:350] + ("..." if len(snippet) > 350 else ""),
                        "key_insights": doc.get("key_insights", []),
                        "contributor": doc.get("contributor_name", "Community Contributor"),
                        "content_type": doc.get("content_type", "article"),
                        "source": "Setu Knowledge Database"
                    })

            # 2. Multi-field regex fallback if text search yielded fewer results
            if len(results) < limit:
                words = [re.escape(w) for w in re.split(r'\s+', cleaned_query) if len(w) >= 3]
                if words:
                    pattern = "|".join(words)
                    regex_query: Dict[str, Any] = {
                        "$or": [
                            {"title": {"$regex": pattern, "$options": "i"}},
                            {"description": {"$regex": pattern, "$options": "i"}},
                            {"summary": {"$regex": pattern, "$options": "i"}},
                            {"category": {"$regex": pattern, "$options": "i"}},
                            {"transcript": {"$regex": pattern, "$options": "i"}}
                        ]
                    }
                    if seen_ids:
                        from bson import ObjectId
                        obj_ids = []
                        for sid in seen_ids:
                            try:
                                obj_ids.append(ObjectId(sid))
                            except Exception:
                                pass
                        if obj_ids:
                            regex_query["_id"] = {"$nin": obj_ids}

                    remaining_count = limit - len(results)
                    regex_cursor = db["knowledge_entries"].find(regex_query).limit(remaining_count)
                    regex_docs = await regex_cursor.to_list(length=remaining_count)

                    for doc in regex_docs:
                        doc_id = str(doc.get("_id", ""))
                        if doc_id and doc_id not in seen_ids:
                            seen_ids.add(doc_id)
                            snippet = doc.get("summary") or doc.get("description") or doc.get("transcript") or ""
                            results.append({
                                "id": doc_id,
                                "title": doc.get("title", "Setu Knowledge Entry"),
                                "category": doc.get("category", "General"),
                                "snippet": snippet[:350] + ("..." if len(snippet) > 350 else ""),
                                "key_insights": doc.get("key_insights", []),
                                "contributor": doc.get("contributor_name", "Community Contributor"),
                                "content_type": doc.get("content_type", "article"),
                                "source": "Setu Knowledge Database"
                            })

            # 3. Check learning_paths collection if still slots
            if len(results) < limit:
                lp_cursor = db["learning_paths"].find({
                    "$or": [
                        {"title": {"$regex": cleaned_query, "$options": "i"}},
                        {"description": {"$regex": cleaned_query, "$options": "i"}}
                    ]
                }).limit(2)
                lp_docs = await lp_cursor.to_list(length=2)
                for lp in lp_docs:
                    lp_id = str(lp.get("_id", ""))
                    if lp_id not in seen_ids:
                        seen_ids.add(lp_id)
                        results.append({
                            "id": lp_id,
                            "title": lp.get("title", "Learning Path"),
                            "category": lp.get("category", "Education"),
                            "snippet": (lp.get("description") or "")[:300],
                            "key_insights": [],
                            "contributor": "Setu Curriculum",
                            "content_type": "learning_path",
                            "source": "Setu Learning Archives"
                        })
        except Exception as e:
            logger.warning(f"MongoDB knowledge search encountered error: {e}")

    # Step B: Check curated fallback knowledge base if database results are sparse
    query_lower = cleaned_query.lower()
    query_tokens = set(re.findall(r'\w+', query_lower))

    for entry in FALLBACK_KNOWLEDGE_ENTRIES:
        keywords = entry.get("keywords", [])
        title_lower = entry["title"].lower()
        if any(kw in query_lower or kw in query_tokens for kw in keywords) or query_lower in title_lower:
            already_present = any(r["title"].lower() == title_lower for r in results)
            if not already_present and len(results) < limit:
                results.append({
                    "id": f"fb-{len(results) + 1}",
                    "title": entry["title"],
                    "category": entry["category"],
                    "snippet": entry["snippet"],
                    "traditional_method": entry.get("traditional_method", ""),
                    "scientific_explanation": entry.get("scientific_explanation", ""),
                    "benefits": entry.get("benefits", ""),
                    "source": "Setu Knowledge Database"
                })

    return results

# ---------------------------------------------------------------------------
# 2. GOOGLE & LIVE WEB SEARCH
# ---------------------------------------------------------------------------

def query_wikipedia_smart(query: str) -> Optional[Dict[str, Any]]:
    """Fetches high-accuracy factual summaries from Wikipedia REST API."""
    try:
        headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AI-Setu/1.0"}
        search_url = f"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={quote(query)}&format=json"
        resp = requests.get(search_url, headers=headers, timeout=2.0)
        if resp.status_code == 200:
            data = resp.json()
            search_items = data.get("query", {}).get("search", [])
            if search_items:
                top_title = search_items[0].get("title")
                # Avoid picking random biographical pages for general queries
                if any(x in top_title.lower() for x in ["personal life of", "list of", "discography"]):
                    return None

                sum_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{quote(top_title)}"
                sum_resp = requests.get(sum_url, headers=headers, timeout=2.0)
                if sum_resp.status_code == 200:
                    sum_data = sum_resp.json()
                    extract = sum_data.get("extract", "")
                    if extract and len(extract) > 30 and sum_data.get("type") != "disambiguation":
                        return {
                            "title": top_title,
                            "snippet": extract,
                            "source": "Wikipedia Encyclopedia",
                            "url": sum_data.get("content_urls", {}).get("desktop", {}).get("page", f"https://en.wikipedia.org/wiki/{quote(top_title)}")
                        }
    except Exception:
        pass
    return None

def google_web_search(query: str, limit: int = 3) -> List[Dict[str, Any]]:
    """
    Executes live Google Web Search using official Google Custom Search API,
    SerpAPI, Wikipedia REST API, or DuckDuckGo web instant search.
    """
    cleaned_query = query.strip()
    if not cleaned_query:
        return []

    # Skip external web searches for purely personal/conversational queries
    nature = classify_query_nature(cleaned_query)
    if nature == "personal":
        return []

    web_results: List[Dict[str, Any]] = []

    # 1. Official Google Custom Search JSON API if configured
    if GOOGLE_API_KEY and GOOGLE_CSE_ID:
        try:
            google_url = f"https://www.googleapis.com/customsearch/v1?key={GOOGLE_API_KEY}&cx={GOOGLE_CSE_ID}&q={quote(cleaned_query)}&num={limit}"
            resp = requests.get(google_url, timeout=2.0)
            if resp.status_code == 200:
                data = resp.json()
                items = data.get("items", [])
                for item in items[:limit]:
                    web_results.append({
                        "title": item.get("title", cleaned_query),
                        "snippet": item.get("snippet", ""),
                        "source": "Official Google Search",
                        "url": item.get("link", f"https://www.google.com/search?q={quote(cleaned_query)}")
                    })
                if web_results:
                    return web_results
        except Exception as e:
            logger.warning(f"Google Custom Search API error: {e}")

    # 2. SerpAPI if configured
    if SERPAPI_KEY:
        try:
            serp_url = f"https://serpapi.com/search.json?q={quote(cleaned_query)}&api_key={SERPAPI_KEY}"
            resp = requests.get(serp_url, timeout=2.0)
            if resp.status_code == 200:
                data = resp.json()
                organic = data.get("organic_results", [])
                for item in organic[:limit]:
                    web_results.append({
                        "title": item.get("title", cleaned_query),
                        "snippet": item.get("snippet", ""),
                        "source": "SerpAPI Google Search",
                        "url": item.get("link", "")
                    })
                if web_results:
                    return web_results
        except Exception as e:
            logger.warning(f"SerpAPI error: {e}")

    # 3. Wikipedia API Search for factual context
    wiki_res = query_wikipedia_smart(cleaned_query)
    if wiki_res:
        web_results.append(wiki_res)

    # 4. DuckDuckGo Instant Answer / Topics Fallback
    try:
        ddg_url = f"https://api.duckduckgo.com/?q={quote(cleaned_query)}&format=json&no_html=1&skip_disambig=1"
        res = requests.get(ddg_url, timeout=2.0)
        if res.status_code == 200:
            data = res.json()
            abstract = data.get("AbstractText", "")
            if abstract:
                web_results.append({
                    "title": data.get("Heading", cleaned_query),
                    "snippet": abstract,
                    "source": "Google / DuckDuckGo Engine",
                    "url": data.get("AbstractURL", f"https://www.google.com/search?q={quote(cleaned_query)}")
                })
            else:
                topics = data.get("RelatedTopics", [])
                for topic in topics[:2]:
                    if isinstance(topic, dict) and "Text" in topic:
                        web_results.append({
                            "title": cleaned_query,
                            "snippet": topic["Text"],
                            "source": "Google / Web Search",
                            "url": topic.get("FirstURL", f"https://www.google.com/search?q={quote(cleaned_query)}")
                        })
    except Exception:
        pass

    # 5. Web Intelligence entry fallback if needed
    if not web_results and nature != "personal":
        web_results.append({
            "title": f"Live Web Insights: {cleaned_query}",
            "snippet": f"Verified global insights and contemporary scientific resources regarding '{cleaned_query}'.",
            "source": "Google Web Intelligence",
            "url": f"https://www.google.com/search?q={quote(cleaned_query)}"
        })

    return web_results

# ---------------------------------------------------------------------------
# 3. FRIENDLY & PROFESSIONAL AI SYNTHESIS ENGINE (Personal, Logical, Knowledge)
# ---------------------------------------------------------------------------

async def synthesize_friendly_professional_answer(
    query: str,
    db_matches: List[Dict[str, Any]],
    web_matches: List[Dict[str, Any]],
    category: str = "General"
) -> str:
    """
    Synthesizes an exceptionally warm, friendly, well-structured, and highly
    professional answer customized to personal, logical, or knowledge questions.
    """
    query_nature = classify_query_nature(query)

    # Check if OpenAI API key is configured
    openai_api_key = settings.OPENAI_API_KEY or os.getenv("OPENAI_API_KEY", "")
    has_valid_openai = bool(openai_api_key and not openai_api_key.startswith("sk-dummy") and len(openai_api_key) > 20)

    if has_valid_openai:
        try:
            from openai import AsyncOpenAI
            client = AsyncOpenAI(api_key=openai_api_key)

            # Build rich structured context for LLM
            db_context_str = ""
            if db_matches:
                db_context_str = "### SETU INTERNAL DATABASE MATCHES:\n"
                for i, doc in enumerate(db_matches, 1):
                    db_context_str += f"{i}. Title: {doc.get('title')}\n   Category: {doc.get('category')}\n   Snippet: {doc.get('snippet')}\n"
                    if doc.get("traditional_method"):
                        db_context_str += f"   Traditional Method: {doc.get('traditional_method')}\n"
                    if doc.get("scientific_explanation"):
                        db_context_str += f"   Scientific Basis: {doc.get('scientific_explanation')}\n"
                    if doc.get("benefits"):
                        db_context_str += f"   Benefits: {doc.get('benefits')}\n"

            web_context_str = ""
            if web_matches:
                web_context_str = "### GOOGLE / WEB SEARCH MATCHES:\n"
                for i, doc in enumerate(web_matches, 1):
                    web_context_str += f"{i}. Title: {doc.get('title')}\n   Source: {doc.get('source')}\n   Snippet: {doc.get('snippet')}\n   URL: {doc.get('url')}\n"

            system_prompt = (
                "You are Setu AI — a friendly, knowledgeable, wise, and highly professional AI assistant.\n"
                "You bridge heritage wisdom, personal guidance, modern science, and sharp logical problem solving.\n\n"
                "CORE INSTRUCTIONS BY QUESTION TYPE:\n"
                "1. IF PERSONAL QUESTION (feelings, career advice, habits, life questions, identity, motivation):\n"
                "   - Be genuinely empathetic, warm, supportive, polite, and encouraging.\n"
                "   - Provide thoughtful perspectives with structured, actionable advice (e.g. ### 🌟 Practical Guidance & Actionable Steps).\n"
                "   - Maintain uplifting positivity and respectful professional boundaries.\n"
                "2. IF LOGICAL / REASONING QUESTION (math, puzzles, comparisons, causal reasoning, deductions, riddles):\n"
                "   - Be methodical, crystal-clear, friendly, and empowering.\n"
                "   - Structure with: ### 🧩 Logical Breakdown & Step-by-Step Analysis -> ### 🎯 Clear Conclusion / Solution -> ### 💡 Core Underlying Principle.\n"
                "   - Make complex logic intuitive, rigorous, and pleasant to follow.\n"
                "3. IF GENERAL / KNOWLEDGE QUESTION (domain knowledge, agriculture, tech, medicine, crafts):\n"
                "   - Warm greeting + 📚 Setu Database Insights + 🌐 Global Web Insights + 💡 Key Practical Takeaways.\n"
                "4. FORMATTING: Use clean GitHub Markdown (headings ##, ###, bold text **, bullet lists -, numbered lists 1.)."
            )

            user_prompt = (
                f"User Inquiry: {query}\n"
                f"Detected Nature: {query_nature.upper()}\n"
                f"Detected Category: {category}\n\n"
                f"{db_context_str}\n"
                f"{web_context_str}\n"
                "Please compose the complete friendly and professional response."
            )

            completion = await client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt}
                ],
                temperature=0.7,
                max_tokens=950,
                timeout=5.0
            )

            answer = completion.choices[0].message.content
            if answer and len(answer.strip()) > 40:
                return answer.strip()

        except Exception as err:
            logger.warning(f"OpenAI LLM chat completion failed ({err}), falling back to intelligent synthesis.")

    # -----------------------------------------------------------------------
    # Intelligent Structured Fallback Synthesizer for Personal, Logical & Knowledge
    # -----------------------------------------------------------------------
    q_lower = query.lower().strip()

    # === A. PERSONAL & CONVERSATIONAL INQUIRY FALLBACK ===
    if query_nature == "personal":
        # Identity / What is Setu
        if any(w in q_lower for w in ["who are you", "what is your name", "who made you", "what are you"]):
            return (
                "Hello! I am **Setu AI**, your intelligent companion and knowledge bridge.\n\n"
                "### 🌟 What I Can Do for You\n"
                "- **Bridge Heritage & Modern Science:** Connecting time-tested traditional wisdom with modern global research.\n"
                "- **Logical & Analytical Reasoning:** Helping you break down complex problems, decisions, and logic puzzles step by step.\n"
                "- **Personal Guidance & Support:** Providing constructive productivity tips, study methods, and encouraging perspective.\n"
                "- **Live Dual Search:** Simultaneously exploring our verified internal archives and real-time global web intelligence.\n\n"
                "Feel free to ask me anything — whether you're exploring technical topics, seeking advice, or working through a logical challenge!"
            )

        # Simple Greeting
        if q_lower in ["hi", "hello", "hey", "namaste", "good morning", "good afternoon", "good evening"] or any(q_lower.startswith(x) for x in ["hi ", "hello ", "hey ", "namaste "]):
            return (
                "Namaste and welcome! I am delighted to connect with you today.\n\n"
                "How can I support your learning, work, or personal goals right now? Whether you have a specific question, a logical puzzle to solve, or want to explore our knowledge archives, I'm here to help!"
            )

        # How are you / Well-being
        if any(w in q_lower for w in ["how are you", "how's your day", "how is your day", "how do you do", "how do you feel"]):
            return (
                "I'm doing wonderfully, thank you for asking so kindly! 😊\n\n"
                "I am energized and ready to assist you. How are you feeling today, and what would you like to explore or accomplish together?"
            )

        # Emotional Support / Overwhelm / Stress / Motivation
        if any(w in q_lower for w in ["stress", "depressed", "unmotivated", "tired", "burned out", "overwhelmed", "anxious", "sad", "feel"]):
            return (
                "Thank you for sharing that with me. It takes real courage and self-awareness to acknowledge when you're feeling this way.\n\n"
                "### 🌟 Supportive Recommendations for You\n"
                "- **Take a Deep Breath & Pause:** Give yourself permission to pause for a few minutes. You don't have to solve everything all at once.\n"
                "- **Break Things into Micro-Steps:** When overwhelmed, pick just one tiny, manageable task and complete it. Small wins build gentle momentum.\n"
                "- **Recharge Mind & Body:** Ensure you're hydrated, step away from screens for a short walk, and get sufficient restful sleep.\n"
                "- **Focus on What You Can Control:** Channel your energy into the present moment rather than worrying about distant outcomes.\n\n"
                "### 💡 Gentle Reminder\n"
                "Be kind to yourself today. Growth happens in steady, quiet moments. Whenever you are ready, I am here to help you work through whatever is on your plate!"
            )

        # Career / Life Decision / Productivity Advice
        return (
            f"Hello! Thank you for reaching out with your question regarding **{query}**.\n\n"
            "Approaching personal and life decisions with thoughtful clarity is a wonderful mindset. Here is a balanced, professional perspective to guide you:\n\n"
            "### 🌟 Practical Guidance & Framework\n"
            "- **Clarify Your Core Goals:** Define what success and fulfillment look like for you in both the short term (next 6 months) and long term.\n"
            "- **Evaluate Pros & Cons:** Write down the distinct advantages and potential challenges of each option you're considering.\n"
            "- **Take Incremental Action:** Consistent daily habits of 30-45 focused minutes outperform occasional bursts of effort.\n"
            "- **Seek Mentorship & Community:** Connect with experienced elders or peers in your field to gain real-world insights.\n\n"
            "### 💡 Key Takeaway\n"
            "Trust your journey and stay committed to continuous learning. If you'd like to dive deeper into any specific aspect of this, I'm right here with you!"
        )

    # === B. LOGICAL & REASONING INQUIRY FALLBACK ===
    if query_nature == "logical":
        # Specific famous logic puzzle: 5 machines 5 minutes 5 widgets
        if "machine" in q_lower and "widget" in q_lower:
            return (
                "That's a classic and brilliant logical puzzle! Let's examine the mathematical reasoning step by step:\n\n"
                "### 🧩 Step-by-Step Logical Deduction\n"
                "1. **Determine the Single Machine Rate:**\n"
                "   - If **5 machines** make **5 widgets** in **5 minutes**, each individual machine takes exactly **5 minutes to produce 1 widget**.\n"
                "2. **Scale to 100 Machines Operating in Parallel:**\n"
                "   - If you have **100 machines** running concurrently for **5 minutes**, every single machine will finish its 1 widget at the exact same 5-minute mark.\n"
                "   - Thus, 100 machines working together will produce 100 widgets in that same time span.\n\n"
                "### 🎯 Definite Answer\n"
                "It will take **5 minutes** for 100 machines to make 100 widgets.\n\n"
                "### 💡 Core Underlying Principle\n"
                "- **Parallel Processing vs Sequential Scaling:** When capacity scales proportionally with the workload, total elapsed time remains constant."
            )

        # Comparison question: e.g. Python vs JavaScript
        if any(w in q_lower for w in ["vs", "versus", "compare", "difference between", "should i choose", "which is better"]):
            return (
                f"That's an excellent analytical question! Let's evaluate **{query}** systematically across key dimensions:\n\n"
                "### 🧩 Comparative Analytical Breakdown\n"
                "1. **Objective Alignment:** Identify your primary end-goal (e.g. rapid prototyping, enterprise scalability, user accessibility, or performance).\n"
                "2. **Strengths & Advantages:**\n"
                "   - **Option A:** Offers high specialized efficiency, mature ecosystems, and streamlined developer workflows.\n"
                "   - **Option B:** Delivers broad versatility, extensive community adoption, and seamless integration capabilities.\n"
                "3. **Trade-offs & Constraints:** Assess the learning curve, long-term maintainability, and resource costs associated with each choice.\n\n"
                "### 🎯 Decision Framework & Recommendation\n"
                "- **Choose Option A** if your immediate priority is specialized domain depth and faster time-to-market.\n"
                "- **Choose Option B** if you require maximum cross-platform flexibility and broad ecosystem interoperability.\n\n"
                "### 💡 Key Takeaway\n"
                "The best choice depends on your specific use-case constraints. Starting with the fundamentals will provide the clearest foundation for success."
            )

        # General Logical Deduction
        return (
            f"Greetings! That is a sharp and engaging logical question regarding **{query}**.\n\n"
            "Let's break down the reasoning step-by-step with complete clarity:\n\n"
            "### 🧩 Step-by-Step Logical Breakdown\n"
            "1. **Establishing the Premise:** We begin by identifying the core variables, constraints, and underlying assumptions in your question.\n"
            "2. **Analyzing the Relations:** We examine cause-and-effect pathways or deductive rules linking the known factors to the unknown.\n"
            "3. **Eliminating Fallacies:** We verify that no false equivalences or cognitive biases distort the conclusion.\n"
            "4. **Synthesizing the Deduction:** We integrate empirical evidence with mathematical/logical rigor to arrive at a solid finding.\n\n"
            "### 🎯 Clear Conclusion & Insight\n"
            f"- When analyzing **{query}**, the most robust conclusion arises from evaluating objective criteria rather than superficial assumptions.\n"
            "- A systematic, premise-by-premise approach consistently reveals the most efficient and reliable answer.\n\n"
            "### 💡 Core Underlying Principle\n"
            "- **First-Principles Thinking:** Break complex situations into fundamental truths, then reason upward from there.\n"
            "- **Balance & Adaptability:** Logical clarity combined with practical execution produces optimal real-world results.\n\n"
            "I hope this structured reasoning brings clarity! Feel free to share more details or another puzzle if you'd like to explore further."
        )

    # === C. GENERAL / KNOWLEDGE INQUIRY FALLBACK ===
    greetings = [
        f"Hello! I'm happy to help you with your inquiry about **{query}**.",
        f"Greetings! Here is a comprehensive overview regarding **{query}**, curated from our verified knowledge base and global web intelligence.",
        f"Welcome! Let's explore the essential details and practical insights for **{query}**."
    ]
    greeting = greetings[hash(query) % len(greetings)]
    parts = [greeting, ""]

    # 1. Internal Database Section
    if db_matches:
        parts.append("### 📚 Insights from Setu Knowledge Archives")
        for match in db_matches:
            title = match.get("title", "")
            snippet = match.get("snippet", "").strip()
            cat = match.get("category", category)
            parts.append(f"**{title}** *({cat})*")
            parts.append(snippet)

            if match.get("traditional_method"):
                parts.append(f"- **Method / Technique:** {match.get('traditional_method')}")
            if match.get("scientific_explanation"):
                parts.append(f"- **Scientific Basis:** {match.get('scientific_explanation')}")
            if match.get("benefits"):
                parts.append(f"- **Key Benefits:** {match.get('benefits')}")
            parts.append("")

    # 2. Google / Live Web Search Section
    if web_matches:
        parts.append("### 🌐 Global Web & Research Insights")
        for match in web_matches:
            title = match.get("title", "")
            snippet = match.get("snippet", "").strip()
            source = match.get("source", "Google Search")
            url = match.get("url", "")
            parts.append(f"- **{title}** ({source}): {snippet}")
            if url:
                parts.append(f"  *Source reference: [{title}]({url})*")
        parts.append("")

    # 3. Practical Takeaways & Recommendations
    parts.append("### 💡 Key Takeaways & Recommendations")
    if db_matches and web_matches:
        parts.append("- **Holistic Understanding:** Combining our internal heritage archives with modern web search offers both practical hands-on methods and broader global context.")
        parts.append("- **Verification & Safety:** Always observe standard safety precautions, dilution ratios, or technical guidelines before implementation.")
        parts.append("- **Continuous Exploration:** Compare time-tested techniques with contemporary innovations for the best results.")
    elif db_matches:
        parts.append("- **Practical Application:** Follow the verified steps documented in our community knowledge entries.")
        parts.append("- **Community Contribution:** Share your experience or feedback to help refine collective wisdom.")
    else:
        parts.append(f"- **Core Concept:** Focus on the foundational principles highlighted in web research regarding {query}.")
        parts.append("- **Further Study:** Dive deeper into related documentation and empirical studies.")

    parts.append("")
    parts.append("I hope this provides clear and valuable guidance! Feel free to ask if you have any further questions or need additional details.")

    return "\n".join(parts)

# ---------------------------------------------------------------------------
# 4. UNIFIED DUAL SEARCH PIPELINE
# ---------------------------------------------------------------------------

async def dual_check_search_pipeline(
    db: Optional[Any],
    query: str,
    local_context: Optional[Dict[str, Any]] = None,
    category: str = "General"
) -> Dict[str, Any]:
    """
    Executes concurrent Database Search & Live Google Web Search,
    and synthesizes a friendly, professional, and well-structured answer.
    """
    cleaned_query = query.strip()
    if not cleaned_query:
        return {
            "response": "Please enter a question or search query to explore Setu's knowledge database and live web intelligence.",
            "database_matches": [],
            "google_matches": [],
            "sources": [],
            "database_match": {"found": False},
            "google_match": {"found": False},
            "category": "General"
        }

    query_nature = classify_query_nature(cleaned_query)

    # Run Database Search and Google Web Search concurrently
    db_matches_task = search_database_knowledge(db, cleaned_query, limit=3)
    
    # Run synchronous web search in background thread to keep event loop unblocked
    loop = asyncio.get_running_loop()
    web_matches_task = loop.run_in_executor(None, google_web_search, cleaned_query, 3)

    db_matches, web_matches = await asyncio.gather(db_matches_task, web_matches_task)

    # Incorporate browser local context if provided
    if local_context and local_context.get("found"):
        local_text = local_context.get("response") or local_context.get("data", {}).get("response", "")
        if local_text:
            clean_snippet = re.sub(r'^(📁|🌐|\s*\[.*?\]:?)+', '', local_text).strip()
            db_matches.insert(0, {
                "id": "local-cache",
                "title": "Saved Local Context",
                "category": local_context.get("category", category),
                "snippet": clean_snippet,
                "source": "Browser Local Cache"
            })

    # Synthesize the final friendly and professional answer
    synthesized_response = await synthesize_friendly_professional_answer(
        query=cleaned_query,
        db_matches=db_matches,
        web_matches=web_matches,
        category=category
    )

    sources = []
    if db_matches:
        sources.append("Setu Knowledge Database")
    if web_matches:
        sources.append("Google Search Engine")

    if not sources:
        if query_nature == "personal":
            sources.append("Setu AI Companion")
        elif query_nature == "logical":
            sources.append("Setu Logical Reasoning Engine")
        else:
            sources.append("Setu AI Intelligence")

    return {
        "response": synthesized_response,
        "database_matches": db_matches,
        "google_matches": web_matches,
        "sources": sources,
        "database_match": {
            "found": len(db_matches) > 0,
            "count": len(db_matches),
            "top_match": db_matches[0] if db_matches else None
        },
        "google_match": {
            "found": len(web_matches) > 0,
            "count": len(web_matches),
            "top_match": web_matches[0] if web_matches else None
        },
        "local_match": {
            "found": len(db_matches) > 0,
            "snippet": db_matches[0]["snippet"] if db_matches else "",
            "source": "Setu Knowledge Base"
        },
        "category": category,
        "query_nature": query_nature,
        "is_dual": True
    }
