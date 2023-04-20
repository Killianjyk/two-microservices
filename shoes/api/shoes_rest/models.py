from django.db import models
from django.urls import reverse

# Create your models here.
class BinVO(models.Model):
    import_href = models.CharField(max_length=100, unique=True, default="")
    closet_name = models.TextField(blank=True)

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=200)
    model_name = models.CharField(max_length=200)
    color = models.CharField(max_length=20)
    picture_url = models.URLField(null=True)
    bins = models.ForeignKey(
        BinVO,
        null=True,
        related_name="bins",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.model_name

    def get_api_url(self):
        return reverse("shoe_detail", kwargs={"pk": self.pk})
