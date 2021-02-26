import { createRouter, createWebHistory } from 'vue-router'
import VCategories from "@/views/VCategories";
import Users from "@/components/user/Users";
import Profile from "@/components/user/Profile";
import VHome from "@/views/VHome";
import Register from "@/components/home/Register";
import Login from "@/components/home/Login";
import {store} from '../store'
import Logout from "@/components/home/Logout";
import NotAllowed from "@/components/home/NotAllowed";
import About from "@/components/home/About";
import Timeline from "@/components/timeline/Timeline";
import Purchases from "@/components/purchase/Purchases";
import Orders from "@/components/order/Orders";
import Favourite from "@/components/Favourite";

const routes_favourite = [
    {
        path: '/favourite',
        name: 'Favourite',
        component: Favourite
    }
];

const routes_timeline = [
    {
        path: '/timeline',
        name: 'Timeline',
        component: Timeline
    }
];

const routes_users = [
    {
        path: '/users/:username',
        name: 'Users',
        component: Users
    },
    {
        path: '/profile/:username',
        name: 'Profile',
        component: Profile,
        // eslint-disable-next-line no-unused-vars
        beforeEnter(to, from, next){
            if(store.state.user === null){
                // Не е најавен корисник
                next('/login');
            } else {
                // Најавен е корисник
                next();
            }
        }
    }
];
const routes_purchases = [
    {
        path: '/purchases',
        name: 'Purchases',
        component: Purchases
    },
    {
        path: '/orders',
        name: 'Orders',
        component: Orders
    },
];
const routes_home = [
    {
        path: '/not-allowed',
        name: 'NotAllowed',
        component: NotAllowed
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        // eslint-disable-next-line no-unused-vars
        beforeEnter(to, from, next){
            if(store.state.user === null){
                // Не е најавен корисник
                next();
            } else {
                // Најавен е корисник
                next('/');
            }
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        // eslint-disable-next-line no-unused-vars
        beforeEnter(to, from, next){
            if(store.state.user === null){
                // Не е најавен корисник
                next();
            } else {
                // Најавен е корисник
                next('/');
            }
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout,
        // eslint-disable-next-line no-unused-vars
        beforeEnter(to, from, next){
            if(store.state.user === null){
                // Не е најавен корисник
                next('/login');
            } else {
                // Најавен е корисник
                next();
            }
        }
    }
]
const routes = [
    {
        path: "/",
        name: 'VHome',
        component: VHome,
        // eslint-disable-next-line no-unused-vars
        beforeEnter(to, from, next){
            if(store.state.user === null)
                next();
            else if(store.state.user.role.role !== 'ROLE_ADMIN')
                next('/timeline');
            else next();
        }
    },
    {
        path: '/categories',
        name: 'VCategories',
        component: VCategories,
        // eslint-disable-next-line no-unused-vars
        beforeEnter(to, from, next){
            if(store.state.user === null)
                next('/login');
            else if(store.state.user.role.role !== 'ROLE_ADMIN')
                next('/not-allowed');
            else next();
        }
    }
]

routes_users.forEach(route => routes.push(route));
routes_home.forEach(route => routes.push(route));
routes_timeline.forEach(route => routes.push(route));
routes_purchases.forEach(route => routes.push(route));
routes_favourite.forEach(route => routes.push(route));

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router