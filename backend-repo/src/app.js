const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const { requireAuth } = require('./middleware/auth');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const balanceRoutes = require('./routes/balanceRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 10 * 60 * 1000, httpOnly: true, sameSite: 'lax' }
  })
);

app.use('/api/auth/login', rateLimit({ windowMs: 60 * 1000, max: 10 }));

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/users', requireAuth, userRoutes);
app.use('/api/balance', requireAuth, balanceRoutes);
app.use('/api/admin', requireAuth, adminRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Internal server error' });
});

module.exports = app;
