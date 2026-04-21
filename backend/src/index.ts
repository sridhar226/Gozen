import express from 'express';
import path from 'path';
import cors from 'cors';
import { authenticate, authorize } from './middleware/auth';
import { Role } from './types/roles';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
const apiRouter = express.Router();

// GET /profile — requires authentication only (any role)
apiRouter.get('/profile', authenticate, (req, res) => {
  res.status(200).json({
    message: 'Profile retrieved successfully',
    user: req.user,
  });
});

// POST /content — requires ADMIN or EDITOR
apiRouter.post(
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
apiRouter.delete(
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

app.use('/api', apiRouter);

// Serve Static Frontend files in production
const frontendPath = path.join(__dirname, '../../frontend/dist');
app.use(express.static(frontendPath));

// Catch-all route to serve the frontend's index.html
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
