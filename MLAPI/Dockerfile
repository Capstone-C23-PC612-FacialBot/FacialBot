FROM python:3.11-slim

WORKDIR /app
RUN pip install --upgrade setuptools

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
ENV FLASK_APP=app.py
ENV FLASK_ENV=development
CMD ["flask","run","--host=0.0.0.0"]