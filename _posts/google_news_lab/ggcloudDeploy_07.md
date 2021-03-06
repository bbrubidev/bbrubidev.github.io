---
title: Google News Lab > 장고로 만든 웹사이트에 커스텀 파비콘(.ico) 적용시키기
date: 2018-02-11
tags:
- Google News Lab
- Django
- favicon
---

장고 프로젝트를 생성하고 처음 로컬서버를 실행했을 때 항상 마주하는 로그가 있다. 바로 이것!

<br>

![파비콘이 적용안됨](imgs/2018-02-11/noico.png)

장고는 기본 `.ico` 파일을 기본적으로 제공하지 않는다. 결국 로컬 서버는 파일을 찾을 수 없다는 `404` 로그를 남긴다.

<br>

파비콘은 영어로 `favicon`이라 쓰고, 'favorites'와 'icon' 을 합쳐서 부르는 말인데, **인터넷 웹브라우저의 주소창에 표시되는 웹사이트나 웹페이지를 대표하는 아이콘**이다.

이런 처리는 매우 사소하지만 배포 환경에서 빈 이미지를 띄우는 것보다는 로고 이미지라도 하나 있는 것이 웹사이트 완성도에 기여한다고 생각해서 적용시키고 간단히 포스팅을 남긴다.

<br>

## 1. 파비콘 이미지 준비하기

현재 제작중인 웹페이지의 로고를 이미지로 사용했다. 이 이미지는 기본적으로 `.png` 확장자를 가진 파일이다.

해당 파일을 아래 사이트에서 `.ico` 파일로 변환시켜준다. 그러면 사이트에서 알아서 변환하여 `.ico` 파일을 다운받을 수 있도록 해준다.

<br>

<a href="http://convertico.com/" target="_blank">파비콘 이미지로 사용할 .png 파일을 `.ico`확장자로 변환해주는 사이트</a>


![파비콘 제작 사이트](imgs/2018-02-11/faviconmakingsite.png)


<br>

## 2. 파비콘 적용하기

만든 `.ico` 파일은 장고 프로젝트 내 `static`폴더에 넣어준다. 그리고 경로를 기억해둔다. 나는 아래의 경로에 넣어주었다.

```txt
/static/images/logo.ico
```


<br />


템플릿 폴더 내에 `base.html` 파일의 `<head>` 태그 내에 링크를 생성해준다. 장고의 템플릿 태그를 써서 위의 경로를 지정해주었다.

```html
<!--common/base.html-->

{% raw %}{% load staticfiles %}{% endraw %}
<!DOCTYPE html>
<html lang="en">
  <head>
	<link rel="icon" href="{% raw %}{% static 'images/logo.ico' %}{% endraw %}">
	...
  </head>
```

웹사이트 배포를 마친 상태라면 static 서버에 이미지가 저장된 경로로 찾아갈 수 있도록 후작업이 필요하다.

<br />

## 3. 완성!

로컬 서버를 다시 돌려보면 아래와 같이 파비콘이 적용된 모습을 볼 수 있다!

![파비콘 적용](imgs/2018-02-11/ico.png)

<br />
