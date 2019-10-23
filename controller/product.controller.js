var modelData = require("../model/product.model")
var productModel = modelData.productModel


module.exports={
    createProduct: createProduct,
}
function createProduct(product_id,product_name,unit,price,image,discription,status,link,cate_name) {
    return productModel.find({ product_id: product_id })
        .then(function (productid) {
            if (productid.length > 0) {
                return Promise.reject({
                    statusCode: 400,
                    message: "ma san pham da ton tai"
                })
            }
            else{
                return productModel.find({ product_name: product_name })
                .then(function(productname){
                    if (productname.length > 0) {
                        return Promise.reject({
                            statusCode: 400,
                            message: " san pham da ton tai"
                        })
                    }
                    else {
                        return new Promise((resolve, reject) => {
                            var Product = new productModel({
                                product_id: product_id,
                                product_name: product_name,
                                unit: unit,
                                price: price,
                                image: image,
                                discription: discription,
                                status: status,
                                link: link,
                                cate_name: cate_name,
                            })
                           
                            return Product.save()
                                .then(function (addProduct) {
                                    return resolve(addProduct);
                                })
                                .catch(function (err) {
                                    return reject(err);
                                })
                        })
                    };
                })
            }        
        })
        .catch(function (err) {
            return Promise.reject(err);
        })
}
