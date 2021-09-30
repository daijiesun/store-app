<!--  -->
<template>
  <div class="detail">
    <van-sticky>
      <van-nav-bar title="详细信息" left-text="返回" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    </van-sticky>
    <div class="content">
      <van-swipe :autoplay="3000" height="300" lazy-render>
        <van-swipe-item v-for="(image,index) in goods.swipeImages" :key="image" @click="showSwipe(index)">
          <img :src="image" />
        </van-swipe-item>
        <template #indicator="{ active }">
          <div class="custom-indicator">{{ active + 1 }}/{{goods.swipeImages.length}}</div>
        </template>
      </van-swipe>
      <div class="goods-detail">
        <div class="price">
          <span class="price-title">¥</span>
          <span class="price-count">{{goods.amount}}</span>
        </div>
        <div class="title">
          <span>{{goods.title}}</span>
          <span>{{goods.description}}</span>
        </div>
        <van-divider>商品详情</van-divider>
        <div class="ql-container ql-snow">
          <div class="ql-editor" v-html="goods.details"></div>
        </div>
      </div>
    </div>
    <van-share-sheet v-model:show="showShare" title="选择付款方式" :options="options" @select="onSelect" />
    <van-overlay :show="showPayCode" @click="showPayCode = false">
      <div class="wrapper">
        <div class="qr-code" @click.stop>
          <img :src="qrSrc">
        </div>
      </div>
    </van-overlay>
    <div style="padding:5px 20px">
    <van-button type="danger" @click="showShare = true" round block>立即购买</van-button>
    </div>
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, ref } from "vue";
import { Goods } from "@/types/goods";
import { ImagePreview } from "vant";
import { getGoodsInfo } from "@/api/goods";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import baseConfig from "@/store/baseConfig";

export default {
  name: "GoodsDetail",
  props: {
    id: String,
  },
  setup(props: any) {
    const { id } = toRefs(props);
    const goods: Goods = reactive<Goods>(new Goods());
    getGoodsInfo(id.value).then((res) => {
      Object.assign(goods, res);
    });
    const showSwipe = (index: number) => {
      ImagePreview({
        images: [...goods.swipeImages] as string[],
        startPosition: index,
      });
    };

    const showPayCode = ref(false);
    const showShare = ref(false);
    const options = [{ name: "微信", icon: "wechat", key: "wx" }];
    const onSelect = (option: any) => {
      if (option.key === "wx") {
        showPayCode.value = true;
      }
      showShare.value = false;
    };

    const qrSrc = ref<string>("");
    qrSrc.value = baseConfig.config.payCodeUrl as string;
    return {
      options,
      showShare,
      goods,
      showPayCode,
      qrSrc,
      onSelect,
      showSwipe,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/goods" });
    },
  },
};
</script>
<style lang='less' scoped>
.detail {
  height: 100%;
  // height: 100vh;
  overflow: hidden;
  .content {
    overflow: auto;
    height: calc(100% - 110px);
  }
}
.van-swipe-item img {
  height: 100%;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.goods-detail {
  padding: 10px;
  box-sizing: border-box;
  .title {
    box-sizing: content-box;
    font-size: 14px;
    max-height: 40px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    // color: #9b9b9b;
    line-height: 20px;
    margin-bottom: 10px;
    span {
      vertical-align: middle;
    }
    span:first-child {
      padding-right: 10px;
      color: #000;
      font-weight: 600;
    }
  }
  .price {
    color: #fd3f31;
    height: 25px;
    margin-bottom: 10px;
    line-height: 1.6;
    .price-count {
      font-weight: 600;
      padding-left: 5px;
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.qr-code {
  width: 220px;
  height: 230px;
  background-color: #fff;
  line-height: 200px;
  img {
    width: 100%;
    // height: 100%;
  }
}
.ql-container {
  border: none;
}
</style>