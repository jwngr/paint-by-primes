import time
import logging
import multiprocessing

from helpers import passes_miller_rabin, is_divisible_by_small_prime, passes_fermats_little_theorem


def check_primality_worker(result_queue, numbers_to_test):
  '''Determines if any of the provided numbers to test are prime. If one is found, it is pushed onto
     the result queue; otherwise a known string is pushed onto the result queue indicating the
     worker is done with its work.

    Args:
      result_queue: The shared result queue onto which the result should be pushed.
      numbers_to_test: The numbers to test for primality.

    Returns:
      None
  '''
  worker_name = multiprocessing.current_process().name

  logging.info('Worker {0} started.'.format(worker_name))

  start_time = time.perf_counter()

  # Search for a candidate prime.
  candidate_prime = None
  for i, number_to_test in enumerate(numbers_to_test):
    if i > 0 and i % 100 == 0:
      logging.debug('Tested {0} numbers so far in {1} seconds...'.format(
          i, time.perf_counter() - start_time))

    # First, check if the number is divisible by a small prime.
    if (not is_divisible_by_small_prime(number_to_test)):
      # Second, check if the number passes Fermat's Little Theorem.
      if (passes_fermats_little_theorem(number_to_test)):
        # Lastly, check if the number passes several iterations of the Miller-Rabin primality test.
        if (passes_miller_rabin(number_to_test)):
          # Stop searching once we find a candidate prime.
          candidate_prime = number_to_test
          result_queue.put(candidate_prime)
          break

  # If none of the provided numbers were prime, add a known string to the result queue signifying
  # this worker is done with its work.
  if (not candidate_prime):
    result_queue.put('DONE')

  logging.info('Worker {0} done after {1} seconds.'.format(worker_name, time.perf_counter() - start_time))
