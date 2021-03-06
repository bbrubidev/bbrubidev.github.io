---
title: JS _ 18. DOM 활용하기 <2부>
date: 2017-10-20
tags:
- javascript
- basic grammar
---

지난 포스트에 이어 `DOM`을 활용하는 방식에 대해 실습을 통하여 소개한다. 값을 바꾸고 속성을 찾는 방법, 그리고 CSS 속성을 변경하는 방식에 대해 각각 정리하였다.

<br>

## 1. 실제 DOM에서 값 바꿔보기

```html
<div class="page-banner">
  <div class="banner-text">
    <h2>Javascript class for beginners</h2>
  </div>
</div>
```

위 HTML 코드에서 `h2` 태그 내의 텍스트를 바꿔보도록 하자.

```js
// myContent에 클래스명이 banner-text인 태그 값을 찾아 할당
> var myContent = document.getElementsByClassName("banner-text");
undefined
> myContent
[div.banner-text]

// 위 변수에서 내부 h2 값을 myH2에 할당
> var myH2 = myContent[0].getElementsByTagName("h2");
undefined
> myH2
[h2]

// myH2의 텍스트 값을 다른 값으로 변경
myH2[0].innerText = "hello!"
"hello!"
myH2[0].innerText
"HELLO!"
```

콘솔에서 실습해보면 브라우저에도 바뀐 값이 적용되어 있는 것을 확인할 수 있다.

<br>

**참고**

텍스트를 변경할 때 사용한 `innerHTML`이나 `textContent`는 모두 객체가 가지고 있는 프로퍼티이다.

<br>


## 2. 실제 DOM에서 속성 찾기

```html
<nav id="header-links">
  <ul class="social-links">
    <li>
      <a href="https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg" class="youtube">YouTube</a>
    </li>
  </ul>
</nav>
```

위의 HTML 코드에서 `a` 태그의 속성인 `href`의 값을 출력해보자.

```js
> var myHeaderLinks = document.getElementById("header-links");
undefined
> var youTubeLink = myHeaderLinks.getElementsByClassName("youtube");
> youTubeLink
[a.youtube]

// getAttribute() 메서드를 사용하여 찾고자 하는 속성(href)을 입력한다.
> youTubeLink[0].getAttribute("href");
"https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg"

```

<br>

만약 찾은 속성을 다른 값으로 변경하거나 새 속성을 추가하고 싶다면 `setAttribute()`를 사용한다.

```js
// setAttribute(속성, 추가 또는 변경할 값);

// 추가
> youTubeLink[0].setAttribute("alt", "newlink");

// 변경
> youTubeLink[0].setAttribute("href", "https://juliahwang.kr/");
```

그러면 다음과 같이 HTML이 변경된다.

```html
<!--변경 전-->
 <a href="https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg" class="youtube">YouTube</a>

<!--변경 후-->
<a href="https://juliahwang.kr/" class="youtube" alt="newlink">YouTube</a>
```

<br>

변경하는 방식은 다음과 같이 해줄 수도 있다.

```js
youTubeLink.className = "#"
youTubeLink.href = "#"
```

<br>

## 3. CSS 스타일 변경해보기

물론 style 속성을 HTML에 직접 지정하는 것은 지양해야할 점이다. 다음과 같이 동작한다는 것만 알아두도록 하자.

```js
> var myBanner = document.getElementsByClassName("banner-text");
undefined
> myBanner
[div.banner-text]

// h2 태그 찾기
> var myTitle = myBanner[0].getElementsByTagName("h2");
undefined

// setAttribute()로 직접 지정해줄 수 있지만 수정하게 되면 이전 속성은 오버라이딩되어 사라지는 단점이 있다.
> myTitle[0].setAttribute("style", "color: purple;");
undefined

// setAttirbute()는 이전에 지정한 속성을 지우고 다음 속성을 넣는다.
> myTitle[0].setAttribute("style", "position: relative;");
undefined
```

<br>

### (1) `setAttribute()`로 수정하기

`setAttribute()`로 수정하면 다음과 같다.

```html
<!--첫번째 setAttribute("style", "color: purple;") 적용 후-->
<h2 style="color: purple;">hello!</h2>

<!--두번째 setAttribute("style", "position: relative;") 적용 후-->
<h2 style="position: relative;">hello!</h2>
```

<br>

### (2) `style` 프로퍼티로 직접 스타일 지정하기

위의 대안으로는 `style` 프로퍼티에서 지정하고 싶은 CSS 속성을 직접 주는 것이다. 이는 지정 및 부분 수정에 모두 용이하다.

```js
> myTitle[0].style.color = "purple";
"purple"

// 아래와 같이 지정해도 style.color의 값은 그대로 존재한다.
> myTitle[0].style.position = "relative";
"relative"
```

또한 수정해도 그 값만 바뀐다.

```html
<!--첫번째 적용 후-->
<h2 style="color: purple;">hello!</h2>

<!--두번째 적용 후-->
<h2 style="color: purple; position: relative;">hello!</h2>
```

<br>

### (3) CSS 속성명 변경하기

css 속성명 중 하이픈(`-`)으로 연결된 속성명은 자바스크립트에서 style 프로퍼티로 직접 변경할 때 `Reference Error`를 일으킨다.

따라서 하이픈을 지우고 `CamelCase` 방식으로 변경하여 사용해준다.

```js
// css 속성 중 background-color 속성을 변경할 때.
myTitle[0].style.background-color = "blue";  // (x)
myTitle[0].style.backgroundColor = "blue";  // (o)
```

<br>
