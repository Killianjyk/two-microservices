from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.shortcuts import render
from .models import Shoe, BinVO
from common.json import ModelEncoder
from django.shortcuts import get_object_or_404
# Create your views here.

# JSON encoders for the Shoe model
class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "import_href",
        "bin_number",
        "bin_size",
    ]

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "model_name",
        "id",
        "manufacturer",
        "color"
    ]

    def get_extra_data(self, o):
        return {"bins": o.bins.closet_name}

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "id"
    ]
    encoders = {
        "bins": BinVOEncoder(),
    }

# Get a list of all shoes & create a new shoe
@require_http_methods(["GET", "POST"])
def shoe_list(request):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            {"shoes": shoes},
            encoder=ShoeListEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            bins_href = content["bins"]
            bins = BinVO.objects.get(import_href=bins_href)
            content["bins"] = bins
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )

        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,
        )

# Get the details of a shoe & delete a shoe
@require_http_methods(["DELETE", "GET"])
def shoe_detail(request, pk):
    if request.method == "GET":
        shoes = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoes,
            encoder=ShoeListEncoder,
            )
    else:
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
