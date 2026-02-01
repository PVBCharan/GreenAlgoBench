"""
Utility for measuring execution time using time.perf_counter.
"""
import time

def profile_time(func, *args, **kwargs):
    """Returns (result, elapsed_time) for a function call."""
    start = time.perf_counter()
    result = func(*args, **kwargs)
    elapsed = time.perf_counter() - start
    return result, elapsed
