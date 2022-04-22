from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(wine)
admin.site.register(user)
admin.site.register(review_like)
admin.site.register(userBasedCF)
admin.site.register(itemBasedCF)
admin.site.register(aroma)
admin.site.register(wine_aroma)
admin.site.register(wine_wishlist)
admin.site.register(review)
admin.site.register(lifestyle_wine)