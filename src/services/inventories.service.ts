import { IInventory } from '@/interfaces/inventories.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class InventoriesService {
  public inventories = DB.Inventories;

  public async getAllInventories(page: number): Promise<IInventory[]> {
    const limit = 10;
    const offset = page * limit;
    return this.inventories.findAll({ limit: offset });
  }
}

export default InventoriesService;
