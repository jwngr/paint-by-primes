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

  if (request.json is None):
    raise InvalidRequest('"number" body argument is missing.')

  number_str = request.json['number']

  number_long = long(number_str)

  if (number_long % 2 == 0):
    number_long += 1

  num_digits = len(number_str)
  min_odd_number_with_same_number_of_digits = long('1' + ('0' * (num_digits - 2) + '1'))
  max_odd_number_with_same_number_of_digits = long('9' * num_digits)

  delta = 2000

  min_number_to_test = max(number_long - delta, min_odd_number_with_same_number_of_digits)
  max_number_to_test = min(number_long + delta, max_odd_number_with_same_number_of_digits)

  num_candidate_primes_found = 0
  fermat_check_count = 0
  small_primes_check_count = 0
  miller_rabin_check_count = 0

  prime_result = 'NONE'

  numbers_to_test = range(min_number_to_test, max_number_to_test, 2)

  print('[INFO] NUMBERS TO TEST:', len(numbers_to_test))

  for i, number_to_test in enumerate(numbers_to_test):
    if i > 0 and i % 100 == 0:
      print('[DEBUG] Tested {0} numbers so far in {1} seconds...'.format(
          i, time.time() - start_time))

    small_primes_check_count += 1
    if (not is_divisible_by_small_prime(number_to_test)):
      fermat_check_count += 1
      if (passes_fermats_little_theorem(number_to_test)):
        miller_rabin_check_count += 1
        if (passes_miller_rabin(number_to_test)):
          num_candidate_primes_found += 1
          prime_result = number_to_test
          print('[INFO] Found candidate prime #{0}!'.format(num_candidate_primes_found))
          # break

  print('[INFO] CANDIDATE PRIMES FOUND: {0}'.format(num_candidate_primes_found))
  print('[INFO] SECONDS TAKEN: {0}'.format(time.time() - start_time))
  print('[INFO] SMALL PRIMES CHECKS: {0}'.format(small_primes_check_count))
  print('[INFO] FERMAT CHECKS: {0}'.format(fermat_check_count))
  print('[INFO] MILLER RABIN CHECKS: {0}'.format(miller_rabin_check_count))

  return jsonify(str(prime_result))
