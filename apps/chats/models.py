from django.db import models
from django.forms import ValidationError
from django.utils.timezone import now
from django.utils import timezone
from apps.users.models import Friends

class PrivateChat(models.Model):
    message_id = models.AutoField(primary_key=True)
    sender     = models.ForeignKey(Friends, related_name='sender',on_delete = models.CASCADE)
    receiver   = models.ForeignKey(Friends, related_name='receiver',on_delete=models.CASCADE)
    message    = models.TextField(null=False,blank=False)
    date       = models.DateTimeField(default=timezone.now, editable=False, blank=True, null=True)

    def clean(self):
        if self.sender == self.receiver:
            raise ValidationError("Receiver cannot be the sender!")
        
        if self.sender.person != self.receiver.friend:
            raise ValidationError("Sender and Receiver must be friends.")
        super().clean()


    def __str__(self):
        return f'[{self.sender.person}->{self.receiver.person}] {self.message}'

    class Meta:
        db_table = 'private_chat'

