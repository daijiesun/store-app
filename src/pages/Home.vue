<!--  -->
<template>
  <div @click="change">hhhh</div>
</template>

<script lang='ts'>
import { computed, reactive, ref, toRefs, watchEffect } from 'vue'
import { Options, Vue } from 'vue-class-component';
export default {
  name: '',
  setup() {
    let d:any = reactive([])

    const getList = (value: any) => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(value)
          resolve([])
        }, 1000)
      })
    }

    const list = computed(() => {
      return [{
        name: 1,
        data: async ()=> await getList(d.value)
      }]
    })
    watchEffect(()=>{
       console.log(list.value)
    })
    const change = () => {
      d.value=[new Date()]
    }
    return {
      list,
      d,
      change
    }

  }
};
</script>
<style lang='less' scoped>
</style>