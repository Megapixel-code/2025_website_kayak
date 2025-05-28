from django.db import models

class page(models.Model):
    id = models.PositiveBigIntegerField(primary_key=True, unique=True)
    image = models.ImageField(upload_to="site_images/")
    title = models.CharField(max_length=100)
    second_title = models.CharField(max_length=50, null=True, blank=True)
