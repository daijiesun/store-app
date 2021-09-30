<!--  -->
<template>
  <div>
    <van-sticky>
      <van-notice-bar v-if="state.config.topTip" left-icon="volume-o" :text="state.config.topTip" />
      <van-search v-model="searchData.params.title" show-action placeholder="请输入搜索关键词" @search="onSearch">
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </van-sticky>
    <!-- <van-skeleton avatar :row="10" :loading="!state.list.length"> -->
    <van-list v-if="searchResult.data.length" v-model:loading="state.loading" :finished="state.finished" finished-text="没有更多了" @load="onLoad">
      <van-row gutter="12">
        <van-col span="12" v-for="(item,index) in searchResult.data" :key="index">
          <GoodsPanel :goods="item" @click="showInfo(item.id)"></GoodsPanel>
        </van-col>
      </van-row>
    </van-list>
    <van-empty v-else description="啥也没有～" />
    <!-- </van-skeleton> -->
  </div>
</template>

<script lang='ts'>
import { onMounted, reactive, toRefs } from "vue";
import GoodsPanel from "@/components/goods/goodsPanel";
import { Goods } from "@/types/goods";
import { getGoodsList } from "@/api/goods";
import { PageRequest, PageResponse } from "@/types/common";
import baseConfig from "@/store/baseConfig";
class SearchModel {
  title: string = "";
  isValid: boolean = true;
  type: string = "";
}
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
      loading: false,
      finished: false,
      config: baseConfig.config,
    });
    const searchData = reactive<PageRequest<SearchModel>>(
      new PageRequest<SearchModel>(new SearchModel())
    );
    const searchResult = reactive<PageResponse<Goods[]>>(
      new PageResponse<Goods[]>([])
    );
    const onLoad = async () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      const res = await getGoodsList(searchData);
      Object.assign(searchResult, res, {
        data: [...searchResult.data, ...res.data],
      });
      // 加载状态结束
      state.loading = false;
      searchData.page++;
      // 数据全部加载完成
      if (searchResult.data.length >= searchResult.total) {
        state.finished = true;
      }
    };

    const onSearch = () => {
      searchData.page = 1;
      searchResult.data = [];
      onLoad();
    };
    onMounted(() => {
      onSearch();
    });
    return {
      state,
      searchResult,
      searchData,
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