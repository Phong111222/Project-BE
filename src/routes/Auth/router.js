import { Router } from 'express';
import SuccessResponse from '../../../../Selling-project/models/response/success';
import User from '../../models/user';
// import asyncMiddleware from '../../middlewares/asyncMiddleware';
import ErrorResponse from '../../models/response/ErrorResponse';

const router = Router();

router.post('/register', async (req, res, _) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });

    const rs = await user.save();
    res.status(200).json(new SuccessResponse(200, rs));
  } catch (error) {
    res.status(400).json(new ErrorResponse(404, error));
  }
});

export default router;
