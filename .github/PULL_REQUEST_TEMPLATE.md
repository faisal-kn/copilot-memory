## Description

<!-- Describe your changes -->

## Type of Change

- [ ] Bug fix (non-breaking change fixing an issue)
- [ ] New feature (non-breaking change adding functionality)
- [ ] Breaking change (fix or feature causing existing functionality to change)
- [ ] Documentation update

## Checklist

### Code Quality

- [ ] Code follows project conventions (ES Modules, `.js` extensions)
- [ ] Database columns use `snake_case`
- [ ] JavaScript/GraphQL uses `camelCase`
- [ ] Mapper functions properly convert between formats

### Security

- [ ] All SQL queries use parameterized placeholders (`$1, $2`)
- [ ] Input is validated before database operations
- [ ] No sensitive data logged or exposed

### API Changes

- [ ] GraphQL schema updated (if applicable)
- [ ] API version synchronized across all files (if version bump needed):
  - `src/lib/constants.js`
  - `src/config/server.js`
  - `docs/api-reference.md`

### Performance

- [ ] DataLoaders used for nested entity resolution
- [ ] Pagination applied for list queries
- [ ] No N+1 query issues introduced

### Testing

- [ ] Changes tested locally
- [ ] Edge cases considered

### Documentation

- [ ] README updated (if applicable)
- [ ] API reference updated (if applicable)
- [ ] Database schema docs updated (if applicable)

## Related Issues

<!-- Link any related issues: Fixes #123, Relates to #456 -->
