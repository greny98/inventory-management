import { CreateStockOutBodyDto } from '@/dtos/stockOut.dto';
import { IProductStockOut } from '@/interfaces/productStockOut.interface';
import { IGetAllStockOut, IStockOut } from '@/interfaces/stockOut.interface';
import CustomerService from '@/services/customers.service';
import InventoriesService from '@/services/inventories.service';
import ProductRankService from '@/services/productRank.service';
import ProductStockOutService from '@/services/productStockOut.service';
import StockOutService from '@/services/stockOut.service';
import { RequestHandler } from 'express';
import moment from 'moment';
import { IDistributor } from '@interfaces/distributors.interface';
import { ICustomer } from '@interfaces/customers.interface';

type FilterQuery = { fromDate: Date; toDate: Date; customerPhone: string };

class StockOutController {
  public stockOutService = new StockOutService();
  public customerService = new CustomerService();
  public prodStockOutService = new ProductStockOutService();
  public inventoryService = new InventoriesService();
  public productRankService = new ProductRankService();

  public createStockOut: RequestHandler = async (req, res, next) => {
    try {
      const { products, customer, discount = 0 }: CreateStockOutBodyDto = req.body;
      if (products.length === 0) {
        return res.status(400).json({ message: 'No products!' });
      }
      // Check customer existed
      const foundCustomer = await this.customerService.searchCustomer(customer.phone);
      if (!foundCustomer) {
        return res.status(400).json({ message: 'Customer does not exist' });
      }
      // Create Stock Out
      const createStockOutData: IStockOut = await this.stockOutService.createStockOut({
        customerId: foundCustomer.id,
        createdAt: new Date(),
      });
      // Create Product Stock Out
      const productStockOut: IProductStockOut[] = products.map(prod => ({
        stockOutId: createStockOutData.id,
        productId: prod.product.id,
        discount,
        quantity: prod.quantity,
        createdAt: new Date(),
      }));
      const month = moment(new Date()).format('M');
      const year = moment(new Date()).format('Y');

      const result = await this.prodStockOutService.prodStockOut.bulkCreate(productStockOut);

      // Update Inventory with subtracting quantity
      await Promise.all(
        result.map(prod =>
          this.inventoryService.updateInventory({ productId: prod.productId, quantity: -prod.quantity }),
        ),
      );

      // Create Product Rank
      await Promise.all(
        result.map(prod =>
          this.productRankService.createOrUpdateProductRank({
            productId: prod.productId,
            quantity: prod.quantity,
            month: Number(month),
            year: Number(year),
          }),
        ),
      );
      await res.status(201).json({ data: createStockOutData, message: 'created stock out' });
    } catch (error) {
      next(error);
    }
  };

  public getAllStockOut: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllStockOut;
      const stockOut = await this.stockOutService.getAllStockOut(page);
      await res.status(201).json({ data: { count: stockOut.count, stockOut: stockOut.rows }, message: 'listed all' });
    } catch (error) {
      next(error);
    }
  };

  public filter: RequestHandler<any, any, FilterQuery, any> = async (req, res, next) => {
    try {
      const { fromDate, toDate, customerPhone } = req.query as FilterQuery;
      let customer: ICustomer = null;
      if (customerPhone) {
        customer = await this.customerService.searchCustomer(customerPhone);
      }
      const stockIn = await this.stockOutService.filterDate(
        moment(fromDate).toDate(),
        moment(toDate).toDate(),
        customer?.id,
      );
      res.json({ data: stockIn });
    } catch (e) {
      next(e);
    }
  };
}

export default StockOutController;
