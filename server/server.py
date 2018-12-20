'''Server web framework.'''

from __future__ import print_function

import time
import logging
import google.cloud.logging
from flask_cors import CORS
from flask_compress import Compress
from flask import Flask, request, jsonify

from helpers import passes_miller_rabin, is_divisible_by_small_prime, passes_fermats_little_theorem, InvalidRequest

# Initialize the Flask app.
app = Flask(__name__)

app.config['JSONIFY_PRETTYPRINT_REGULAR'] = False

# Add support for cross-origin requests.
CORS(app)

# Add gzip compression.
Compress(app)


def load_app(environment='local'):
  '''Gunicorn entry point.'''
  if environment != 'local':
    # Initialize GCP logging (non-local only).
    print('[INFO] Starting app in {0} mode with remote logging enabled...'.format(environment))
    logging_client = google.cloud.logging.Client()
    logging_client.setup_logging()

  return app


@app.errorhandler(Exception)
def unhandled_exception_handler(error):
  logging.exception({
      'error': error,
      'handler': 'exception',
      'data': request.data
  })
  return jsonify({
      'error': 'Unhandled exception.'
  }), 500


@app.errorhandler(404)
def route_not_found(error):
  logging.warning('Route note found: {0}'.format(request.path))
  return jsonify({
      'error': 'Route not found.'
  }), 404


@app.errorhandler(500)
def internal_server_error(error):
  logging.exception({
      'error': error,
      'handler': '500',
      'data': request.data
  })
  return jsonify({
      'error': 'Internal server error.'
  }), 500


@app.errorhandler(InvalidRequest)
def handle_invalid_usage(error):
  response = jsonify(error.to_dict())
  response.status_code = error.status_code
  return response


@app.route('/ok', methods=['GET'])
def health_check():
  '''Health check endpoint.'''
  return jsonify({
      'timestamp': time.time()
  })


@app.route('/primes', methods=['POST'])
def add_user():
  '''Generates a prime number which is close to the provided number.

    Args:
      None

    Returns:
      dict: An empty dict.

    Raises:
      InvalidRequest: If the required number is missing or invalid.
  '''
  start_time = time.time()

  if (request.json is None or 'number' not in request.json):
    raise InvalidRequest({
        'code': 'INVALID_ARGUMENT',
        'message': '"number" body argument is missing.'
    })

  number_str = request.json['number']

  try:
    number_long = long(number_str)
  except:
    raise InvalidRequest({
        'code': 'INVALID_ARGUMENT',
        'message': '"number" body argument must be a string representation of a number.'
    })

  # Ensure our starting point is odd since all evens are not prime.
  if (number_long % 2 == 0):
    number_long += 1

  # Determine how far in each direction to search for a prime number.
  delta = 10000

  # Find the smallest and largest numbers with the same number of digits as the starting point.
  num_digits = len(number_str)
  min_odd_number_with_same_number_of_digits = long('1' + ('0' * (num_digits - 2) + '1'))
  max_odd_number_with_same_number_of_digits = long('9' * num_digits)

  # Ensure our min and maximum numbers to test have the same number of digits as the starting point.
  min_number_to_test = max(number_long - delta, min_odd_number_with_same_number_of_digits)
  max_number_to_test = min(number_long + delta, max_odd_number_with_same_number_of_digits)

  # Ensure we always check a delta amount of numbers, even if the starting point is near either end
  # of numbers with its amount of digits.
  if (min_number_to_test == min_odd_number_with_same_number_of_digits):
    max_number_to_test = min(number_long + (2 * delta) - 2,
                             max_odd_number_with_same_number_of_digits)
  if (max_number_to_test == max_odd_number_with_same_number_of_digits):
    min_number_to_test = max(number_long - (2 * delta) + 2,
                             min_odd_number_with_same_number_of_digits)

  # Generate ranges of odd numbers larger and smaller than the starting point, ensuring we include
  # the min and max numbers in our ranges.
  larger_numbers_to_test = range(number_long, max_number_to_test + 2, 2)
  smaller_numbers_to_test = range(number_long - 2, min_number_to_test - 2, -2)

  # Interlace the two lists, ensuring the numbers are sorted by proximity from the starting point.
  numbers_to_test = sum([[larger_numbers_to_test.pop(0), smaller_numbers_to_test.pop(0)] for i in range(min(len(
      larger_numbers_to_test), len(smaller_numbers_to_test)))], []) + larger_numbers_to_test + smaller_numbers_to_test

  print('[INFO] NUMBER LENGTH:', num_digits)
  print('[INFO] NUMBERS TO TEST:', len(numbers_to_test))

  fermat_check_count = 0
  small_primes_check_count = 0
  miller_rabin_check_count = 0

  # Search for a candidate prime.
  candidate_prime = None
  for i, number_to_test in enumerate(numbers_to_test):
    if i > 0 and i % 100 == 0:
      print('[DEBUG] Tested {0} numbers so far in {1} seconds...'.format(
          i, time.time() - start_time))

    # First, check if the number is divisible by a small prime.
    small_primes_check_count += 1
    if (not is_divisible_by_small_prime(number_to_test)):
      # Second, check if the number passes Fermat's Little Theorem.
      fermat_check_count += 1
      if (passes_fermats_little_theorem(number_to_test)):
        # Lastly, check if the number passes several iterations of the Miller-Rabin primality test.
        miller_rabin_check_count += 1
        if (passes_miller_rabin(number_to_test)):
          # Stop searching once we find a candidate prime.
          candidate_prime = number_to_test
          break

  # Throw an error if no candidate prime was found.
  if candidate_prime is None:
    raise InvalidRequest({
        'code': 'CANDIDATE_PRIME_NOT_FOUND',
        'message': 'No candidate prime found near {0}.'.format(number_str)
    })

  # TODO: store results in a database to tarck number of seconds taken and how many of different
  # checks are required.

  print('[INFO] SECONDS TAKEN: {0}'.format(time.time() - start_time))
  print('[INFO] SMALL PRIMES CHECKS: {0}'.format(small_primes_check_count))
  print('[INFO] FERMAT CHECKS: {0}'.format(fermat_check_count))
  print('[INFO] MILLER RABIN CHECKS: {0}'.format(miller_rabin_check_count))

  return jsonify(str(candidate_prime))
