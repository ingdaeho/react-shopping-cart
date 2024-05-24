/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as OrderListIndexImport } from './routes/orderList/index'
import { Route as CartIndexImport } from './routes/cart/index'
import { Route as OrderOrderIdImport } from './routes/order/$orderId'
import { Route as ProductsProductIdIndexImport } from './routes/products/$productId/index'
import { Route as OrderListOrderIdIndexImport } from './routes/orderList/$orderId/index'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const OrderListIndexRoute = OrderListIndexImport.update({
  path: '/orderList/',
  getParentRoute: () => rootRoute,
} as any)

const CartIndexRoute = CartIndexImport.update({
  path: '/cart/',
  getParentRoute: () => rootRoute,
} as any)

const OrderOrderIdRoute = OrderOrderIdImport.update({
  path: '/order/$orderId',
  getParentRoute: () => rootRoute,
} as any)

const ProductsProductIdIndexRoute = ProductsProductIdIndexImport.update({
  path: '/products/$productId/',
  getParentRoute: () => rootRoute,
} as any)

const OrderListOrderIdIndexRoute = OrderListOrderIdIndexImport.update({
  path: '/orderList/$orderId/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/order/$orderId': {
      preLoaderRoute: typeof OrderOrderIdImport
      parentRoute: typeof rootRoute
    }
    '/cart/': {
      preLoaderRoute: typeof CartIndexImport
      parentRoute: typeof rootRoute
    }
    '/orderList/': {
      preLoaderRoute: typeof OrderListIndexImport
      parentRoute: typeof rootRoute
    }
    '/orderList/$orderId/': {
      preLoaderRoute: typeof OrderListOrderIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/products/$productId/': {
      preLoaderRoute: typeof ProductsProductIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  OrderOrderIdRoute,
  CartIndexRoute,
  OrderListIndexRoute,
  OrderListOrderIdIndexRoute,
  ProductsProductIdIndexRoute,
])

/* prettier-ignore-end */
