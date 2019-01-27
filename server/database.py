"""
Wrapper for reading from and writing to the database.
"""

import os.path
import sqlite3


class Database(object):
  """Wrapper for connecting to the database."""

  def __init__(self):
    database_path = './resources/results.sqlite'

    if not os.path.isfile(database_path):
      raise IOError('Specified SQLite file "{0}" does not exist.'.format(database_path))

    self.conn = sqlite3.connect(database_path, check_same_thread=False)

    self.cursor = self.conn.cursor()

    self.cursor.arraysize = 1000

  def lookup_source_number(self, source_number):
    """Looks up a source number to see if a result already exists for it.

    Args:
      source_number: The source number (as a string) whose result to look up.

    Returns:
      result: The result number (as a string) indicating the prime result.
    """
    sanitized_source_number = '_' + source_number

    query = 'SELECT result FROM results WHERE source = ? COLLATE NOCASE;'
    query_bindings = (sanitized_source_number,)
    self.cursor.execute(query, query_bindings)

    result = self.cursor.fetchone()

    if not result:
      return None

    return result[0][1:]

  def insert_result(self, result):
    """Inserts a new result into the results table.

    Args:
      result: A dictionary containing result information.

    Returns:
      None
    """
    # There is no need to escape the query parameters here since they are never user-defined.
    query = 'INSERT INTO results VALUES ("{source_number}", "{result}", {duration}, CURRENT_TIMESTAMP);'.format(
        source_number='_' + result['source_number'],
        result='_' + result['result'],
        duration=result['duration'],
    )

    self.conn.execute(query)
    self.conn.commit()
