import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import InventoriesController from '@/controllers/inventories.controller';

class InventoriesRoute implements Routes {
  public path = '/inventories';
  public router = Router();
  public inventoriesController = new InventoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.inventoriesController.getAllInventories);
  }
}

export default InventoriesRoute;
