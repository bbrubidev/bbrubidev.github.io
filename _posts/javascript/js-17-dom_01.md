---
title: JS _ 17. DOM의 정의 <1부>
date: 2017-10-20
tags:
- javascript
- basic grammar
---


자바스크립트가 동작하는 데에 꼭 이해해야 할 `DOM`(Document Object Model)의 개념과 활용방식에 대해 소개한다.

<br>

## 1. DOM이란?

`DOM`은 Document Object Model의 약자로, 웹페이지와 상호작용할 때 사용한다. API(application programming interface)의 일종으로, 주로 HTML의 엘리먼트를 추가, 삭제, 변경할 때 사용한다.

<br>

![htmlstructure](imgs/2017-10-20/htmlstructure.png)

- 모든 DOM Element는 `id`를 가진다.
- 하나 이상의 attribute-value 쌍을 가지고 있다.
- DOM Tree의 엘리먼트 내에는 `innerHTML`이 있다.

```html
<div>
  <span></span><div></div> <!--innerHTML 부분-->
</div>
```

<br>

## 2. DOM의 사용 목적

DOM 표준은 API 함수들의 집합이다.

- 트리에 DOM 엘리먼트를 추가하기 위한
- DOM 엘리먼트를 삭제하기 위한
- 속성(attrs)을 지우거나 수정하기 위한
- innerHTML을 읽거나 바꾸기 위한

<br>

### (1) Document

`document`는 쉽게 말해 웹페이지, 즉, HTML 페이지를 의미한다.

<br>

### (2) Object

`document` 내의 모든 HTML 엘리먼트들을 의미한다.

- `<head></head>`
- `<body></body>`
- `<ul></ul>`
- `<p></p>`

등 모든 태그는 오브젝트이다.

<br>


### (3) Model

![dommodel](imgs/2017-10-20/dommodel.png)

HTML의 엘리먼트를 아래와 같이 트리 형태로 구조화하여 보여주고 어떠한 노드(`node`)에라도 접근할 수 있다. 접근한 노드에게는 특정 스크립트를 적용할 수 있다.

<br>

### (4) Node

도큐먼트 내에서 바꿀 수 있는 모든 것을 노드라고 부른다. 이러한 노드는

- 엘리먼트
- 엘리먼트 내 텍스트
- HTML 속성(attributes)

등이 있다.

<br>

## 3. DOM 객체

- document
- window
- div/span/img ...
- 쉽게 말해 HTML 페이지 안의 모든 아이템(item)은 DOM 객체다.

<br>

## 4. 각 object에 대한 DOM APIs

각 DOM 객체에 대해 3개의 API로 분류할 수 있다. 다음은 `document` 객체에 대한 분류 예시이다.

- 프로퍼티(properties)
  - `document.stylesheets` : css파일을 읽기 전용으로 출력해줌.
  - `document.title` : page의 title 출력해줌.
- 메소드(functions)
  - `getElementByID` : method/function
- 이벤트(events)
    - `onReadyStateChange() : 이벤트 핸들러

<br>

## 5. 자주 사용하는 DOM API 함수들

```js
document.getElementById("list")
document.createElement("h1")
document.innerHTML  // HTML 콘텐트 읽기
document.setAttribute // 속성 부여
document.getAttribute  // 속성 읽기
element.style/color/style
window.onload  // 이벤트 삽입하기
```

<br>
