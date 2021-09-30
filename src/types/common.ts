

export class PageRequest<T>{
  public params: T;
  public page: number = 1;
  public pageSize: number = 20;
  public sizes: number[] = [20, 50, 100];
  constructor(params: T) {
    this.params = params;
  }
}

export class PageResponse<T>{
  public data: T;
  public pageSize: number = 20;
  public total: number = 0;
  public page: number = 1;
  constructor(p: T) {
    this.data = p;
  }
}

export interface Dict {
  code: string;
  name: string;
}