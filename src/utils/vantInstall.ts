
import { App } from '@vue/runtime-core';
import { List } from 'vant';
import { Search } from 'vant';
const installList = [List, Search]
export default {
    install(app: App) {
        installList.forEach(c => {
            app.use(c)
        })
    }
}