---
title: JS _ 6. while과 for 루프
date: 2017-10-18
tags:
- javascript
- basic grammar
---

이번 포스트에서는 자바스크립트의 `while` 루프와 `for` 루프에 대해 소개한다.

<br>

## 1. while 루프

```js
var age = 5;

//while (condition) {
    // execute the given code here
//}

while (age < 10) {

    console.log("Your age is less than 10.");

    // 무한루프를 돌지 않도록 age에 1을 더해준다.
    age++;

}

document.write("you are now over 10.");
```

<br>

브라우저에서 작동한 화면은 다음과 같다.

![whileloops](imgs/2017-10-18/whileloops.png)

<br>

## 2. for 루프

```js
var age = 5;
var links = document.getElementById("a");

//for (var, condition, operator) {}
for (age = 5; age < 10; age++) {

    console.log("Your age is less than 10.");

}

document.write("You are now over 10.");
```

범위를 정하여 돌릴 수도 있다.

```html
<!--index.html-->
<body>

    <a href="#">link1</a>
    <a href="#">link2</a>
    <a href="#">link3</a>
    <a href="#">link4</a>
    <a href="#">link5</a>

    <script src="17_forloops.js">
    </script>
</body>
```

```js
// 17_forloops.js

var links = document.getElementByTagName("a");

//for (var, condition, operation) {}
for (i = 1; i <= links.length; i++) {

    console.log("This is link number" + i);

}

document.write("All links now looped.");
```

다음과 같이 작동하는 것을 확인할 수 있다.

![forloops](imgs/2017-10-18/forloops.png)

<br>

## 3. loop문 활용하기

loop를 활용하는 예시를 보자.

```js
var links = document.getElementByTagName("a");

for (i = 0; i < links.length; i++) {
    links[i].className = "links-" + i;
}
```

브라우저 HTML 요소의 `a` 태그 마다 지정해준 클래스명이 적용되었다.

![applyloop](imgs/2017-10-18/applyloop.png)
