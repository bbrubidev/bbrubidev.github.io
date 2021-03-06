---
title: CSS _ 선택자
date: 2017-06-20
tags:
- CSS
- markup
---

선택자는 선택을 하게 해주는 요소이다. 이를 통해 특정 요소들을 선택하여 스타일을 적용할 수 있다. CSS의 속성을 부여할 HTML요소를 선택하는 선택자의 종류들에 대해 알아보자.

<br>

### 1. 하위선택자와 자식선택자

- 문서의 계층구조를 사용하여 특정 요소에 접근할 수 있다.

#### (1) 하위선택자

- 상위 부모 요소는 직계 부모요소이든 구조상 거리가 먼 조상이든 상관 없다.
- `div#main p {}` : main 클래스를 가지는 div 하위 요소 중 모든 p
- id와 class를 과도하게 사용하는 것을 막아준다.

<br>

#### (2) 자식 선택자

- 특정 요소의 자손 요소 중 특정 요소가 직접 포함하는 `직계자손`만을 선택.
- `div#main>ul ul li {}` : main을 id로 가지는 div의 첫번째 ul 아래 첫번째 ul 아래 li
- 우선순위는 특정도 값을 계산하여 정한다.

<br>

### 2. 선택자의 종류

#### (1) 전체 선택자, Universal Selector, `*`

```css
  <style>
    div * {
      padding: 0;
      margin: 0;
    }
  </style>
```

```html
<h1>hello!</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto fuga aperiam accusantium illum adipisci impedit!</p>
```

* HTML 페이지 내부의 모든 요소에 CSS속성 적용된다.
* 문서 전체에 적용하므로 페이지를 로딩하는 시간이 길어질 수 있다. 자주 사용하지 않는 것이 좋다.
* 전체 기본값 초기화할 때 주로 사용한다.

<br>

#### (2) 태그 선택자, Tag Selector, "요소이름"

```css
h1 p {
      margin: 10px;
      text-align: center;
      color: #ccc;
    }
```

* `p`, `h1` 같은 해당하는 모든 html요소에 적용한다.

<br>

#### (3) 클래스 선택자, Class Selector, `.`

```css
/*클래스 선택자*/
 	.section {
      color: #333;
      margin-bottom: 40px;
    }
    /*p를 써도되고 생략해도 된다*/
    p.section-title {
      font-size: 30px;
    }
```

```html
<div class="section">
    <p class="section-title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit, iste.</p>
    <p class="section-content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, asperiores.</p>
  </div>
```

* 선택자 앞에 마침표 기호를 사용한다.
* 앞에 태그명을 입력하여 HTML에서는 주어진 값을 class 속성값으로 가진 요소를 선택할 수도 있다.
* 클래스는 연달아 써서 동시에 여러 개의 클래스에 속성을 부여할 수도 있다.

<br>

#### (4) ID 선택자, ID Selector, `#`

```css
#id-selector a {
      color: lightblue;
      text-decoration-line: none;
    }
```

```html
<div id="id-selector">
    <a href="">출처</a>
    <span>lorem</span>
    <span>copyright@</span>
  </div>
```

* 선택자 앞에 # 기호를 사용한다.
* HTML에서 id값은 오직 하나만 존재해야한다.
* 앞에 태그명을 입력할 수 있다.
* **id선택자의 우선순위가 class선택자보다 높으므로 2개의 값을 지정했을 때는 id선택자의 값이 적용된다.**

<br>

#### (5) 체인 선택자, Chain Selector

```css
/*체인선택자 : 복수 개의 선택자 사용*/
    #index-title {
      font-size: 18px;
    }

    #index-title.header-title {
      font-weight: bold;
    }

    .body-text.descrip {
      color: #999
    }
```

```html
<h3 id="index-title" class="header-title">Lorem ipsum dolor sit amet.</h3>
<p class="body-text descrip">Lorem ipsum dolor sit amet.</p>
```

* 한 요소에 아이디와 클래스들 또는 복수의 클래스가 적용되어 있을 경우 사용한다.
* 아이디 선택자의 우선순위가 높으므로 아이디와 클래스 선택자를 동시에 적용한 경우 중복되는 속성은 아이디 선택자의 값을 따른다.


<br />

**!! 체인선택자를 사용하는 예시**<br>

* 주로 공통속성과 특별히 적용할 속성이 있을 경우 여러 클래스를 써서 속성을 나누어 배정한다.

```css
.nomargin {
  font-size: 0;
}

.inline-block {. <!--공통적인 클래스 속성-->
  display: inline-block;
  width: 50%;
  height: 50px;
  /*margin: 10px;*/
  box-sizing: content-box;
  box-sizing: border-box;
  border-width: 3px;
  border-style: solid;
  font-size: 0.9rem;
}
/*다른 값을 줄 클래스*/
.box-red {  
  border-color: red;
}
/*다른 값을 줄 클래스*/
.box-blue {  
  border-color: blue;
}
```

```html
<div class="nomargin">
	<div class="inline-block box-red">
	  ASDFASDF
	</div>
	<div class="inline-block box-blue">
	  SEFSEF
	</div>
</div>
```

<br>

#### (6) 그룹 선택자, Group Selector

```css
/*그룹선택자*/
#index-title {
  font-size: 18px;
}
p#index-title, #description {
  text-align: center;
}
```

```html
<p id="index-title" class="header-title">Lorem ipsum dolor sit amet.</p>
<p id="description" class="body-text descrip">Lorem ipsum dolor sit amet.</p>
```

* 여러 선택자에 같은 스타일을 적용하는 경우
* 쉼표로 구분하여 선택자를 나열한다.

<br>

#### (7) 복합 선택자, Combinator Selector

