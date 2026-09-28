from PIL import Image

URL = "https://seoha376.github.io/selection-game/"
OUTPUT = "assets/selection-game-qr.png"
VERSION = 4
SIZE = 17 + 4 * VERSION
DATA_CODEWORDS = 64
BLOCK_DATA_CODEWORDS = 32
EC_CODEWORDS = 18
EC_LEVEL_BITS = 0b00


def gf_tables():
    exp = [0] * 512
    log = [0] * 256
    value = 1
    for index in range(255):
        exp[index] = value
        log[value] = index
        value <<= 1
        if value & 0x100:
            value ^= 0x11D
    for index in range(255, 512):
        exp[index] = exp[index - 255]
    return exp, log


GF_EXP, GF_LOG = gf_tables()


def gf_mul(left, right):
    if left == 0 or right == 0:
        return 0
    return GF_EXP[GF_LOG[left] + GF_LOG[right]]


def rs_generator(degree):
    generator = [1]
    for index in range(degree):
        next_generator = [0] * (len(generator) + 1)
        for position, coefficient in enumerate(generator):
            next_generator[position] ^= coefficient
            next_generator[position + 1] ^= gf_mul(coefficient, GF_EXP[index])
        generator = next_generator
    return generator


def rs_remainder(data, degree):
    generator = rs_generator(degree)
    result = data[:] + [0] * degree
    for index in range(len(data)):
        coefficient = result[index]
        if coefficient == 0:
            continue
        for offset, generator_coefficient in enumerate(generator):
            result[index + offset] ^= gf_mul(generator_coefficient, coefficient)
    return result[-degree:]


def append_bits(bits, value, length):
    for index in range(length - 1, -1, -1):
        bits.append((value >> index) & 1)


def make_data_codewords():
    data = URL.encode("utf-8")
    bits = []
    append_bits(bits, 0b0100, 4)
    append_bits(bits, len(data), 8)
    for byte in data:
        append_bits(bits, byte, 8)
    for _ in range(min(4, DATA_CODEWORDS * 8 - len(bits))):
        bits.append(0)
    while len(bits) % 8:
        bits.append(0)

    codewords = []
    for index in range(0, len(bits), 8):
        value = 0
        for bit in bits[index : index + 8]:
            value = (value << 1) | bit
        codewords.append(value)

    pads = [0xEC, 0x11]
    index = 0
    while len(codewords) < DATA_CODEWORDS:
        codewords.append(pads[index % 2])
        index += 1
    return codewords


def make_final_bits():
    data = make_data_codewords()
    blocks = [
        data[:BLOCK_DATA_CODEWORDS],
        data[BLOCK_DATA_CODEWORDS : BLOCK_DATA_CODEWORDS * 2],
    ]
    ec_blocks = [rs_remainder(block, EC_CODEWORDS) for block in blocks]
    codewords = []
    for index in range(BLOCK_DATA_CODEWORDS):
        for block in blocks:
            codewords.append(block[index])
    for index in range(EC_CODEWORDS):
        for block in ec_blocks:
            codewords.append(block[index])

    bits = []
    for codeword in codewords:
        append_bits(bits, codeword, 8)
    return bits


def empty_matrix():
    return [[None for _ in range(SIZE)] for _ in range(SIZE)], [[False for _ in range(SIZE)] for _ in range(SIZE)]


def set_module(matrix, reserved, row, col, value, is_reserved=True):
    if 0 <= row < SIZE and 0 <= col < SIZE:
        matrix[row][col] = bool(value)
        if is_reserved:
            reserved[row][col] = True


def add_finder(matrix, reserved, row, col):
    for dr in range(-1, 8):
        for dc in range(-1, 8):
            rr, cc = row + dr, col + dc
            if 0 <= rr < SIZE and 0 <= cc < SIZE:
                if 0 <= dr <= 6 and 0 <= dc <= 6:
                    value = dr in (0, 6) or dc in (0, 6) or (2 <= dr <= 4 and 2 <= dc <= 4)
                else:
                    value = False
                set_module(matrix, reserved, rr, cc, value)


def add_alignment(matrix, reserved, center_row, center_col):
    if reserved[center_row][center_col]:
        return
    for dr in range(-2, 3):
        for dc in range(-2, 3):
            value = max(abs(dr), abs(dc)) in (0, 2)
            set_module(matrix, reserved, center_row + dr, center_col + dc, value)


def add_patterns(matrix, reserved):
    add_finder(matrix, reserved, 0, 0)
    add_finder(matrix, reserved, 0, SIZE - 7)
    add_finder(matrix, reserved, SIZE - 7, 0)

    for index in range(8, SIZE - 8):
        value = index % 2 == 0
        set_module(matrix, reserved, 6, index, value)
        set_module(matrix, reserved, index, 6, value)

    for row in [6, 26]:
        for col in [6, 26]:
            add_alignment(matrix, reserved, row, col)

    set_module(matrix, reserved, 4 * VERSION + 9, 8, True)

    for index in range(9):
        if index != 6:
            set_module(matrix, reserved, 8, index, False)
            set_module(matrix, reserved, index, 8, False)
    for index in range(8):
        set_module(matrix, reserved, 8, SIZE - 1 - index, False)
        set_module(matrix, reserved, SIZE - 1 - index, 8, False)


