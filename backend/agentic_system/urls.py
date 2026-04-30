from django.urls import path
from .views import LLMRequestView


urlpatterns = [
    path('llm_request/', LLMRequestView.as_view(), name='llm_request'),
]