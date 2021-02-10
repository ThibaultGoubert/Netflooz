FROM python:3

ADD notes.py /
ADD notes.db /
ADD requirements.txt /

RUN pip install -r requirements.txt

CMD ["python", "./notes.py"]

EXPOSE 5002