FROM python:3.12-bullseye

ADD . /app
WORKDIR /app
# RUN apk update && apk add --no-cache gcc
RUN rm -rf node_modules
RUN pip install -r requirements.txt


EXPOSE 8501

ENV PYTHONPATH=/app
WORKDIR /app/apps/dashboard
CMD ["streamlit", "run", "Awesome_Analysis.py"]