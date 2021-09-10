
export class CartGoods {
  constructor(itemInfo) {
    this.desc = itemInfo.desc
    this.title = itemInfo.title
    this.iid = itemInfo.iid
    this.imgURL = itemInfo.topImages[0]
    this.newPrice = itemInfo.lowNowPrice
  }
}
