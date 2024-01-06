from django.db import models

from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing

class Line(models.Model):
    """
    A recursive piecing node.
    """
    recursive_piecing_project = models.ForeignKey(RecursivePiecing, on_delete=models.CASCADE, related_name="recursive_piecing_lines")

    start = models.CharField(max_length=100)
    end = models.CharField(max_length=100)

    name = models.CharField(max_length=100)