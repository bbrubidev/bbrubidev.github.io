---
title: Web _ 3.1 기능 API 구현하기
date: 2017-09-29
tags:
- Django
- Project
- Web development
---

이번 포스트에서는 웹서비스의 기능에 해당하는 API들을 간략하게 소개해보려고 한다. 크게 3가지로 나뉘는데, 작품 목록 및 세부페이지 조회 API, 장르별 작품 목록 및 세부 페이지 API, 모티프 등록/수정/삭제 API 이다. API를 제작하면서 새롭게 배웠던 것들이나 개념을 정리해보고자 한다.

<br>

## 장르별 작품 목록 및 세부 페이지 API

웹서비스에서 장르를 선택하면 해당 장르 내에 속한 작품 목록을 조회할 수 있도록 하려고 한다. 이 때 장르는 10가지로 제한하려고 하였다.

### CHOICE 이중 튜플 사용하기

장고에서는 입력 값을 제한(선택)하게 하고싶은 경우, 커스텀 옵션을 정의하여 필드에 젹용할 수 있다. 아래와 같이 이중 튜플을 사용하여 데이터베이스에 저장되는 값과  화면에 보이는 값을 다르게 설정하여 필드에서 선택할 수 있도록 하였다.

```python
# 작품 분류할 장르 모델
class Genre(models.Model):
    GENRE_TYPE_CHOICES = (
        # ('DB에 저장되는 값', '화면에 보이는 값'),
        ('collage', '콜라주'),
        ('drawing', '드로잉'),
        ('installation', '설치미술'),
        ('new-media', '뉴미디어'),
        ('graphic-design', '그래픽디자인'),
        ('photography', '사진'),
        ('video-art', '비디오 아트'),
        ('print-making', '프린팅'),
        ('sculpture', '조각'),
        ('others', '기타'),
    )
    # 장르명
    name_genre = models.CharField(
        max_length=50,
        choices=GENRE_TYPE_CHOICES
    )
    ...
```

다음과 같이 정의할 경우 드롭다운 메뉴가 생성된다. 드롭다운 메뉴에서는 한글로 보이지만, 데이터베이스에 저장될 때는 영어로 저장된다.

<br>

### 카테고리명으로 장르별 작품목록 페이지  URI 생성하기

변하지 않는 값이라면 URI에서 값을 가져오는 데에 사용할 수 있다. 예를  들어 `id`값을 사용하는 경우 URL은 다음과 같을 것이다.

```txt
http://{{ domain }}/art/genre/1/
http://{{ domain }}/art/genre/2/
...
http://{{ domain }}/art/genre/9/
http://{{ domain }}/art/genre/10/
```

장르 모델에서 사용하는 장르의 갯수가 10개이고 변하지 않는 이름값을 가지므로 `id`보다는 `이름(string)`을 사용하여 URI를 만들어보았다.

목표로 하는 장르별 작품 목록의 전체 URL은 다음과 같다.

```txt
http://{{ domain }}/art/genre/collage/
http://{{ domain }}/art/genre/drawing/
http://{{ domain }}/art/genre/installation/
http://{{ domain }}/art/genre/new-media/
...
```

해당 장르에 속하는 작품 정보를 JSON 구조로 반환하는 뷰는 다음과 같다. 눈여겨볼 점은 사용자가 선택한  `genre_info`를 url에서 해당하는 이름으로 가져온다는 것이다.

```python
class GenreArtListView(generics.ListAPIView):
    """
    장르별 작품 목록 페이지
    작품을 클릭하면 작품상세페이지로 가게끔 처리(template)
    """
    serializer_class = ArtListSerializers
    permission_classes = (IsOwnerOrReadOnly,)

    def get(self, request, *args, **kwargs):
        """
        장르명 별로 url을 보내면 해당 이름에 페이지를 보내준다.
        """
        # name_genre를 url에 있는 genre_cate와 일치하는 것으로 쿼리한다.
        genre_info = Genre.objects.get(name_genre=kwargs['genre_cate'])
        genre_artlist = genre_info.art
        genreinfo_serializer = GenreListSerializers(genre_info)
        genreart_serializer = self.serializer_class(genre_artlist, many=True)

        content = {
            "genreInfo": genreinfo_serializer.data,
            "genreArtList": genreart_serializer.data
        }
        return Response(content, status=status.HTTP_200_OK)
```

