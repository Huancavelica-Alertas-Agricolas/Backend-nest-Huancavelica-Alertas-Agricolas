from jinja2 import Environment, FileSystemLoader, select_autoescape
from pathlib import Path
from typing import Dict, Any

def render_template(template_dir: str, template_name: str, context: Dict[str, Any]) -> str:
    env = Environment(
        loader=FileSystemLoader(template_dir),
        autoescape=select_autoescape()
    )
    template = env.get_template(template_name)
    return template.render(**context)
