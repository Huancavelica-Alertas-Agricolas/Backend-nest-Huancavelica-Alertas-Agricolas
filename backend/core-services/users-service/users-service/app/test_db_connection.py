from database import engine

def test_connection():
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT 1")
            print("Conexión exitosa:", result.scalar())
    except Exception as e:
        print("Error de conexión:", e)

if __name__ == "__main__":
    test_connection()
