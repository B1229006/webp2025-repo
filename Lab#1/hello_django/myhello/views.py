from django.shortcuts import render

# Create your views here.

# from django.shortcuts import render  # 如果不使用 HTML 渲染，可省略

from rest_framework.views import APIView  # 匯入 APIView
from rest_framework.response import Response  # 匯入 Response 用來回應 JSON
from rest_framework import status  # 匯入 HTTP 狀態碼

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
