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
        <div class="info">The 2.0 branch of Quill has officially been opened
          and development commenced. One design principle Quill embraces is to firs
          t make it possible, then make it easy. This allows the technical
          challenges to be proved out and provides clarity around use c
          ases so that the right audience is designed for. Quill 1.
          0 pushed the boundaries on the former, and now 2.0 will focus on the
          and development commenced. One design principle Quill embraces is to firs
          t make it possible, then make it easy. This allows the technical
          challenges to be proved out and provides clarity around use c
          ases so that the right audience is designed for. Quill 1.
          0 pushed the boundaries on the former, and now 2.0 will focus on the
          and development commenced. One design principle Quill embraces is to firs
          t make it possible, then make it easy. This allows the technical
          challenges to be proved out and provides clarity around use c
          ases so that the right audience is designed for. Quill 1.
          0 pushed the boundaries on the former, and now 2.0 will focus on the
          and development commenced. One design principle Quill embraces is to firs
          t make it possible, then make it easy. This allows the technical
          challenges to be proved out and provides clarity around use c
          ases so that the right audience is designed for. Quill 1.
          0 pushed the boundaries on the former, and now 2.0 will focus on the
          latter.{{goods.info}}</div>
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
      <van-button type="danger" @click="showShare = true" round block>立即购买</van-button>
  </div>
</template>

<script lang='ts'>
import { reactive, toRefs, ref } from "vue";
import { Goods } from "@/model/goods";
import { ImagePreview } from 'vant';

export default {
  name: "GoodsDetail",
  props: {
    id: String,
  },
  setup(props) {
    const { id } = toRefs(props);
    const goods: Goods = reactive<Goods>(new Goods());
    goods.title = "标题";
    goods.description = "描述";
    goods.amount = 1111;
    goods.swipeImages = [
      "https://img.yzcdn.cn/vant/apple-1.jpg",
      "https://img.yzcdn.cn/vant/apple-2.jpg",
    ];
    const showSwipe = (index:number)=>{
      ImagePreview({
        images: [...goods.swipeImages],
        startPosition: index
      });
    }
  
    const showPayCode = ref(false);
    const showShare = ref(false);
    const options = [{ name: "微信", icon: "wechat",key:"wx" }];
    const onSelect = (option: any) => {
      if(option.key === 'wx'){
        showPayCode.value = true;
      }
      showShare.value = false;
    };

    const qrSrc = ref("");
    qrSrc.value = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAABTFJREFUeF7tXe12qzAMo+//0L2np2wXAnYk4VA6tL8NCbEs+SNp95im6TkN/Hs++ekfj8fqjbI52rHoVireC12LGffaOW8xYoWKjRsQwuC9oQakZ6H15yuGKMZrlxshN8v3YubPTLGcB9131drL92rnNCAvzQbjnAGZXckMmaaJyV6qDZatjXozo9yofGUMqbJXKFlVCygGNCCANGQeZ4bUKYoZ0sgzU/Nkjqg68EcBQWVRZWC19P35GGJAtlJnhhDp2J9jiCohCpNeds7SWWVOAzJ7r2I8AxIYD81EmOwmUpl2DjNkp8I3IFv3yWzyFc1FNO5WsKxdS0250Xf+ym4vujkDsmMppkWNBuvbAoJunBmHUh4NwGrgRp+rSm0ZG60OrM48U0c3ixqPSW3ROdF3VA3ee+7USw7oZlHjGZAevDufW7I4oz2eygkSt8bvaDTgMy0W9LQve+WKOUSTbB4zIMR5SJXRU+cwQ/Im5BkgrLKsCBBGNlYTNtdAlQ1lQT2rpNvP0FR6+Zy6NirHPXuEkmVA3qZD7WBAZldD2yWo56PjXsujGWSPFZasxPM/DkhFpa5mzpHGq/RH5SUrKKv7a3vsgNvvDLWyQIjOY0A6lxxQQzKZjlKQ3Zohy7QXrViraI2eJqppKcriqv0o621ilgHhroGiKiJnfwbkYoAss6wReTUaQypkKYttaAaGjmOKRsYG8M1FNbVlXuZnLFMLZPOjMUoZZ0BQ8V6MUwxthuwY2gw5ySjtMkphyNQo1Wm8KttMWh2eqY/wUgPS110DQnzB9RSGRHUImr30Mf8/Ar11wqx9piyNCPjtnKsDKlTrqjwFzYLQGgWtjhnAl2MNCJlsGBBGrw58VeG2DMnoicoUKnuvtSLJYjI8RfYYP0LbSVVyBl9yMCDbJiTqDIyDGZAOXS7LEFXHGQljpOToWMW7R3QJNsVyxUU55ULaUYMefd6AHLVg8fMGpNigR6e7LCDRiWHWCGw/UwMfmvZmxldbJ1HWWJW+yjHXgKzhNiCzPVBPR1v4PYZfliHVt06YIgg1iqL3PUAiGUQLYCaGUemyAVmb1oDsuJp6bjK628uwQu0Lhuch6uYsWVvYKMlSLsoxHqwAq4Kqtmkq0nYmZqU2MSD4N6EoT0++a2lABnV0Ffa350Byc1HNPtD6ginIooDJvGPFe6HVeOYPG3lGu73MZhWDGZC31coPqKoq6cz7FMBHvNdwhow+12Cyp2izDJOYsT/rqZmaWqOkMcSAjPnyDgMWXBhWeI4Z0ofGgDQ2qnC8vtnjER/9eSa041qRoo6oGbJ+lZKUpFnWEZSjZ1Hvy6RthGGV4F/WKmkqejOE+MWfzElVUNvnLvkjmO3G0aIUZSDD/orGIwOWAemgY0B2DGSGMJwe5GFoloJmOuqWPsoQ1BOZ4IbOqeq/egEiSqWZM4/MGdB9b7I19F4W6mFVG0LXMyAdSxmQt4HKGcJICKqzqNSpxR/KqsxgzL6Z9eCuBHqmni1uQHRoNl0JA7I2phky26Oigcj4aSSLtwKkIuBXNR4jma2aP6uj0oPAMyXLgLxhMiDEjxbcmiFwKrg4M2BSYrVojCpwubZozjyy94J/c7Ei7UUDZpWXGhBCGlCAe5qL9pOYMwkzpEHHDJkNomok6qWbzib433hU6VEkMssEmc/K016myDIg+H/i6UnwV/y36NsyRGUFE6AzNqFpMDoHKsGotKn7zKQ6bS4aEN0CKPiUZOmvEz/JFHJmyDSdeg2oIsti5kC99kqS9Q9Hzuvpt+NNhAAAAABJRU5ErkJggg=="
    return { options, showShare, goods,showPayCode,qrSrc,onSelect,showSwipe };
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
    height: calc(100% - 90px);
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
    width: 200px;
    height: 200px;
    background-color: #fff;
    line-height: 200px;
    img{
      width: 100%;
      // height: 100%;
    }
  }
</style>