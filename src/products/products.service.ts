import { Injectable } from '@nestjs/common';
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Product } from "./interfaces/products.interface";
import { CreateProductDTO } from "./dto/products.dto";
@Injectable()

export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {}
 
    // Post a single product
 async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = new this.productModel(createProductDTO);
    return newProduct.save();
}

async getProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
}

  
   async deleteProduct(_id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndDelete(_id);
    return deletedProduct;
}


async updateProduct(_id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    
    const updatedProduct = await this.productModel
                        .findByIdAndUpdate(_id, createProductDTO, {new: true});
    return updatedProduct;
}



}
