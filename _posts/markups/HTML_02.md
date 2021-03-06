---
title: HTML _ 내장 컨텐트 태그
date: 2017-06-16
tags:
- HTML
- markup
---

브라우저는 기본적으로 이미지 포맷을 지원하여 이미지에 대한 플러그인은 필요없지만 비디오나 오디오는 플러그인을 지원해야한다. 이 때 사용할 수 있는 것이 HTML의 내장 컨텐트 태그 요소이다.

<br>

### 비디오, 오디오 내장 - `<object>`

```html
<object data="/video/a.mpeg" type="video/mpeg">
 <img src="images/error.png" alt="reload please">
</object>
```

* **data** : 포함할 파일의 url
* **type** : 브라우저가 콘텐트를 지원할 수 있는지 다운로드 전에 알 수 있다.

`data`, `type` 모두 필수 속성은 아니지만 포함해주는 것이 좋다. 파이어폭스 브라우저를 사용할 경우, 필수로 적어주어야 한다.

* 재생불가한 경우 : **object 태그 안에 img태그를 넣어** 재생이 안될 때 이미지가 표시되도록 한다.

- **콘텐트 타입 : MIME(Multipurpose Internet Mail Extensions)** <br> 서버에서 콘텐트를 제공할 때 콘텐트 타입을 제공해주어야 브라우저가 해당 타입을 파악하여 렌더링해줄 수 있다.
- 기본으로 적용되는 타입: `text/html`, or `video/mpeg`

- `<object>`태그는 매우 광범위한 용도로 사용될 수 있기 때문에 오히려 사용하기 불편하다. 이미지, 플래시, 실버라이트, html, 오디오, 비디오 무엇이든지 삽입하는 용도로 설계된 태그이기 때문이다. 브라우저가 태그를 인식하지 못해 비디오와 오디오콘텐트에 특화된 기능(재생컨트롤)을 표시할 수 없는 일이 발생하기도 한다. 또, 가끔 비디오 전용 기능을 이미지 컨텐트에 삽입하기도 하는 오류를 범하기도...

- 대안 :

| 비디오, 오디오가 아닌 플러그인 콘텐트|비디오, 오디오 콘텐트|
|:----:|:-----:|
|`<object>` 사용(플래시 기반)|`<video>`태그!|

<br>

### `<video>` 태그

```html
<video poster="images/error.png">
 <source src="비디오파일출처1" type="video/mp4">
 <source src="비디오파일출처2" type="video/ogg">
</video>
```

* `poster` : 비디오 로딩중 또는 재생불가일 때 이미지를 불러와준다.
* `autoplay` : 비디오 로딩시 자동재생
* `loop` : 반복재생
* `controls` : 재생 컨트롤 표시
* `width`, `height` : 성능면에서 적는 것이 좋음.

<br>

### `<audio>` 태그

```html
<audio controls>
 <source src="오디오파일출처1" type="audio/mp3">
 <source src="오디오파일출처2" type="video/wave">
 <object data="플래시파일출처">
  <p>오디오 지원불가</p>
 </object>
</audio>
```

* 오디오는 poster값을 지원하지 않는다.
* 재생불가 시 대신 object로 플래시 문구를 띄워준다.


<br>

## form 태그

### `<form>`

- **method** : 폼에 입력된 데이터가 전송되는 방식을 결정. GET/POST가 있음.
- **action** : 전송된 데이터를 표시할 스크립트의 url 정보를 부여.

<br>

### `<input>`

- **name** : **반드시 있어야하는 요소** 이다. 폼이 서버로 전송되었을 때 name의 속성값이 폼 데이터의 구분자가 된다. 이 속성을 주지 않으면 서버는 전달 받은 데이터가 어떤 것인지 구분하지 못한다.<br>
- **disabled** : 폼 컨트롤을 비활성화.
- **checked** : 미리 체크해놓는 효과
- **multiple** : 다중선택 가능
- **type** : 폼 요소 구분.

	|종류|이름|내용|name속성|
|:--:|:--:|:--:|:--:|
|텍스트필드|text|**size**: 입력받을 문자의 크기(텍스트필드의 width값, css를 사용하는 것이 낫다.)<br> 사용할 수 있는 최대문자수(=maxlength)가 아님!!!|input은 전송받은 데이터와 name값을 연결지어 서버로 전송한다.|**value** : 해당 요소의 초깃값을 설정(힌트 등)
|체크박스|checkbox|체크되지 않은 값은 전송되지 않는다.<br>**checked** : 미리 체크한 상태로 전송 가능<br>사용자에게 입력을 강요(필수입력)하기 위해 사용한다.<br>여러 개 체크가능하다.|체크된 여러 개의 값이 name-value 쌍으로 연결되어 서버로 전송된다.|
|라디오버튼|radio|여러 개 체크가 불가능하다.<br>**checked** : 미리 체크한 상태로 전송 가능<br>같은 name속성을 갖는 라디오버튼이 여러개 있으면 전송될 때 미리 checked를 적어놓은 것이 전송된다. 남자, 여자 라디오버튼을 선택할 때 체크하지않으면 미리 남자에 적용해놓은 checked가 작용하여 서버로 보내진다.|
|푸시버튼<br>**button**|버튼|타입 버튼도 있고 요소 버튼도 있다.<br>value값을 줘서 사용자 문구를 버튼 위에 입력할 수 있다.|
|푸시버튼<br>**submit**|제출|버튼 type의 디폴트값이다.<br>기본적으로 submit이라는 value값을 가지지만 value값을 따로 줘서 사용자문구를 버튼 위에 입력할 수 있다.|
|푸시버튼<br>**reset**|초기화|기본적으로 reset이라는 value값을 가지지만 value값을 따로 줘서 사용자문구를 버튼 위에 입력할 수 있다.|

<br>

### 버튼 - `<button>`

- 버튼
- 디폴트: `submit`
- 비어있지 않은 요소로, value가 아닌 요소 내부의 내용이 버튼 위에 적힌다.
- IE6, 7에서는 데이터전송에 오류가 많아 input으로 대체한다.|

<br>

### 드롭다운 메뉴 - `<select>`

- **option** : 메뉴 아이템(`<li>`와 비슷)
- **optgroup** : 여러 개의 옵션을 그룹지어 보여준다.  
- **multiple** : 잘 안쓴다. 다수의 option을 체크할 때.

<br>

### 장문의 텍스트 입력필드 - `<textarea>`

비어있지 않은 요소로, value에 값을 주지않고 요소 안에 내용을 입력하면 사용자가 입력할 데이터의 예제를 보여줄 수 있다.

<br>

### `<label>` - 폼 컨트롤에 대한 문구

사용자 입장에서 어떤 폼인지, 무엇을 입력해야 하는지 문구를 보여줄 수 있는 태그로, 암묵적, 명시적 레이블 둘 다 사용할 수 있다.

<br>

#### (1) 암묵적 레이블

`<label>`안에 input요소를 넣는 방식

```html
<label>monkey type here:
<input type="text" name="monkeytype" value="less than 10 letters">
</label>
```

<br>

#### **명시적 레이블**

for 사용하여 인풋의 id값을 연결하는 방

```html
<!-- for의 값은 label요소의 내용을 부여할 폼의 id값이다. -->
<label for="monkey">monkey type here:
 <textarea name="monkeytype" id="monkey">
 hello! introduce yourself.
 </textarea>
<label>
```

출처 : html/css도서 -[웹표준가이드]
