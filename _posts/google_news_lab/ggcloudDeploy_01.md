---
title: Google News Lab > 1. 구글 클라우드 플랫폼을 사용한 배포 전 준비
date: 2018-01-29
tags:
- Google News Lab
- Django
---

오늘 포스팅은 오랜만에 삽질하며 구글 클라우드 플랫폼으로 장고 프로젝트 배포를 성공했기에, 그 방법을 다시 한번 숙지할 겸 공유하고자 한다.

<br>

## 근황보고

현재 구글 뉴스랩 프로그램에 개발자로 참여하여 뉴스컨텐츠 제작 작업을 진행하고 있다. 뉴스랩 활동에 대해서는 프로그램이 끝나고 따로 포스팅할 예정이다 :) (블로그 활동이 뜸한 이유는 바로 이것때문!ㅋㅋ)

<br>

## 시작 전 구상하기

AWS로 배포를 한번 해봤던 터라 배포과정은 대략적으로 다음과 같이 구상했다.

`장고 프로젝트 생성(데이터베이스 포함)` > `웹서버 구축` > `도커이미지 생성` > `구글 엔진에 이미지 배포`

하지만 AWS와 구글 엔진 작동 원리는 좀 달랐다.
구글의 기본 스탠다드/플렉시블 엔진을 사용할 경우 배포 설정이 담긴 `app.yaml`와 `requirements.txt`만 있으면 배포가 된다.

도커 이미지를 배포하려면 다른 엔진을 써야했는데,  
처음에는 컴퓨트 엔진에 바로 도커이미지를 태울까 생각도 했었지만 장고의 도커이미지를 올리는 데 `Kubernete` 엔진이 적합하다는 튜토리얼의 문구를 믿고(...선택의 여지가 없었다. 문서가 너무 빈약함) 따라해보기로 했다.

<a href="https://cloud.google.com/python/django/kubernetes-engine" target="_blank">문서 바로가기 - Deploying Djnago with Kubernetes Engine</a>

<br>

## 1. 장고 프로젝트 생성

먼저 배포할 장고 프로젝트를 생성한다. 생성하는 방법은 <a href="#" target="_blank">여기</a>에 따로 설명해놓았는데, 주의할 점은 `pyenv`를 사용하지 않고 `virtualenv`를 사용할 것이기 때문에 가상환경 설정은 따로 설명한다.

`Github`에 <a href="https://github.com/juliahwang/pilter_web/tree/master/" target="_blank">소스코드</a>를 올려놓았다.
프로젝트를 만든 후 파일구조는 다음과 같다.

```powershell
./django_app
.
├── README.md
├── __init__.py
├── article
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   ├── models.py
│   ├── tests.py
│   ├── urls.py
│   └── views.py
├── config
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── static
└── templates
```

<br>

## 2. 가상환경 설정하기

**구글엔진을 쓰면서 가장 불편했던 점은 커멘드라인 툴이 파이썬 2.7까지만 호환된다는 점이다.** 거기다가 개발은 파이썬 3으로 하라고 권장하니, 하나의 폴더 내에 2개의 가상환경을 만들어서 서로 바꿔가며 써야했다.

이에 `virtualenv`를 사용했다.

```powershell
$ virtualenv --python=python2 pilter2
$ virtualenv --python=python3 pilter3
```

`pilter2`와 `pilter3`에 각각 파이썬2, 파이썬3을 설정하여 가상환경을 만들면 된다.

```powershell
$ virtualenv env
$ source env/bin/activate
$ pip install -r requirements.txt
```

<br>

### (1) requirements.txt

쿠버네트 엔진에서 장고를 배포할 때 필요한 패키지는 다음과 같다.

```txt
Django==1.10
wheel==0.30.0
gunicorn==19.7.1
psycopg2==2.7.3.2
Pillow==5.0.0   (--> ImageField를 쓰지 않는다면 생략 가능)
```

<br>

## 3. 준비사항

### (1) 빌링 허용하기

구글 서비스를 사용하기 위해 <a href="https://console.cloud.google.com" target="_blank">구글 클라우드 콘솔</a>로 접속한다. 첫 가입시 무료 크레딧 300개를 주니 해당 크레딧으로 빌링을 등록한다. 빌링을 등록해야 인스턴스, 데이터 스토리지 등의 서비스를 사용할 수 있다.

<br>

### (2) Google Cloud SDK 설치하기

구글 클라우드 플랫폼에서 제공하는 리소스, 툴, 라이브러리 등을 사용하기 위해서는 SDK를 다운받아야한다. <a href="https://cloud.google.com/sdk/docs/" target="_blank">여기</a>서 자신의 컴퓨터 사양에 따라 다운받으면 된다. (아무데나 위치시켜도 되지만 나는 해당 폴더를 프로젝트 폴더 경로 내에 넣어주었다.)

받고 나서는 설치 파일을 실행해주고, 초기화를 진행해준다.

```powershell
# 설치파일 실행
$ ./google-cloud-sdk/install.sh
# 설치파일 실행후에는 터미널 다시 열기!

# 초기화
$ ./google-cloud-sdk/bin/gcloud init
```

이제 콘솔에서 `gcloud`, `gsutil` 등의 커맨드 라인 툴을 사용할 수 있다.

문서를 보면 API를 활성화하라고 하는데, 나는 권한이 없어서 따로 해주지 않았다... 살펴보니 Google Cloud SQL API만 있으면 되는 것 같다.(직접 쓸 것이므로)  

<br>

## 4. 마치며

다음 포스팅에서는 Cloud SQL Proxy를 통하여 PostgreSQL 데이터베이스를 생성, 연결하는 방법에 대해 설명할 예정이다.

<br>
