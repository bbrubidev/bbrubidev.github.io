---
title: Git _ 원격저장소 연결하기
date: 2016-10-04
tags:
- Git
---

`git`에서는 로컬 저장소에서만 관리하던 소스코드를 원격 저장소에 올려 다른 사람들이 보거나 사용할 수 있도록 하고 있다. 이를 통해 단순 공유뿐만 아니라, 협업, 그리고 더 나아가 오픈소스의 기여까지 편리하게 작업할 수 있다. 이번 포스트에서는 원격저장소를 다루는 방법에 대해 알아보았다.

<br>

## 원격(리모트) 저장소

```powershell
# 리모트 저장소가 있는지 확인하거나 저장소 이름 확인
$ git remote
# 대부분 origin을 사용하는데, 원하는 이름으로 지어줄 수 있다.
origin
```

<br>

### 원격저장소 연결하기

`Github`의 레포지토리를 기준으로 설명하였다. 웹에서 레포지토리를 생성한 후 레포지토리 주소를 터미널에서 연결하기 원하는 로컬 저장소 폴더에 등록해준다.

```powershell
# git remote add origin <repo주소>
$ git remote add origin https://github.com/bbrubidev/remote-project.git
```

<br>

### 하나의 로컬저장소에 원격저장소 여러 개 연결하기

레포지토리는 여러 개 등록할 수도 있다. 단, 원격 저장소의 이름을 다른 것으로 해준다.

```powershell
# git remote add onemore <다른 repo주소>
$ git remote add onemore another-remote-project.git
```

이 때는 푸시할 때 원격 저장소 이름을 구분하여 버전관리를 해준다.

```powershell
# origin 원격저장소에 푸시
$ git push origin master

# onemore 원격저장소에 푸시
$ git push onemore master
```

<br>

### 원격저장소 연결 확인하기

`-v` 옵션을 통해 연결한 저장소의 상태를 체크할 수 있다.

```powershell
$ git remote -v
origin	https://github.com/bbrubidev/bbrubidev.github.io.git (fetch)
origin	https://github.com/bbrubidev/bbrubidev.github.io.git (push)
```

위에서 `fetch`는 파일을 불러오는 저장소를 의미하며, `push` 파일을 저장하는 저장소를 의미한다.

복수의 원격 저장소를 연결한 경우에는 다음과 같이 출력된다.

```powershell
$ git remote -v
origin	https://github.com/bbrubidev/remote-project.git (fetch)
origin	https://github.com/bbrubidev/remote-project.git (push)
onemore https://github.com/bbrubidev/another-remote-project.git (fetch)
onemore https://github.com/bbrubidev/another-remote-project.git (push)
```

<br>

## 원격 저장소 `clone`하기

`remote-project`의 상위폴더 위치에서 `remote-project-clone` 이라는 이름의 새로운 폴더를 만든다.

그리고 이미 로컬저장소가 연결되어 있는 원격저장소를 `remote-project-clone` 폴더에 `clone` 명령어로 내려받는다.

```powershell
$ git clone https://github.com/bbrubidev/remote-project.git remote-project-clone
```

즉, 동일한 원격 저장소와 연결된 로컬 저장소가 2개가 되었다.

```txt
1. remote-project(local1)
2. remote-project-clone(local2)
```

<br>

## `fetch`와 `merge`, 그리고 `pull`

하나의 원격 저장소를 여러 로컬 저장소에서 사용할 경우 각 로컬 저장소에서 작업한 변경사항들을 저장소별로 적용해줘야 한다.

이 때 원격 저장소에서 업데이트된 최신 스냅샷을 반영하는 명령어로 `fetch`, `merge`, 그리고 `pull`을 사용한다.

원 로컬저장소와 `clone`받은 새로운 로컬저장소가 있을 때, `remote-project(local1)`에 새로운 파일(`README.md`)을 커밋하고 푸시하면 `version2`가 생긴다.

`remote-project-clone` 폴더는 여전히 `version1`에 머물러있어 `remote-project`의 새파일이 반영되지 않은 상태다.

이 때는 원격저장소에서 `fetch` 명령어와 `merge` 명령어를 통해 최신수정사항을 반영해준다.

```powershell
# 원격저장소에서 최신의 스냅샷을 가져온다.
$ git fetch

# 스냅샷을 현재 저장소에 반영한다.
$ git merge origin/master

# fetch와 merge를 한번에 실행해주는 명령어로 pull을 사용하기도 한다.
$ git pull
```

예를 들어, Github 웹에서 `README.md`를 추가할 경우 로컬 저장소에는 파일이 없으므로 `git pull origin master`로 최신 정보를 불러와야한다.

<br>

---

## 마치며

어떤 명령어를 써야할 지 모르겠을 때는 `help` 명령어를 사용한다.

```powershell
# git help <명령어>
$ git help merge
```

해당 명령어에 대해 사용할 수 있는 세부 명령어에 대한 정보를 자세히 설명해 놓았다.

<br>
