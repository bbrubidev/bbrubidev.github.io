---
title: BookReview > Two Scoops of Django _ 6장. 장고에서 모델 이용하기 <1부>
date: 2017-10-14
tags:
- book review
- Django
---


장고 프레임워크에서 모델은 서비스의 기본 구조이자 뼈대이다. 따라서 초기 모델링이 매우매우 중요하다.(~~아무리 강조해도 모자란다~~) 프로젝트를 진행하다가 새로운 모델을 추가하거나 기존 모델을 수정할 때도 전체 디자인을 고려하여 설계해야한다. 이번 포스트에서는 장고의 모델을 이용하는 방법과 주의할 점들에 대하여 알지 못했던 내용들을 정리해보고자 한다. 기본적인 모델에 대한 설명은 <a href="https://docs.djangoproject.com/en/1.11/topics/db/models/" target="_blank">장고 문서</a>를 참고하기 바란다.

<br>

## 1. 모델의 상속 스타일

장고에서는 세 가지 모델 상속방식을 제공하고 있다. 모델에서 중복되는 필드가 별로 없다면 상속은 굳이 사용하지 않아도 된다. 한두 개의 필드만 겹치는 경우에는 그냥 모델 두 개에 따로 필드를 각각 선언해주는 것이 낫다.

<br>

### (1) 추상화 기초 클래스 (abstract base class)

> 참고. 장고의 추상화 기초 클래스는 파이썬의 추상화 기초 클래스와 사용 목적이 다르다.

>> 파이썬의 `abc` 모듈(Abstract Base Class)에서 제공하는 추상화 클래스의 이용목적은 부모 클래스에서 상속을 받는 서브 클래스를 인스턴스화 했을 때 부모 클래스의 메서드들이 서브클래스에도 구현이 되었는지 점검해주는 데에 있다. 특히 클래스의 크기가 크고 선언해준 메서드들이 많을 때 버그를 미연에 방지하고 클래스 계층을 쉽게 관리할 수 있도록 해준다. <a href="https://dbader.org/blog/abstract-base-classes-in-python" target="_blank">파이썬 abc 모듈의 목적에 대해 더 읽어보기</a>

<br>

장고의 추상화 기본 클래스는 오직 상속받아 생성된 모델의 테이블만 데이터베이스에 생성된다.

|장점|단점|
|:---:|:---:|
|추상화 클래스에서 공통적인 필드를 제공하므로 불러와 사용하면 된다.|부모 클래스를 여러 모델에서 상속받을 수 있기 때문에 특정 모델에서만 독립적으로 사용할 수 없다.|
|추가적인 테이블이 생성되지 않으므로 성능에 영향을 미치지 않는다.|-|

<br>

### (2) 멀티 테이블 상속 (Multi-Table Inheritance)


`접합 상속`(Concrete Inheritance)이라고도 부른다. 부모 모델 클래스와 자식 모델 클래스 모두 테이블을 생성한다.

멀티 테이블 상속을 사용하여 여러 모델을 직접 연결하기 보다는 `OneToOneField`를 사용하거나 `ForeignKey`를 사용하여 조인을 해주는 것이 성능과 관리 측면에서 훨씬 효율적이다.

|장점|단점|
|:---:|:---:|
|부모와 자식 모두 테이블을 생성하므로<br> 쿼리가 용이하다.|상속받은 필드들 모두 부모 클래스의 필드로<br> 조인이 필요하므로 성능저하가 생길 수 있다.|
|부모 객체에서 자식 객체를<br> 호출할 수 있다.|성능에 대한 문제때문에 거의 사용하지 않는다.|

<br>

### (3) 프록시 모델 (Proxy Model)

기존 모델에 대해서만 테이블이 생성되고, 프록시모델 자체는 테이블을 생성하지 않는다.

|장점|단점|
|:---:|:---:|
|각기 다른 행위(behavior)를 하는<br> 모델을 생성하고 별칭을 붙일 수 있다.|모델 필드를 변경할 수 없다.|


<br>


모델에서 중복된 필드가 대부분이거나 계속에서 사용할 필드가 있는 모델을 생성해야한다면 보통 추상화 기초 클래스를 사용하여 공통 필드를 상속받아 사용한다.

<br>

## 2. 추상화 기본 클래스 상속해보기 - `TimeStampedModel`

모델마다 중복되는 생성일/수정일 필드를 `TimeStampedModel`이라는 하나의 추상클래스로 선언하여 여러 모델에서 각 필드를 일일히 선언해주지 않고 상속받아 사용할 수 있게끔 해주려고 한다.

```python
# core/models.py

from django.db import models


class TimeStampedModel(models.Model):
    """
    상속받으면 'created와 modified 필드를 자동으로 업데이트해주는 추상화 클래스
    """
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    # 해당 모델을 추상화 기본 클래스로 선언
    class Meta:
        abstract=True
```

<br>

위의 추상클래스는 다음 모델 클래스에서 상속받기만 하면 된다.

```python
# flavors/models.py

from django.db import models
from core.models import TimeStampedModel


class Flavor(TimeStampedModel):
    title = models.CharField(max_length=200)
```

`Flavor` 모델은 `TimeStampedModel`을 상속받았기 때문에  `created`와 `modified` 필드가 자동 생성 및 관리된다.

만약 `TimeStampedModel`을 멀티 테이블 상속으로 관리해야했다면 해당 테이블이 추가로 생성될 뿐만 아니라 필드의 데이터를 외부키로 쿼리하여 가져와야 하는 불편함이 있었을 것이다.  

<br>

## 3. 장고의 모델 관련 패키지 소개

||`django-model-utils`|`django-extensions`|
|:---:|:---:|:---:|
|역할|각 모델에서 공통적으로 필요로 하는<br> 일반적인 패턴을 상속받아 사용할 수 있게 <br>해주는 모델 관련 패키지|모든 앱에 모델 클래스를 자동으로<br> 로드해주는`shell_plus` 관리명령어 제공|
|단점|-|`작지만 분명한 앱`에 맞지 않게<br> 너무 다양한 기능을 포함하고 있음|


<br>

## 4. DB 마이그레이션

마이그레이션은 장고에서 제공하는 `django.db.migration` 모듈을 통해  ORM 과정을 거쳐 모델 별로 데이터베이스에  테이블을 생성하는 것을 말한다.

마이그레이션에 필요한 유용한 명령어들을 소개한다.

```powershell
# 새로운 앱 및 모델에 대해 django.db.migration을 실행하는 명령.
# 마이그레이션 파일을 생성한다.
$ python manage.py makemigrations

# 마이그레이션 파일을 토대로 DB에 테이블 생성하는 명령
$ python manage.py migrate

# DB에 마이그레이션을 실행하기 전에 생성된 코드를 살펴볼 수 있는 명령
$ python manage.py sqlmigrate

# 마이그레이션 생성 개수를 압축해주는 명령
$ python manage.py squashmigrations

# 외부 앱 마이그레이션
$ export MIGRATION_MODULES=<장고 마이그레이션 스타일로 이루어지지 않는 외부 앱의 클래스>
```

<br>

---

## 마치며

지금까지 모델 설계에서의 가장 중요한 개념인 상속에 대해 알아보았다. 또 데이터베이스로의 마이그레이션에 대해서도 유용한 명령어들을 배울 수 있었다. 2부에서는 장고 모델 디자인과 모델 매니저에 대해 알아볼 것이다.

<br>
