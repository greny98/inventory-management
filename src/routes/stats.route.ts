import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import StatsController from '@controllers/stats.controller';

class StatsRoute implements Routes {
  public path = '/stats';
  public router = Router();
  public statsController = new StatsController();
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // TODO: Get revenue and profit
    this.router.get(`${this.path}`, this.statsController.getStats);
  }
}

export default StatsRoute;
