import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
// Mongoose
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './schema/products.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductModule {}