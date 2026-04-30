from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .local_llm import call_local_llm


class LLMRequestView(APIView):
    def post(self, request):
        prompt = request.data.get('prompt', '')
        try:
            llm_response = call_local_llm(prompt)
            return Response({"response": llm_response})
        except Exception as e:
            return Response({"error": str(e)}, status=500)


