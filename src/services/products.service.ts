import { CreateProductDto } from '@/dtos/products.dto';
import { IProduct } from '@/interfaces/products.interface';
import DB from '@databases';
import { HttpException } from '@exceptions/HttpException';
import { isEmpty } from '@utils/util';

class ProductService {
  public products = DB.Products;

  public async createProduct(productData: CreateProductDto): Promise<IProduct> {
    // Check empty
    if (isEmpty(productData)) {
      throw new HttpException(400, "You're not productData");
    }
    // Check Product exist
    const findProduct: IProduct = await this.products.findOne({ where: { name: productData.name } });
    if (findProduct) {
      throw new HttpException(409, `Your product ${productData.name} already exists`);
    }
    // create new Product
    return this.products.create({ ...productData });
  }
}

export default ProductService;
