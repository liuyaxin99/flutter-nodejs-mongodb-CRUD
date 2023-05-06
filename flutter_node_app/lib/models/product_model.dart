List<ProductModel> productsFromJson(dynamic str) =>
    List<ProductModel>.from((str).map((x) => ProductModel.fromJson(x)));

class ProductModel {
  late String? id;
  late String? productName;
  late String? productDescription;
  late double? productPrice;
  late String? productImage;

  ProductModel({
    this.id,
    this.productName,
    this.productDescription,
    this.productPrice,
    this.productImage,
  });

  ProductModel.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    productName = json['productName'];
    productDescription = json['productDescription'];
    productPrice = json['productPrice'].toDouble();
    productImage = json['productImage'];
  }

  Map<String, dynamic> toJson() {
    final data = <String, dynamic>{};
    data['_id'] = id;
    data['productName'] = productName;
    data['productDescription'] = productDescription;
    data['productPrice'] = productPrice;
    data['productImage'] = productImage;
    return data;
  }
}
