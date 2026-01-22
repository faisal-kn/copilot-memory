-- Drop indexes
DROP INDEX IF EXISTS idx_users_email;

DROP INDEX IF EXISTS idx_users_role;

DROP INDEX IF EXISTS idx_user_permissions_user_id;

DROP INDEX IF EXISTS idx_refresh_tokens_user_id;

DROP INDEX IF EXISTS idx_refresh_tokens_token;

-- Drop tables
DROP TABLE IF EXISTS refresh_tokens;

DROP TABLE IF EXISTS user_permissions;

DROP TABLE IF EXISTS users;