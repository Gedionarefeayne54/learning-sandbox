// Wraps an async route handler so any thrown error (or rejected promise)
// is automatically passed to Express's error handling instead of crashing
// the server or leaving the request hanging.
//
// Usage:
//   router.post('/route', asyncHandler(async (req, res) => { ... }));

export default function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
