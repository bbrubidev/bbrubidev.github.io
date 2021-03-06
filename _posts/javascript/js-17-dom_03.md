---
title: JS _ 19. DOM에 엘리먼트 추가, 삭제하기 <3부>
date: 2017-10-20
tags:
- javascript
- basic grammar
---

`DOM`을 활용하는 방식에 대해 실습을 통하여 소개한다. 이번 포스트에서는 `DOM`에 엘리먼트를 추가하고 삭제하는 방법에 대해 정리해보았다.

<br>

## 1. DOM에 새로운 엘리먼트 추가하기

새로운 엘리먼트를 직접 원하는 곳에 추가해줄 수 있다. 이 때 자바스크립트 내장함수인 `createElement()`를 사용하면 된다.

```js
// 추가할 엘리먼트를 생성한다.
> var newLi = document.createElement("li");
<li></li>

> var newA = document.createElement("a");
<a></a>
```

<br>

새 엘리먼트를 추가해 줄 위치를 찾은 후, `appendChild()` 메소드를 사용하여 추가해준다.

```js
// 새로운 엘리먼트를 추가할 Bulletin 게시판 태그를 찾는다.
> var newBulletin = document.getElementById("homepage-bulletins").getElementsByClassName("bulletin")[0];
undefined
> newBulletin
<div class="bulletin">
  <h4>Subscribe to channel</h4>
  <p>Plus, you can go ahead and leave a nice comment</p>
  <a href="https://www.youtube.com/channel/" target="_blank">Visit Channel</a>
</div>

// 찾은 태그에 새로운 엘리먼트들을 자식으로 추가한다.
> newBulletin.appendChild(newLi);
> newLi.appendChild(newA);

// 마지막으로 생성한 엘리먼트에 텍스트를 집어넣는다.
> newA.innerHTML = "Don't forget to subscribe!!";
```

<br>

결과 HTML은 다음과 같이 출력된다.

```html
<div class="bulletin">
  <h4>Subscribe to channel</h4>
  <p>Plus, you can go ahead and leave a nice comment</p>
  <a href="https://www.youtube.com/channel/" target="_blank">Visit Channel</a>
  <li>
    <a>Don't forget to subscribe!!</a>
  </li>
</div>
```

<br>

### 원하는 위치에 엘리먼트 추가하기

만약 만들어준 `li` 태그를 newBulletin 태그 덩어리 내 마지막이 아닌 `p`태그 앞에 넣어주고 싶다면 내장함수 `insertBefore()`를 사용한다.

```js
> newBulletin.insertBefore(newLi, newBulletin.getElementsByTagName("p")[0];
<li>...</li>
```

결과 HTML은 다음과 같이 바뀐다.

```html
<div class="bulletin">
  <h4>Subscribe to channel</h4>
  <li>
    <a>Don't forget to subscribe!!</a>
  </li>
  <p>Plus, you can go ahead and leave a nice comment</p>
  <a href="https://www.youtube.com/channel/" target="_blank">Visit Channel</a>
</div>
```

<br>

## 38. DOM에서 엘리먼트 삭제하기

삭제할 엘리먼트가 있는 부모 엘리먼트를 찾아 `parent` 변수에 할당한다.

```js
> var parent = document.getElementById("homepage-bulletins").getElementsByClassName("bulletin")[0];
undefined
> parent
<div class=​"bulletin">​…​</div>​
```

<br>

삭제할 엘리먼트는 `removeChild()` 함수를 사용하여 지워준다.

```js
> var child = parent.getElementsByTagName("p")[0];
<p>​…​</p>​

// 삭제
> parent.removeChild(child);
<p>​…​</p>​
```

결과 HTML은 다음과 같다.

```html
<div class="bulletin">
  <h4>Subscribe to channel</h4>
  <li>
    <a>Don't forget to subscribe!!</a>
  </li>
  <a href="https://www.youtube.com/channel/" target="_blank">Visit Channel</a>
</div>
```

<br>

엘리먼트를 지우더라도 지우면서 변수에 저장해놓으면 나중에 필요할 때 다시 `appendChild()`하여 쓸 수 있다.

```js
> var removed = parent.removeChild(child);
<p>​…​</p>​
> parent.appendChild(removed);
<p>...</p>
```

<br>
