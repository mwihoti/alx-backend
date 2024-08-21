#!/usr/bin/python3
"""
Create a class LIFOCache that inherits from
BaseCaching and is a caching system:
"""
from collections import OrderedDict
BaseCaching = __import__('base_caching').BaseCaching


class LIFOCache(BaseCaching):
    """Lifo caching"""
    def __init__(self):
        """
        Initiliazes cache, uses super to call parent
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
        Adds items into cache
        """
        if key is None or item is None:
            return
        if key not in self.cache_data:
            if len(self.cache_data) + 1 > BaseCaching.MAX_ITEMS:
                lastKey = self.cache_data.popitem(True)
                print("DISCARD:", lastKey)
        self.cache_data[key] = item
        self.cache_data.move_to_end(key, True)

    def get(self, key):
        """
        Retrieves an item by key.
        """
        return self.cache_data.get(key, None)
