---
title: BookReview > Two Scoops of Django _ 3장. 장고 프로젝트 구성하기
date: 2017-09-19
tags:
- book review
- Django
---

장고는 파이썬으로 쉽게 웹개발에 필요한 구조와 클래스를 제공하는 프레임워크이다.(<a href="http://juliahwang.kr/django/2017/09/07/%EC%9E%A5%EA%B3%A0%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%84%B8%ED%8C%85%ED%95%98%EA%B8%B0.html" target="_blank">더 읽어보기 - 1편. 장고 프로젝트 세팅하기</a>) 이번 포스트에서는 투스쿱 도서 3장을 정리하면서 장고의 프로젝트를 구성하는 다양한 방법에 대해 소개하고자 한다.

<br>


## 장고에서 제공하는 프로젝트 레이아웃

장고에서 프로젝트 및 앱을 생성하는 명령어는 다음과 같다.(~~장고가 설치되었다는 전제 하에 실행한다~~)

```powershell
# 장고가 설치된 위치에서

$ django-admin startproject [project-name]
$ cd [project-name]   # 생성된 프로젝트 폴더 내로 이동
$ django-admin startapp [app-name]
```

위의 명령어를 실행할 경우 다음과 같은 프로젝트 구조가 만들어진다.


```powershell
$ tree .
.
└── bookpractice  # [repository_root]
    ├── README.md
    └── django_app  # [django_project_root]  
        ├── config  # [config_root]
        │   ├── __init__.py
        │   ├── settings.py
        │   ├── urls.py
        │   └── wsgi.py
        ├── flavors
        │   ├── __init__.py
        │   ├── admin.py
        │   ├── apps.py
        │   ├── migrations
        │   │   └── __init__.py
        │   ├── models.py
        │   ├── tests.py
        │   ├── urls.py
        │   └── views.py
        └── manage.py
```

프로젝트 구조를 단순화하면 다음과 같은 루트폴더 구조가 생성되는데, 하나씩 살펴보자.

```powershell
# [repository_root]/
  # [django_project_root]/
    # [configuration_root]/
```

<br>

### 최상위 레벨 : 저장소 루트 (repository_root)

최상위 루트 디렉토리는 프로젝트의 최상위 절대 루트이다. 해당 위치에는 다음과 같은 파일들이 위치한다.

- git 폴더 및 .gitignore
- requirements.txt
- 배포용 설정파일
- README.md
- 프로젝트 루트폴더 등


<br>

### 두번째 레벨 : 장고 프로젝트 루트 (django_project_root)

두 번째 레벨은 장고 프로젝트에 필요한 모든 소스코드가 위치하는 디렉토리다. 프로젝트를 생성할 때 명령어를 구분해보면 다음과 같다.

```powershell
$ django-admin startproject [project-name] .
# 현재 위치에 바로 프로젝트 구조를 생성한다.
# 즉, manage.py와 프로젝트 폴더가 현재 경로에 설치된다.

├── manage.py
├── mysite
   ├── __init__.py
   ├── settings.py
   ├── urls.py
   └── wsgi.py
```

```powershell
$ django-admin startproject [project-name]
# 현재 위치에 폴더를 생성하여 내부에 프로젝트 루트폴더 및 manage.py를 설치해준다.

├── mysite2
    ├── manage.py
    └── mysite2
        ├── __init__.py
        ├── settings.py
        ├── urls.py
        └── wsgi.py
```

<br>

### 세번째 레벨 : 설정 루트 (configuration_root)

프로젝트의 기본 설정 파일들이 존재하는 디렉터리다. 그리고 기본이 되는 url들이 저장되는 `urls.py`도 있다. 해당 디렉토리는 반드시 유효한 파이썬 패키지로, `__init__.py`를 포함하고 있어야 한다.
`startproject` 명령어를 실행할 경우 자동으로 생성되는 폴더이기도 하다.

<br>

## startproject 살펴보기

앞서 살펴보았듯이 장고의 `startproject` 명령은 기본 장고 프로젝트 템플릿을 생성하고 바로 프로젝트 개발에 필요한 구조를 만들어준다. 도서에서는 직접 구조를 빌드하는 방법 이외에 저자가 직접 개발한 <a href="https://github.com/pydanny/cookiecutter-django" target="_blank">`cookiecutter`라는 패키지</a>를 소개하고 있어 한번 사용해보았다.

