import Vue from 'vue'
import Router from 'vue-router'

//登录页
import login from '@/view/login/login.vue'

//公共页
import Layout from '@/view/layout/Layout.vue'

//首页
import HomePage from '@/view/home/home.vue'

//个人中心
import memberIndex from '@/view/member/index.vue'

//404页面
import error404 from '@/view/404.vue'

//商品列表 新增(编辑)
import goodsList from '@/view/goods/index.vue'
import goodsUpdate from '@/view/goods/update.vue'

//商品分类
import categoryList from '@/view/category/index.vue'
import categoryUpdate from '@/view/category/update.vue'

//品牌
import brandList from '@/view/brands/index.vue'
import brandUpdate from '@/view/brands/update.vue'

//商品规格
import formatList from '@/view/format/index.vue'
import formatDetail from '@/view/format/detail.vue'

//商品类型
import protypeList from '@/view/protype/index.vue'
import protypeDetail from '@/view/protype/detail.vue'

//订单
import orderList from '@/view/order/index.vue'
import orderInfo from '@/view/order/detail.vue'
import orderSetting from '@/view/order/setting.vue'

//用户
import usersList from '@/view/user/index.vue'
import userDetail from '@/view/user/detail.vue'
import usersRecharge from '@/view/user/recharge.vue'

//广告
import adList from '@/view/ad/index.vue'
import adDetail from '@/view/ad/detail.vue'
import adTypeList from '@/view/adtype/index.vue'

//营销-积分夺宝
import marketStoreList from '@/view/market/store/index.vue'
import marketStoreType from '@/view/market/store/types.vue'
//营销-限时免费抢购
import marketPanicList from '@/view/market/panic/index.vue'
import marketPanicInfo from '@/view/market/panic/detail.vue'
//营销-幸福晒图区
import marketBluePrintList from '@/view/market/blueprint/index.vue'
import marketBluePrintInfo from '@/view/market/blueprint/detail.vue'