그리고 url에 다음과 같이 `genre_cate`와 일치하는 정규표현식을 작성해주면 된다.


```python
# art/urls.py

# 장르별 작품 목록
    url(r'^genre/(?P<genre_cate>.+)/$',
        apis.GenreArtListView.as_view(),
        name='genre_detail'
        ),
```

이렇게 하면 장르명으로 작성된 URL을 보냈을 때 해당 장르 내의 작품정보목록을 JSON 구조로 반환한다.

<br>


## 모티프 등록/수정/삭제 API

본 서비스에서 모티프란 `작품에 대해 이야기하고 싶은 주제공간`이다. 사용자가 모티프를 생성하면 내부에 관련 주제로 다른 사용자와 댓글을 통해  의견을 나눌 수 있게 구상하였다.

<br>

### 권한 설정하기

이 경우 사용자가 **로그인한 경우**에만 모티프를 생성, 수정, 삭제할 수 있어야 하며, 특히 수정 및 삭제의 경우에는 해당 모티프를 생성한 사용자만 가능하도록 권한을 커스터마이징 하였다.

로그인 인증확인의 경우에는 레스트에서 지원하는 `IsAuthenticated` 퍼미션 클래스를 임포트하여 사용하였다. 반면 수정 및 삭제용으로 커스터마이징한 퍼미션 클래스는 다음과 같다.

```python
# utils/permissions/motif_perms.py


class IsMotifOwnerOrReadOnly(permissions.BasePermission):
    """
    관리자 또는 자기자신일 경우 perm = True
    또는 obj의 소유자가 요청을 보낸 사용자일 경우 perm = True
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS and \
                permissions.IsAdminUser:
            return True
        return obj.motif_author == request.user
```

메서드를 보면 관리자와 `obj`의 `motif_author`가 요청을 보낸 사용자일 경우에만 권한을 `True`로 반환하도록 하였다. 위의 클래스를 뷰 클래스의 멤버변수로 지정해주거나, 사용하기를 원하는 요청메서드에만 따로 지정할 수도 있다.

```python
# apis/motifs.py

permission_classes = ('IsAuthenticated', 'IsMotifOwnerOrReadOnly', )
```

<br>

### PUT 메서드로 부분수정하기

`PUT` 요청의 경우 REST 관례 상 replace를 시켜버리기 때문에 일부 데이터만 보내도 값 전체가 변경되어 버린다. 이러한 `PUT` 메서드로 부분수정이 가능하도록 구현해보았다.

**put 메서드 로직**

- 수정을 원하는 객체를 쿼리해서 변수에 선언한다.
- 시리얼라이저에 쿼리한 객체를 넣고 사용자가 입력한 정보(`request.data`)로 변경한다.
- 넣은 정보에 대해 입력값 검증(`validate()`)을 실시한다.
- 통과한 경우 변경된 값으로 저장(`save()`)한다.
- 변경된 객체를 정보조회용 시리얼라이저에 대입한다. (선택)
- 해당 시리얼라이저의 `.data`를 출력한다.

<br>

모티프 주제를 수정할 경우 해당 모티프의 작성자 값과 연결된 작품 객체값은 변경되면 안된다. 이 경우에는 serializer 내에서 `update()` 메서드를 사용하여 변경되지 않는 값을 명시해준 후 저장하는 것으로 값이 변경되는 것을 방지할 수 있다.

```python
# motif/serializers/motifs.py

class MotifUpdateSerializers(serializers.ModelSerializer):

	...

    def update(self, instance, validated_data):
        """
        변경된 내용으로 저장
        """
        self.instance.name_motif = validated_data['name_motif']
        self.instance.name_art = validated_data['name_art']
        self.instance.motif_author = validated_data['motif_author']
        instance.save()
        return instance
```

`validate()`를 통과한 데이터를 가지고 `instance`의 값에 변경/변경되지 않은 값의 `value`를 정의해주는 것이다.  

<br>

---

## 마치며

모티프에 저장할 댓글을 제외하고 기본 API 제작을 완료하였다. 코멘트와 태그기능을 제작한 후에는 프론트 작업을 본격적으로 해볼 예정이다.

<br>