<br>

### cookiecutter 사용해보기

쿠키커터가 하는 일은 세 가지이다.

- 여러가지 설정 스크립트를 통해 설정 변수의 내용을 물어본다.
- 입력된 값을 기반으로 프로젝트 표준 코드 구성에 필요한 파일을 제작한다.
- 세팅, requirements, 초기문서, 테스트 환경 등을 지정할 수 있다.

사용방법은 매우 간단하다. `pip` 명령어로 간단히 설치하고 깃헙 주소를 클론하는 방식으로 설치하면 된다.

```powershell
$ pip install "cookiecutter>=1.4.0"
```

설치가 완료되면 `cookiecutter`명령어를 사용하여 깃헙의 소스를 받아온다. 그리고는 프로젝트 구성에 필요한 스크립트가 자동으로 실행되어, 필요한 것만 `y`로 대답해주면 된다.

```powershell
$ cookiecutter https://github.com/pydanny/cookiecutter-django
project_name [Project Name]: django_app
project_slug [django_app]: icecream
author_name [Daniel Roy Greenfeld]: julia
email [you@example.com]: qufskan9396@gmail.com
description [A short description of the project.]: testing cookiecutter package
domain_name [example.com]: None
version [0.1.0]: 0.0.1
timezone [UTC]: asia/seoul
use_whitenoise [y]: n
use_celery [n]: y
use_mailhog [n]: n
use_sentry_for_error_reporting [y]: y
use_opbeat [n]: n
use_pycharm [n]: y
windows [n]: n
use_docker [n]: y
use_heroku [n]: n
use_elasticbeanstalk_experimental [n]: n
use_compressor [n]: n
Select postgresql_version:
1 - 9.6
2 - 9.5
3 - 9.4
4 - 9.3
5 - 9.2
Choose from 1, 2, 3, 4, 5 [1]: 2
Select js_task_runner:
1 - Gulp
2 - Grunt
3 - None
Choose from 1, 2, 3 [1]: 3
custom_bootstrap_compilation [n]: n
Select open_source_license:
1 - MIT
2 - BSD
3 - GPLv3
4 - Apache Software License 2.0
5 - Not open source
Choose from 1, 2, 3, 4, 5 [1]: 1
```

위의 세팅으로 만들어진 프로젝트 구조는 다음과 같다.

