from django.db import models
from django.urls import reverse


# Create your models here.
class LocationVO(models.Model):
    closet_name = models.CharField(max_length=200)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()

    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.closet_name} - {self.section_number}/{self.shelf_number}"


class Hat(models.Model):
    fabric = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=200)

    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name

    def get_api_url(self):
        return reverse("api_show_hat", kwargs={"id": self.id})
