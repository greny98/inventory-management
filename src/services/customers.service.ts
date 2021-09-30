import DB from '@databases';
import { CreateCustomerDto } from '@dtos/customers.dto';
import { ICustomer } from '@interfaces/customers.interface';
import { isEmpty } from '@utils/util';
import { HttpException } from '@exceptions/HttpException';

class CustomerService {
  public customerDb = DB.Customers;

  public async createCustomer(customerData: CreateCustomerDto): Promise<ICustomer> {
    // Check empty
    if (isEmpty(customerData)) throw new HttpException(400, "Customer's information is empty!");
    // Check phone existed
    const existed = await this.customerDb.findOne({ where: { phone: customerData.phone } });
    if (existed) {
      throw new HttpException(409, `Phone number ${customerData.phone} already exists`);
    }
    return this.customerDb.create({ ...customerData });
  }
}

export default CustomerService;
