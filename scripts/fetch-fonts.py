"""Скачивает вариативные woff2 Google Fonts (cyrillic+latin) и генерирует fonts.css."""
import re, os, sys, urllib.request

OUT_DIR = r"D:\projects\royal-event-ru\public\fonts"
CSS_OUT = r"D:\projects\royal-event-ru\src\fonts.css"
ALLOWED_SUBSETS = {"cyrillic", "cyrillic-ext", "latin", "latin-ext"}

CSS_URL = (
    "https://fonts.googleapis.com/css2"
    "?family=Unbounded:wght@200..900"
    "&family=Manrope:wght@200..800"
    "&family=Lora:ital,wght@0,400..700;1,400..700"
    "&display=swap"
)
# Современный UA обязателен — иначе Google отдаёт ttf вместо вариативных woff2
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

req = urllib.request.Request(CSS_URL, headers={"User-Agent": UA})
css = urllib.request.urlopen(req, timeout=60).read().decode("utf-8")

os.makedirs(OUT_DIR, exist_ok=True)

# Блоки вида: /* cyrillic */\n@font-face { ... }
blocks = re.findall(r"/\*\s*([\w-]+)\s*\*/\s*(@font-face\s*\{[^}]+\})", css)
print(f"Всего @font-face блоков: {len(blocks)}")

out_css = [
    "/* Локальные шрифты (бывш. Google Fonts: Unbounded, Manrope, Lora — вариативные,",
    "   сабсеты cyrillic+latin). Сгенерировано скриптом, источник — css2 API.",
    "   Файлы лежат в public/fonts/. font-display: swap — текст виден сразу. */",
    "",
]
downloaded = 0
for subset, block in blocks:
    if subset not in ALLOWED_SUBSETS:
        continue
    family = re.search(r"font-family:\s*'([^']+)'", block).group(1)
    style = re.search(r"font-style:\s*(\w+)", block).group(1)
    weight = re.search(r"font-weight:\s*([\d ]+)", block).group(1).strip()
    url = re.search(r"url\((https://[^)]+\.woff2)\)", block).group(1)
    unicode_range = re.search(r"unicode-range:\s*([^;]+);", block).group(1).strip()

    slug = family.lower().replace(" ", "")
    fname = f"{slug}{'-italic' if style == 'italic' else ''}-{subset}.woff2"
    path = os.path.join(OUT_DIR, fname)
    with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=60) as r:
        data = r.read()
    with open(path, "wb") as f:
        f.write(data)
    downloaded += 1
    print(f"  {fname}: {len(data)//1024} KB (wght {weight})")

    out_css.append("@font-face {")
    out_css.append(f"  font-family: '{family}';")
    out_css.append(f"  font-style: {style};")
    out_css.append(f"  font-weight: {weight};")
    out_css.append("  font-display: swap;")
    out_css.append(f"  src: url('/fonts/{fname}') format('woff2');")
    out_css.append(f"  unicode-range: {unicode_range};")
    out_css.append("}")
    out_css.append("")

with open(CSS_OUT, "w", encoding="utf-8") as f:
    f.write("\n".join(out_css))
print(f"Скачано {downloaded} файлов, CSS: {CSS_OUT}")
