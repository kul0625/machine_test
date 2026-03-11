const createCaptcha = (req) => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  req.session.captcha = {
    answer: `${a + b}`,
    expiresAt: Date.now() + 5 * 60 * 1000
  };
  return { question: `${a} + ${b} = ?` };
};

const verifyCaptcha = (req, answer) => {
  const data = req.session.captcha;
  if (!data || data.expiresAt < Date.now()) {
    return { valid: false, message: 'Captcha expired. Generate a new one.' };
  }
  if (`${answer}`.trim() !== data.answer) {
    return { valid: false, message: 'Invalid captcha answer.' };
  }
  delete req.session.captcha;
  return { valid: true };
};

module.exports = { createCaptcha, verifyCaptcha };