def mask_bit(mask, row, col):
    if mask == 0:
        return (row + col) % 2 == 0
    if mask == 1:
        return row % 2 == 0
    if mask == 2:
        return col % 3 == 0
    if mask == 3:
        return (row + col) % 3 == 0
    if mask == 4:
        return (row // 2 + col // 3) % 2 == 0
    if mask == 5:
        return (row * col) % 2 + (row * col) % 3 == 0
    if mask == 6:
        return ((row * col) % 2 + (row * col) % 3) % 2 == 0
    return ((row + col) % 2 + (row * col) % 3) % 2 == 0


def place_data(base_matrix, base_reserved, bits, mask):
    matrix = [row[:] for row in base_matrix]
    reserved = [row[:] for row in base_reserved]
    bit_index = 0
    upward = True
    col = SIZE - 1
    while col > 0:
        if col == 6:
            col -= 1
        rows = range(SIZE - 1, -1, -1) if upward else range(SIZE)
        for row in rows:
            for current_col in [col, col - 1]:
                if reserved[row][current_col]:
                    continue
                value = bits[bit_index] if bit_index < len(bits) else 0
                if mask_bit(mask, row, current_col):
                    value ^= 1
                set_module(matrix, reserved, row, current_col, value, False)
                bit_index += 1
        upward = not upward
        col -= 2
    return matrix


def bch_format(value):
    data = value << 10
    generator = 0b10100110111
    for index in range(14, 9, -1):
        if (data >> index) & 1:
            data ^= generator << (index - 10)
    return ((value << 10) | data) ^ 0b101010000010010


def add_format(matrix, mask):
    bits = bch_format((EC_LEVEL_BITS << 3) | mask)
    positions_a = [
        (8, 0),
        (8, 1),
        (8, 2),
        (8, 3),
        (8, 4),
        (8, 5),
        (8, 7),
        (8, 8),
        (7, 8),
        (5, 8),
        (4, 8),
        (3, 8),
        (2, 8),
        (1, 8),
        (0, 8),
    ]
    positions_b = [
        (SIZE - 1, 8),
        (SIZE - 2, 8),
        (SIZE - 3, 8),
        (SIZE - 4, 8),
        (SIZE - 5, 8),
        (SIZE - 6, 8),
        (SIZE - 7, 8),
        (8, SIZE - 8),
        (8, SIZE - 7),
        (8, SIZE - 6),
        (8, SIZE - 5),
        (8, SIZE - 4),
        (8, SIZE - 3),
        (8, SIZE - 2),
        (8, SIZE - 1),
    ]
    for index, position in enumerate(positions_a):
        row, col = position
        matrix[row][col] = bool((bits >> index) & 1)
    for index, position in enumerate(positions_b):
        row, col = position
        matrix[row][col] = bool((bits >> index) & 1)


def penalty(matrix):
    score = 0
    for row in range(SIZE):
        run_color = matrix[row][0]
        run_length = 1
        for col in range(1, SIZE):
            if matrix[row][col] == run_color:
                run_length += 1
            else:
                if run_length >= 5:
                    score += 3 + run_length - 5
                run_color = matrix[row][col]
                run_length = 1
        if run_length >= 5:
            score += 3 + run_length - 5
    for col in range(SIZE):
        run_color = matrix[0][col]
        run_length = 1
        for row in range(1, SIZE):
            if matrix[row][col] == run_color:
                run_length += 1
            else:
                if run_length >= 5:
                    score += 3 + run_length - 5
                run_color = matrix[row][col]
                run_length = 1
        if run_length >= 5:
            score += 3 + run_length - 5
    for row in range(SIZE - 1):
        for col in range(SIZE - 1):
            value = matrix[row][col]
            if matrix[row + 1][col] == value and matrix[row][col + 1] == value and matrix[row + 1][col + 1] == value:
                score += 3
    dark = sum(1 for row in matrix for value in row if value)
    score += abs(dark * 20 // (SIZE * SIZE) - 10) * 10
    return score


def make_qr():
    base_matrix, base_reserved = empty_matrix()
    add_patterns(base_matrix, base_reserved)
    bits = make_final_bits()
    best = None
    for mask in range(8):
        matrix = place_data(base_matrix, base_reserved, bits, mask)
        add_format(matrix, mask)
        candidate = (penalty(matrix), matrix)
        if best is None or candidate[0] < best[0]:
            best = candidate
    return best[1]


def save_png(matrix):
    scale = 20
    border = 4
    pixels = (SIZE + border * 2) * scale
    image = Image.new("RGB", (pixels, pixels), "white")
    for row in range(SIZE):
        for col in range(SIZE):
            if matrix[row][col]:
                for y in range((row + border) * scale, (row + border + 1) * scale):
                    for x in range((col + border) * scale, (col + border + 1) * scale):
                        image.putpixel((x, y), (28, 28, 28))
    image.save(OUTPUT)


save_png(make_qr())
print(f"saved {OUTPUT}")
