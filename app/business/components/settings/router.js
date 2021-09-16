// const requireContext = require.context('@/business/components/xpack/', true, /router\.js$/);

export default {
    path: '/setting',
    name: 'Setting',
    component: () => import('./Setting'),
};