```powershell
$ tree .
.
├── CONTRIBUTORS.txt
├── LICENSE
├── README.rst
├── compose
│   ├── local
│   │   └── django
│   │       ├── Dockerfile
│   │       ├── celery
│   │       │   ├── beat
│   │       │   │   └── start.sh
│   │       │   └── worker
│   │       │       └── start.sh
│   │       └── start.sh
│   └── production
│       ├── caddy
│       │   ├── Caddyfile
│       │   └── Dockerfile
│       ├── django
│       │   ├── Dockerfile
│       │   ├── celery
│       │   │   ├── beat
│       │   │   │   └── start.sh
│       │   │   └── worker
│       │   │       └── start.sh
│       │   ├── entrypoint.sh
│       │   └── gunicorn.sh
│       └── postgres
│           ├── Dockerfile
│           ├── backup.sh
│           ├── list-backups.sh
│           └── restore.sh
├── config
│   ├── __init__.py
│   ├── settings
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── local.py
│   │   ├── production.py
│   │   └── test.py
│   ├── urls.py
│   └── wsgi.py
├── docs
│   ├── Makefile
│   ├── __init__.py
│   ├── conf.py
│   ├── deploy.rst
│   ├── docker_ec2.rst
│   ├── index.rst
│   ├── install.rst
│   ├── make.bat
│   └── pycharm
│       ├── configuration.rst
│       └── images
│           ├── 1.png
|           ├── ...생략 ...
│           └── issue2.png
├── env.example
├── icecream
│   ├── __init__.py
│   ├── contrib
│   │   ├── __init__.py
│   │   └── sites
│   │       ├── __init__.py
│   │       └── migrations
│   │           ├── 0001_initial.py
│   │           ├── 0002_alter_domain_unique.py
│   │           ├── 0003_set_site_domain_and_name.py
│   │           └── __init__.py
│   ├── static
│   │   ├── css
│   │   │   └── project.css
│   │   ├── fonts
│   │   ├── images
│   │   │   └── favicon.ico
│   │   ├── js
│   │   │   └── project.js
│   │   └── sass
│   │       ├── custom_bootstrap_vars.scss
│   │       └── project.scss
│   ├── taskapp
│   │   ├── __init__.py
│   │   └── celery.py
│   ├── templates
│   │   ├── 403_csrf.html
│   │   ├── 404.html
│   │   ├── 500.html
│   │   ├── account
│   │   │   ├── account_inactive.html
│   │   │   ├── base.html
│   │   │   ├── email.html
│   │   │   ├── email_confirm.html
│   │   │   ├── login.html
│   │   │   ├── logout.html
│   │   │   ├── password_change.html
│   │   │   ├── password_reset.html
│   │   │   ├── password_reset_done.html
│   │   │   ├── password_reset_from_key.html
│   │   │   ├── password_reset_from_key_done.html
│   │   │   ├── password_set.html
│   │   │   ├── signup.html
│   │   │   ├── signup_closed.html
│   │   │   ├── verification_sent.html
│   │   │   └── verified_email_required.html
│   │   ├── base.html
│   │   ├── bootstrap4
│   │   │   ├── field.html
│   │   │   └── layout
│   │   │       └── field_errors_block.html
│   │   ├── pages
│   │   │   ├── about.html
│   │   │   └── home.html
│   │   └── users
│   │       ├── user_detail.html
│   │       ├── user_form.html
│   │       └── user_list.html
│   └── users
│       ├── __init__.py
│       ├── adapters.py
│       ├── admin.py
│       ├── apps.py
│       ├── migrations
│       │   ├── 0001_initial.py
│       │   └── __init__.py
│       ├── models.py
│       ├── tests
│       │   ├── __init__.py
│       │   ├── factories.py
│       │   ├── test_admin.py
│       │   ├── test_models.py
│       │   ├── test_urls.py
│       │   └── test_views.py
│       ├── urls.py
│       └── views.py
├── local.yml
├── manage.py
├── production.yml
├── pytest.ini
├── requirements
│   ├── base.txt
│   ├── local.txt
│   ├── production.txt
│   └── test.txt
├── setup.cfg
└── utility
    ├── install_os_dependencies.sh
    ├── install_python_dependencies.sh
    ├── requirements-jessie.apt
    ├── requirements-trusty.apt
    └── requirements-xenial.apt
```

사용해본 경험 상으로는 너무 많은 것이 만들어진 느낌이었다. 도서에서는 `cookiecutter-django`가 **원래 장고에서 제공하는 기본 구성보다 더 많은 것을 제공하기 위해 만들어진 패키지**라고 소개되어 있다.

필요한 것이 많지 않은 프로젝트를 시작할 경우에는 장고가 제공하는 기본 프로젝트 구조에서 시작하여 빌드해나가는 것이 낫겠다는 생각이 들었다.

대안 템플릿으로는 `django-kevin`이라는 패키지 또한 소개하고 있었는데, 해당 패키지의 제작자인 케빈 쉬는 도서의 저자가 개발한 `Two Scoops project`를 포크하여 장고 `1.8` 버전에 맞게 업데이트 했다고 한다. 이 패키지는 `npm`과 `grunt`를 사용하여 쿠키커터 패키지보다 좀더 설치과정이 길었다. 직접 사용하려면 <a href="https://github.com/imkevinxu/django-kevin" target="_blank">링크</a>를 클릭하여 진행하면 된다.

<br>

---

## 마치며

지금까지 소개한 장고 프로젝트 빌드 패키지 링크는 다음과 같다.

- <a href="https://github.com/twoscoops/django-twoscoops-project" target="_blank">django-twoscoops-project</a>
- <a href="https://github.com/pydanny/cookiecutter-django" target="_blank">cookiecutter-django</a>
- <a href="https://github.com/imkevinxu/django-kevin" target="_blank">django-kevin</a>

패키지를 사용하는 것에는 장단점이 있다. 손쉽게 프로젝트 구조를 생성하여 프로젝트 개발에만 집중할 수 있다는 점이 장점이라면, 제공하는 스크립트가 한정되어 있어 필요한 것을 추가해야한다거나 직접 빌드해볼 수 있는 연습을 충분히 하지 못할 수 있다는 단점도 존재한다.

장고의 초심자들은 먼저 장고에서 제공하는 파일 구조를 익힌 다음 패키지를 사용해보는 것도 좋겠다.

<br>
