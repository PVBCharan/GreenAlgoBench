"""
Linear Search implementation for benchmarking.
"""

def linear_search(arr, target):
    """Returns the index of target in arr, or -1 if not found."""
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1
