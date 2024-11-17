const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { getJwtToken } = require('../utils/auth');

const prisma = new PrismaClient();

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email }
    });
    if (!user) {
      return res.status(401).send('ユーザーが見つかりません');
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('ユーザーとパスワードが一致しません');
    }
    const token = getJwtToken({ userId: user.id, email: user.email });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000
    });
    res.redirect('/blogs');
  } catch (error) {
    console.error(error);
    res.status(500).send('ユーザー認証中にエラーが発生しました');
  }
};

exports.getSignup = (req, res) => {
  res.render('signup');
};

exports.postSignup = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.render('signup', { error: 'パスワードが一致しません', username, email });
  };

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        name: username,
        email: email,
        password: hashedPassword
      }
    });
    return res.redirect('/auth/login');
  } catch (error) {
    console.error(error);
    return res.status(500).send('ユーザーの作成中にエラーが発生しました。')
  }
};

exports.postLogout = async (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  });
  res.redirect('/auth/login');
};