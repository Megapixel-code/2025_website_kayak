from django.db import models


class Page(models.Model):
    id = models.IntegerField(primary_key=True, unique=True)
    
    image = models.ImageField(upload_to="site_images/")
    title = models.CharField(max_length=100)
    second_title = models.CharField(max_length=50, null=True, blank=True)
    call_to_action = models.BooleanField(default=True)

    def __str__(self):
        return self.title

class Page_Button(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    
    page_fk = models.ForeignKey(Page, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    href = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CallToAction(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    
    content = models.CharField(max_length=200)
    button = models.CharField(max_length=50)
    image = models.ImageField(upload_to="site_images/")

    def __str__(self):
        return self.content, self.button


class Paragraph_Group(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    page_fk = models.ForeignKey(Page, on_delete=models.CASCADE)
    order = models.IntegerField(unique=True)
    
    title = models.CharField(max_length=45)
    type = models.CharField(max_length=1)
    
    def __str__(self):
        return self.title


class Paragraph(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    paragraph_group_fk = models.ForeignKey(Paragraph_Group, on_delete=models.CASCADE)
    order = models.IntegerField(unique=True)
    
    title = models.CharField(max_length=50, null=True)
    content = models.TextField(null=True)

    def __str__(self):
        return self.title

class Paragraph_Array(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    paragraph_fk = models.ForeignKey(Paragraph, on_delete=models.CASCADE)

    content = models.TextField(default='""')


class Person:
    id = models.AutoField(primary_key=True, unique=True)
    paragraph_group_fk = models.ForeignKey(Paragraph_Group, on_delete=models.CASCADE)
    order = models.IntegerField(unique=True)

    image = models.ImageField(upload_to="person_images/")
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.name