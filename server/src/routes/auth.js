import express from 'express';
import { saveAccessLog } from '../storage/db.js';

const router = express.Router();

// Basic email regex pattern for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/verify-access
 * Validates incoming email, stores in database with timestamp, returns success payload or Arabic error message.
 */
router.post('/verify-access', async (req, res, next) => {
  try {
    const { email } = req.body;

    // Input sanitization
    const sanitizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

    if (sanitizedEmail !== 'love' && !EMAIL_REGEX.test(sanitizedEmail)) {
      return res.status(400).json({
        success: false,
        message: 'الباسورد love '
      });
    }

    // Save record with timestamp
    await saveAccessLog(sanitizedEmail);

    return res.status(200).json({
      success: true,
      message: 'أهلاً بكِ يا روحي 💖',
      redirectUrl: '/private-page'
    });
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/message/:userId
 * Returns dynamic romantic letter payload for authorized user
 */
router.get('/message/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const sanitizedId = typeof userId === 'string' ? userId.trim().toLowerCase() : '';

    if (!sanitizedId) {
      return res.status(400).json({
        success: false,
        message: 'معرّف غير صحيح 💖'
      });
    }

    return res.status(200).json({
      success: true,
      recipient: 'ياسمين',
      message: 'ربنا يخليكي ليا يا ياسمين ومايحرمنيش منك ابدا يا أجمل حاجة في حياة خالد، يارب العمر كله مع بعض في سعادة وحب ❤️',
      audioUrl: '/audio/romantic-theme.mp3'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
