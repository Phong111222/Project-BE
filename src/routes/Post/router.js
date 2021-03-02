import { Router } from 'express';
import Authorize from '../../middlewares/Authorize';
import PostController from '../../controller/post';
const router = Router();

router
  .route('/post')
  .post(Authorize, PostController.Create)
  .get(PostController.GetPosts);

router
  .route('/post/:id')
  .delete(Authorize, PostController.Delete)
  .patch(Authorize, PostController.Edit);

router.route('/post/like/:id').post(Authorize, PostController.Like);
router.route('/post/comment/:id').post(Authorize, PostController.CreateComment);

export default router;
