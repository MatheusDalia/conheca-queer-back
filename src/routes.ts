import express from 'express';
import NewsController from '@controllers/NewsController';
import ProjectsController from '@controllers/ProjectsController';
import PersonalityController from '@controllers/PersonalityController';
import BannerController from '@controllers/BannerController';

const routes = express.Router();
const newsController = new NewsController();
const projectsController = new ProjectsController();
const bannerController = new BannerController();
const personalityController = new PersonalityController();

//News
routes.post('/news', newsController.create);
routes.get('/news', newsController.get);
routes.delete('/news/:id', newsController.delete);
routes.put('/news/:id', newsController.update);

//Projects
routes.post('/projects', projectsController.create);
routes.get('/projects', projectsController.get);
routes.delete('/projects/:id', projectsController.delete);
routes.put('/projects/:id', projectsController.update);

//Personality
routes.post('/personality', personalityController.create);
routes.get('/personality', personalityController.get);
routes.delete('/personality/:id', personalityController.delete);
routes.put('/personality/:id', personalityController.update);

//Banner
routes.post('/banner', bannerController.create);
routes.get('/banner', bannerController.get);
routes.delete('/banner/:id', bannerController.delete);
routes.put('/banner/:id', bannerController.update);

export default routes; 