import express from 'express';
import { searchCities } from '../controllers/suggestions';

const router: express.Router = express.Router();

router.get('/', searchCities);

export default router;