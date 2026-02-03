"""
Experiment configuration for algorithm benchmarking.
Defines algorithm categories, dataset sizes, number of runs, and random seed for reproducibility.
"""

# Algorithm categories and their respective algorithms
ALGORITHM_CATEGORIES = {
    # Sorting algorithms to benchmark
    "sorting": [
        "bubble_sort",   # Simple, illustrative sorting algorithm
        "merge_sort",    # Efficient, divide-and-conquer sorting
        "quick_sort"     # Fast, widely used sorting algorithm
    ],
    # Searching algorithms to benchmark
    "searching": [
        "linear_search", # Basic, sequential search
        "binary_search"  # Efficient, requires sorted data
    ],
    # Recursive vs Iterative benchmarks (new category)
    "recursion": [
        "fibonacci_recursive",
        "fibonacci_iterative"
    ]
}

# Dataset sizes to use for experiments
DATASET_SIZES = [
    1000,   # Small dataset
    5000,   # Medium dataset
    10000   # Large dataset
]

# Number of times to repeat each experiment for statistical reliability
NUM_RUNS = 5

# Fixed random seed for reproducibility of experiments
RANDOM_SEED = 42
