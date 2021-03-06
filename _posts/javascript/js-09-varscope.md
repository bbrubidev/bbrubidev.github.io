---
title: JS _ 9. 변수 스코프 (Scope)
date: 2017-10-19
tags:
- javascript
- basic grammar
---

이번 포스트에서는 자바스크립트에서 중요한 개념인 변수의 스코프에 대해 실습한 내용을 소개한다.

<br>

## 변수 스코프

```js
// 전역 변수(global scope)
// 같은 코드 내 어디서든지 사용가능하다.
var foo = 20;

// 지역 변수(local scope)
// 외부에서 사용할 수 없고 함수 내에서만 사용 가능하다.
function myFunction() {
    var bar = 10;
}
```

<br>

### 지역 변수

```js
// 지역 변수 예시
function getAvg (a, b){

    var avg = (a + b) / 2; // local variable - 함수 내에서만 사용가능
    console.log(avg);
    return avg;
}
```

<br>

### 전역 변수

```js
// 전역 변수 예시
var myAvg = getAvg(7, 11); // global variable - 어디서든지 사용가능
console.log("The average is " + myAvg);

// 전역에서 출력해보기
console.log("myAvg 변수 : " + myAvg);
console.log("avg 변수 : " + avg);
```

다음과 같이 지역변수인 `avg`는 함수 내에서만 사용되고 찾지 못하므로 `Reference Error`를 발생시킨다.

![localvar](imgs/2017-10-19/localvar.png)

<br>

## 변수에 함수 할당하기

```js
/* 평균값을 구하는 함수를 실행하고 나서
변수를 로그 출력용 함수에 사용할 수도 있다. */
var myResult = getAvg(9, 10);


function logResult(){

    console.log("The average is " + myResult + " inside the function.");

}

logResult();
```

<br>
