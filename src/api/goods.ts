import { PageRequest,PageResponse } from '@/types/common';
import { Goods, GoodsType } from '@/types/goods';
import { POST, GET, DELETE, PATCH } from './http';

// TODO: about goods
export const getGoodsList = (p: PageRequest<any>) => {
  return POST<PageResponse<Goods[]>>('/goods/page', p)
}
export const getGoodsInfo = (goodsId: string) => {
  return GET<Goods>(`/goods/${goodsId}`)
}