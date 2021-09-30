import { CreateProductDto } from '@/dtos/products.dto';
import { IProduct } from '@/interfaces/products.interface';
import ProductService from '@/services/products.service';
import { RequestHandler } from 'express';

class ProductsController {
  public productService = new ProductService();

  public createProduct: RequestHandler = async (req, res, next) => {
    try {
      const productData: CreateProductDto = req.body;
      const createProductData: IProduct = await this.productService.createProduct(productData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductsController;
