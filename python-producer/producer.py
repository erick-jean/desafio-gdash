# producer.py
import os
import time
import json
import logging
from datetime import datetime, timezone
import requests
import pika

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

API_KEY = os.getenv("OPENWEATHER_KEY")
LAT = os.getenv("LATITUDE")
LON = os.getenv("LONGITUDE")
INTERVAL_SECONDS = int(os.getenv("INTERVAL_SECONDS", "3600"))

RABBITMQ_URL = os.getenv("RABBITMQ_URL", "amqp://guest:guest@rabbitmq:5672/")
QUEUE_NAME = os.getenv("QUEUE_NAME", "weather_queue")

if not API_KEY:
    raise RuntimeError("Defina OPENWEATHER_KEY no .env")

def fetch_weather():
    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "lat": LAT,
        "lon": LON,
        "appid": API_KEY,
        "units": "metric",
        "lang": "pt_br"
    }

    r = requests.get(url, params=params, timeout=15)
    r.raise_for_status()
    data = r.json()

    weather = data["weather"][0]
    main = data["main"]
    wind = data["wind"]
    sys = data["sys"]

    # Monta o JSON exatamente no formato do seu schema
    payload = {
        "coord_longitude": data["coord"]["lon"],
        "coord_latitude": data["coord"]["lat"],
        "descricao": weather.get("description"),
        "icon": weather.get("icon"),
        "temp": main.get("temp"),
        "sensacao_termica": main.get("feels_like"),
        "humidity": main.get("humidity"),
        "temp_min": main.get("temp_min"),
        "temp_max": main.get("temp_max"),
        "speed": wind.get("speed"),
        "sunrise": sys.get("sunrise"),
        "sunset": sys.get("sunset"),
        "id_city": data.get("id"),
        "name_city": data.get("name")
    }

    return payload

def connect_rabbit():
    params = pika.URLParameters(RABBITMQ_URL)
    conn = pika.BlockingConnection(params)
    ch = conn.channel()
    ch.queue_declare(queue=QUEUE_NAME, durable=True)
    return conn, ch

def publish(ch, body):
    ch.basic_publish(
        exchange="",
        routing_key=QUEUE_NAME,
        body=json.dumps(body).encode(),
        properties=pika.BasicProperties(
            delivery_mode=2,
            content_type="application/json"
        )
    )
    logging.info("Publicado: %s", body["name_city"])

def main():
    conn, ch = connect_rabbit()

    while True:
        try:
            data = fetch_weather()
            publish(ch, data)
        except Exception as e:
            logging.exception("Erro: %s", e)

        time.sleep(INTERVAL_SECONDS)

if __name__ == "__main__":
    main()
