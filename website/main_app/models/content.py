from django.db import models

class Page(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    image = models.ImageField(upload_to="site_images/")
    title = models.CharField(max_length=100)
    second_title = models.CharField(max_length=50, null=True, blank=True)

class Page_Button(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    page_fk = models.ForeignKey(Page, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    href = models.CharField(max_length=100)