from django.urls import path

from hats_rest.views import api_list_hats, api_show_hat

urlpatterns = [
    path("hats/", api_list_hats, name="api_create_hats"),
    path("hats/<int:id>/", api_show_hat, name="api_show_hat"),
]
