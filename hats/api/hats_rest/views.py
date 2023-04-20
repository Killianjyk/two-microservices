from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

from common.json import ModelEncoder
from .models import LocationVO, Hat

# Create your views here.


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = ["closet_name",
                  "section_number",
                  "shelf_number",
                  "import_href"]

"""
class HatListEncoder(ModelEncoder):
    model = Hat
    properties = ["name"]

    def get_extra_data(self, o):
        return {"location": o.location.name}
"""


class HatDetailEncoder(ModelEncoder):
    model = Hat
    properties = [
        "fabric",
        "name",
        "color",
        "picture_url",
        "id",
        "location",
    ]
    encoders = {
        "location": LocationVOEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    """
    lists the name of hats and the link to the hat for the
    specified location id.

    Returns a dictionary with a single key "hats" which is a list
    of hat names and URLs. Each entry in the list is a dictionary that
    contains the name of the hat and the link to the hat's information
    """
    if request.method == "GET":
        hats = Hat.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatDetailEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            location_href = content["location"]
            print(location_href)
            location = LocationVO.objects.get(import_href=location_href)
            print(location)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )

        hat = Hat.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE", "PUT"])
def api_show_hat(request, id):
    if request.method == "GET":
        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    elif request.method == "DELETE":
        count, _ = Hat.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        content = json.loads(request.body)
        print(**content)
        Hat.objects.filter(id=id).update(**content)

        hat = Hat.objects.get(id=id)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
