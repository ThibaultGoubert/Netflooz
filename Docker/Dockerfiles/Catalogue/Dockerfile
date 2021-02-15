FROM python:3

ADD catalogue.py /
ADD books.db /var/lib/sqlite3/data/
ADD requirements.txt /

RUN pip install -r requirements.txt

CMD ["python", "./catalogue.py"]

EXPOSE 5001