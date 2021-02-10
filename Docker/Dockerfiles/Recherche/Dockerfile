FROM python:3

ADD recherche.py /
ADD books.db /
ADD requirements.txt /

RUN pip install -r requirements.txt

CMD ["python", "./recherche.py"]

EXPOSE 5003