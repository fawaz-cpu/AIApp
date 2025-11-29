import uuid, json
from jsonschema import validate, ValidationError

def gen_job_id():
    return str(uuid.uuid4())

def validate_schema(instance: dict, schema: dict) -> tuple[str, int]:
    if not schema:
        return True, ""
    try:
        validate(instance=instance, schema=schema)
        return True, ""
    except ValidationError as e:
        return False, str(e)
