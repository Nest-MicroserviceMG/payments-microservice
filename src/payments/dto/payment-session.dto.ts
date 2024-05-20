import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class PaymentSessionDto {
  @IsString()
  orderId: string;

  @IsString()
  currency: string;

  @IsArray()
  @ArrayMinSize(1) // que tenga al menos un item
  @ValidateNested({ each: true }) // hace que cada item sea validado
  @Type(() => PaymentSessionItemDto) // para que sepa que es un array de PaymentSessionItemDto
  items: PaymentSessionItemDto[];
}

export class PaymentSessionItemDto {
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}
