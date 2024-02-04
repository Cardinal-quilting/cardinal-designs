from django.db import models

from projects.models.recursive_piecing.recursive_piecing_model import RecursivePiecing

from projects.models.recursive_piecing.nodes import Node

class Line(models.Model):
    """
    A recursive piecing node.
    """
    recursive_piecing_project = models.ForeignKey(RecursivePiecing, on_delete=models.CASCADE, related_name="recursive_piecing_lines")

    start = models.ForeignKey(Node, on_delete=models.CASCADE, related_name="start")
    end = models.ForeignKey(Node, on_delete=models.CASCADE, related_name="end")

    name = models.CharField(max_length=100)