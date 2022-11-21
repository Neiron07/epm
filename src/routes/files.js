import { Router } from 'express';
import FileService from '../logic/files.js';

const router = new Router();

router.post('/upload', async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'Missing file' });
    }

    const result = await FileService.uploadFile(file);
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    const result = await FileService.deletedFile(id);
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({ error: 'Missing id' });
    }

    const result = await FileService.fileInfo(id);
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const file = req.file;

    if (!id || !file) {
      return res.status(400).json({ error: 'Missing id or file' });
    }

    const result = await FileService.updateFile(id, file);
    res.status(201).json({ data: result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;