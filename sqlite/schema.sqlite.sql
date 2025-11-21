PRAGMA foreign_keys=ON;
.mode column
.headers on

CREATE TABLE IF NOT EXISTS palettes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    source TEXT
);

CREATE TABLE IF NOT EXISTS palette_colors (
    palette_id INTEGER NOT NULL REFERENCES palettes(id) ON DELETE CASCADE,
    color_hex TEXT NOT NULL
);

INSERT INTO palettes (name, source) VALUES ('shades of teal', 'https://www.color-hex.com/color-palette/4666');

SELECT * FROM palettes;

INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#b2d8d8');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#66b2b2');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#008080');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#006666');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#004c4c');

SELECT * FROM palette_colors;

INSERT INTO palettes (name, source) VALUES ('ice cream', 'https://www.color-hex.com/color-palette/660');

INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#6b3e26');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#ffc5d9');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#c2f2d0');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#fdf5c9');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#ffcb85');

SELECT palette_id, count(color_hex) FROM palette_colors GROUP BY palette_id;

SELECT color_hex, count(color_hex) FROM palette_colors GROUP BY color_hex;
