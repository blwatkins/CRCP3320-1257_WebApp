CREATE TABLE IF NOT EXISTS palettes (
                                        id INTEGER PRIMARY KEY AUTO_INCREMENT,
                                        name VARCHAR(50) NOT NULL UNIQUE,
    source TEXT
    );

CREATE TABLE IF NOT EXISTS palette_colors (
                                              palette_id INTEGER NOT NULL,
                                              color_hex VARCHAR(9) NOT NULL,
    FOREIGN KEY (palette_id) REFERENCES palettes(id) ON DELETE CASCADE
    );

INSERT INTO palettes (name, source) VALUES ('shades of teal', 'https://www.color-hex.com/color-palette/4666');

INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#b2d8d8');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#66b2b2');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#008080');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#006666');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (1, '#004c4c');

INSERT INTO palettes (name, source) VALUES ('ice cream', 'https://www.color-hex.com/color-palette/660');

INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#6b3e26');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#ffc5d9');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#c2f2d0');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#fdf5c9');
INSERT INTO palette_colors (palette_id, color_hex) VALUES (2, '#ffcb85');

SELECT * FROM palettes;

SELECT * FROM palette_colors;

SELECT palette_id, count(color_hex) FROM palette_colors GROUP BY palette_id;

SELECT color_hex, count(color_hex) FROM palette_colors GROUP BY color_hex;

SELECT palettes.name, count(palette_colors.color_hex)
FROM palettes, palette_colors
WHERE palettes.id = palette_colors.palette_id
GROUP BY palettes.id;
