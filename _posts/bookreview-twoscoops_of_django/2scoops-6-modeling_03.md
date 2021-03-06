---
title: BookReview > Two Scoops of Django _  6장. 장고에서 모델 이용하기 <3부>
date: 2017-10-17
tags:
- book review
- Django
---

이번 포스트에서는 모델의 `_meta` API와 모델 매니저, 헬퍼 함수 등의 모델 인터페이스들에 대해 알아보고자 한다. 기본적인 모델에 대한 설명은 <a href="https://docs.djangoproject.com/en/1.11/topics/db/models/" target="_blank">장고 문서</a>를 참고하기 바란다.

<br>

## 1. 모델의 _meta API

장고 1.8이 되기 전까지 `_meta` API는 공식적이지 않았다. 원래의 목적은 모델, 즉 테이블에 대한 부가적인 정보를 장고 내부적으로 이용하기 위해서였다. 예를 들어 다음과 같은 일을 쉽게 처리할 수 있다.

- 모델 내 필드 정보를 가져올 경우

```powershell
# 모델의 필드 리스트를 가져오는 경우
>>> from django.contrib.auth.models import User
>>> User._meta.get_fields()
(<ManyToOneRel: admin.logentry>,
 <django.db.models.fields.AutoField: id>,
 <django.db.models.fields.CharField: password>,
 <django.db.models.fields.CharField: username>,
 <django.db.models.fields.EmailField: email>,
 <django.db.models.fields.DateTimeField: date_joined>,
 <django.db.models.fields.related.ManyToManyField: groups>,
 <django.db.models.fields.related.ManyToManyField: user_permissions>)


# 모델의 특정 필드를 가져올 경우
>>> User._meta.get_field('username')
<django.db.models.fields.CharField: username>
```

<br>

- 모델 내 특정 필드의 클래스를 가져올 경우
	- 특히 상속 관계를 가져올 때 유용하다.
-  장고 모델이 잘 생성되고 구조화되었는지 검사할 경우
- 외부 라이브러리를 사용해서 모델을 커스터마이징할 경우
- 모델 내의 데이터를 조정하거나 변경할 수 있는 일종의 관리도구를 제작할 경우
- 시각화 혹운 분석의 목적으로 모델의 필드에 대한 분석이 필요할 경우


<br>

## 2. 모델 매니저

장고의 `모델 매니저`(Model Manager)는 **장고의 ORM에서 데이터베이스와 연동하는 인터페이스**이다. 원하는 모델 클래스를 제어하기 위해 모델 클래스(테이블 내 모든 데이터)의 모든 인스턴스에 작동이 가능하다. 또, 장고는 기본적으로 모델을 생성할 때마다 기본 모델 매니저를 제공하며, 우리가 원하는 목적에 맞는 모델 매니저를 생성할 수도 있다.

```python
from django.db import models
from django.utils import timezone


# 생성해준 커스텀 모델 매니저.
class PublishedManager(models.Manager):
    user_for_related_fields = True

    def published(self, **kwargs):
        return self.filter(pub_date__lte=timezone.now(), **kwargs)


class FlavorReview(models.Model):
    review = models.TextField()
    pub_date = models.DateTimeField()

    # 커스텀으로 만든 모델 매니저를 추가
    objects = PublishedManager()
```

만들어준 모델 매니저를 사용하려면 다음과 같이 사용하면 된다.

```powershell
$ FlavorReview.objects.filter().count()
35
$ FlavorReview.objects.published().count()
31
```

<br>

기존 모델 매니저를 변형해서 커스텀 모델 매니저를 만들게 되면 다음과 같은 문제가 발생할 수 있다.

- 모델을 상속받았을 때 추상화 기초 클래스의 자식 모델 클래스들은 부모 모델의 모델 매니저를 받지만 접합기반 클래스들의 자식 모델 클래스들은 그렇지 못하다.
- 모델 클래스에 적용되는 기본적인 모델 클래스는 장고가 기본으로 제공하는 것으로, 이를 바꾸어서 생기는 문제는 파이썬의 일반적인 패턴을 무시하는 것과 같다.

만약 기존 모델 매니저와 커스텀 모델 매니저를 함께 사용하고 싶은 경우 모델 클래스 내에 다음 구문은 반드시 상위에 배치한다.

```python
objects = models.Manager()
```

<br>

## 3. 거대 모델 이해하기

`거대 모델`(Fat Model)이란 **데이터 관련 코드를 뷰나 템플릿보다는 모델 메서드, 클래스 메서드, 프로퍼티, 매니저 메서드 등에 넣어 캡슐화(Encapsulation) 하는 것**이다.

위의 방식은 프로젝트 전체를 통틀어 코드 재사용을 개선할 수 있는 최고의 방법이다. 뷰나 템플릿에 로직을 배치하는 것보다 모델에 배치하려는 '리펙토링'이 이루어져오기도 했다.

하지만 모든 로직을 모델에 넣고 어플리케이션을 서빙하다보면 시간이 지남에 따라 거대 모델이 생겨나게 되며, 이는 반대로 테스트와 유지 보수를 어렵게 할 수 있다.

이를 막기 위해서는 모델 간 공통으로 사용할 수 있는 메서드나 프로퍼티를 그대로 유지한 채 로직만 `모델 행동`(`믹스인`, Mixin)으로 분리하여 관리하거나 `상태없는 헬퍼 함수`(Stateless Helper Function) 등으로 이전할 수 있다.

<br>

### (1) 모델 행동 (믹스인, MixIn)

모델 행동은 캡슐화와 구성화의 개념으로 이루어져 있다.

```python
# 기존 정의를 따른 모델 클래스
# blog.py

class BlogPost(models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
    slug = models.SlugField()
    author = models.ForeignKey(User, related_name='posts')
    create_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)
    publish_date = models.DateTimeField(null=True)
```

위의 클래스는 다음과 같이 줄이고 다른 모델 클래스와 공유하는 필드를 모델행동에서 불러와서 재사용할 수 있다.

```python
from .behaviors import Authorable, Permalinkable, Timestampable, Publishable


class BlogPost(Authorable, Permalinkable, Timestampable, Publishable, models.Model):
    title = models.CharField(max_length=255)
    body = models.TextField()
```

<br>

다음은 재사용가능한 필드를 정의한 모델 클래스들이다.

```python
# behaviors.py
class Authorable(models.Model):
    author = models.ForeignKey(User)

    class Meta:
        abstract = True


class Permalinkable(models.Model):
    slug = models.SlugField()

    class Meta:
        abstract = True


class Publishable(models.Model):
    publish_date = models.DateTimeField(null=True)

    class Meta:
        abstract = True


class Timestampable(models.Model):
    create_date = models.DateTimeField(auto_now_add=True)
    modified_date = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
```

<br>

### (2) 상태없는 헬퍼 함수

모델로부터 로직을 떼어내서 유틸리티 함수로 관리할 수도 있다. 대표적으로 커스텀 필드나 커스텀 퍼미션을 정의할 경우 `utils` 폴더에 생성하고 모델에서 임포트하여 사용한다.

<br>

---

## 참고 자료

<a href="http://blog.kevinastone.com/django-model-behaviors.html" target="_blank">장고 모델 행동 - 케빈 스톤(Kevin Stone)의 블로그</a>
