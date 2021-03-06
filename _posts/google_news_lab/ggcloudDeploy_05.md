---
title: Google News Lab > 5. 도커파일 생성 및 배포
date: 2018-01-29
tags:
- Google News Lab
- Kubernetes
- Django
- Docker
- Gunicorn
---

이번 배포에서는 웹서버로 `gunicorn`을 사용하였는데, 도커파일 생성하는 방법과 함께 웹서버를 어떻게 구성했는지 설명할 예정이다. 또, 배포 마지막 단계에 대해 서술했다.

<br>

## 1. Gunicorn 서버설정 + 도커파일 생성

### (1) 도커파일 작성

```docker
FROM gcr.io/google_appengine/python

# Create a virtualenv for the application dependencies.
# # If you want to use Python 3, add the -p python3.4 flag.
RUN virtualenv /env
ENV PATH /env/bin:$PATH

ADD requirements.txt /app/requirements.txt
RUN /env/bin/pip install -r /app/requirements.txt
ADD . /app

COPY start.sh /start.sh

EXPOSE 80 8000


CMD gunicorn -b :$PORT config.wsgi
CMD ["/start.sh"]
```

만들어준 도커파일은 위와 같다. 기본으로 제공하는 도커파일과 다른 점이 있다면 나는 Gunicorn 서버를 직접 실행해서 연결해줬다는 점이다.

<br>

### (2) Gunicorn 서버 설정

이를 위해서 해당 폴더 경로에 Gunicorn 서버를 실행해주는 `start.sh`를 만들어줬다.

로컬에서 테스팅할 때나 도커를 특정포트로 실행시킬 때 유용하게 사용했다.

```sh
#!/bin/bash

# Start Gunicorn processes
echo Starting Gunicorn.
exec gunicorn config.wsgi:application \
    --bind 0.0.0.0:8080 \
    --workers 3
```

다만 **주의할 점은 `bind`하는 포트번호를 `app.yaml`의 `TargetPort`와 동일하게 적어줘야한다는 점**이다. (나는 이걸 모르고 하루를 낭비했다...)

<br>

### (3) 도커 이미지 생성

구글에서는 Cloud SQL Proxy 서비스를 위해 기본적으로  퍼블릭 도커 이미지를 제공한다. 다음 명령어로 다운받을 수 있다.

```powershell
$ docker pull b.gcr.io/cloudsql-docker/gce-proxy:1.05
```

위의 이미지를 이용해서 내 도커이미지를 만들어준다.

```powershell
$ docker build -t gcr.io/[프로젝트명]/test .
```

만들어준 도커이미지는 다시 구글 컨테이너 레지스트리에 올려준다.

```powershell
$ gcloud docker push gcr.io/[프로젝트명]/test
```

이렇게 만든 도커이미지는 클라우드에서 액세스 가능한 프로젝트 스냅샷을 제공하게 된다.

<br>

## 2. 배포하기

도커이미지까지 모두 준비가 끝났다. 이제는 배포 환경설정 파일에 서비스를 만들어주는 환경설정을 추가해주는 일만 남았다.

```yaml
apiVersion: v1
kind: Service
metadata:
  name: test
  labels:
    app: test
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 8080
  selector:
    app: test
```

위의 기본 로드밸런서 설정을 `app.yaml`에 추가해준다.

다음 명령어로 설정을 클러스터에 등록해준다.

```powershell
$ kubectl create -f app.yaml
```

파일을 등록해준 후 몇 분 기다리면 `pod`가 생긴다. 이전 포스팅에서 클러스터를 생성할 때 `node=2`로 설정한 부분이다.  

`pods`를 실시간으로 확인하고 싶다면 다음 명령어를 사용하면 된다.

```powershell
$ kubectl get pods  
NAME                       READY     STATUS    RESTARTS   AGE
test-*******************   2/2      Running    0          3h
test-*******************   2/2      Running    0          3h
test-*******************   2/2      Running    0          3h
```
<br>

`Pods`들이 `Running` 상태인 것을 확인했다면 이제 외부 IP를 통해 브라우징이 가능하다. 세세한 오류들은 콘솔 홈페이지의 오류보고를 살펴보고 디버깅이 가능하다.

```powershell
$ kubectl get services test
```

이상으로 배포를 완료했다!

<br>

---

## 3. 마치며

AWS를 사용한 배포에 익숙한 나에게 선택권이 많고 레퍼런스를 찾기 힘든 구글 클라우드 엔진은 만만치 않은 툴이었다.

결국 배포 성공한 후 내가 얻은 깨달음은 어렵고 생소했다기 보다는 네트워크 설정에 너무 겁을 먹었다는 것이다. (마지막 에러를 해결했을 때 그 허무함이란...)

AWS로 배포하는 것과 잠시 비교를 해보자면 설정이 훨씬 줄어들었다는 점에서는 구글 클라우드를 칭찬할만 하지만 문서나 인터페이스는 아직 AWS에 비하면 한참 멀었다. ~~후발 주자니까 당연하겠지만...~~

그래도 오랜만에 일주일동안 머리 싸매고 배포를 해보니 개발에 대한 욕구가 샘솟는다! 헠헠! 이상으로 구글 클라우드로 장고 배포(~~고군분투~~)를 마친다.

<br>