const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
        {
            path: '/',
            redirect: '/login',
            hidden: true
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            hidden: true
        },
        {
            path: '/404',
            name: 'error404',
            component: error404,
            hidden: true
        },
        {
            path: '/home',
            component: Layout,
            redirect: '/home',
            children: [{
                path: '/home',
                name: 'HomePage',
                component: HomePage,
                meta: { title: '首页', icon: 'home' }
            }]
        },
        {
            path: '/member',
            component: Layout,
            hidden: true,
            redirect: '/member',
            children: [{
                path: '/member',
                name: 'memberIndex',
                hidden: true,
                component: memberIndex,
                meta: { title: '个人中心', icon: 'home' }
            }]
        },
        {
            path: '/pms',
            component: Layout,
            name: 'pms',
            meta: { title: '商品管理', icon: 'product' },
            redirect: '/pms/product',
            children: [
                {
                    path: 'product',
                    name: 'goodsList',
                    meta: { title: '商品列表', icon: 'product-list' },
                    component: goodsList,
                },
                {
                    path: 'product/add',
                    name: 'goodsUpdate',
                    meta: { title: '添加商品', icon: 'product-add' },
                    component: goodsUpdate,
                },
                {
                    path: 'proattr',
                    name: 'categoryList',
                    meta: { title: '商品分类', icon: 'product-cate' },
                    component: categoryList,
                },
                {
                    path: 'proattr/update',
                    name: 'categoryUpdate',
                    hidden: true,
                    meta: { title: '添加/编辑商品分类' },
                    component: categoryUpdate,
                },
                {
                    path: 'brand',
                    name: 'brandList',
                    meta: { title: '商品品牌', icon: 'product-brand' },
                    component: brandList,
                },
                {
                    path: 'brand/update',
                    name: 'brandUpdate',
                    meta: { title: '新增/编辑品牌' },
                    hidden: true,
                    component: brandUpdate,

                },
                {
                    path: 'format',
                    name: 'formatList',
                    meta: { title: '商品规格', icon: 'product-format' },
                    component: formatList,
                },
                {
                    path: 'format/update',
                    name: 'formatDetail',
                    meta: { title: '新增/编辑规格' },
                    hidden: true,
                    component: formatDetail,

                },
                {
                    path: 'protype',
                    name: 'protypeList',
                    component: protypeList,
                    meta: { title: '商品类型', icon: 'product-attr' }
                },
                {
                    path: 'protype/update',
                    name: 'protypeDetail',
                    hidden: true,
                    component: protypeDetail,
                    meta: { title: '新增/编辑类型' }
                },
            ]
        },
        {
            path: '/oms',
            component: Layout,
            redirect: '/oms/index',
            name: 'oms',
            meta: { title: '订单管理', icon: 'order' },
            children: [
                {
                    path: 'index',
                    name: 'orderList',
                    meta: { title: '订单列表', icon: 'product-list' },
                    component: orderList
                },
                {
                    path: 'index/detail',
                    name: 'orderInfo',
                    meta: { title: '订单详情' },
                    hidden: true,
                    component: orderInfo
                },
                {
                    path: 'setting',
                    name: 'orderSetting',
                    meta: { title: '订单设置', icon: 'order-setting' },
                    component: orderSetting

                }
            ]
        },
        {
            path: '/ums',
            component: Layout,
            redirect: '/ums/index',
            name: 'ums',
            meta: { title: '用户管理', icon: 'user' },
            children: [
                {
                    path: 'index',
                    name: 'usersList',
                    meta: { title: '用户列表', icon: 'product-list' },
                    component: usersList
                },
                {
                    path: 'recharge',
                    name: 'usersRecharge',
                    meta: { title: '充值记录', icon: 'user-recharge' },
                    component: usersRecharge
                },
                {
                    path: 'index/detail',
                    name: 'userDetail',
                    meta: { title: '用户详情' },
                    hidden: true,
                    component: userDetail
                }
            ]
        },
        {
            path: '/sms',
            name: 'sms',
            component: Layout,
            meta: { title: '活动管理', icon: 'sms' },
            redirect: '/sms/store/index',
            children: [
                {
                    path: 'store/index',
                    name: 'marketStoreList',
                    meta: { title: '积分夺宝列表', icon: 'market-store' },
                    component: marketStoreList,
                },
                {
                    path: 'store/types',
                    name: 'marketStoreType',
                    meta: { title: '积分夺宝分类', icon: 'product-cate' },
                    component: marketStoreType
                },
                {
                    path: 'panic/index',
                    name: 'marketPanicList',
                    meta: { title: '限时免费抢购', icon: 'market-panic' },
                    component: marketPanicList
                },
                {
                    path: 'store/info',
                    name: 'marketPanicInfo',
                    meta: { title: '限时免费抢购详情' },
                    hidden: true,
                    component: marketPanicInfo
                },
                {
                    path: 'ad/type/index',
                    name: 'adTypeList',
                    meta: { title: '广告位列表', icon: 'product-list' },
                    component: adTypeList
                },
                {
                    path: 'ad/index',
                    name: 'adList',
                    meta: { title: '广告列表', icon: 'product-list' },
                    component: adList
                },

                {
                    path: 'ad/index/detail',
                    name: 'adDetail',
                    meta: { title: '广告详情' },
                    hidden: true,
                    component: adDetail
                },
                {
                    path: 'markblue/index',
                    name: 'marketBluePrintList',
                    meta: { title: '幸福晒图区', icon: 'arketBlue' },
                    component: marketBluePrintList
                },
                {
                    path: 'markblue/index/info',
                    name: 'marketBluePrintInfo',
                    meta: { title: '幸福晒图区详情' },
                    hidden: true,
                    component: marketBluePrintInfo
                }
            ]
        },
        { path: '*', redirect: '/404', hidden: true }
    ]

})

router.beforeEach((to, from, next) => {  //注册一个全局前置守卫
    if (to.matched.some(m => m.meta.auth)) {// 判断是否需要校验
        if (store.state.isLogin) {// 获取
            next();// 校验通过，正常跳转到你设置好的页面
        } else {
            next({// 校验失败，跳转至登录界面
                path: '/login',
                query: {
                    redirect: to.fullPath
                }// 将跳转的路由path作为参数，用于在登录成功后获取并跳转到该路径
            });
        }
    } else {
        next();// 不需要校验，直接跳转
    }
})

/* 动态注册路由文件 */
const routerContext = require.context('@/router/modules', true, /\.js$/)
routerContext.keys().forEach(modules => {
    router.addRoutes(routerContext(modules).default)
})

Vue.use(Router)

export default router