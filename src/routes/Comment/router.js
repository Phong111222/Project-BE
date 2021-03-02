import { Router } from 'express';
import Authorize from '../../middlewares/Authorize';
import CommentController from '../../controller/comment';
const router = Router();

router.route('/comment/:id').post(Authorize, CommentController.Edit);

export default router;
