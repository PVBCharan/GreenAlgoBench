
import sys

# Increase recursion limit just in case, though we try to stay within safe bounds
sys.setrecursionlimit(20000)

def fibonacci_recursive(n):
    """
    Naive recursive Fibonacci. O(2^n).
    Very inefficient, good for demonstrating high CPU/Energy usage.
    """
    if n <= 1:
        return n
    return fibonacci_recursive(n-1) + fibonacci_recursive(n-2)

def fibonacci_iterative(n):
    """
    Iterative Fibonacci. O(n).
    Efficient.
    """
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

def factorial_recursive(n):
    """
    Recursive Factorial. O(n), but uses O(n) stack memory.
    """
    if n == 0:
        return 1
    return n * factorial_recursive(n-1)

def factorial_iterative(n):
    """
    Iterative Factorial. O(n), O(1) memory.
    """
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
