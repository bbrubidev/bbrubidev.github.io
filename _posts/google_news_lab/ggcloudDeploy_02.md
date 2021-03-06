---
title: Google News Lab > 2. 프록시 서버 및 데이터베이스 구축
date: 2018-01-29
tags:
- Google News Lab
- Django
---


이번 포스팅에서는 Cloud SQL Proxy를 통하여 PostgreSQL 데이터베이스를 생성, 연결하는 방법에 대해 설명할 예정이다.

<br>

## 1. Cloud SQL Proxy용 로컬환경 구축하기

배포된 앱은 클라우드 SQL 인스턴스와 통신하기위해 Cloud SQL Proxy를 사용한다. 다음은 옵션 기능이지만, 로컬에서 테스트용을 설치하는 방법이다.

```powershell
# Proxy 다운로드
$ curl -o cloud_sql_proxy https://dl.google.com/cloudsql/cloud_sql_proxy.darwin.amd64

# 프록시 사용가능하도록 활성화
$ chmod +x cloud_sql_proxy
```

<br>

## 2. Cloud SQL 인스턴스 생성

이후 연결해 줄 Cloud SQL 인스턴스를 생성한다. 데이터베이스는 postgreSQL을 사용하기로 하였다.(아직은 베타버전을 제공하고 있다.)

다음 명령어로 콘솔에서 인스턴스 이름, 사용할 CPU 개수와 메모리 크기를 명시해준다.

```powershell
$ gcloud sql instances create [새로운 인스턴스명] --database-version=POSTGRES_9_6 \
       --cpu=[CPUS 갯수] --memory=[메모리 사이즈]
```

<br>

아까 설치한 Cloud SDK를 사용하면 생성한 SQL 인스턴스의 정보 및 `connectionName`을 알아낼 수 있다.

```powershell
$ gcloud sql instances describe [SQL 인스턴스명]
```

`connectionName`은 설정파일(settings.py) 및 곧 생성할 `app.yaml`에 필요하므로 따로 보관해둔다. 보통 다음과 같이 구성되어 있다.

```powershell
# 예시
# connectionName: [프로젝트명]:[리전위치]:[인스턴스 이름]

connectionName: project11:asia-northeast1:
```

<br>

## 3. Cloud SQL 실행하기

앞서 발급받은 `connectionName`을 사용하여 Cloud SQL Proxy를 실행할 수 있다.

```powershell
$ ./cloud_sql_proxy -instances="[connectionName]"=tcp:5432
```

이렇게 하면 로컬환경과 생성해준 Cloud SQL 인스턴스를 연결하는 테스팅 환경이 생긴다.

데이터 베이스는 `psql`로 간단히 만들고 마이그레이션 해주었다.

데이터베이스 테이블명과 비밀번호는 `settings.py`에 필요한 정보지만 외부에 노출되면 안되니 **환경변수**로 지정하거나 따로 **시크릿 파일**을 만들어서 관리하면 된다. 나 같은 경우에는 환경변수로 등록해주었다.

```
$ export DATABASE_USER=<만들어준 유저명>
$ export DATABASE_PASSWORD=<비밀번호값>
```

그리고 데이터베이스 설정을 장고 내 설정파일(`settings.py`)에 넣어준다.

```python
DATABASES = {
    'default': {
        # If you are using Cloud SQL for MySQL rather than PostgreSQL, set
        # 'ENGINE': 'django.db.backends.mysql' instead of the following.
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': '[test-db-name]',
        'USER': os.getenv('DATABASE_USER'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD'),
        'HOST': '127.0.0.1',
        'PORT': '5432',
    }
}
```

<br>

## 4. 마치며

다음 포스팅에서는 서비스 계정을 생성하여 Kubernetes 엔진 환경을 구성하는 방식에 대해 설명할 예정이다.

<br>
