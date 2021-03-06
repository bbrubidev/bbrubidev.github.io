---
title: Web _ 1.3 앱 생성 및 모델링
date: 2017-09-16
tags:
- Django
- Project
- Web development
---

이번 포스트는 'Wordy Gallery' 프로젝트 전반의 앱 구성과 데이터베이스 모델링 설계를 바탕으로 작성하였다.

<br>

## Database ERD

![WordyGalleryERD](imgs/2017-09-16/WordyGalleryERD.png)

- `MyUser` : 사용자 정보를 저장
- `Art` :  작품과 그 상세 정보를 저장
- `Genre` : 작품별 장르 정보를 저장
- `Motif` : 사용자가 생성한 '댓글의 주제'를 저장
- `Comment` : 사용자가 입력한 댓글 정보를 저장

<br>

## 장고 ORM을 사용한 모델링

설계시 중요하다고 생각했던 사항들을 정리하였다. 관련 코드는 <a href="https://github.com/Monaegi/Julia-WordyGallery" target="_blank">Github 링크</a>을 참조하기 바란다.

**(1) MyUser**

제일 먼저 유저모델은 `AbstractBaseUser`를 상속받아 커스텀으로 정의하였다. 이렇게 만들어 줄 경우에는 `MyUserManager`로 사용자 및 관리자를 생성하는 유저매니저 또한 새로 정의해주어야 한다.

사용자가 회원가입을 할 때 장고의 기본 회원가입을 사용하거나 페이스북 정보를 받아와 해당 DB에 저장하는 방식으로 나뉠 예정이다. 따라서 `user_type` 필드를 정의하고 `USER_TYPE_CHOICES`에 각각 장고, 페이스북 로그인 사용자로 분류하여 저장될 때 어떤 사용자인지 표시하도록 하였다.

장고 어드민 페이지를 사용할 경우에는 반드시 `get_full_name`과 `get_short_name`을 `MyUser`내에 정의해주어야 한다. 장고 어드민페이지 로그인 시 앞서 언급한 두 메서드를 사용하여 로그인 사용자의 이름을 렌더하기 때문이다.

마지막으로, 사용자 로그인 시 필요한 토큰 생성 메서드를 정의해주었다. 본 프로젝트에서 사용자 로그인은 장고의 `REST FRAMEWORK` 내 `토큰 기반 인증`을 사용할 것이므로 <a href="http://www.django-rest-framework.org/api-guide/authentication/" target="_blank">REST-Authentication 관련 문서</a>를 참고하여 해당 메서드를 정의해주었다.

<br>

**(2) Art**

페이지에 표시할 작품정보를 저장할 수 있도록 설계하였다.

<br>

**(3) Genre**

하나의 작품은 여러 개의 장르에 속할 수 있고 장르 또한 여러 개의 작품과 연결될 수 있다. 따라서 `Art`모델과 `다대다 관계(ManyToManyField)`로 정의해준다. 이 때 필드명에 `related_name`을 따로 정의하여 연결된 필드와 이름이 겹치지 않도록 하는 것이 좋다.

장르를 세분화하고 장르에 따라 분류된 작품들의 목록을 출력하려면 따로 작품에 하나의 `column`으로 저장하기 보다는 따로 모델을 정의해주는 것이 좋다.

<br>

**(4) Motif**

`motif`는 예술계에서 주제, 소재를 의미하는 단어로 쓰인다. 사용자가 작품을 보고 이야기하고 싶은 주제가 있을 경우 모티프를 생성하여 해당 주제와 관련된 의견을 댓글로 작성할 수 있도록 설계하였다. `Motif` 모델에는 작품별로 생성된 주제의 연결관계를 저장할 수 있도록 설계하였다.

<br>

**(5) Comment**

사용자가 작성하는 의견, 즉 댓글은 모두 `Comment` 모델에 저장된다. 댓글은 주제별로 분류되어야 하므로 관련 `Motif`를 `다대일 관계`로 가진다. 이외 댓글을 작성할 때 필요한 작성자, 작성일 등의 정보를 저장한다.

<br>

## URI 설계

| 분류 | 기능 | URI |
|:---:|:----:|:---:|
|인증페이지|로그인|`^member/login$`|
|인증페이지|페이스북 로그인|`^member/login-facebook$`|
|인증페이지|회원가입|`^member/signup$`|
|인증페이지|로그아웃|`^member/logout$`|
|인증페이지|사용자 프로필|`^member/profile/<user-id>$`|
|인증페이지|사용자 정보수정|`^member/profile/<user-id>/edit$`|
|인증페이지|사용자 탈퇴|`^member/profile/<user-id>/edit$`|
|기능페이지|작품 목록|`^art/gallery$`|
|기능페이지|작품 세부|`^art/<art-id>$`|
|기능페이지|장르 목록|`^art/genre/list$`|		
|기능페이지|장르별 작품 목록|`^art/genre/<genre-id>/list$`|

<br>

---

## 마치며

다음 포스트는 REST 프레임워크를 사용한 인증 관련 API에 대해 설명할 것이다.

<br>
