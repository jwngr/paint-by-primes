# Copied from https://gist.github.com/bnlucas/5857478

from random import randrange

def miller_rabin(n, k=10):
  if n == 2 or n == 3:
    return True
  if not n & 1:
    return False

  def check(a, s, d, n):
    x = pow(a, d, n)
    if x == 1:
      return True
    for i in xrange(s - 1):
      if x == n - 1:
        return True
      x = pow(x, 2, n)
    return x == n - 1

  s = 0
  d = n - 1

  while d % 2 == 0:
    d >>= 1
    s += 1

  for i in xrange(k):
    a = randrange(2, n - 1)
    if not check(a, s, d, n):
      return False
  return True


special_number = ''
for line in open('output.txt', 'r'):
  for char in line:
    if char != '\n':
      special_number += char

special_number = long(special_number)

# print miller_rabin(2)
# print miller_rabin(3)
# print miller_rabin(4)
# print miller_rabin(17)
# print miller_rabin(206444362623462340)

delta = 5000

for i, number_to_test in enumerate(range(special_number - delta, special_number + delta, 2)):
  if i > 0 and i % 100 == 0:
    print 'Tested {0} numbers so far...'.format(i)

  if (miller_rabin(number_to_test)):
    print 'Possibly prime: {0}'.format(number_to_test)
