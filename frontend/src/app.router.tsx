import { createBrowserRouter } from 'react-router';
import { ShopLayout } from "./shop/layouts/ShopLayout";
import { HomePage } from "./shop/pages/home/HomePage";
import { ProductPage } from './shop/pages/product/ProductPage';
import { OptimizePage } from './shop/pages/optimize/OptimizePage';

export const appRouter = createBrowserRouter([

    //main routes
    {
        path: '/',
        element: <ShopLayout />,
        children:[
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'product/:barcode',
                element: <ProductPage />
            },
            {
                path: 'optimize',
                element: <OptimizePage />
            }
        ],
    },
])