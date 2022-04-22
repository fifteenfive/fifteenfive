from django.db import models

# Create your models here.
class wine(models.Model):
    wine_id = models.IntegerField(primary_key=True)
    kor_name = models.CharField(max_length=100)
    eng_name = models.CharField(max_length=100)
    wine_type = models.CharField(max_length=10)
    wine_country = models.CharField(max_length=40)
    wine_price = models.IntegerField(default=0)
    wine_vintage = models.IntegerField(default=0)
    wine_sweet = models.IntegerField(default=0)
    wine_acidity = models.IntegerField(default=0)
    wine_body = models.IntegerField(default=0)
    wine_tannin = models.IntegerField(default=0)
    wine_image = models.CharField(max_length=200)
    vivino_name = models.CharField(max_length=100)
    wine21_name = models.CharField(max_length=100)
    score = models.IntegerField(default=0)

    class Meta:
        db_table = 'wine'

class user(models.Model):
    user_id = models.IntegerField(primary_key=True)
    user_email = models.EmailField(max_length=50)
    user_nickname = models.CharField(max_length=50)
    user_password = models.CharField(max_length=200)
    user_profile_url = models.CharField(max_length=255)
    user_lifestyle_code = models.CharField(max_length=45)
    roles = models.CharField(max_length=45)

    class Meta:
        db_table = 'user'

class review_like(models.Model):
    review_id = models.IntegerField()
    user_id = models.IntegerField()
    review_like_id = models.IntegerField(primary_key=True)

    class Meta:
        db_table = 'review_like'

class review(models.Model):
    review_id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField(default=0)
    wine_id = models.IntegerField(default=0)
    review_img_url = models.CharField(max_length=200)
    score = models.IntegerField(default=0)
    content = models.CharField(max_length=200)
    created_time = models.TimeField(auto_now=True)

    review_sweet = models.IntegerField(default=0)
    review_acidity = models.IntegerField(default=0)
    review_tannin = models.IntegerField(default=0)
    review_body = models.IntegerField(default=0)

    class Meta:
        db_table = 'review'

class userBasedCF(models.Model):
    id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField()
    wine_id = models.IntegerField()

    class Meta:
        db_table = 'userBasedCF'

        
class itemBasedCF(models.Model):
    id = models.IntegerField(primary_key=True)
    based_wine_id = models.IntegerField()
    recomm_wine_id = models.IntegerField()

    class Meta:
        db_table = 'itemBasedCF'

class wine_aroma(models.Model):
    aroma_id = models.IntegerField(primary_key=True)
    wine_id = models.IntegerField()

    class Meta:
        db_table = 'wine_aroma'

class wine_wishlist(models.Model):
    user_id = models.IntegerField(primary_key=True)
    wine_id = models.IntegerField()

    class Meta:
        db_table = 'wine_wishlist'

class aroma(models.Model):
    aroma_id = models.IntegerField(primary_key=True)
    aroma_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'aroma'

class lifestyle_wine(models.Model):
    lifestyle_wine_id = models.CharField(primary_key=True, max_length=45)
    wine_id = models.IntegerField(default=0)
    lifestyle_code = models.CharField(max_length=40)

    class Meta:
        db_table = 'lifestyle_wine'