#### **하위선택자와 자식선택자<br>(descendant / child selector)**

<br>* 포함관계를 가지는 태그 중 포함하는 요소를 `부모 요소`, 포함되는 요소를 `자식 요소`라 칭한다.

##### - 하위 선택자(descendent)

`section ul {}`

```css
section ul {
	 border: 1px solid black;
	}
```

하위 선택자는 부모요소에 포함된 "모든" 하위요소를 지정한다.

<br>

##### - 자식 선택자(Child)

`section > ul {}`

```css
section > ul {
	border: 1px solid black;
}
```

자식 선택자는 부모요소의 "바로 아래" 자식요소만을 지정한다.

<br>

#### **인접형제 선택자와 일반형제 선택자 <br>(Adjacent / General Sibling)**

* 같은 부모요소를 가지는 요소들은 "형제관계"를 띤다.
* 먼저 나오는 요소가 형 요소, 나중의 요소가  동생요소이다.


##### - 인접 형제 선택자(Adjacent Sibling)

`h1 + ul {}`

```css
h1 + ul {
	background: Azure;
	color : blue;
}
```

조건을 충족하는(바로 다음에 나오는) "첫 번째" 동생요소만을 지정할 수 있다. 단, **형 요소에는 적용되지 않는다.**

<br>

##### - 일반 형제  선택자(General Sibling)

`h1 ~ ul {}`

```css
h1 ~ ul {
	background: Azure;
	color : blue;
}
```

조건을 충족하는 "모든" 동생요소를 지정한다. 마찬가지로 **형 요소에는 적용되지 않는다.**


<br>

#### (8) 속성 선택자 (Attribute Selector)

태그 내의 속성에 따른다.

|패턴|의미|
|---|---|
|`p [attr]`|'attr'속성이 포함된 요소 E|

```html
<E attr>lorem</E>
```
<br>

|패턴|의미|
|---|---|
|`E[attr="val"]`|'attr'속성의 값이 "val"인 요소 E|

```html
<E attr="val">lorem</E>
```
<br>

|패턴|의미|
|:---:|:---:|
|`E[attr~="val"]`|'attr'속성의 값에 "val"이 포함되는 요소 E<br>**공백으로 분리된 값이 일치해야한다!**|

```html
<E attr="val">lorem</E>
<E attr="val-num3">lorem</E>

<!--적용되지 않는 경우-->
<E attr="value">lorem</E>
```

<br>

|패턴|의미|
|:---:|:---:|
|`E[attr|="val"]`|'attr'의 값에 "val"이 포함되거나(공백으로 분리되어있는)<br>"val"로 시작하는 요소 E<br>value같이 들어있으면 인식하지 않는다.|

```html
<E attr="val">lorem</E>
<E attr="val-num3">lorem</E>

<!--적용되지 않는 경우-->
<E attr="value">lorem</E>
```

<br>

|패턴|의미|
|:---:|:---:|
|`E[attr^="val"]`|'attr'속성의 값이 "val"로 시작하는 요소 E|

```html
<E attr="val">lorem</E>
<E attr="value">lorem</E>

<!--적용되지 않는 경우-->
<E attr="val-num3">lorem</E>
```

<br>

|패턴|의미|
|:---:|:---:|
|`E[attr$="val"`|'attr'속성의 값이 'val'로 끝나는 요소 E|

```html
<E attr="val">lorem</E>
<E attr="item-val">lorem</E>

<E attr="eval">lorem</E>은???
```

<br>

|패턴|의미|
|:---:|:---:|
|`E[attr*="val"`|'attr'속성의 값에 "val"이 포함되는 요소 E<br>==공백이나 Dash(-)에 영향을 받지 않는다!==|

```html
<E attr="val">lorem</E>
<E attr="val-num3">lorem</E>
<E attr="value">lorem</E>
```

<br>

#### (9) 가상클래스 선택자 (Pseudo-Classes Selector)

HTML소스에는 존재하지 않지만 필요에 의해 가상의 선택자를 지정할 수 있다.

- 사용자의 액션(마우스 호버나 방문했던 페이지 링크)에 따라 서로 다른 상태에 놓일 수 있다.
- 요소의 상태 정보를 작성해서 특정 상태의 스타일을 지정할 수 있다.
- 동시에 놓일 경우가 많으므로 작성 순서에 유의해야 한다.
- 가상클래스 선택자는 브라우저에서 드래그해도 잡히지 않는다.
- 동적 선택자가 추가되면 요소가 좀더 구체화되므로 없는 요소보다 우선순위가 높다.

<br>

|패턴|의미|특성|
|:---:|:---:|:---:|
|`E:link`|방문하지 않은 링크 E|a요소는 항상 링크속성을 가지고 있다.<br>항상 `link`상태이므로 가장 먼저 써줘야 <br>앞서 지정한 다른 동적 선택자의 스타일이 적용되는 것을 막을 수 있다.|
|`E:visited`|방문한 링크 E|사용자가 이전에 방문한 기록이 남아있을 경우 속성이 적용된다.|
|`E:active`|E요소에 마우스 클릭, 터치, 포커스된 동안 보이는 효과지정||
|`E:hover`|E 요소에 마우스가 올라가있는 동안 보이는 효과 지정|`IE6`에서는 `<a>`태그만 호버속성이 적용된다.|
|`E::focus`|E 요소에 포커스가 머물러있는 동안 보이는 효과 지정||
|`E::first-line`|E의 첫번째 라인에 효과지정||
|`E::first-letter`|E의 첫번째 문자에 효과지정||
|`E::before`|E요소의 시작지점에 생성된 요소||
|`E::after`|E요소의 끝지점에 생성된 요소||

<br>
