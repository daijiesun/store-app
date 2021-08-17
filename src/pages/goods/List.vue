<!--  -->
<template>
  <div>
    <van-sticky>
      <van-notice-bar left-icon="volume-o" text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。" />
      <van-search v-model="state.searchValue" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>

    <!-- <van-skeleton avatar :row="10" :loading="!state.list.length"> -->
    <van-list v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
      <van-row gutter="12">
        <van-col span="12" v-for="(item,index) in state.list" :key="index">
          <GoodsPanel :goods="item" @click="showInfo(item.id)"></GoodsPanel>
        </van-col>
      </van-row>
    </van-list>
    <!-- </van-skeleton> -->

  </div>
</template>

<script lang='ts'>
import { reactive, toRefs } from "vue";
import GoodsPanel from "@/components/goods/goodsPanel";
import { Goods } from "@/model/goods";
export default {
  components: {
    GoodsPanel,
  },
  name: "List",
  methods: {
    showInfo(id: string) {
      this.$router.push({ path: "/goods/detail", query: { id } });
    },
  },
  setup() {
    const state = reactive<any>({
      list: [],
      loading: false,
      finished: false,
      searchValue: "",
    });

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          state.list.push({
            title: "大猫",
            description: "大猫大猫大猫大猫大猫大猫大猫大猫",
            amount: 999,
            id: 1,
          });
        }

        // 加载状态结束
        state.loading = false;

        // 数据全部加载完成
        if (state.list.length >= 40) {
          state.finished = true;
        }
      }, 1000);
    };
    const onSearch = () => {
      console.log(state.searchValue);
    };
    return {
      state,
      onLoad,
      onSearch,
    };
  },
};
</script>
<style lang='less' scoped>
.van-list {
  background-color: #f5f5f5;
  padding: 0 14px;
  .van-col {
    margin-top: 10px;
  }
}
</style>