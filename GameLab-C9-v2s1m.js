import{u as Y,r,j as e,G as U,L as C,R as $,T as J,C as S,d as X,h as Q}from"./index-NRokkdJn.js";import{P as V,S as Z}from"./square-Bb86kPPJ.js";import{S as ee}from"./save-1odb0pDW.js";const te=`import random
import pygame

WIDTH, HEIGHT = 400, 600
PLAYER_Y = 505
screen = pygame.display.set_mode((WIDTH, HEIGHT))
clock = pygame.time.Clock()
font = pygame.font.SysFont("monospace", 15, bold=True)
small_font = pygame.font.SysFont("monospace", 11)

player_x = WIDTH // 2 - 18
rocks = []
score = 0
speed = 210
crashed = False
road_offset = 0


def setup():
    global player_x, rocks, score, speed, crashed, road_offset
    player_x = WIDTH // 2 - 18
    rocks = [[random.randint(72, 330), random.randint(-1250, -350), 32, 40] for _ in range(4)]
    score = 0
    speed = 210
    crashed = False
    road_offset = 0


def update(dt, keys):
    global player_x, score, speed, crashed, road_offset
    if crashed:
        return
    pressed = pygame.key.get_pressed()
    if pressed[pygame.K_LEFT] or keys.get("left"):
        player_x -= int(270 * dt)
    if pressed[pygame.K_RIGHT] or keys.get("right"):
        player_x += int(270 * dt)
    player_x = max(52, min(WIDTH - 92, player_x))
    score += dt * 10
    speed = min(390, 210 + int(score * 1.5))
    road_offset = (road_offset + speed * dt) % 86

    rider = pygame.Rect(player_x + 5, PLAYER_Y + 8, 32, 48)
    for rock in rocks:
        rock[1] += speed * dt
        obstacle = pygame.Rect(rock[0], int(rock[1]), rock[2], rock[3])
        if rock[1] > HEIGHT + 30:
            rock[0] = random.randint(72, 330)
            rock[1] = random.randint(-210, -70)
            score += 2
        elif rider.colliderect(obstacle):
            crashed = True


def draw(surface):
    surface.fill((7, 17, 22))
    pygame.draw.rect(screen, (23, 35, 40), (34, 0, 332, HEIGHT))
    pygame.draw.rect(screen, (82, 224, 192), (42, 0, 5, HEIGHT))
    pygame.draw.rect(screen, (82, 224, 192), (353, 0, 5, HEIGHT))
    for lane_y in range(-86, HEIGHT, 86):
        pygame.draw.rect(screen, (214, 212, 174), (196, int(lane_y + road_offset), 8, 44))

    for x, y, width, height in rocks:
        pygame.draw.circle(screen, (128, 145, 147), (x + width // 2, int(y + height // 2)), width // 2)
        pygame.draw.rect(screen, (92, 111, 115), (x + 8, int(y + 8), width - 16, height - 13))

    pygame.draw.circle(screen, (5, 9, 11), (player_x + 21, PLAYER_Y + 17), 9)
    pygame.draw.circle(screen, (5, 9, 11), (player_x + 21, PLAYER_Y + 49), 9)
    pygame.draw.rect(screen, (255, 146, 85), (player_x + 12, PLAYER_Y + 18, 18, 32))
    pygame.draw.rect(screen, (101, 217, 192), (player_x + 6, PLAYER_Y + 27, 30, 8))

    screen.blit(font.render("SCORE " + str(int(score)), True, (242, 247, 244)), (54, 20))
    screen.blit(small_font.render("SPEED " + str(int(speed)), True, (157, 180, 179)), (278, 23))
    if crashed:
        pygame.draw.rect(screen, (17, 27, 31), (56, 244, 288, 94))
        screen.blit(font.render("BIKE STOPPED", True, (255, 173, 123)), (113, 260))
        screen.blit(small_font.render("Press Run / Reset to ride again", True, (194, 209, 208)), (78, 291))
    pygame.display.flip()
`,ae=`import random
import pygame

WIDTH, HEIGHT = 400, 600
CELL = 20
COLS, ROWS = WIDTH // CELL, HEIGHT // CELL
screen = pygame.display.set_mode((WIDTH, HEIGHT))
font = pygame.font.SysFont("monospace", 16, bold=True)
small_font = pygame.font.SysFont("monospace", 12)

snake = []
food = (0, 0)
direction = (1, 0)
pending_direction = (1, 0)
move_timer = 0
score = 0
game_over = False


def place_food():
    empty = [(x, y) for x in range(COLS) for y in range(ROWS) if (x, y) not in snake]
    return random.choice(empty) if empty else snake[0]


def setup():
    global snake, food, direction, pending_direction, move_timer, score, game_over
    snake = [(COLS // 2, ROWS // 2), (COLS // 2 - 1, ROWS // 2), (COLS // 2 - 2, ROWS // 2)]
    direction = (1, 0)
    pending_direction = direction
    food = place_food()
    move_timer = 0
    score = 0
    game_over = False


def update(dt, keys):
    global direction, pending_direction, move_timer, food, score, game_over
    if game_over:
        return
    pressed = pygame.key.get_pressed()
    if (pressed[pygame.K_UP] or keys.get("up")) and direction != (0, 1):
        pending_direction = (0, -1)
    elif (pressed[pygame.K_DOWN] or keys.get("down")) and direction != (0, -1):
        pending_direction = (0, 1)
    elif (pressed[pygame.K_LEFT] or keys.get("left")) and direction != (1, 0):
        pending_direction = (-1, 0)
    elif (pressed[pygame.K_RIGHT] or keys.get("right")) and direction != (-1, 0):
        pending_direction = (1, 0)

    move_timer += dt
    while move_timer >= 0.13:
        move_timer -= 0.13
        direction = pending_direction
        head = (snake[0][0] + direction[0], snake[0][1] + direction[1])
        eating = head == food
        body = snake if eating else snake[:-1]
        if head[0] < 0 or head[0] >= COLS or head[1] < 0 or head[1] >= ROWS or head in body:
            game_over = True
            return
        snake.insert(0, head)
        if eating:
            score += 1
            food = place_food()
        else:
            snake.pop()


def draw(surface):
    surface.fill((8, 18, 24))
    pygame.draw.rect(screen, (24, 39, 45), (0, 0, WIDTH, HEIGHT))
    for x, y in snake:
        pygame.draw.rect(screen, (82, 224, 192), (x * CELL + 2, y * CELL + 2, CELL - 3, CELL - 3))
    pygame.draw.circle(screen, (255, 146, 85), (food[0] * CELL + CELL // 2, food[1] * CELL + CELL // 2), CELL // 2 - 3)
    screen.blit(font.render("SCORE " + str(score), True, (242, 247, 244)), (12, 12))
    screen.blit(small_font.render("ARROWS TO MOVE", True, (157, 180, 179)), (245, 16))
    if game_over:
        pygame.draw.rect(screen, (17, 27, 31), (52, 255, 296, 76))
        screen.blit(font.render("GAME OVER", True, (255, 173, 123)), (130, 266))
        screen.blit(small_font.render("Press Reset to play again", True, (194, 209, 208)), (101, 296))
    pygame.display.flip()
`,se=`import random
import pygame

WIDTH, HEIGHT = 400, 600
CELL = 25
COLS, ROWS = 10, 20
BOARD_X, BOARD_Y = 75, 70
screen = pygame.display.set_mode((WIDTH, HEIGHT))
font = pygame.font.SysFont("monospace", 15, bold=True)
small_font = pygame.font.SysFont("monospace", 11)
SHAPES = [
    [(0, 0), (1, 0), (2, 0), (3, 0)],
    [(0, 0), (1, 0), (0, 1), (1, 1)],
    [(0, 0), (1, 0), (2, 0), (1, 1)],
    [(0, 0), (1, 0), (1, 1), (2, 1)],
    [(1, 0), (2, 0), (0, 1), (1, 1)],
    [(0, 0), (0, 1), (1, 1), (2, 1)],
    [(2, 0), (0, 1), (1, 1), (2, 1)],
]
COLORS = [(82, 224, 192), (255, 205, 92), (177, 151, 255), (255, 146, 85), (94, 176, 255)]
board = []
piece = []
piece_x = 3
piece_y = 0
piece_color = COLORS[0]
fall_timer = 0
score = 0
lines = 0
game_over = False


def new_piece():
    global piece, piece_x, piece_y, piece_color
    piece = random.choice(SHAPES)[:]
    piece_x, piece_y = 3, 0
    piece_color = random.choice(COLORS)


def setup():
    global board, fall_timer, score, lines, game_over
    board = [[None for x in range(COLS)] for y in range(ROWS)]
    fall_timer = 0
    score = 0
    lines = 0
    game_over = False
    new_piece()


def fits(x, y, cells):
    for cx, cy in cells:
        px, py = x + cx, y + cy
        if px < 0 or px >= COLS or py >= ROWS:
            return False
        if py >= 0 and board[py][px] is not None:
            return False
    return True


def lock_piece():
    global score, lines, game_over
    for cx, cy in piece:
        px, py = piece_x + cx, piece_y + cy
        if py < 0:
            game_over = True
            return
        board[py][px] = piece_color
    remaining = [row for row in board if None in row]
    cleared = ROWS - len(remaining)
    if cleared:
        board[:] = [[None for x in range(COLS)] for _ in range(cleared)] + remaining
        lines += cleared
        score += cleared * cleared * 100
    new_piece()
    if not fits(piece_x, piece_y, piece):
        game_over = True


def update(dt, keys):
    global piece_x, piece_y, piece, fall_timer
    if game_over:
        return
    pressed = pygame.key.get_pressed()
    if pressed[pygame.K_LEFT] or keys.get("left"):
        if fits(piece_x - 1, piece_y, piece):
            piece_x -= 1
    if pressed[pygame.K_RIGHT] or keys.get("right"):
        if fits(piece_x + 1, piece_y, piece):
            piece_x += 1
    if pressed[pygame.K_SPACE] or keys.get("action"):
        rotated = [(len(piece) - 1 - y, x) for x, y in piece]
        if fits(piece_x, piece_y, rotated):
            piece = rotated
    fall_timer += dt
    interval = 0.08 if pressed[pygame.K_DOWN] or keys.get("down") else 0.55
    while fall_timer >= interval:
        fall_timer -= interval
        if fits(piece_x, piece_y + 1, piece):
            piece_y += 1
        else:
            lock_piece()
            if game_over:
                return


def draw(surface):
    screen.fill((8, 18, 24))
    pygame.draw.rect(screen, (24, 39, 45), (BOARD_X, BOARD_Y, COLS * CELL, ROWS * CELL))
    for y in range(ROWS):
        for x in range(COLS):
            if board[y][x] is not None:
                pygame.draw.rect(screen, board[y][x], (BOARD_X + x * CELL + 1, BOARD_Y + y * CELL + 1, CELL - 2, CELL - 2))
    for x, y in piece:
        pygame.draw.rect(screen, piece_color, (BOARD_X + (piece_x + x) * CELL + 1, BOARD_Y + (piece_y + y) * CELL + 1, CELL - 2, CELL - 2))
    screen.blit(font.render("TETRIS", True, (242, 247, 244)), (BOARD_X, 22))
    screen.blit(font.render("SCORE " + str(score), True, (242, 247, 244)), (BOARD_X + 180, 22))
    screen.blit(small_font.render("LEFT/RIGHT MOVE · SPACE ROTATE", True, (157, 180, 179)), (42, 586))
    if game_over:
        pygame.draw.rect(screen, (17, 27, 31), (88, 264, 224, 74))
        screen.blit(font.render("GAME OVER", True, (255, 173, 123)), (137, 274))
        screen.blit(small_font.render("Press Reset to play again", True, (194, 209, 208)), (111, 304))
    pygame.display.flip()
`,w={bike:{name:{uz:"Bike Dodge",en:"Bike Dodge"},filename:"bike.py",controls:{uz:"Chap/o‘ng strelkalar yoki preview ostidagi chap/o‘ng tugmalar.",en:"Left/right arrows or the matching touch keys below the preview."},starter:te},snake:{name:{uz:"Ilon",en:"Snake"},filename:"snake.py",controls:{uz:"Strelkalar yoki preview ostidagi to‘rt yo‘nalish tugmasi; devor yoki o‘ziga tegmang.",en:"Arrow keys or all four touch-direction buttons below the preview; avoid walls and your body."},starter:ae},tetris:{name:{uz:"Tetris",en:"Tetris"},filename:"tetris.py",controls:{uz:"Chap/o‘ng — siljitish, pastga — tez tushirish, Space yoki ↻ tugmasi — aylantirish.",en:"Left/right move, down speeds up, Space or ↻ touch key rotates."},starter:se}},ne={uz:[{title:"1. Oyna va koordinatalar",text:"`pygame.display.set_mode()` o‘yin yuzasini ochadi. Laboratoriya 400 × 600 koordinata maydonidan foydalanadi: (0, 0) — yuqori chap burchak.",code:`WIDTH, HEIGHT = 400, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
player_x = WIDTH // 2`},{title:"2. O‘yin sikli va dt",text:"Brauzer asosiy o‘yin siklini boshqaradi. Kodingizni `setup()`, `update(dt, keys)` va `draw(screen)` funksiyalariga bo‘ling: Stop doimo javob beradi, cheksiz `while True` kerak emas.",code:`def update(dt, keys):
    if keys.get("left"):
        player_x -= int(speed * dt)

def draw(screen):
    screen.fill((7, 17, 22))`},{title:"3. Klaviatura va touch input",text:"`pygame.key.get_pressed()` hamda strelkalar bilan bosishni tekshiring. Telefonda preview ostidagi tegishli yo‘nalish tugmasi `keys` lug‘atida xuddi shu inputni beradi.",code:`pressed = pygame.key.get_pressed()
if pressed[pygame.K_LEFT] or keys.get("left"):
    player_x -= int(270 * dt)`},{title:"4. List, to‘siq va collision",text:"Har bir to‘siq x, y, kenglik va balandlikni saqlaydi. `pygame.Rect(...).colliderect(...)` ikki to‘rtburchak ustma-ust tushganini tekshiradi.",code:`obstacle = pygame.Rect(rock_x, rock_y, rock_w, rock_h)
rider = pygame.Rect(player_x, player_y, 32, 48)
if rider.colliderect(obstacle):
    crashed = True`},{title:"5. Rasm, rang va hisob",text:"`pygame.draw.rect/circle` shakllar chizadi; RGB tuple ranglari qo‘llanadi. `screen.blit(font.render(...))` hisobni chiqaradi. Bu brauzer uchun Pygame-uslubidagi cheklangan adapter — to‘liq native Pygame emas.",code:`pygame.draw.rect(screen, (82, 224, 192), (42, 0, 5, HEIGHT))
label = font.render("SCORE " + str(score), True, (255, 255, 255))
screen.blit(label, (54, 20))`}],en:[{title:"1. Display surface and coordinates",text:"`pygame.display.set_mode()` opens the game surface. This lab uses a 400 × 600 coordinate area where (0, 0) is the top-left.",code:`WIDTH, HEIGHT = 400, 600
screen = pygame.display.set_mode((WIDTH, HEIGHT))
player_x = WIDTH // 2`},{title:"2. Game loop and dt",text:"The browser owns the main loop. Put code in `setup()`, `update(dt, keys)` and `draw(screen)` so Stop remains responsive; you do not need an infinite `while True`.",code:`def update(dt, keys):
    if keys.get("left"):
        player_x -= int(speed * dt)

def draw(screen):
    screen.fill((7, 17, 22))`},{title:"3. Keyboard and touch input",text:"Use `pygame.key.get_pressed()` with the arrow keys. On phones, each directional preview button adds the same key to the `keys` dictionary.",code:`pressed = pygame.key.get_pressed()
if pressed[pygame.K_LEFT] or keys.get("left"):
    player_x -= int(270 * dt)`},{title:"4. Lists, obstacles and collisions",text:"Each obstacle stores x, y, width and height. `pygame.Rect(...).colliderect(...)` tests whether two rectangles overlap.",code:`obstacle = pygame.Rect(rock_x, rock_y, rock_w, rock_h)
rider = pygame.Rect(player_x, player_y, 32, 48)
if rider.colliderect(obstacle):
    crashed = True`},{title:"5. Drawing, color and score",text:"`pygame.draw.rect/circle` draws shapes and accepts RGB tuples. `screen.blit(font.render(...))` displays score. This is a limited Pygame-style browser adapter, not full native Pygame.",code:`pygame.draw.rect(screen, (82, 224, 192), (42, 0, 5, HEIGHT))
label = font.render("SCORE " + str(score), True, (255, 255, 255))
screen.blit(label, (54, 20))`}]},y="cyberustoz-python-game",j="https://cdn.jsdelivr.net/pyodide/v0.27.7/full/",re=String.raw`
import json
import sys
import types


def _css_color(value):
    if isinstance(value, (tuple, list)) and len(value) >= 3:
        rgb = [max(0, min(255, int(float(channel)))) for channel in value[:3]]
        if len(value) >= 4:
            alpha = float(value[3])
            if alpha > 1:
                alpha /= 255
            alpha = max(0.0, min(1.0, alpha))
            return "rgba(%d, %d, %d, %.3f)" % (rgb[0], rgb[1], rgb[2], alpha)
        return "rgb(%d, %d, %d)" % (rgb[0], rgb[1], rgb[2])
    return str(value)


class CyberCanvas:
    def __init__(self):
        self.background = "#081115"
        self.commands = []

    def clear(self, color="#081115"):
        self.background = _css_color(color)
        self.commands = []

    def rect(self, x, y, width, height, color="#ffffff"):
        if len(self.commands) < 300:
            self.commands.append({"kind": "rect", "x": x, "y": y, "width": width, "height": height, "color": _css_color(color)})

    def circle(self, x, y, radius, color="#ffffff"):
        if len(self.commands) < 300:
            self.commands.append({"kind": "circle", "x": x, "y": y, "radius": radius, "color": _css_color(color)})

    def line(self, x1, y1, x2, y2, color="#ffffff", width=2):
        if len(self.commands) < 300:
            self.commands.append({"kind": "line", "x1": x1, "y1": y1, "x2": x2, "y2": y2, "width": width, "color": _css_color(color)})

    def text(self, x, y, value, color="#ffffff", size=16):
        if len(self.commands) < 300:
            self.commands.append({"kind": "text", "x": x, "y": y, "value": str(value)[:160], "size": size, "color": _css_color(color)})


game = CyberCanvas()
_cyber_ns = {}
_cyber_keys = {}


class _Rect:
    def __init__(self, x, y, width, height):
        self.x, self.y, self.width, self.height = x, y, width, height

    @property
    def left(self): return self.x
    @property
    def right(self): return self.x + self.width
    @property
    def top(self): return self.y
    @property
    def bottom(self): return self.y + self.height
    @property
    def w(self): return self.width
    @property
    def h(self): return self.height
    @property
    def center(self): return (self.x + self.width / 2, self.y + self.height / 2)

    def colliderect(self, other):
        other = _as_rect(other)
        return self.left < other.right and self.right > other.left and self.top < other.bottom and self.bottom > other.top

    def collidepoint(self, point):
        px, py = point
        return self.left <= px < self.right and self.top <= py < self.bottom

    def __iter__(self):
        return iter((self.x, self.y, self.width, self.height))


def _as_rect(value):
    if isinstance(value, _Rect):
        return value
    return _Rect(value[0], value[1], value[2], value[3])


class _TextSurface:
    def __init__(self, value, color, size):
        self.value = str(value)[:160]
        self.color = _css_color(color)
        self.size = max(8, min(48, int(size)))


class _Surface:
    def __init__(self, size=(400, 600)):
        self.width, self.height = int(size[0]), int(size[1])

    def fill(self, color):
        game.clear(color)

    def blit(self, item, destination):
        if isinstance(item, _TextSurface):
            game.text(destination[0], destination[1] + item.size, item.value, item.color, item.size)


class _PressedKeys:
    def __getitem__(self, key):
        return bool(_cyber_keys.get(key, False))

    def get(self, key, default=False):
        return bool(_cyber_keys.get(key, default))


class _Draw:
    def rect(self, surface, color, rectangle, width=0):
        x, y, w, h = tuple(_as_rect(rectangle))
        if int(width or 0) <= 0:
            game.rect(x, y, w, h, color)
        else:
            edge = max(1, min(18, int(width)))
            game.line(x, y, x + w, y, color, edge)
            game.line(x + w, y, x + w, y + h, color, edge)
            game.line(x + w, y + h, x, y + h, color, edge)
            game.line(x, y + h, x, y, color, edge)
        return _as_rect(rectangle)

    def circle(self, surface, color, center, radius, width=0):
        game.circle(center[0], center[1], radius, color)
        return _Rect(center[0] - radius, center[1] - radius, radius * 2, radius * 2)

    def line(self, surface, color, start, end, width=1):
        game.line(start[0], start[1], end[0], end[1], color, width)


class _Display:
    def set_mode(self, size=(400, 600)):
        return _Surface(size)

    def flip(self): return None
    def update(self, *args, **kwargs): return None
    def set_caption(self, *args, **kwargs): return None


class _Clock:
    def tick(self, fps=60):
        return int(1000 / max(1, min(240, int(fps))))


class _Font:
    def __init__(self, size=16):
        self.size = max(8, min(48, int(size)))

    def render(self, value, antialias, color):
        return _TextSurface(value, color, self.size)


class _FontModule:
    def SysFont(self, name=None, size=16, bold=False, italic=False):
        return _Font(size)

    def Font(self, name=None, size=16):
        return _Font(size)


pygame = types.ModuleType("pygame")
pygame.init = lambda: (0, 0)
pygame.quit = lambda: None
pygame.K_LEFT = "left"
pygame.K_RIGHT = "right"
pygame.K_UP = "up"
pygame.K_DOWN = "down"
pygame.K_SPACE = "action"
pygame.K_RETURN = "action"
pygame.QUIT = "quit"
pygame.SRCALPHA = 1
pygame.Rect = _Rect
pygame.Surface = _Surface
pygame.display = _Display()
pygame.draw = _Draw()
pygame.time = types.SimpleNamespace(Clock=lambda: _Clock())
pygame.font = _FontModule()
pygame.key = types.SimpleNamespace(get_pressed=lambda: _PressedKeys())
pygame.event = types.SimpleNamespace(get=lambda: [])
sys.modules["pygame"] = pygame


def __cyber_frame(keys_json, dt):
    global _cyber_keys
    keys = json.loads(keys_json or "{}")
    _cyber_keys = keys
    step = max(0.0, min(float(dt), 0.05))
    update = _cyber_ns.get("update")
    if callable(update):
        update(step, keys)
    game.commands = []
    draw = _cyber_ns.get("draw")
    if callable(draw):
        draw(_cyber_ns.get("screen", game))
    return json.dumps({"background": game.background, "commands": game.commands}, ensure_ascii=False)


def __cyber_run(source):
    global _cyber_ns, _cyber_keys
    game.clear("#081115")
    _cyber_keys = {}
    _cyber_ns = {"__builtins__": __builtins__, "game": game, "pygame": pygame, "WIDTH": 400, "HEIGHT": 600}
    exec(source, _cyber_ns, _cyber_ns)
    setup = _cyber_ns.get("setup")
    if (callable(setup)):
        setup()
    return __cyber_frame("{}", 1.0 / 60.0)


def __cyber_reset__():
    global _cyber_keys
    _cyber_keys = {}
    game.clear("#081115")
    setup = _cyber_ns.get("setup")
    if callable(setup):
        setup()
    return __cyber_frame("{}", 1.0 / 60.0)
`,ie=`
importScripts(${JSON.stringify(`${j}pyodide.js`)});
const CHANNEL = ${JSON.stringify(y)};
const BRIDGE = ${JSON.stringify(re)};
let pyodide = null;
let active = false;

function send(type, extra = {}) {
  self.postMessage({ channel: CHANNEL, type, ...extra });
}

async function ensureRuntime() {
  if (pyodide) return pyodide;
  send("status", { status: "runtime-loading" });
  pyodide = await loadPyodide({ indexURL: ${JSON.stringify(j)} });
  pyodide.setStdout({ batched: (text) => send("stdout", { text: String(text).slice(0, 500) }) });
  pyodide.setStderr({ batched: (text) => send("stdout", { text: String(text).slice(0, 500) }) });
  await pyodide.runPythonAsync(BRIDGE);
  send("status", { status: "runtime-ready" });
  return pyodide;
}

self.onmessage = async (event) => {
  const data = event.data || {};
  if (data.channel !== CHANNEL) return;
  try {
    if (data.type === "run") {
      active = false;
      const source = String(data.code || "");
      if (source.length > 40000) throw new Error("Code is longer than the 40,000 character safety limit.");
      const runtime = await ensureRuntime();
      runtime.globals.set("__cyber_source", source);
      const sceneText = runtime.runPython("__cyber_run(__cyber_source)");
      send("scene", { scene: JSON.parse(sceneText) });
      active = true;
      send("status", { status: "running" });
      return;
    }
    if (data.type === "reset") {
      if (!pyodide || !active) throw new Error("Run the game before resetting it.");
      active = false;
      const sceneText = pyodide.runPython("__cyber_reset__()");
      send("scene", { scene: JSON.parse(sceneText) });
      active = true;
      send("status", { status: "running" });
      return;
    }
    if (data.type === "frame" && active && pyodide) {
      pyodide.globals.set("__cyber_keys_json", JSON.stringify(data.keys || {}));
      pyodide.globals.set("__cyber_dt", Number(data.dt) || 0.016);
      const sceneText = pyodide.runPython("__cyber_frame(__cyber_keys_json, __cyber_dt)");
      send("scene", { scene: JSON.parse(sceneText), frame: true });
      return;
    }
    if (data.type === "stop") {
      active = false;
      send("status", { status: "stopped" });
    }
  } catch (error) {
    active = false;
    send("error", { message: error instanceof Error ? error.message.slice(0, 700) : "Python runtime error" });
  }
};
`,oe=`
(() => {
  const CHANNEL = ${JSON.stringify(y)};
  const workerSource = ${JSON.stringify(ie)};
  const canvas = document.getElementById("game");
  const context = canvas.getContext("2d", { alpha: false });
  const statusElement = document.getElementById("runtime-status");
  let worker = null;
  let workerUrl = null;
  let running = false;
  let busy = false;
  let animation = 0;
  let loadTimeout = 0;
  let executionTimeout = 0;
  let frameTimeout = 0;
  let lastFrame = 0;
  let keys = { left: false, right: false, up: false, down: false, action: false };

  function send(type, extra = {}) {
    window.parent.postMessage({ channel: CHANNEL, type, ...extra }, "*");
  }

  function selectControlLayout(value) {
    if (["bike", "snake", "tetris"].includes(value)) {
      document.getElementById("controls").dataset.template = value;
    }
  }

  function drawWaiting() {
    context.fillStyle = "#081115";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#52e0c0";
    context.font = "700 17px ui-monospace, monospace";
    context.textAlign = "center";
    context.fillText("Waiting for Run...", canvas.width / 2, canvas.height / 2 - 7);
    context.fillStyle = "#8da7a7";
    context.font = "12px ui-monospace, monospace";
    context.fillText("Run bosilishini kutmoqda", canvas.width / 2, canvas.height / 2 + 18);
  }

  function safeColor(value) {
    const color = String(value || "#ffffff").slice(0, 48);
    if (/^#[0-9a-f]{3,8}$/i.test(color) || /^rgba?\\([0-9\\s,.%]+\\)$/i.test(color)) return color;
    if (["white", "black", "orange", "gray", "grey", "red", "green", "blue", "teal", "gold", "transparent"].includes(color.toLowerCase())) return color;
    return "#ffffff";
  }

  function finite(value, fallback = 0) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(-2000, Math.min(2000, number)) : fallback;
  }

  function render(scene) {
    if (!scene || typeof scene !== "object") return;
    context.fillStyle = safeColor(scene.background);
    context.fillRect(0, 0, canvas.width, canvas.height);
    const commands = Array.isArray(scene.commands) ? scene.commands.slice(0, 300) : [];
    for (const command of commands) {
      if (!command || typeof command !== "object") continue;
      context.fillStyle = safeColor(command.color);
      context.strokeStyle = safeColor(command.color);
      if (command.kind === "rect") {
        context.fillRect(finite(command.x), finite(command.y), finite(command.width), finite(command.height));
      } else if (command.kind === "circle") {
        context.beginPath();
        context.arc(finite(command.x), finite(command.y), Math.max(0, Math.min(300, finite(command.radius))), 0, Math.PI * 2);
        context.fill();
      } else if (command.kind === "line") {
        context.lineWidth = Math.max(1, Math.min(18, finite(command.width, 2)));
        context.beginPath();
        context.moveTo(finite(command.x1), finite(command.y1));
        context.lineTo(finite(command.x2), finite(command.y2));
        context.stroke();
      } else if (command.kind === "text") {
        const size = Math.max(8, Math.min(48, finite(command.size, 16)));
        context.font = "700 " + size + "px ui-monospace, monospace";
        context.textAlign = "left";
        context.fillText(String(command.value || "").slice(0, 160), finite(command.x), finite(command.y));
      }
    }
  }

  function clearTimeouts() {
    window.clearTimeout(loadTimeout);
    window.clearTimeout(executionTimeout);
    window.clearTimeout(frameTimeout);
  }

  function stopWorker(status = "stopped") {
    running = false;
    busy = false;
    window.cancelAnimationFrame(animation);
    clearTimeouts();
    if (worker) worker.terminate();
    worker = null;
    if (workerUrl) URL.revokeObjectURL(workerUrl);
    workerUrl = null;
    statusElement.textContent = status === "stopped" ? "Stopped · To‘xtatildi" : status;
    if (status === "stopped") send("status", { status: "stopped" });
  }

  function fail(message) {
    stopWorker(message);
    statusElement.textContent = message;
    send("error", { message });
  }

  function createWorker() {
    stopWorker("stopped");
    workerUrl = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
    worker = new Worker(workerUrl);
    worker.onerror = (event) => fail(String(event.message || "Python runtime failed to start").slice(0, 500));
    worker.onmessage = (event) => {
      const data = event.data || {};
      if (data.channel !== CHANNEL) return;
      if (data.type === "status") {
        if (data.status === "runtime-loading") statusElement.textContent = "Loading Python… · Python yuklanmoqda…";
        if (data.status === "runtime-ready") {
          statusElement.textContent = "Preparing your game… · O‘yin tayyorlanmoqda…";
          executionTimeout = window.setTimeout(() => fail("Python code took too long. Put game logic in update(). · Kod uzoq ishladi. Mantiqni update() ichiga yozing."), 15000);
        }
        if (data.status === "running") {
          window.clearTimeout(executionTimeout);
          window.clearTimeout(loadTimeout);
          running = true;
          lastFrame = 0;
          statusElement.textContent = "Running · O‘yin ishlayapti";
          if (!animation) animation = window.requestAnimationFrame(tick);
        }
        if (data.status === "stopped") running = false;
        send("status", { status: data.status });
      } else if (data.type === "scene") {
        render(data.scene);
        busy = false;
        window.clearTimeout(frameTimeout);
        if (!running && data.frame !== true) window.clearTimeout(executionTimeout);
        send("scene", { ready: true });
      } else if (data.type === "stdout") {
        send("stdout", { text: String(data.text || "").slice(0, 500) });
      } else if (data.type === "error") {
        fail(String(data.message || "Python error").slice(0, 700));
      }
    };
  }

  function tick(now) {
    if (!running || !worker) { animation = 0; return; }
    if (!busy) {
      const dt = lastFrame ? Math.min((now - lastFrame) / 1000, 0.05) : 1 / 60;
      lastFrame = now;
      busy = true;
      worker.postMessage({ channel: CHANNEL, type: "frame", dt, keys });
      frameTimeout = window.setTimeout(() => fail("A frame did not finish. Stop or simplify update(). · Kadr tugamadi. To‘xtating yoki update()ni soddalashtiring."), 3000);
    }
    animation = window.requestAnimationFrame(tick);
  }

  const keyNames = { ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down", Space: "action", Enter: "action" };
  window.addEventListener("keydown", (event) => {
    const name = keyNames[event.code];
    if (name) { keys[name] = true; event.preventDefault(); }
  });
  window.addEventListener("keyup", (event) => {
    const name = keyNames[event.code];
    if (name) { keys[name] = false; event.preventDefault(); }
  });
  window.addEventListener("blur", () => { keys = { left: false, right: false, up: false, down: false, action: false }; });
  canvas.addEventListener("pointerdown", () => canvas.focus());

  document.getElementById("controls").addEventListener("pointerdown", (event) => {
    const button = event.target.closest("button[data-key]");
    if (!button) return;
    event.preventDefault();
    button.setPointerCapture?.(event.pointerId);
    keys[button.dataset.key] = true;
  });
  document.getElementById("controls").addEventListener("pointerup", (event) => {
    const button = event.target.closest("button[data-key]");
    if (button) keys[button.dataset.key] = false;
  });
  document.getElementById("controls").addEventListener("pointercancel", (event) => {
    const button = event.target.closest("button[data-key]");
    if (button) keys[button.dataset.key] = false;
  });

  window.addEventListener("message", (event) => {
    if (event.source !== window.parent || !event.data || event.data.channel !== CHANNEL) return;
    if (event.data.type === "template") {
      selectControlLayout(event.data.template);
      return;
    }
    if (event.data.type === "run") {
      selectControlLayout(event.data.template);
      if (typeof event.data.code !== "string" || event.data.code.length > 40000) {
        fail("Code is longer than the 40,000 character safety limit.");
        return;
      }
      drawWaiting();
      canvas.focus();
      createWorker();
      loadTimeout = window.setTimeout(() => fail("Python runtime did not load. Check your connection and try again. · Python yuklanmadi. Internetni tekshirib, qayta urinib ko‘ring."), 60000);
      worker.postMessage({ channel: CHANNEL, type: "run", code: event.data.code });
      send("status", { status: "loading" });
    } else if (event.data.type === "reset") {
      if (!worker) {
        send("error", { message: "Run the game before resetting it." });
        return;
      }
      window.clearTimeout(executionTimeout);
      executionTimeout = window.setTimeout(() => fail("Reset took too long. Stop or simplify setup(). · Qayta boshlash uzoq davom etdi. To‘xtating yoki setup()ni soddalashtiring."), 15000);
      worker.postMessage({ channel: CHANNEL, type: "reset" });
    } else if (event.data.type === "stop") {
      stopWorker("stopped");
      drawWaiting();
    } else if (event.data.type === "input" && event.data.keys) {
      keys = { ...keys, ...event.data.keys };
    }
  });

  drawWaiting();
  send("status", { status: "idle" });
})();
`;function ce(){return`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; connect-src https://cdn.jsdelivr.net; worker-src blob:; style-src 'unsafe-inline'; img-src data: blob:; font-src 'none'; frame-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">
<style>
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;background:#081115;color:#ecf6f1;font-family:ui-monospace,SFMono-Regular,Consolas,monospace}body{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;padding:10px}.status{width:min(100%,360px);min-height:26px;color:#95b4ae;font-size:10px;line-height:1.4;text-align:left}canvas{display:block;width:min(100%,360px);height:auto;aspect-ratio:2/3;border:1px solid #31514e;border-radius:14px;background:#081115;box-shadow:0 18px 50px #010608;outline:none}canvas:focus{border-color:#52e0c0}#controls{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;width:min(100%,360px)}#controls button{width:100%;min-width:0;min-height:42px;border:1px solid #31514e;border-radius:10px;background:#102321;color:#52e0c0;font:700 18px ui-monospace,monospace;touch-action:none;user-select:none}#controls[data-template="bike"]{grid-template-columns:repeat(2,minmax(0,1fr))}#controls[data-template="snake"],#controls[data-template="tetris"]{grid-template-columns:repeat(4,minmax(0,1fr))}#controls[data-template="bike"] [data-key="up"],#controls[data-template="bike"] [data-key="down"],#controls[data-template="bike"] [data-key="action"],#controls[data-template="snake"] [data-key="action"],#controls[data-template="tetris"] [data-key="up"]{display:none}#controls button:active{background:#1d3a35}
</style>
</head>
<body>
<div id="runtime-status" class="status" role="status">Waiting for Run… · Run bosilishini kutmoqda</div>
<canvas id="game" width="400" height="600" tabindex="0" aria-label="Python game preview"></canvas>
<div id="controls" data-template="bike" aria-label="Game controls / O‘yin boshqaruvlari"><button type="button" data-key="up" aria-label="Move up / Yuqoriga">↑</button><button type="button" data-key="left" aria-label="Move left / Chapga">←</button><button type="button" data-key="down" aria-label="Move down / Pastga">↓</button><button type="button" data-key="right" aria-label="Move right / O‘ngga">→</button><button type="button" data-key="action" aria-label="Action or rotate / Harakat yoki aylantirish">↻</button></div>
<script>${oe}<\/script>
</body>
</html>`}const N="cyberustoz-python-game-code-v1",b=c=>`cyberustoz-python-game-code-v1-${c}`,le=ce();function O(c){const t=w[c].starter;try{const l=localStorage.getItem(b(c));if(l!==null)return l;if(c==="bike"){const f=localStorage.getItem(N);if(f!==null)return localStorage.setItem(b("bike"),f),localStorage.removeItem(N),f}}catch{}return t}function ue(){const{language:c}=Y(),t=c==="uz",l=r.useRef(null),f=r.useRef(null),v=r.useRef(null),L=r.useRef(null),[i,P]=r.useState("bike"),[o,x]=r.useState(()=>O("bike")),[n,m]=r.useState("idle"),[d,I]=r.useState(!1),[E,p]=r.useState(""),[G,_]=r.useState([]),[H,g]=r.useState(!1),A=ne[c],k=w[i],R=Math.max(1,o.split(`
`).length);r.useEffect(()=>{try{localStorage.setItem(b(i),o)}catch{}},[i,o]),r.useEffect(()=>{const a=s=>{if(!(s.source!==l.current?.contentWindow||!s.data||s.data.channel!==y))if(s.data.type==="status"){const u=s.data.status;m(u),u==="running"&&p("")}else s.data.type==="error"?(m("error"),p(String(s.data.message??(t?"Python xatosi.":"Python runtime error.")).slice(0,700))):s.data.type==="stdout"&&_(u=>[...u,String(s.data.text??"").slice(0,500)].slice(-6))};return window.addEventListener("message",a),()=>{window.removeEventListener("message",a),l.current?.contentWindow?.postMessage({channel:y,type:"stop"},"*")}},[t]);function h(a,s={}){l.current?.contentWindow?.postMessage({channel:y,type:a,...s},"*")}r.useEffect(()=>{d&&l.current?.contentWindow?.postMessage({channel:y,type:"template",template:i},"*")},[d,i]);function T(){d&&(p(""),_([]),m("loading"),L.current=o,h("run",{code:o,template:i}))}function z(){if(d){if(p(""),_([]),n==="running"&&L.current===o){m("loading"),h("reset");return}T()}}function D(){h("stop"),m("stopped")}function W(){try{localStorage.setItem(b(i),o),g(!0),window.setTimeout(()=>g(!1),2600)}catch{p(t?"Brauzerda saqlash imkoni yo‘q. Kodni nusxalab oling.":"Browser storage is unavailable. Copy your code before leaving.")}}function F(){x(k.starter),g(!1),p(""),m("idle"),h("stop")}function q(a){if(a!==i){try{localStorage.setItem(b(i),o)}catch{}h("stop"),x(O(a)),P(a),g(!1),p(""),_([]),m("idle"),L.current=null}}const B={idle:t?"Run bosilishini kutmoqda":"Waiting for Run",loading:t?"Runtime tayyorlanmoqda…":"Preparing runtime…","runtime-loading":t?"Python yuklanmoqda…":"Loading Python…","runtime-ready":t?"O‘yin tayyorlanmoqda…":"Preparing game…",running:t?"O‘yin ishlayapti":"Game running",stopped:t?"To‘xtatildi":"Stopped",error:t?"Xatolik — qayta urinib ko‘ring":"Error — try again"};return e.jsxs("main",{"data-loc":"client/src/pages/GameLab.tsx:149",className:"container game-lab-wrap",children:[e.jsxs("header",{"data-loc":"client/src/pages/GameLab.tsx:150",className:"page-hero game-lab-hero",children:[e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:151",className:"eyebrow",children:[e.jsx(U,{"data-loc":"client/src/pages/GameLab.tsx:151",size:14})," ",t?"PYTHON · O‘YIN LABORATORIYASI":"PYTHON · GAME LAB"]}),e.jsx("h1",{"data-loc":"client/src/pages/GameLab.tsx:152",children:t?"Python o‘yiningizni yozing va o‘ynang":"Write and play your Python game"}),e.jsx("p",{"data-loc":"client/src/pages/GameLab.tsx:153",children:t?"Video uslubida o‘yin oynasi tepada, `bike.py` muharriri pastda. Pygame-uslubidagi Python kodini o‘zgartirib Run tugmasini bosing — natija shu sahifada ochiladi.":"Following the video layout, the game preview is above the `bike.py` editor. Edit the Pygame-style Python code and press Run to play the result on this page."}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:154",className:"game-lab-path-links",children:[e.jsx(C,{"data-loc":"client/src/pages/GameLab.tsx:154",href:"/courses/python",children:t?"To‘liq Python kursi":"Full Python course"}),e.jsx(C,{"data-loc":"client/src/pages/GameLab.tsx:154",href:"/courses/game-development",children:t?"Game development darslari":"Game development lessons"})]})]}),e.jsxs("section",{"data-loc":"client/src/pages/GameLab.tsx:157",className:"game-workbench","aria-labelledby":"bike-game-title",children:[e.jsxs("fieldset",{"data-loc":"client/src/pages/GameLab.tsx:158",className:"game-template-chooser",children:[e.jsx("legend",{"data-loc":"client/src/pages/GameLab.tsx:159",children:t?"O‘yin shablonini tanlang":"Choose a game template"}),e.jsx("div",{"data-loc":"client/src/pages/GameLab.tsx:160",role:"group","aria-label":t?"O‘yin shablonlari":"Game templates",children:Object.keys(w).map(a=>e.jsx("button",{"data-loc":"client/src/pages/GameLab.tsx:161",type:"button",className:"button button-outline","aria-pressed":i===a,onClick:()=>q(a),children:w[a].name[c]},a))})]}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:164",className:"game-preview-card",children:[e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:165",className:"game-panel-title",children:[e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:166",children:[e.jsx("span",{"data-loc":"client/src/pages/GameLab.tsx:166",className:"game-window-dot"}),e.jsx("span",{"data-loc":"client/src/pages/GameLab.tsx:166",className:"game-window-dot"}),e.jsx("span",{"data-loc":"client/src/pages/GameLab.tsx:166",className:"game-window-dot"}),e.jsxs("strong",{"data-loc":"client/src/pages/GameLab.tsx:166",id:"bike-game-title",children:[k.name[c]," · Python preview"]})]}),e.jsx("span",{"data-loc":"client/src/pages/GameLab.tsx:167",className:`game-runtime-badge ${n==="running"?"is-running":n==="error"?"is-error":""}`,role:"status",children:B[n]})]}),e.jsx("iframe",{"data-loc":"client/src/pages/GameLab.tsx:169",ref:l,className:"game-sandbox-frame",title:t?"Python o‘yini xavfsiz ko‘rish oynasi":"Isolated Python game preview",srcDoc:le,sandbox:"allow-scripts",referrerPolicy:"no-referrer",loading:"eager",onLoad:()=>I(!0)}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:179",className:"game-preview-caption",children:[e.jsx("span",{"data-loc":"client/src/pages/GameLab.tsx:179",children:i==="tetris"?e.jsxs(e.Fragment,{children:[e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"←"}),e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"→"}),e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"↓"}),e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"Space"})]}):i==="snake"?e.jsxs(e.Fragment,{children:[e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"↑"}),e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"↓"}),e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"←"}),e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"→"})]}):e.jsxs(e.Fragment,{children:[e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"←"}),e.jsx("kbd",{"data-loc":"client/src/pages/GameLab.tsx:179",children:"→"})]})}),k.controls[c]]})]}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:182",className:"game-run-toolbar",role:"group","aria-label":t?"O‘yin boshqaruvi":"Game controls",children:[e.jsxs("button",{"data-loc":"client/src/pages/GameLab.tsx:183",type:"button",className:"button button-primary",onClick:T,disabled:!d||n==="loading"||n==="runtime-loading"||n==="runtime-ready",children:[e.jsx(V,{"data-loc":"client/src/pages/GameLab.tsx:183",size:15,fill:"currentColor"}),n==="running"?t?"Qayta ishga tushirish":"Run again":t?"Run · O‘ynash":"Run · Play"]}),e.jsxs("button",{"data-loc":"client/src/pages/GameLab.tsx:184",type:"button",className:"button button-outline",onClick:D,disabled:!d||n!=="running"&&n!=="loading"&&n!=="runtime-loading"&&n!=="runtime-ready",children:[e.jsx(Z,{"data-loc":"client/src/pages/GameLab.tsx:184",size:14}),t?"To‘xtatish":"Stop"]}),e.jsxs("button",{"data-loc":"client/src/pages/GameLab.tsx:185",type:"button",className:"button button-outline",onClick:z,disabled:!d||n==="loading"||n==="runtime-loading"||n==="runtime-ready",children:[e.jsx($,{"data-loc":"client/src/pages/GameLab.tsx:185",size:14}),"Reset"]}),e.jsxs("button",{"data-loc":"client/src/pages/GameLab.tsx:186",type:"button",className:"button button-outline",onClick:W,children:[e.jsx(ee,{"data-loc":"client/src/pages/GameLab.tsx:186",size:14}),H?t?"Saqlandi":"Saved":t?"Saqlash":"Save"]}),e.jsx("button",{"data-loc":"client/src/pages/GameLab.tsx:187",type:"button",className:"game-restore-button",onClick:F,children:t?"Namunani qaytarish":"Restore example"})]}),E&&e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:190",className:"game-error-box",role:"alert",children:[e.jsx(J,{"data-loc":"client/src/pages/GameLab.tsx:190",size:16}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:190",children:[e.jsx("strong",{"data-loc":"client/src/pages/GameLab.tsx:190",children:t?"O‘yin ishga tushmadi":"Game did not start"}),e.jsx("p",{"data-loc":"client/src/pages/GameLab.tsx:190",children:E}),e.jsx("button",{"data-loc":"client/src/pages/GameLab.tsx:190",type:"button",onClick:T,disabled:!d,children:t?"Qayta urinish":"Retry"})]})]}),G.length>0&&e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:191",className:"game-output-console","aria-live":"polite",children:[e.jsxs("span",{"data-loc":"client/src/pages/GameLab.tsx:191",children:[e.jsx(S,{"data-loc":"client/src/pages/GameLab.tsx:191",size:13})," PYTHON OUTPUT"]}),G.map((a,s)=>e.jsx("code",{"data-loc":"client/src/pages/GameLab.tsx:191",children:a},`${s}-${a}`))]}),e.jsxs("section",{"data-loc":"client/src/pages/GameLab.tsx:193",className:"game-editor-card","aria-labelledby":"game-editor-title",children:[e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:194",className:"game-editor-titlebar",children:[e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:194",children:[e.jsx(S,{"data-loc":"client/src/pages/GameLab.tsx:194",size:15}),e.jsx("strong",{"data-loc":"client/src/pages/GameLab.tsx:194",id:"game-editor-title",children:t?"SIZNING KODINGIZ":"YOUR CODE"}),e.jsx("span",{"data-loc":"client/src/pages/GameLab.tsx:194",className:"game-editor-file",children:k.filename})]}),e.jsxs("span",{"data-loc":"client/src/pages/GameLab.tsx:194",children:[R," ",t?"qator":"lines"," · Python 3 · Pygame-style"]})]}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:195",className:"game-editor-body",children:[e.jsx("pre",{"data-loc":"client/src/pages/GameLab.tsx:196",ref:v,className:"game-line-numbers","aria-hidden":"true",children:Array.from({length:R},(a,s)=>String(s+1).padStart(2," ")).join(`
`)}),e.jsx("textarea",{"data-loc":"client/src/pages/GameLab.tsx:197",ref:f,className:"game-code-editor",value:o,onChange:a=>{x(a.target.value.slice(0,4e4)),g(!1)},onKeyDown:a=>{if(a.key!=="Tab")return;a.preventDefault();const s=a.currentTarget,u=s.selectionStart,M=s.selectionEnd,K=`${o.slice(0,u)}    ${o.slice(M)}`.slice(0,4e4);x(K),g(!1),requestAnimationFrame(()=>{s.selectionStart=s.selectionEnd=u+4})},onScroll:a=>{v.current&&(v.current.scrollTop=a.currentTarget.scrollTop)},"aria-label":t?"Python o‘yin kodi muharriri":"Python game code editor",spellCheck:!1,autoCapitalize:"off",autoCorrect:"off",wrap:"off",maxLength:4e4,rows:22})]}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:223",className:"game-editor-footer",children:[e.jsx("span",{"data-loc":"client/src/pages/GameLab.tsx:223",children:t?"Kodingiz faqat shu qurilmada ishga tushadi; serverga yuborilmaydi.":"Your code runs on this device and is never sent to the server."}),e.jsxs("span",{"data-loc":"client/src/pages/GameLab.tsx:223",children:[o.length.toLocaleString()," / 40,000"]})]})]})]}),e.jsxs("section",{"data-loc":"client/src/pages/GameLab.tsx:227",className:"game-security-note",children:[e.jsx(X,{"data-loc":"client/src/pages/GameLab.tsx:227",size:18}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:227",children:[e.jsx("strong",{"data-loc":"client/src/pages/GameLab.tsx:227",children:t?"Ajratilgan, xavfsiz Python runtime":"Isolated Python runtime"}),e.jsx("p",{"data-loc":"client/src/pages/GameLab.tsx:227",children:t?"Pyodide versiyasi 0.27.7 pin qilingan CDN’dan birinchi Run’da yuklanadi. Python kodi opaque-origin iframe va alohida Worker ichida ishlaydi; tarmoq faqat runtime CDN’i bilan cheklangan. Sayt DOM’i, cookie, Admin API, profil va ma’lumotlar bazasiga ruxsati yo‘q. Internet bo‘lmasa runtime ishlamasligi mumkin.":"Pyodide 0.27.7 loads from a pinned CDN on first Run. Python code runs in an opaque-origin iframe and separate Worker; its network access is limited to the runtime CDN. It cannot access the site DOM, cookies, Admin APIs, profile or database. The runtime may be unavailable offline."})]})]}),e.jsxs("section",{"data-loc":"client/src/pages/GameLab.tsx:229",className:"game-lessons-section",children:[e.jsx("div",{"data-loc":"client/src/pages/GameLab.tsx:230",className:"section-heading",children:e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:230",children:[e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:230",className:"eyebrow",children:[e.jsx(Q,{"data-loc":"client/src/pages/GameLab.tsx:230",size:13})," ",t?"BOSQICHMA-BOSQICH":"STEP BY STEP"]}),e.jsx("h2",{"data-loc":"client/src/pages/GameLab.tsx:230",children:t?"O‘yin Python’ini o‘rganing":"Learn Python game-building"}),e.jsx("p",{"data-loc":"client/src/pages/GameLab.tsx:230",children:t?"Har bir darsda tushuncha, kichik misol va o‘zingiz sinaydigan vazifa bor.":"Each lesson explains one concept, shows a short example and gives you something to try."})]})}),e.jsx("div",{"data-loc":"client/src/pages/GameLab.tsx:231",className:"game-lesson-list",children:A.map((a,s)=>e.jsxs("article",{"data-loc":"client/src/pages/GameLab.tsx:231",className:"game-lesson-card",children:[e.jsx("div",{"data-loc":"client/src/pages/GameLab.tsx:232",className:"game-lesson-number",children:String(s+1).padStart(2,"0")}),e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:233",children:[e.jsx("h3",{"data-loc":"client/src/pages/GameLab.tsx:233",children:a.title}),e.jsx("p",{"data-loc":"client/src/pages/GameLab.tsx:233",children:a.text}),e.jsx("pre",{"data-loc":"client/src/pages/GameLab.tsx:233",children:e.jsx("code",{"data-loc":"client/src/pages/GameLab.tsx:233",children:a.code})})]})]},a.title))})]}),e.jsxs("section",{"data-loc":"client/src/pages/GameLab.tsx:237",className:"game-api-card",children:[e.jsxs("div",{"data-loc":"client/src/pages/GameLab.tsx:237",className:"eyebrow",children:[e.jsx(S,{"data-loc":"client/src/pages/GameLab.tsx:237",size:13})," ",t?"PYGAME-USLUBIDAGI BRAUZER API":"PYGAME-STYLE BROWSER API"]}),e.jsx("p",{"data-loc":"client/src/pages/GameLab.tsx:237",children:t?"`import pygame`, `pygame.display.set_mode`, `pygame.draw.rect/circle`, `pygame.key.get_pressed`, `pygame.Rect` va matn uchun `font.render/screen.blit` ishlaydi. Brauzer asosiy siklni o‘zi yuritadi: `setup()`, `update(dt, keys)`, `draw(screen)`. Bu ta’lim uchun kichik adapter, to‘liq native Pygame paketi emas; foydalanuvchi kodi host sahifaga, akkaunt ma’lumotlariga yoki runtime CDN’idan boshqa tarmoqqa kira olmaydi.":"Use `import pygame`, `pygame.display.set_mode`, `pygame.draw.rect/circle`, `pygame.key.get_pressed`, `pygame.Rect`, and `font.render/screen.blit`. The browser owns the main loop: `setup()`, `update(dt, keys)`, `draw(screen)`. This is a small teaching adapter, not the full native Pygame package; student code cannot access the host page, account data or any network other than the runtime CDN."})]})]})}export{ue as default};
