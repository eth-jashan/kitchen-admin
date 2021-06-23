export default class Dish{
    constructor(id,name,description,imguri,spicy,cuisine,price,noServe,quantity,categoryId,categoryName,uid,lat,long,type,chefId){
        this.id=id
        this.name=name
        this.description=description
        this.imguri=imguri
        this.spicy=spicy
        this.cuisine=cuisine
        this.price=price
        this.noServe=noServe
        this.quantity=quantity
        this.categoryId=categoryId
        this.categoryName=categoryName,
        this.uid = uid;
        this.lat = lat;
        this.long = long;
        this.type = type;
        this.chefId = chefId;

    }
}

