FROM python:3

ADD catalogue.py /
ADD books.db /
ADD requirements.txt /

RUN pip install -r requirements.txt

CMD ["python", "./catalogue.py"]