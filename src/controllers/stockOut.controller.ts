import { CreateStockOutBodyDto } from '@/dtos/stockOut.dto';
import { IProductStockOut } from '@/interfaces/productStockOut.interface';
import { IGetAllStockOut, IStockOut } from '@/interfaces/stockOut.interface';
import CustomerService from '@/services/customers.service';
import ProductStockOutService from '@/services/productStockOut.service';
import StockOutService from '@/services/stockOut.service';
import { RequestHandler } from 'express';

class StockOutController {
  public stockOutService = new StockOutService();
  public customerService = new CustomerService();
  public prodStockOutService = new ProductStockOutService();

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
      const result = await this.prodStockOutService.prodStockOut.bulkCreate(productStockOut);
      // TODO: Update inventory
      // console.log(result);
      await res.status(201).json({ data: createStockOutData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public getAllStockOut: RequestHandler = async (req, res, next) => {
    try {
      const { page = 0 } = req.query as IGetAllStockOut;
      const stockOut = await this.stockOutService.getAllStockOut(page);
      await res.status(201).json({ data: { stockOut }, message: 'listed all' });
    } catch (error) {
      next(error);
    }
  };
}

export default StockOutController;
