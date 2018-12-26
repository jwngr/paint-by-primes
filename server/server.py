'''Server web framework.'''

from __future__ import print_function

import time
import logging
import google.cloud.logging
from flask_cors import CORS
from flask_compress import Compress
from flask import Flask, request, jsonify

import primes
from helpers import InvalidRequest

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

  candidate_prime = primes.find_nearby_candidate_prime(number_long, len(number_str))

  print('[INFO] SECONDS TAKEN: {0}'.format(time.time() - start_time))

  return jsonify(str(candidate_prime))
