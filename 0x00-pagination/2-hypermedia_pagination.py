#!/usr/bin/env python3
"""
Hypermedia pagination
"""

import csv
import math
from typing import List, Tuple


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Retrieves a specific page of the dataset of popular baby names.

        Args:
            page (int, optional): The page number. Defaults to 1.
            page_size (int, optional): The number of items per page.
            Defaults to 10.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        start_index, end_index = index_range(page, page_size)

        dataset = self.dataset()

        if end_index > len(dataset):
            return []

        return dataset[start_index:end_index]


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


def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
    """Retrieves a specific page of the dataset of popular baby names
        along with pagination metadata.

        Args:
            page (int, optional): The number of the page to retrieve. Defaults
            to 1.
            page_size (int, optional): The number of items per page. Defaults
            to 10.
    """
    data = self.get_page(page, page_size)
    if not data:
        page_size = 0
        total_pages = 0
        next_page = None
        prev_page = None
    else:
        page_size = min(page_size, len(self.dataset())) if page_size > 0 \
            else len(self.dataset())

        total_pages = len(self.dataset()) //\
            page_size + (len(self.dataset()) % page_size != 0)

        next_page = page + 1 if page * page_size < len(self.dataset()) \
            else None
        prev_page = page - 1 if page > 1 else None
    return {
        'page_size': page_size,
        'page': page,
        'data': data,
        'next_page': next_page,
        'prev_page': prev_page,
        'total_pages': total_pages

    }
