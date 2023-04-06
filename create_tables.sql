CREATE TABLE IF NOT EXISTS queues (
  queue_key VARCHAR(255) PRIMARY KEY,
  queue_type VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS consumers (
  consumer_id VARCHAR(255) PRIMARY KEY,
  queue_key VARCHAR(255) NOT NULL REFERENCES queues(queue_key) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
  message_id VARCHAR(255) PRIMARY KEY,
  consumer_id VARCHAR(255) NOT NULL REFERENCES consumers(consumer_id) ON DELETE CASCADE,
  message_content TEXT NOT NULL,
  durable BOOLEAN NOT NULL
);