import { IGetAllInventories, IInventory } from '@/interfaces/inventories.interface';
import InventoriesService from '@/services/inventories.service';
import { RequestHandler } from 'express';

class InventoriesController {
  public inventoriesService = new InventoriesService();

  public getAllInventories: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllInventories;
      const inventories: IInventory[] = await this.inventoriesService.getAllInventories(page);
      res.status(201).json({ data: { inventories }, message: 'listed' });
    } catch (error) {
      next(error);
    }
  };
}

export default InventoriesController;
