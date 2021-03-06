---
title: Git _ 기본 이해하기
date: 2016-06-15
tags:
- Git
---


버전 컨트롤 시스템인 `git`의 기본원리와 사용법에 대해 간단히 정리하였다.

<br>


> 워킹 디렉토리의 모든 파일은 크게 Tracked(관리대상임)와 Untracked(관리대상이 아님)로 나눈다. Tracked 파일은 이미 스냅샷에 포함돼 있던 파일이다. Tracked 파일은 또 Unmodified(수정하지 않음)와 Modified(수정함) 그리고 Staged(커밋으로 저장소에 기록할) 상태 중 하나이다. 그리고 나머지 파일은 모두 Untracked 파일이다. Untracked 파일은 워킹 디렉토리에 있는 파일 중 스냅샷에도 Staging Area에도 포함되지 않은 파일이다. 처음 저장소를 Clone 하면 모든 파일은 Tracked이면서 Unmodified 상태이다. 파일을 Checkout 하고 나서 아무것도 수정하지 않았기 때문에 그렇다.
<br>

![img](https://git-scm.com/book/en/v2/images/lifecycle.png)

**(1) Committed**

- 데이터가 로컬 데이터베이스에 안전하게 저장된 상태

<br>

**(2) Tracked**

- git 로컬 저장소에 add된 상태

<br>

**(3) Untracked**

- 파일을 생성하여 작업한 후 git의 로컬저장소에 `add`하지 않은 상태


<br>

**(4) Modified**

- 수정한 파일을 로컬저장소에 아직 커밋하지 않은 상태

<br>

**(5) Staged**

- 현재 수정한 파일을 곧 커밋할 것이라고 표시한 상태
- `Staging area`는 `.git` 디렉토리에 있다. 곧 커밋할 파일에 대한 정보를 저장하는 곳이다.

<br>

**(6) Git Directory**

- 메타데이터와 객체 디비(파일)을 저장하는 곳
- 다른 컴퓨터에 있는 저장소를 clone하면 깃 디렉토리가 만들어진다.

<br>


## Git 설치

다음 명령어로 git 설치를 진행한다.

```powershell
# brew로 설치
$ brew install git
$ brew search git

# git 최초설정 진행
$ git config —global user.name "이름"
$ git config —global user.email "이메일"
$ git config —global core.editor vim

# 설정 확인
$ git config —list

# 깃에서 사용할 수 있는 명령어 소개
$ git help

# 특정 명령어에 대한 도움말
$ git help "명령어 이름"

# 깃 버전 확인
$ git --version
```

<br>

## 버전관리법

- 폴더로 만들고 `git init` 입력
- `touch README.md`
- `md README.md`를 써서 마크다운으로 입력 가능
- `git add README.md`
- `git commit`
- 커밋 메세지 입력 (**입력하지 않으면 commit되지 않는다**)
- `git log` 명령어를 통해서는 `commit 내역`을 확인할 수 있다.
- `git log` 명령어에  `-p` 옵션을 추가할 경우 로그를 한번에 확인할 수 있다.

<br>

## 파일 생성에서 커밋까지

- 파일 생성은 `vi` 명령어나 `touch` 명령어를 통해 진행할 수 있다.

```powershell
$ vi text.txt
$ touch text.md
```

- 에디터를 열지 않고도 바로 내용이 있는 파일을 생성할 수 있다. `echo "기록할 내용" > "파일명"` 명령어를 사용할 경우 파일을 에디터 등으로 열지 않고 기록할 내용을 파일 내에 저장해준다. **단, 꺽쇠(`>`)를 1개 쓰면 이미 있던 내용이 날아가고 새로운 내용으로 덮어쓰므로 있던 내용에 붙여넣기를 할 때는 `>>`를 쓴다.**

- `cat 파일명.확장자`는 파일의 내용을 셸에서 바로 출력, 확인할 수 있게 해주는 명령어이다.
- `git status` 명령어를 통해 `untracked file`가 생성된 것을 확인할 수 있다.
- `git commit` : vim 에디터 모드에서 commit 상태를 확인할 수 있으며, 최상단에 커밋 메세지를 입력할 수 있다. **입력하지 않으면 커밋되지 않는다.**
- `git commit -m "커밋메세지"` 명령어를 통해 커밋메세지를 한번에 입력할 수 있다.
- `git add --all`는 모든 파일을 `staging area`에 추가하는 명령어이다.
- `git reset HEAD abc2.txt` 명령어는 `add`한 파일을 다시 `untracked file`로 돌릴 때 사용한다.

<br>

## 파일 생성 후 수정/저장


- 파일을 만들고 나중에 수정사항이 생겼을 때 만든 파일은 staged 상태이며 추가적으로 수정된 내용은 `modified` 상태로 저장된다.

- `git diff`는 `staged`된 내용과 `modified`된 내용의 차이를 보여준다. 즉, 수정했지만 아직 staged되지 않은(`==modified`) 상태의 파일을 비교할 수 있다. 이 때 `git diff --staged` 또는 `git diff --cached`는 `staged`된 내용과 `commit`된 내용의 차이를 보여준다.

- `modified` 상태의 파일은 `staging area` 안에 들어있지 않은 추후 수정내용을 가지고 있다. 따라서 modified 내용을 추가적으로 `add` 명령어를 사용하여 `staging area`에 넣어주어야 한다.


<br>

## 파일 삭제

- 셸에서 특정 파일을 삭제할 때 `rm` 명령어를 쓰면 git에서 바로 추적된다. 이 때 추적된 파일의 상태는 `deleted`이다.
- 반면 `git rm 파일이름` 명령어를 사용할 경우에는 git에서 해당 파일의 추적내역을 삭제하는 것이므로 `commited`에서 `staged`로 옮겨가고 추적되지 않는다.

<br>
