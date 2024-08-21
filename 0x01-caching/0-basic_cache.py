#!/usr/bin/python3
"""
Class BasicCache that inherits from BaseCaching and is a caching system.
"""
BaseCaching = __import__('base_caching').BaseCaching


class BasicCache(BaseCaching):
    def put(self, key, item):
        """ Add an item in the cache
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """ Get an item by key
        """
        if key in self.cache_data:
            return self.cache_data[key]
        return None
