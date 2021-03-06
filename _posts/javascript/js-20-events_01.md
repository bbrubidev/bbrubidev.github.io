---
title: JS _ 20. 이벤트(Event)와 활용 <1부> 개념, onclick, onload
date: 2017-10-23
tags:
- javascript
- basic grammar
---

자바스크립트의 `이벤트(Events)`란 **사용자가 웹페이지에서 수행하는 모든 행위에 대한 페이지의 행동**
을 말한다. 예를 들면 마우스를 올리고 메뉴를 내리고 스크롤을 하는 등의 행동이 모두 이벤트이다.

<br>

```js
// 먼저 이벤트를 걸어줄 a 태그를 변수에 할당한다.
> var title = document.getElementById("homepage-bulletins").getElementsByClassName("bulletin")[0].getElementsByTagName("a")[0];
undefined
> title
<a href=​"https:​/​/​www.youtube.com/​channel/​UCW5YeuERMmlnqo4oq8vwUpg" class=​"btn btn-red" target=​"_blank">​Visit Channel​</a>​

// 기존 a 태그를 클릭하면 경고창이 뜨는 이벤트를 만들어준다.
> title.onclick = function(){
    alert("You clicked me!");
};
ƒ (){
    alert("You clicked me!");
}

// 마우스를 해당 태그영역에 올리면 역시 경고창이 뜨도록 만들어주었다.
> title.onmouseover = function(){
    alert("You hovered your mouse over me");
};
ƒ (){
    alert("You hovered your mouse over me");
}
```

<br>

많이 쓰는 `onclick` 이벤트와 `onload` 이벤트를 사용해보았다.

<br>

## 예제 - `onclick` 이벤트

![showmore](imgs/2017-10-23/showmore.png)

다음과 같이 텍스트 박스를 만들고, `SHOW MORE` 버튼을 클릭하면 전체 글이 보여지도록 만들려고 한다.

![showless](imgs/2017-10-23/showless.png)

글이 펼쳐졌을 때 버튼의 텍스트는 `SHOW LESS`로 바뀌고, 버튼을 다시 클릭하면 원래 크기로 줄어들면서 버튼 텍스트가 다시 `SHOW MORE`로 바뀌도록 자바스크립트를 작성해본다.

<br>

```js
// 문단텍스트가 있는 content를 변수에 할당
var content = document.getElementById("content");

// 버튼의 텍스트가 상태에 따라 변경되어야 하므로 button에 show-more id를 찾아 할당  
var button = document.getElementById("show-more");

// 버튼을 클릭할 때 동작을 정의해준다.
button.onclick = function() {

    // content의 클래스명이 open일 경우에는 박스가 줄어들어야한다.
    if (content.className == "open"){
        // 따라서 클래스명을 없앤 css가 적용된다.
        content.className = "";
        // 줄어들었으므로 버튼 텍스트는 SHOW MORE로 표시되도록 해준다.
        button.innerHTML = "Show More";
    // 줄어든 상태에서는 content가 모두 보여야한다.
    } else {
        // 따라서 클래스명이 open일 때의 css가 적용된다.
        content.className = "open";
        // 늘어났을 때 버튼 텍스트는 SHOW LESS로 표시되도록 해준다.
        button.innerHTML = "Show Less";
    }
};
```

<br>

## `onload` 이벤트

자바스크립트 코드를 연결하는 `<script></script>` 라인은 항상 HTML 하단에 위치시켜야 한다. 만약 위 태그가 HTML 바디 태그 상단에 위치해있다면 페이지를 로드하기도 전에 자바스크립트 코드를 실행시키기 때문이다.

하지만 여건 상 스크립트 코드를 상단에 배치해야할 때가 있는데, 이 때 `window.onLoad` 이벤트를 사용하여 페이지가 로드될 때까지 아무것도 실행하지 않게끔 해줄 수 있다.

예를 들면 다음과 같다.

```js
window.onload = function(){
    var content = document.getElementById("content");
    var button = document.getElementById("show-more");

    button.onclick = function() {

        if (content.className == "open"){
            // shrink the box
            content.className = "";
            button.innerHTML = "Show More";
        } else {
            // expand the box
            content.className = "open";
            button.innerHTML = "Show Less";
        }
    };
};
```

즉, 실행할 코드를 `window.onLoad` 내부에 집어넣는 것이다. 하지만 이러한 방법은 깔끔하지 않고 코드가 많을 경우 번거로울 수 있으므로 추천하지 않는다.

대신 `setUpEvent` 메소드를 정의하여 코드를 실행시키는 함수를 따로 만들어준다.  

```js
function setUpEvents(){
    window.onLoad = function(){
    var content = document.getElementById("content");
    var button = document.getElementById("show-more");

    button.onclick = function() {

        if (content.className == "open"){
            // shrink the box
            content.className = "";
            button.innerHTML = "Show More";
        } else {
            // expand the box
            content.className = "open";
            button.innerHTML = "Show Less";
        }
    };
}

// 페이지가 로드될 때까지 js 코드는 동작/실행되지 않는다.
window.onload = function(){

    setUpEvents();

};
```

위의 방식으로 할 경우 **하나의 기능을 모듈화할 수 있어 유지보수가 훨씬 편리**
해진다. 그렇다고 이러한 작업을 모든 자바스크립트 코드에 적용할 필요는 없다.

단, 먼저 페이지가 로드되는 것이 필요한 자바스크립트 코드가 있다면 적용하는 것이 좋다.

<br>
