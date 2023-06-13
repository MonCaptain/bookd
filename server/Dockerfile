ARG PYTHON_VERSION=3.9-slim-buster

FROM python:${PYTHON_VERSION}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN mkdir -p /code

WORKDIR /code

COPY requirements.txt /tmp/requirements.txt

# Add PostgreSQL development dependencies
RUN apt-get update && \
    apt-get install -y libpq-dev gcc
# Install psycopg2
RUN set -ex && \
    pip install --upgrade pip && \
    pip install psycopg2 && \
    pip install -r /tmp/requirements.txt && \
    rm -rf /root/.cache/

COPY . /code

EXPOSE 8000

CMD ["sh", "-c", "python manage.py makemigrations && python manage.py migrate && gunicorn --bind :8000 --workers 2 server.wsgi"]
