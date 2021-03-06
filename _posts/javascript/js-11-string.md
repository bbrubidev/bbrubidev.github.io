---
title: JS _ 11. 문자형 자료의 연산
date: 2017-10-19
tags:
- javascript
- basic grammar
---

이번 포스트에서는 자바스크립트의 문자 자료형에 대한 소개와 비교연산, 그리고 `slicing`, `spliting` 방식에 대해 소개한다.

<br>

## 문자 자료형 (Strings)

```js
> var myString1 = "I am a string";
I am a string

/* 다음과 같이 큰따옴표 안에 큰따옴표를 또 쓰게 되면
원래 감싸고 있던 큰따옴표가 내부 큰 따옴포에 의해 끊겨버린다. */
var myString2 = "I am a "fun" string"; // (x)

// 다음과 같이 작은 따옴표를 외부에 사용한다.
var myString3 = 'I am a "fun" string';

// 역슬래시(\)로 따옴표 이스케이프 처리가 가능하다.
var myString4 = 'I\'m a "fun" string';

var myString5 = "I am a ninja string";


console.log(myString1);
console.log(myString2); // - Error
console.log(myString3);
console.log(myString4);

console.log(myString1.length);

// 스트링의 모든 글자를 대문자로 출력해준다.
console.log(myString1.toUpperCase());

// 'string'이라는 문자열이 몇 번째 인덱스에 존재하는지 알려준다.
console.log(myString1.indexOf("string"));

// 만약 찾는 인덱스가 없다면 mild warning으로 '-1'을 반환하여 예외처리가 가능하다.
console.log(myString1.indexOf("ninja"));

// 예외처리 예시
if (myString5.indexOf("ninja") === -1) {

    console.log("The world ninja is not in the string1");

} else{

    console.log("The word ninja starts at position " + myString1.indexOf("ninja") === -1);

}
```

<br>

## 문자형의 비교연산

다음은 스트링 값의 비교연산에 대한 예제들이다.

```js
// 예제 1
var string1 = "abc";
var string2 = "cde";
// false 출력
console.log(string1 === string2);

// 예제 2
var string1 = "abc";
var string2 = "abc";
// true 출력
console.log(string1 === string2);

// 예제 3
var string1 = "abc";
var string2 = "ABC";
// false 출력. 대소문자 구분이 가능하다.
console.log(string1 === string2);

// 예제 4
var string1 = "abc";
var string2 = "ABC";
// true로 출력. 내장함수사용 가능.
console.log(string1.toLowerCase() === string2.toLowerCase());

// 예제 5
var string1 = "abc";
var string2 = "cde";
// a보다 c가 알파벳 순서상 크기 때문에 true 반환
console.log(string1 < string2);

// 예제 6
var string1 = "abc";
var string2 = "Cde";
// 소문자가 대문자보다 크다. 따라서 false 반환
console.log(string1 < string2);

// 예제 7
var string1 = "Abc";
var string2 = "Cde";
// 대문자에서도 예제 5와같이 비교하여 true 반환
console.log(string1 < string2);
```

<br>

## 문자열 잘라내기와 나누기 (String slicing & spliting)

```js
// slice() 사용하여 문자열 나누기
> var str = "Hello World";
undefined
> str
"Hello World"
> var str2 = str.slice(2, 9);
undefined
> str2
"llo Wor"

> var str3 = str.slice(2);
undefined
> str3
"llo World"
```

<br>

`split`은 다음과 같이 문자열에서 기준문자에 의해 여러 조각으로 나누는 것을 말한다.

![split](imgs/2017-10-19/split.png)

<br>
