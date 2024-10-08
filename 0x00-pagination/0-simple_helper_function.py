#!/usr/bin/env python3
"""
function index_range that takes two integer arguements page and page_size
"""


def index_range(page: int, page_size: int) -> tuple:
    """
    function index_range
    Args:
        page: int,
        page_size: int
    """
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return start_index, end_index
