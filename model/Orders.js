class Orders{
    constructor(id,customerName,customerId,chefId,dishes,orderWorth,location,status,date){
        this.id=id
        this.customerName=customerName
        this.customerId=customerId
        this.chefId=chefId
        this.dishes=dishes
        this.orderWorth=orderWorth
        this.location=location
        this.status = status
        this.date = date
    }
}

export default Orders