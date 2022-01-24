BEGIN;

INSERT INTO theme ("name", "sprite", "primary_color", "second_color", "light_color", "dark_color") VALUES
('fruit', 'cards.png', '#2ec4b6', '#229186', '#e5f9f8', '#1f1f1f'),
('dragon ball', 'dragonball.png', '#4ec4b6', '#429186', '#e4f9f8', '#4f1f1f');

INSERT INTO card ("name", "id", "theme_id") VALUES
    ('red apple',1, 1),
    ('banana',2, 1),
    ('orange', 3, 1),
    ('lime', 4, 1),
    ('pomegranate', 5, 1),
    ('apricot', 6, 1),
    ('lemon', 7, 1),
    ('strawberry', 8, 1),
    ('green apple', 9, 1),
    ('peach', 10, 1),
    ('grape', 11, 1),
    ('watermelon', 12, 1),
    ('plum', 13, 1),
    ('pear', 14, 1),
    ('red cherry', 15, 1),
    ('raspberry', 16, 1),
    ('mango', 17, 1),
    ('yellow cherry', 18, 1);


COMMIT;