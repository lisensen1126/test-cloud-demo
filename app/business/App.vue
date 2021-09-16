<template>
    <el-col v-if="auth">
        <div data-frontend-module-container="coding-frontend-test-cloud">
            <button @click="changeName">点击修改时间</button>
            <div>{{ $store.state.parent.TAG }}</div>
            <br />
            <br />
            <ms-view v-if="isReady" />
        </div>
    </el-col>
</template>

<script>
import MsView from './components/common/router/View';
import { hasLicense, setColor, setDefaultTheme, saveLocalStorage } from '@/common/js/utils';
import { registerRequestHeaders } from '@/common/js/ajax';
import { ORIGIN_COLOR } from '@/common/js/constants';
import { Loading } from 'element-ui';
import tagReducer from '../redux/reducers';
export default {
    name: 'app',
    props: {},
    data() {
        return {
            licenseHeader: null,
            auth: false,
            header: {},
            logoId: '_blank',
            color: '',
            timer: null,
            isReady: false,
        };
    },
    methods: {
        changeName() {
            console.log('更新时间', this);

            window.store.dispatch({
                type: 'ADDNAME',
            });
        },
    },
    mounted() {
        window.store.subscribe(() => {
            const store = window.microHook.store || window.reduxStore;
            console.log('store数据变化了', store.getState().TAG);
            this.$store.commit('updateStore', store.getState());
            console.log('同步过后的vuex的TAG', this.$store.state);
        });
    },
    created() {
        registerRequestHeaders();
        window.microHook.injectAsyncReducer('TAG', tagReducer);
        let loadingInstance = Loading.service({ fullscreen: true });
        const projectId = localStorage.getItem('project_id');
        if (location.pathname.split('/')[2] === localStorage.getItem('project_name')) {
            // console.log('项目名称一致');

            // 项目名称一致
            this.$get(`/api/metersphere/user/switch/project/${projectId}`)
                .then(res => {
                    this.isReady = true;
                    this.$store.commit('setProjectId', projectId);
                    localStorage.setItem('store', JSON.stringify(this.$store.state));
                    localStorage.setItem('workspace_id', res.data.data.lastWorkspaceId);
                })
                .finally(() => {
                    this.$nextTick(() => {
                        // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                    });
                });
        } else {
            this.timer = setInterval(() => {
                // console.log('项目名称不一致,等待一致');
                if (location.pathname.split('/')[2] === localStorage.getItem('project_name')) {
                    clearInterval(this.timer);
                    this.timer = null;
                    // console.log('项目名称轮训过后一致');

                    // 项目名称一致
                    const projectId = localStorage.getItem('project_id');
                    this.$get(`/api/metersphere/user/switch/project/${projectId}`)
                        .then(res => {
                            this.isReady = true;
                            this.$store.commit('setProjectId', projectId);
                            localStorage.setItem('store', JSON.stringify(this.$store.state));
                            localStorage.setItem('workspace_id', res.data.data.lastWorkspaceId);
                        })
                        .finally(() => {
                            this.$nextTick(() => {
                                // 以服务的方式调用的 Loading 需要异步关闭
                                loadingInstance.close();
                            });
                        });
                }
            }, 300);
        }

        if (!hasLicense()) {
            setDefaultTheme();
            this.color = ORIGIN_COLOR;
        } else {
            //
            this.$get('/system/theme', res => {
                this.color = res.data ? res.data : ORIGIN_COLOR;
                setColor(this.color, this.color, this.color, this.color, this.color);
                this.$store.commit('setTheme', res.data);
            });
        }
        if (localStorage.getItem('store')) {
            this.$store.replaceState(
                Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem('store')))
            );
            this.$get('/project/listAll', response => {
                let projectIds = response.data;
                if (projectIds && projectIds.length <= 0) {
                    this.$store.commit('setProjectId', undefined);
                }
            });
        }
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('store', JSON.stringify(this.$store.state));
        });
    },
    beforeCreate() {
        this.$store.commit('setProjectId', localStorage.getItem('project_id'));
        this.$get('/api/metersphere/currentUser')
            .then(response => {
                if (response.data.success) {
                    saveLocalStorage(response.data);
                    this.auth = true;
                } else {
                    // const { href } = window.location;
                    // window.location.href = `/signin?redirect=${encodeURIComponent(href)}`;
                }
            })
            .catch(() => {
                // const { href } = window.location;
                // window.location.href = `/signin?redirect=${encodeURIComponent(href)}`;
            });
    },
    components: {
        MsView,
    },
};
</script>

<style scoped>
#header-top {
    width: 100%;
    padding: 0 10px;
    background-color: var(--color);
    color: rgb(245, 245, 245);
    font-size: 14px;
    height: 40px;
}

.logo {
    width: 156px;
    margin-bottom: 0;
    border: 0;
    margin-right: 20px;
    display: inline-block;
    /* line-height: 37px; */
    background-size: 156px 30px;
    box-sizing: border-box;
    /* height: 37px; */
    background-repeat: no-repeat;
    background-position: 50% center;
}

.menus > * {
    color: inherit;
    padding: 0;
    max-width: 180px;
    white-space: pre;
    cursor: pointer;
    line-height: 40px;
}

.header-top-menus {
    display: inline-block;
    border: 0;
    position: absolute;
}

.menus > a {
    padding-right: 15px;
    text-decoration: none;
}

.align-right {
    float: right;
}

.license-head {
    height: 30px;
    background: #ba331b;
    text-align: center;
    line-height: 30px;
    color: white;
}
</style>
