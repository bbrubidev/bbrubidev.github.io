---
title: JS _ 24. JQuery 맛보기
date: 2017-10-24
tags:
- javascript
- jquery
- basic grammar
---

이번 포스트에서는 자바스크립트의 강력한 라이브러리인 `제이쿼리`(`JQuery`)에 대해 간단히 소개한다. 제이쿼리는 자바스크립트의 대표적인 라이브러리다. 이미 구현되어 있는 애니메이션 효과나 양식 처리, 비디오 등의 처리를 편리하게 구현할 수 있다.

<br>

## 제이쿼리 (JQuery) 사용해보기

JQuery는 스크립트를 다운받아 사용할 수도 있고 간편하게 CDN 스크립트를 HTML 파일에 추가해서 써도 된다.

<a href="https://jquery.com/" target="_blank">JQuery 홈페이지 바로가기</a>

<a href="https://code.jquery.com/" target="_blank">JQuery CDN 다운받기</a>

여기서는 실습을 위해 CDN 코드를 넣어 사용하였다.

```html
<body>
    ...
    <!-- JQuery CDN은 다른 스크립트보다 상단에 위치시킨다. -->
    <script
  src="https://code.jquery.com/jquery-1.12.4.min.js"
  integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
  crossorigin="anonymous"></script>

    <!--기타 커스텀 스크립트 파일들-->
    <script src="45_jquery.js"></script>
</body>
```

<br>

JQuery를 사용하면 자바스크립트만 사용하는 것보다 확실히 태그에 접근하기가 더 쉽다.

```js
var myPara = document.getElementById("content").getElementsByTagName("p")[5];

/* jquery를 사용할 경우 같은 태그를 더 쉽게 찾을 수 있다.
찾으려는 태그는 클래스/태그명과 css 속성으로 찾는다. */
var myPara2 = $("#content p:last-child");
```

<br>

JQuery로 할 수 있는 간단한 예제들이다.

```js
// class 속성 추가/삭제
myPara2.addClass("test");
myPara2.removeClass("test");

// 효과 주기
myPara2.fadeOut();  // 서서히 사라지는 효과
myPara2.fadeIn();  // 서서히 나타나는 효과

// css 속성 주기
myPara2.css({position: "relative", color: "red"});

// animation 효과 주기
myPara2.animate({left: 40px});  // 왼쪽에서 40px 이동
```

<br>
