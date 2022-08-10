
-- USER is a reserved keyword with Postgres

-- DB is named basketball_app

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT NOT NULL DEFAULT 1
);

INSERT INTO "user" ("username", "password", "access_level")
VALUES('tiny', '1234', '1'), ('coachNorton, 1234, 2');

SELECT * FROM "user";
    
    -- might need more specific references for user.id and team.id
    CREATE TABLE "player" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INT REFERENCES "user" DEFAULT NULL,
    "team_id" INT REFERENCES "team" DEFAULT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "grade" INT NOT NULL DEFAULT 9,
    "jersey_number" INT
);

--team 1 (9th grade)
INSERT INTO "player" ("team_id", "first_name", "last_name", "grade", "jersey_number")
VALUES (1, 'Jae', 'Oro', 9, 5),(1,'Coach','Norton', 0), (1, 'Garrick', 'Fredric', 9, 8), (1, 'Leroy', 'Jenkins', 9, 9),
(1, 'Jeff', 'Joy', 9, 10), (1, 'Alton', 'Kent', 9, 12), (1, 'Clark', 'Kent', 9, 13), (1, 'Mikey', 'Mike', 9, 18),
(1, 'Rexton', 'Bexton', 9, 20), (1, 'Todd', 'Fair', 9, 22);
-- team 2
INSERT INTO "player" ("team_id", "first_name", "last_name", "grade", "jersey_number")
VALUES ('2', 'Rajon', 'Rondo', '10', '6');

--TEAM table
CREATE TABLE "team" (
    "id" SERIAL PRIMARY KEY,
    "team_name" VARCHAR(255) NOT NULL
);

INSERT INTO "team" ("team_name")
VALUES('9th grade'),('B-Squad'),('JV'),('VARSITY');

SELECT * FROM team;

--GAMES TABLE
CREATE TABLE "games" (
    "id" SERIAL PRIMARY KEY,
    "team_id" INT REFERENCES "team" DEFAULT 0,
    "opponent_name" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "points_for" INT NOT NULL DEFAULT 0,
    "points_against" INT NOT NULL DEFAULT 0, 
    -- W or L for win/loss
    "outcome" VARCHAR(1)
);
-- default games added to table. 
INSERT INTO "games" ("team_id", "opponent_name", "date", "points_for", "points_against", "outcome")
VALUES(1, 'Blaine','09-01-2021', 52, 50, 'W'), (1, 'Coon Rapids','09-06-2021', 58, 42, 'W'), (1, 'Anoka','09-10-2021', 52, 70, 'L'),
(1, 'Sibley','09-14-2021', 65, 71, 'L'), (1, 'Mankato','09-18-2021', 64, 63, 'W');

SELECT * FROM "games" ORDER BY date;

--PLAYER_STATS TABLE
CREATE TABLE "player_stats" (
    "id" SERIAL PRIMARY KEY,
    "game_id" INT REFERENCES "games" DEFAULT 0,
    "player_id" INT REFERENCES "player" DEFAULT 0,
    "points" INT NOT NULL DEFAULT 0,
    "assists" INT NOT NULL DEFAULT 0,
    "rebounds" INT NOT NULL DEFAULT 0,
    "steals" INT NOT NULL DEFAULT 0
);
SELECT * FROM player_stats;

-- Playerstats for game 1, team 1 (9th grade)
INSERT INTO "player_stats" ("game_id","player_id","points","assists","rebounds","steals")
--player_stats for team 1: 3,7,8,9,10,11,12,13,14,15
VALUES(1,3,6,4,2,2), (1,7,8,7,3,1), (1,8,10,1,6,1), (1,9,1,1,1,1), (1,10,3,6,2,8), (1,11,6,3,2,5), (1,12,5,5,3,0),
(1,13,5,2,0,2), (1,14,7,8,10,1), (1,15,0,2,2,2);
