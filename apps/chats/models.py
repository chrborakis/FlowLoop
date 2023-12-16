from django.db import models
from django.forms import ValidationError
from django.utils.timezone import now

from apps.users.models import Friends

class PrivateChat(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender     = models.ForeignKey(Friends, related_name='sender',on_delete = models.CASCADE)
    receiver   = models.ForeignKey(Friends, related_name='receiver',on_delete=models.CASCADE)
    message    = models.TextField(null=False,blank=False)
    date       = models.DateField(default=now, editable=False, blank=True, null=True)

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError("Receiver cannot be the sender!")

    def __str__(self):
        return f'[{self.sender.person}->{self.receiver.friend}] {self.message}'

    class Meta:
        db_table = 'private_chat'