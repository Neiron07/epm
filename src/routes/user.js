import { Router } from 'express';
import User from '../logic/user.js';
import { hasAccess } from '../helper/auth.js';

const router = new Router();

router.post('/signin', async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await User.login(id, password);
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post('/signin/new_token', async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await User.refreshToken(token);
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post('/signup', async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const result = await User.register(id, password);
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.get('/info', hasAccess, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ msg: 'unauth user err' });
    }
    const result = await User.getInfo(token);
    res.status(201).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get('/logout', hasAccess, async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(403).json({ msg: 'unauth user err' });
    }
    const result = await User.logout(token);
    res.status(201).json({ data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

export default router;