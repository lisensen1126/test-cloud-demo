import Vue from 'vue';
import { getCurrentWorkspaceId } from '@/common/js/utils';

class Dictionary {
    constructor() {
        this.dictionary = {
            memberOptions: [], // 创建人、负责人等成员列表
        };
    }

    getmemberList() {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            if (this.dictionary.memberOptions.length) resolve(this.dictionary.memberOptions);
            Vue.prototype.$post(
                '/user/ws/member/tester/list',
                { workspaceId: getCurrentWorkspaceId() },
                response => {
                    const result = response.data.map(item => {
                        item.label = `${item.id}(${item.name})`;
                        return item;
                    });
                    this.dictionary.memberOptions = result;
                    resolve(result);
                }
            );
        });
    }
}

export default new Dictionary();
