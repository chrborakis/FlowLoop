from django.db import models

class Address(models.Model):
    country = models.CharField(max_length=64)
    city    = models.CharField(max_length=64)
    street  = models.CharField(max_length=64)
    class Meta:
        db_table = 'address'
    def __str__(self):
        return f'{self.country} ({self.street} {self.city})'
    
