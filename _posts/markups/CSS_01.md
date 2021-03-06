---
title: CSS _ 상속과 텍스트 속성
date: 2017-06-17
tags:
- CSS
- markup
- inheritance
---


css에서 대부분의 css속성은 부모 요소에서 자식 요소로 상속된다. 속성을 상속할 때 사용하는 선택자와 상속의 우선순위를 의미하는 특정도에 대해 알아보고, 텍스트 속성을 이용하여 상속을 설명해보았다.

```css
body {
 font-size: 12px;
}
```

- 상속이 되지 않는 속성도 있다. ex_ **border**, **padding**
- **inherit** : `inherit` 을 사용하여 css의 모든 속성을 부모 요소(기본값도 가능)에서 상속받을 수 있다.

<br>

### 2. class, id 선택자

- **class** : `.chapters {}`
 - 여러개의 html요소에 지정 가능

- **id** : `#chapter1-1 {}`
	- 단 하나의 요소에만 지정 가능.

<br />

### 3. 특정도

좀더 구체적인 특성 부여가 덜 구체적인 특성 부여를 덮어 쓴다. 같은 속성에 여러 개의 구체적 속성 부여가 있을 경우 가장 마지막에 지정된 속성이 부여된다.

- `태그 선택자` < `클래스 선택자` < `id 선택자` 순으로 높은 특정도를 가진다.

<br />

### 4. 선택자들 - 글자 관련

```css
/*예시*/
h1 {
 font-family : "helvetica";
 font-weight : bold;
 font-style : italic;
 text-decoration : underline;
 font-size : 2em;
}
```

<br />

#### (1) 글자 크기 `font-size`

- 수치값 : CSS에서 단위가 없는 수치는 에러를 발생시킨다!
	- 에러를 발생시키지 않는 예외: 배수 값 지정하는 경우(참고: `line-height`)

- 절대값 : 글자 확대, 창 크기에 상관없이 고정된 값. 기본적으로 px 사용
- 상대값 : 화면크기에 따라 글자크기, 화면 레이아웃 등도 변할 수 있도록 em값을 사용한다.
	- **em** : CSS에서 글꼴의 높이.<br>현재 글꼴에 비례한 글꼴의 크기를 지정할 수 있다.

		```css
		font-size : 2em; = 200%
		font-size : 1.6em; = 160%
		font-size : 1.2em; = 120%
		font-size : 1em; = 100%
    ```

	- **rem** : root 크기를 정해놓고 root값에 비례하여 크기를 지정할 수 있다.

		```css
		body {
		 font-size : 16px;
		}

		font-size : 2rem; /*= 32px*/
		```

<br>

#### (2) 글자 두께 `font-weight`

- 키워드 방식 : **bold**, **normal**
- 숫자 방식 : 100 ~ 900

<br>

#### (3) 글자 스타일 `font-style`

- 키워드 방식 : **italic** = **oblique**, **normal**

<br>

#### (4) 글자 장식 `text-decoration`

- 키워드 방식 : **line-through**, **underline**, **none**
- 여러 개 사용가능, `띄어쓰기`로 구분.

<br>

#### (5) 글자 정렬 `text-align`

- 키워드 방식 : **left**, **right**, **center**, **justify**
- justify는 양쪽 정렬이다. 쓰지 않는 것이 좋다.

<br>

#### (6) 행간 `line-height`

- 글자열 라인의 높이를 지정할 수 있다.(박스, 이미지에는 적용안됨)
- 퍼센트 속성값을 사용할 수 있다.

	```css
div {
 font-size : 12px;
 line-height : 120%; /* == 12px의 1.2배 == 14.4px */
}
```

	- 부모 요소의 글꼴 크기 기준 퍼센트 값이 적용된다.
	- div 하위 요소 내에 자식요소가 있고 거기에 다른 폰트크기가 정해져 있을 경우에도 `line-height`는 부모인 dd의 값을 따라 14px로 적용된다.
	- 주의할 점은 자신의 글꼴 크기에 비례한 line-height 값이 아님!

- 단위를 지정하지 않는 수치값

	```css
div {
font-size: 12px;
line-height: 1.2;
}
```

	- div 내의 하위 요소가 특정 폰트 크기를 정해놓았으면 자식요소의 폰트크기의 배수를 따른다. 즉, 부모의 폰트크기를 따르지 않고 그때그때의 폰트 크기에 적용된다!
	- 모든 요소에 line-height 값을 지정하지 않아도 된다.
	- body와 같은 상위요소에 한번 정해두면 편하다.
	- 대부분의 브라우저가 line-height의 기본값으로 1.0 or 1.2를 배수를 갖고 있다.


<br>

#### (7) 글자/단어 간격 `letter-spacing / word-spacing`

- 글자 간격 : 글자 사이의 간격을 띄운다.
- 단어 간격 : 띄어쓰기 너비를 키운다.
- 수치값을 사용하며, **퍼센트값은 사용하지 않는다**!!
- 늘이기 : `word-spacing: .1em;`
- 줄이기 : `letter-spacing : -.1em;`

<br>

#### (8) 들여쓰기 / 내어쓰기 `text-indent`

단락 시작줄에 들여쓰기 및 내어쓰기를 하고 싶은 경우 사용.

- 들여쓰기 : `text-indent: .5em;`
- 내어쓰기 : `text-indent: -.5em;`

<br>

출처 : html/css도서 - [웹표준가이드]

<br />
