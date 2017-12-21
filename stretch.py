color_chars = {
  'W': '1',
  'G': '0',
  'B': '7'
}

# Stamp in upper right hand corner
# 09261842
# 07107903
# 20730820
# 73083072

result = '0926184'

stretch = 2
padding_top_count = 3
padding_sides_count = 6

original_width = 25
total_width = (original_width * stretch) + (padding_sides_count * stretch)

# Top padding
for i in range(0, padding_top_count):
  for j in range(0, total_width):
    result += color_chars['W']
  result += '\n'

lines = 0
for line in open('monogram.txt', 'r'):
  lines += 1
  # Left padding
  for i in range(0, padding_sides_count):
    result += color_chars['W']

  # Stretching
  for char in line:
    if char != '\n':
      number_char = color_chars[char]
      result += (number_char * stretch)

  # Right padding
  for i in range(0, padding_sides_count):
    result += color_chars['W']

  result += '\n'

# Bottom padding
for i in range(0, padding_top_count):
  for j in range(0, total_width):
    result += color_chars['W']
  result += '\n'

print result[:-1]
