FROM python:3
ENV PYTHONUNBUFFERED 1

RUN apt-get update
RUN apt-get -y install cron
RUN apt-get -y install vim

RUN touch /var/log/cron.log

# 컨테이너 작업경로(requirements.txt, manage.py 위치)
WORKDIR /app
RUN rm -rf /etc/localtime
RUN ln -s /usr/share/zoneinfo/Asia/Seoul /etc/localtime

COPY . .

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN python manage.py crontab add

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]