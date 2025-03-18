from django.shortcuts import render

# Create your views here.

# from django.shortcuts import render  # 如果不使用 HTML 渲染，可省略

from rest_framework.views import APIView  # 匯入 APIView
from rest_framework.response import Response  # 匯入 Response 用來回應 JSON
from rest_framework import status  # 匯入 HTTP 狀態碼

from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Post

logger = logging.getLogger('django')


@api_view(['GET'])
def add_post(request):
    title = request.GET.get('title', '')
    content = request.GET.get('content', '')
    photo = request.GET.get('photo', '')
    location = request.GET.get('location', '')

    new_post = Post()
    new_post.title = title
    new_post.content = content
    new_post.photo = photo
    new_post.location = location
    new_post.save()

    logger.debug("************ myhello_api: " + title)

    if title:
        return Response({"data": title + " insert!"}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"res": "parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )

@api_view(['GET'])
def list_post(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)
    """
    return Response({"data":
        json.dumps(
            list(posts),
            sort_keys=True,
            indent=1,
            cls=DjangoJSONEncoder)},
        status=status.HTTP_200_OK
    )"""



from .models import Course_table

@api_view(['GET'])
def list_courses(request):
    courses = Course_table.objects.all().values()  # 轉換為列表
    return JsonResponse(list(courses), safe=False)

@api_view(['GET'])
def add_course(request):
    department = request.GET.get('department', '')
    course_title = request.GET.get('course_title', '')
    instructor = request.GET.get('instructor', '')

    if department and course_title and instructor:
        new_course = Course_table()
        new_course.Department = department
        new_course.CourseTitle = course_title
        new_course.Instructor = instructor
        new_course.save()

        return Response({"message": f"{course_title} added successfully!"}, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Missing parameters: department, course_title, or instructor"},
                        status=status.HTTP_400_BAD_REQUEST)



"""
# 定義 API 類別，繼承 APIView
class HelloApiView(APIView):
    def get(self, request):
        # 從 GET 參數取得 'name'，預設為 None
        my_name = request.GET.get('name', None)

        if my_name:
            retValue = {}  # 建立回應字典
            retValue['data'] = "Hello " + my_name  # 回應訊息
            return Response(retValue, status=status.HTTP_200_OK)  # 送出成功回應
        else:
            return Response(
                {"res": "parameter: name is None"},  # 錯誤訊息
                status=status.HTTP_400_BAD_REQUEST  # 回應 400 錯誤
            )
"""

