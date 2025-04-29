import React from 'react'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router';
import RootLayout from '@/layouts/rootLayout';
import TabsLayout from '@/layouts/tabsLayout';
import HomePage from '@/pages/home';
import Explore from '@/pages/explore';
import Saved from '@/pages/saved';
import Me from '@/pages/me';
import Cart from '@/pages/cart';
import Checkout from '@/pages/checkout';
import { GlobalProvider } from './constants/provider';
import ProductPage from './pages/product';

const App : React.FC = () : React.JSX.Element => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<RootLayout />}>
        <Route path='/' element={<TabsLayout />}>
          <Route index element={<HomePage />}/>
          <Route path='explore' element={<Explore />}/>
          <Route path='saved' element={<Saved />}/>
          <Route path='profile' element={<Me />}/>
          <Route path='product/:id/*' element={<ProductPage />} /> 
        </Route>
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />


      </Route>
    )
  )

  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  )
}

export default App;