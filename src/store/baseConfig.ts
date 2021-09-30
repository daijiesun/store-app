import { getBaseConfig } from "@/api/baseConfig";
import { BaseConfig } from '@/types/config';

export default {
  config: new BaseConfig(),
  init() {
    getBaseConfig().then(res => {
      if (res) {
        Object.assign(this.config, res)
      }
    })
  }
}