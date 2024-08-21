#!/usr/bin/python3
"""
Create a class FIFOCache that inherits from BaseCaching and is a caching system:
"""
BaseCaching = __import__('base_caching').BaseCaching


class FifoCache(BaseCaching):
    """Fifo caching"""