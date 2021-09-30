import { IsString, IsPhoneNumber } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  public name: string;

  @IsString()
  public address: string;

  @IsPhoneNumber()
  public phone: string;
}

export class SearchCustomerDto {
  @IsPhoneNumber()
  public phone: string;
}
