from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now
from phonenumber_field.modelfields import PhoneNumberField

from apps.users.models import Users
from apps.models import Address


class Companies(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_name = models.CharField(unique=True,blank=False, null=False)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True, editable=False)
    description = models.TextField(blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, unique=True)
    phone = PhoneNumberField(unique=True,blank=False, null=False)
    image = models.ImageField(upload_to="company_image", blank=True, null=True)
    establishment_date = models.DateField(blank=False, null=False)
    creation_date = models.DateField(default=now, editable=False, blank=True, null=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.company_name)
        super().save(*args, **kwargs)
    class Meta:
        db_table = 'companies'
    def __str__(self):
        return f'{self.company_name}'


class WorkRequests(models.Model):
    id = models.AutoField(primary_key=True)
    user    = models.ForeignKey(Users,     on_delete=models.CASCADE, to_field="user_id")
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, to_field="company_id")
    STATUS = [        ("P", "Pending"),        ("A", "Accepted"),        ("D", "Declined")    ]
    status = models.TextField(
        choices=STATUS,
        default="P",
        blank=False, null=False
    )
    class Meta:
        unique_together = ('user', 'company',)
        db_table = 'work_requests'

    def __str__(self):
        return f'[{self.status}] {self.user} -> {self.company.company_name}'

class WorksOn(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(WorkRequests, on_delete=models.CASCADE, unique=True)
    is_admin = models.BooleanField(null=True,blank=True,default=False)

    def __str__(self):
        return f'[{self.employee.company}] {self.employee.user}'

    class Meta:
        db_table = 'works_on'