import argparse
import hashlib
import json
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont


parser = argparse.ArgumentParser()
parser.add_argument("source", type=Path)
arguments = parser.parse_args()
root = Path(__file__).resolve().parent.parent
expected_hash = "17e58fb25e7a421b64ebea1c50104fadf752d9045fb102501434bce577e22b3f"
actual_hash = hashlib.sha256(arguments.source.read_bytes()).hexdigest()
if actual_hash != expected_hash:
    raise ValueError(f"Unexpected Xiaolai source: {actual_hash}")

sources = sorted((root / "content/lessons").glob("*.ts"))
sources += sorted((root / "app/components").glob("*.tsx"))
sources += [root / "app/basic-path-data.ts", root / "app/i18n/catalog.ts", root / "app/notebook-copy.ts"]
characters = set("".join(source.read_text() for source in sources))
codepoints = {ord(character) for character in characters if ord(character) >= 0x3000}
font = TTFont(arguments.source, recalcTimestamp=False)
supported = set(font.getBestCmap())
options = subset.Options()
options.name_IDs = ["*"]
options.name_legacy = True
options.name_languages = ["*"]
subsetter = subset.Subsetter(options=options)
subsetter.populate(unicodes=codepoints & supported)
subsetter.subset(font)
for record in font["name"].names:
    if record.nameID in {1, 3, 4, 6, 16}:
        name = "BEAMLessonHand-Regular" if record.nameID == 6 else "BEAM Lesson Hand"
        record.string = name.encode(record.getEncoding())
font.flavor = "woff2"
destination = root / "public/fonts/lesson-sketch"
destination.mkdir(parents=True, exist_ok=True)
font.save(destination / "xiaolai-subset.woff2")
manifest = {"sourceSha256": actual_hash, "characters": "".join(chr(point) for point in sorted(codepoints & supported))}
(destination / "coverage.json").write_text(json.dumps(manifest, ensure_ascii=False) + "\n")
print(f"Subset: {len(codepoints & supported)} characters; {(destination / 'xiaolai-subset.woff2').stat().st_size} bytes")
