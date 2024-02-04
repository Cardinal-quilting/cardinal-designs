from django.db import models

from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing

class Node(models.Model):
    """
    A recursive piecing node.
    """
    recursive_piecing_project = models.ForeignKey(RecursivePiecing, on_delete=models.CASCADE, related_name="recursive_piecing_nodes")

    x = models.FloatField()
    y = models.FloatField()

    name = models.CharField(max_length=100)