from django.db import models

# lets us explicitly set upload path and filename
# cari tau gimana cara kerja upload to ini pakek library pillow
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

class ProductModel(models.Model):
    name = models.CharField(max_length=200)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    price = models.IntegerField()
    created_by = models.CharField(max_length=200)
    created_date = models.DateField()
    modified_date = models.DateField()
    star_review = models.IntegerField(default=0)

    class Meta:
        def __str__(self) -> str:
            return self.name
