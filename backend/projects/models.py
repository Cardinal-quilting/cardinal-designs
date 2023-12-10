import uuid
from django.db import models

class Project(models.Model):
    project_id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    project_name = models.CharField(max_length=100, unique=True)

    background_image_zoom = models.FloatField()
    background_image_opacity = models.FloatField()
    background_image_max_zoom = models.FloatField()
    background_image_wheel_sensitivity = models.FloatField()
    background_image_translation = models.JSONField()
    background_image_disable_movement = models.BooleanField()
    background_image_display = models.BooleanField()

    aspect_ratio = models.FloatField()
