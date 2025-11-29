# ⚠️ Default Templates (used only if DB has no data)
DEFAULT_TEMPLATES = {
    "summarize_text": {
        "name": "summarize_text",
        "description": "Summarize long text in a clear and concise way.",
        "prompt_template": "Summarize the following text:\n\n{data}",
        "output_schema": {
            "type": "object",
            "properties": {
                "summary": {"type": "string"}
            },
            "required": ["summary"]
        },
        "category": "NLP",
        "public": True
    },

    "sentiment_analysis": {
        "name": "sentiment_analysis",
        "description": "Classify text into sentiment (positive, neutral, negative).",
        "prompt_template": "Analyze sentiment of this text and classify as positive, neutral, or negative:\n\n{data}",
        "output_schema": {
            "type": "object",
            "properties": {
                "sentiment": {"type": "string"},
                "score": {"type": "number"}
            },
            "required": ["sentiment"]
        },
        "category": "NLP",
        "public": True
    },

    "extract_information": {
        "name": "extract_information",
        "description": "Extract key information and named entities from text.",
        "prompt_template": "Extract important information from the following text:\n\n{data}",
        "output_schema": {
            "type": "object",
            "properties": {
                "entities": {
                    "type": "array",
                    "items": {"type": "string"}
                }
            },
            "required": ["entities"]
        },
        "category": "Data Extraction",
        "public": True
    },

    "text_to_json": {
        "name": "text_to_json",
        "description": "Convert unstructured text into valid JSON format.",
        "prompt_template": "Convert the following text into structured JSON:\n\n{data}",
        "output_schema": {
            "type": "object"
        },
        "category": "Data Transformation",
        "public": True
    },

    "fix_code": {
        "name": "fix_code",
        "description": "Fix code syntax errors and return corrected version.",
        "prompt_template": "Fix errors in this code and return corrected version:\n\n{data}",
        "output_schema": {
            "type": "object",
            "properties": {
                "fixed_code": {"type": "string"}
            },
            "required": ["fixed_code"]
        },
        "category": "Programming",
        "public": True
    }
}
