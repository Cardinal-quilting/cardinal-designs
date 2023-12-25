from django.db import models

from projects.models.project_model import Project

class RecursivePiecing(models.Model):
    project = models.OneToOneField(Project, on_delete=models.CASCADE, related_name="recursive_piecing")

    node_size = models.FloatField()
