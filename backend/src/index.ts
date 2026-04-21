import express from 'express';
import { authenticate, authorize } from './middleware/auth';
import { Role } from './types/roles';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// GET /profile — requires authentication only (any role)
app.get('/profile', authenticate, (req, res) => {
  res.status(200).json({
    message: 'Profile retrieved successfully',
    user: req.user,
  });
});

// POST /content — requires ADMIN or EDITOR
app.post(
  '/content',
  authenticate,
  authorize(Role.ADMIN, Role.EDITOR),
  (req, res) => {
    res.status(201).json({
      message: 'Content created successfully',
      user: req.user,
    });
  }
);

// DELETE /system — requires ADMIN only
app.delete(
  '/system',
  authenticate,
  authorize(Role.ADMIN),
  (req, res) => {
    res.status(200).json({
      message: 'System resource deleted successfully',
      user: req.user,
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
