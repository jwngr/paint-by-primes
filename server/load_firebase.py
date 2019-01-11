'''Initializes the Firebase Admin SDK.'''

import os
import logging
import firebase_admin
from firebase_admin import credentials

try:
  CURRENT_DIR = os.path.dirname(__file__)
  SERVICE_ACCOUNT_PATH = os.path.join(CURRENT_DIR, './resources/serviceAccount.json')
  firebase_admin.initialize_app(credentials.Certificate(SERVICE_ACCOUNT_PATH))
except:
  logging.exception('Failed to load Firebase.')
  raise
