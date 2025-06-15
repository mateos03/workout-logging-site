CREATE TABLE workout(
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  created TIMESTAMP NOT NULL,
  workout_tag_id INT,
  rating INT,
  notes TEXT,
  finished BOOLEAN
);

CREATE TABLE workout_tag(
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL
);

CREATE TABLE sets(
  id SERIAL PRIMARY KEY,
  workout_id INT NOT NULL,
  exercise_id INT NOT NULL,
  set_number INT NOT NULL,
  reps INT NOT NULL,
  weight INT NOT NULL,
  notes TEXT
);

CREATE TABLE exercise(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  user_id TEXT NOT NULL
);

CREATE TABLE tag(
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  user_id TEXT NOT NULL
);

CREATE TABLE exercise_tags(
  exercise_id INT NOT NULL,
  tag_id INT NOT NULL,
  PRIMARY KEY(exercise_id, tag_id)
);