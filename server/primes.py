'''Server web framework.'''

from __future__ import print_function

import time
import logging
from multiprocessing import Queue, Process

import primes_worker
from helpers import passes_miller_rabin, is_divisible_by_small_prime, passes_fermats_little_theorem, InvalidRequest


# TODO: split list in such a way that closer numbers are tested first.
def split_list(l, n):
  splitted = []
  for i in reversed(range(1, n + 1)):
    split_point = len(l) / i
    splitted.append(l[:split_point])
    l = l[split_point:]
  return splitted


def find_nearby_candidate_prime(val, num_digits):
  '''Finds a candidate prime number which is close to the provided number.

    Args:
      val: The number at which to start the search for a candidate prime.
      num_digits: The number of digits in the provided number.

    Returns:
      str: A candidate prime number.
      OR
      None: If no candidate prime number is found.

    Raises:
      InvalidRequest: If no nearby candidate prime is found.
  '''
  # Ensure our starting point is odd since all evens are not prime.
  if (val % 2 == 0):
    val += 1

  # Determine how far in each direction to search for a prime number.
  delta = 10000

  # Find the smallest and largest numbers with the same number of digits as the starting point.
  min_odd_number_with_same_number_of_digits = long('1' + ('0' * (num_digits - 2) + '1'))
  max_odd_number_with_same_number_of_digits = long('9' * num_digits)

  # Ensure our min and maximum numbers to test have the same number of digits as the starting point.
  min_number_to_test = max(val - delta, min_odd_number_with_same_number_of_digits)
  max_number_to_test = min(val + delta, max_odd_number_with_same_number_of_digits)

  # Ensure we always check a delta amount of numbers, even if the starting point is near either end
  # of numbers with its amount of digits.
  if (min_number_to_test == min_odd_number_with_same_number_of_digits):
    max_number_to_test = min(val + (2 * delta) - 2,
                             max_odd_number_with_same_number_of_digits)
  if (max_number_to_test == max_odd_number_with_same_number_of_digits):
    min_number_to_test = max(val - (2 * delta) + 2,
                             min_odd_number_with_same_number_of_digits)

  # Generate ranges of odd numbers larger and smaller than the starting point, ensuring we include
  # the min and max numbers in our ranges.
  larger_numbers_to_test = range(val, max_number_to_test + 2, 2)
  smaller_numbers_to_test = range(val - 2, min_number_to_test - 2, -2)

  # Interlace the two lists, ensuring the numbers are sorted by proximity from the starting point.
  numbers_to_test = sum([[larger_numbers_to_test.pop(0), smaller_numbers_to_test.pop(0)] for i in range(min(len(
      larger_numbers_to_test), len(smaller_numbers_to_test)))], []) + larger_numbers_to_test + smaller_numbers_to_test

  # TODO: remove these
  logging.info('NUMBER LENGTH:', num_digits)
  logging.info('NUMBERS TO TEST:', len(numbers_to_test))

  # Parallelize the search for a candidate prime number.
  workers = []
  result_queue = Queue()

  chunks = split_list(numbers_to_test, 5)

  for i in range(5):
    p = Process(target=primes_worker.check_primality_worker,
                name='worker-{0}'.format(i), args=(result_queue, chunks[i]))
    workers.append(p)
    p.start()

  # Keep pulling items off the result queue until either a candidate prime number is found or all
  # of the workers have finished.
  candidate_prime = None
  num_workers_finished = 0
  while not candidate_prime and num_workers_finished != len(workers):
    queue_item = result_queue.get()

    if (queue_item == 'DONE'):
      num_workers_finished += 1
    else:
      candidate_prime = queue_item

  # Terminate all workers since our search is over.
  for worker in workers:
    worker.terminate()

  return candidate_prime
