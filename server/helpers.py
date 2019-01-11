"""Utility functions and classes."""

from __future__ import print_function

import os
import json
from random import randrange

CURRENT_DIR = os.path.dirname(__file__)
FIRST_2000_PRIMES = json.load(open(os.path.join(CURRENT_DIR, './resources/first2000Primes.json')))
FIRST_10000_PRIMES = json.load(open(os.path.join(CURRENT_DIR, './resources/first10000Primes.json')))


def is_str(val):
  '''Returns whether or not the provided value is a string type.

  Args:
    val: The value to check.

  Returns:
    bool: Whether or not the provided value is a string type.
  '''
  try:
    return isinstance(val, basestring)
  except NameError:
    return isinstance(val, str)


def is_divisible_by_small_prime(number_to_test):
  for prime in FIRST_2000_PRIMES:
    if number_to_test == prime:
      return False

    if (number_to_test % prime == 0):
      return True

  return False


def passes_fermats_little_theorem(number_to_test):
  return pow(2, number_to_test - 1, number_to_test) == 1


def passes_miller_rabin(number_to_test, k=10):
  # Copied from https://gist.github.com/bnlucas/5857478
  if number_to_test == 2 or number_to_test == 3:
    return True
  if not number_to_test & 1:
    return False

  def check(a, s, d, number_to_test_inner):
    x = pow(a, d, number_to_test_inner)
    if x == 1:
      return True
    for i in xrange(s - 1):
      if x == number_to_test_inner - 1:
        return True
      x = pow(x, 2, number_to_test_inner)
    return x == number_to_test_inner - 1

  s = 0
  d = number_to_test - 1

  while d % 2 == 0:
    d >>= 1
    s += 1

  for i in xrange(k):
    a = randrange(2, number_to_test - 1)
    if not check(a, s, d, number_to_test):
      return False
  return True


class InvalidRequest(Exception):
  """Wrapper class for building invalid request error responses."""
  status_code = 400

  def __init__(self, message, status_code=None, payload=None):
    Exception.__init__(self)
    self.message = message
    if status_code is not None:
      self.status_code = status_code
    self.payload = payload

  def to_dict(self):
    result = dict(self.payload or ())
    result['error'] = self.message
    return result
