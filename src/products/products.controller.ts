import { Controller, Delete, Get, Post, Put,Query,Res,Body, NotFoundException,HttpStatus } from '@nestjs/common';
import { ProductsService } from "./products.service";
import { CreateProductDTO } from "./dto/products.dto";

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService){}

    @Post()
    async createProduct(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productsService.createProduct(createProductDTO);
        return res.status(HttpStatus.OK).json({
            message: 'Product Successfully Created',
            product
        });
    }

    @Get()
    async getProducts(@Res() res) {
        const products = await this.productsService.getProducts();
        return res.status(HttpStatus.OK).json(products);
    }

    // Delete Product: /delete?productID=5c9d45e705ea4843c8d0e8f7
    @Delete()
    async deleteProduct(@Res() res, @Query('_id') _id) {
        const productDeleted = await this.productsService.deleteProduct(_id);
        if (!productDeleted) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Deleted Successfully',
            productDeleted
        });
    }
  
// Update Product: /?_id=5c9d45e705ea4843c8d0e8f7
    @Put()
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('_id') _id) {
        console.log(_id)
        const updatedProduct = await this.productsService.updateProduct(_id, createProductDTO);
        if (!updatedProduct) throw new NotFoundException('Product does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Product Updated Successfully',
            updatedProduct 
        });
    }



}
