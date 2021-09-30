<!--  -->
<template>
  <div class="goods-item">
    <van-image width="100%" :src="goods.avatar"/>
    <div class="goods-item-info">
      <div class="title">
        <span>{{goods.title}}</span>
        <span>{{goods.description}}</span>
      </div>
      <div class="price">
        <span class="price-title">¥</span>
        <span class="price-count">{{goods.amount}}</span>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { reactive, toRefs } from "vue";
import { Options, Vue } from "vue-class-component";
import { Goods } from "@/types/goods";
export default {
  name: "GoodsPanel",
  props: {
    goods: {
			type: Goods,
			default(){
				return new Goods();
			}
		},
  },
};
</script>
<style lang='less' scoped>
.goods-item {
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 6px;
  padding: 10px;
  text-align: left;
  overflow: hidden;
  .goods-item-info {
    .title {
      font-size: 14px;
      height: 40px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      // color: #9b9b9b;
      line-height: 20px;
      padding-top: 10px;
      span {
        vertical-align: middle;
      }
      span:first-child {
        padding-right: 10px;
      }
    }
    .price {
      color: #fd3f31;
      height: 25px;
      padding: 6px 0 0;
      line-height: 1.6;
      .price-count {
        font-weight: 600;
        padding-left: 5px;
      }
    }
  }
}
</style>