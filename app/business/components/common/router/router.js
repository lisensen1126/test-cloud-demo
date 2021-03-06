import Vue from 'vue';
import VueRouter from 'vue-router';
// import RouterSidebar from './RouterSidebar.vue';
// import Setting from '@/business/components/settings/router';
import API from '@/business/components/api/router';
import Admin from '@/business/components/admin/router';
import Performance from '@/business/components/performance/router';
import Track from '@/business/components/track/router';

// const requireContext = require.context('@/business/components/xpack/', true, /router\.js$/);
// const Report = requireContext.keys().map(key => requireContext(key).report);
// const ReportObj =
//     Report && Report != null && Report.length > 0 && Report[0] != undefined
//         ? Report
//         : [{ path: '/sidebar' }];

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        { path: '/', redirect: '/track/home' },
        Admin,
        // Setting,
        API,
        Performance,
        Track,
        // ...ReportObj,
    ],
});

router.beforeEach((to, from, next) => {
    redirectLoginPath(to.fullPath);

    //解决localStorage清空，cookie没失效导致的卡死问题
    if (!localStorage.getItem('Admin-Token')) {
        // axios.get("/signout");
        // console.log("signout");
        localStorage.setItem('Admin-Token', '{}');
        // const { href } = window.location;
        // window.location.href = `/signin?redirect=${encodeURIComponent(href)}`;
        next();
    } else {
        next();
    }
});

//重复点击导航路由报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error);
};

// 登入后跳转至原路径
function redirectLoginPath(originPath) {
    let redirectUrl = sessionStorage.getItem('redirectUrl');
    let loginSuccess = sessionStorage.getItem('loginSuccess');
    sessionStorage.setItem('redirectUrl', originPath);
    if (redirectUrl && loginSuccess) {
        sessionStorage.removeItem('loginSuccess');
        router.push(redirectUrl);
    }
    sessionStorage.removeItem('loginSuccess');
}

export default router;
