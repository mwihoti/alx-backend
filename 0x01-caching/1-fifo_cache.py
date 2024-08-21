#!/usr/bin/python3
"""
Create a class FIFOCache that inherits from BaseCaching and
is a caching system:
"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class FIFOCache(BaseCaching):
    """Fifo caching"""
    def __init__(self):
        """
        Initiliazes cache, uses super to call parents
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        Adds an item into cache
        """
        if not key or not item:
            return
        self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            KeyOne = self.cache_data.popitem(False)
            print('DISCARD:', KeyOne[0])

    def get(self, key):
        """
        Retrieves an item by key
        """
        return self.cache_data.get(key, None)
