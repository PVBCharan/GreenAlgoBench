"""
Binary Search implementation for benchmarking.
"""

def binary_search(arr, target):
    """Returns the index of target in arr, or -1 if not found. Assumes arr is sorted."""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
