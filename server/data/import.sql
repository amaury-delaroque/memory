BEGIN;

DROP TABLE IF EXISTS "score", "theme", "card";

CREATE TABLE "score" (
	"id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"pseudo" text,
    "score" int NOT NULL,
	"createdAt" Timestamptz default now()
);

CREATE TABLE "theme" (
	"id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" text NOT NULL UNIQUE,
    "sprite"text NOT NULL UNIQUE,
    "primary_color"text,
    "second_color"text,
    "light_color"text,
    "dark_color"text
);

CREATE TABLE "card" (
	"serial-id" int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
	"name" text NOT NULL,
	"id" INT NOT NULL,
    "theme_id" serial references "theme"("id") ON DELETE CASCADE
);

COMMIT;