from django.contrib import admin
from .models import Location, Bin

# Register your models here.
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    pass

@admin.register(Bin)
class BinAdmin(admin.ModelAdmin):
    pass
