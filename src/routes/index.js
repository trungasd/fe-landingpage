// routes.js
import { AdminLayout, DefaultLayout } from "~/components/Layouts";
import Home from "~/pages/Home";
import ProductManager from "~/components/Layouts/AdminLayout/ProductManager";
import HomeManager from "~/components/Layouts/AdminLayout/HomeManager";
import NewsManager from "~/components/Layouts/AdminLayout/NewsManager";
import Login from "~/components/Layouts/LoginLayout/Login";
import EventManager from "~/components/Layouts/AdminLayout/EventManager";

const publicRoutes = [
    { path: '/', component: Home, layout: DefaultLayout },
    { path: '/login', component: Login },
];

const privateRoutes = [
    { path: '/admin', component: HomeManager, layout: AdminLayout },
    { path: '/admin/product-manager', component: ProductManager, layout: AdminLayout },
    { path: '/admin/news-manager', component: NewsManager, layout: AdminLayout },
    { path: '/admin/event-manager', component: EventManager, layout: AdminLayout }
];

export { publicRoutes, privateRoutes };
