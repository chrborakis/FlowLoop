from django.db import models
from django.utils.text import slugify
from django.utils.timezone import now

from apps.users.models import Users
from apps.models import Address, Phone


class Companies(models.Model):
    company_id = models.AutoField(primary_key=True)
    company_name = models.TextField(unique=True)
    slug = models.SlugField( unique=True, db_index=True, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    phones = models.ForeignKey(Phone, on_delete=models.CASCADE)
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


class WorksOn(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Users, on_delete=models.CASCADE, to_field="user_id")
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, to_field="company_id")
    STATUS = [        ("P", "Pending"),        ("A", "Accepted"),        ("D", "Declined")    ]
    status = models.TextField(
        choices=STATUS,
        default="P",
        blank=False, null=False
    )
    role = models.TextField(blank=True, max_length=128, null=True)

    class Meta:
        db_table = 'works_on'
        unique_together = (('user', 'company'),)
    def __str__(self):
        return f'[{self.status}] {self.user} -> {self.company.company_name}'



class CompaniesAdmins(models.Model):
    id = models.AutoField(primary_key=True)
    company = models.ForeignKey(Companies, on_delete=models.CASCADE, to_field="company_id", related_name="company_to_admin")  # The composite primary key (company, isadmin) found, that is not supported. The first column is selected.
    isadmin = models.ForeignKey(Users, on_delete=models.CASCADE, to_field="user", related_name="admin")
        
    class Meta:
        db_table = 'companies_admins'
        unique_together = ('company', 'isadmin')
    def __str__(self):
        return f'[{self.company}] administrated by {self.isadmin}'
    
    def save(self, *args, **kwargs):
        if self.should_save():
            super(CompaniesAdmins, self).save(*args, **kwargs)
        else:
            raise ValueError("User must work on the company in order to admin it.")
    def should_save(self):
        return WorksOn.objects.filter(user=self.isadmin, company=self.company).exists()
