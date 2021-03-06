---
title: JS _ 21. 이벤트(Event)와 활용 <2부> times
date: 2017-10-24
tags:
- javascript
- basic grammar
---

자바스크립트의 `이벤트(Events)`란 **사용자가 웹페이지에서 수행하는 모든 행위에 대한 페이지의 행동**
을 말한다. 예를 들면 마우스를 올리고 메뉴를 내리고 스크롤을 하는 등의 행동이 모두 이벤트이다.

<br>

## Timers 이벤트

### (1) 페이지 로딩 이후 알림 띄우기

브라우저에 자바스크립트 코드가 실행되는 시간을 조절하고 싶다면 `Timers` 부분을 살펴보면 된다.

![timersgoal](imgs/2017-10-23/timersgoal.png)

웹페이지를 로드하고 3초가 지나면 메세지를 띄워주게끔 동작하도록 구현해보자.

<br>

```js
// 알림 텍스트를 myMsg변수에 할당한다.
var myMsg = document.getElementById("message");

// 메세지를 보여줄 때 적용할 css를 제어하는 메소드 정의
function showMsg(){
    myMsg.className = "show";
}


// 페이지가 로드되고 3초 후에 showMsg()가 실행되도록
// setTimeout 메소드를 사용했다.
setTimeout(showMsg, 3000);
```

<br>

### (2) 정해진 시간마다 다른 스타일 적용하기

```js
// 색상을 변경할 div 요소를 colorChanger 변수에 할당
var colorChanger = document.getElementById("color-changer");

// 시간마다 적용할 스타일값을 담은 배열
var colors = ["red", "green", "yellow", "pink"];
// 0부터 차례로 1씩 더하면서 스타일을 적용하는 데에 필요한 counter 변수 정의
var counter = 0;

// 실행하면 div 요소의 배경색을 배열에 담긴 값으로 바꾼다.
// 이 때 계속 변할 수 있도록 counter의 값은 1씩 증가시킨다.
function changeColor(){

    // counter는 무한히 늘어나므로 배열의 길이보다 길어지면 0으로 리셋시킨다.
    if (counter >= colors.length){
        counter = 0;
    };
    colorChanger.style.background = colors[counter];
    counter++;
}

// setInterval을 사용하여 3초마다 changeColor 함수를 실행시킨다.
setInterval(changeColor, 3000);
```

결과는 다음처럼 `div` 요소의 색상이 3초마다 변화한다.

![red](imgs/2017-10-23/red.png)

![green](imgs/2017-10-23/green.png)

![yellow](imgs/2017-10-23/yellow.png)

![pink](imgs/2017-10-23/pink.png)

<br>

### (3) 클릭으로 Interval 제거하기

`(2)`에서 적용해주었던 `setInterval()` 메소드를 변수에 할당하여 클릭 또는 호버 이벤트시 인터벌 이벤트를 종료하도록 해주려고 한다.

그러기 위해 해당 메소드를 변수에 할당하였다.

```js
var myTimer = setInterval(changeColor, 1000);

// div 요소를 클릭하면
colorChanger.onclick = function(){

    // 원하는 interval 이벤트를 제거해준다.
    clearInterval(myTimer);
    colorChanger.innerHTML = "Timer Stopped";
}
```

<br>

이제 브라우저에서 클릭하면 문자와 함께 Interval 이벤트가 멈춘다.

![intervalstop](imgs/2017-10-23/intervalstop.png)

<br>
