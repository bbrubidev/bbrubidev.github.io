---
title: Google News Lab > 4. Kubernetes 버킷 및 클러스터 엔진 생성
date: 2018-01-29
tags:
- Google News Lab
- Kubernetes
- Django
---

이번 포스팅에서는 Google Cloud Storage를 사용하여 정적 파일을 저장해줄 버킷을 생성하고 연동하는 방법에 대해서 알아볼 예정이다.

<br>

## 1. Cloud Storage에 버킷 생성

구글 클라우드 플랫폼에서는 Gunicorn 서버를 사용하여 앱을 배포한다. 하지만 Gunicorn 서버는 정적 파일을 서빙하지 않기 때문에 따로 Cloud Storage를 생성하여 정적파일을 서빙해줘야 한다.


먼저 버켓을 생성하고 기본적으로 버켓을 공개해놓는다.

```powershell
# 버켓 생성
$ gsutil mb gs://<버켓이름>

# 기본 공개 설정
$ gsutil defacl set public-read gs://<버켓이름>
```

<br>

장고로 돌아와서, 프로젝트 내의 정적파일을 한 폴더에 모아준다.

```powershell
$ ./manage.py collectstatic
```

<br>

파일이 `static/` 안에 모두 모였다면 버켓과 해당 폴더를 연결해준다.


```powershell
# gsutil rsync -R static/ gs://<버켓이름>/static
```

연결해 준 후에는 `settings.py`의 `STATIC_URL`을 다음과 같이 바꿔준다.

```python
# settings.py

STATIC_URL="http://storage.googleapis.com/<버켓이름>/static/"
```

완료! 이제 Kubernetes 엔진을 생성해보자.

<br>


## 2. Kubernetes 엔진 클러스터 생성하기

### (1) 클러스터 생성

<a href="https://console.cloud.google.com/kubernetes" target="_blank">
Kubernetes 엔진 콘솔 페이지</a>에서 엔진 준비가 된 것을 확인한 후에 다음 명령어로 클러스터를 만들어준다.

```powershell
$ gcloud container clusters create test-app \
  --scopes "https://www.googleapis.com/auth/userinfo.email","cloud-platform" \
  --num-nodes 2 --zone "asia-northeast1-a"
```

<br>

### (2) 클러스터 확인

클러스터를 만들고 나서는 `kubectl` 명령어로 클러스터 설정을 제공할 예정이므로 만들어준 클러스터 인스턴스를 쓸 것임을 다음 명령어로 확인해준다.

```
$ gcloud container clusters get-credentials test-app --zone "asia-northeast1-a"
```

<br>

### (3) 클러스터 시크릿파일 설정

인스턴스 수준의 접근을 허용하는 크레덴셜 파일을 생성한다. 해당 json 파일은 서비스 계정 생성시 받은 파일이다.

```powershell
$ kubectl create secret generic cloudsql-oauth-credentials --from-file=credentials.json=[프로젝트 내 credentials.json의 상대경로]
```

<br>

두 번째 시크릿 파일은 데이터베이스에 접근하기 위한 파일이다.

```powershell
$ kubectl create secret generic cloudsql --from-literal=username=[데이터베이스 사용자명] --from-literal=password=[비밀번호값]
```

두 파일 모두 만들어 주면 엔진 사용설정은 끝이 난다.

<br>
