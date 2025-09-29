import phonenumbers

def to_e164(phone: str, region: str = "PE") -> str:
    """Convierte un número a formato E.164 para la región dada."""
    parsed = phonenumbers.parse(phone, region)
    if not phonenumbers.is_valid_number(parsed):
        raise ValueError("Número de teléfono inválido")
    return phonenumbers.format_number(parsed, phonenumbers.PhoneNumberFormat.E164)
