
// 文件
export interface FilePath {
  name: string,
  url: string,
  uid:string | number
}

export class Goods {
  public readonly id: string = "";
  public readonly createDate: string = "";
  public title: string = "";
  public type: string = "";
  public description: string = "";
  public amount: number = 0;
  public count: number = 0;
  public avatar:FilePath[] | string = [];
  public swipeImages: Array<FilePath> | Array<string> = [];
  public details: string = "";
  public isValid:boolean = true;
}

//商品类型
export class GoodsType {
  public id: string = "";
  public title: string = "";
  public readonly createDate: string = "";
}