# **Database Schema**

## `users`

| column name | data type | details                   |
|-------------|-----------|---------------------------|
| id          | integer   | not null, primary key     |
| username    | varchar   | not null, unique          |
| email       | varchar   | not null, unique          |
| password    | varchar   | not null                  |
| first_name  | varchar   | not null                  |
| last_name   | varchar   | not null                  |
| address     | varchar   | not null                  |
| created-at  | datetime  | not null                  |
| updated-at  | datetime  | not null                  |


## `products`

| column name    | data type | details                   |
|----------------|-----------|---------------------------|
| id             | integer   | not null, primary key     |
| user_id        | integer   | not null, foreign key     |
| name           | varchar   | not null                  |
| description    | text      | not null                  |
| image          | file      | not null                  |
| price          | decimal   | not null                  |
| stock_quantity | integer   | not null                  |
| size           | varchar   | not null                  |
| created_at     | datetime  | not null                  |
| updated_at     | datetime  | not null                  |


## `reviews`

| column name | data type | details               |
|-------------|-----------|-----------------------|
| id          | integer   | not null, primary key |
| user_id     | integer   | not null, foreign key |
| product_id  | integer   | not null, foreign key |
| review      | text      | not null              |
| rating      | integer   | not null              |
| created_at  | datetime  | not null              |
| updated_at  | datetime  | not null              |