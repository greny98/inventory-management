import { IsString, IsPhoneNumber } from 'class-validator';

export class CreateDistributorDto {
  @IsString()
  public name: string;

  @IsString()
  public address: string;

  @IsPhoneNumber()
  public phone: string;
}
