/**
 * Centralized Error Handling Middleware for Express Application
 */
// eslint-disable-next-scope
export const errorHandler = (err, req, res, _next) => {
  console.error('[SERVER ERROR]', err.stack || err.message || err);

  const statusCode = res.statusCode !== 200 ? res.statusCode : (err.status || 500);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'حدث خطأ في النظام، يرجى المحاولة لاحقاً 💖',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};
