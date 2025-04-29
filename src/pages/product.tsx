import { useGlobalProvider } from '@/constants/provider'
import React, { useEffect } from 'react'
import ProductDesktop from './desktop/product_details';
import ProductMobile from './mobile/product_details';
import { useParams } from 'react-router';
import "./css/product.css";

const ProductPage : React.FC = () : React.JSX.Element => {

  const { id } = useParams();
  console.log(id)
  const { display } = useGlobalProvider();
  useEffect(() => {document.documentElement.scrollTo({top: 0, behavior: "instant"})},[])
  return display.mobile ? (<ProductMobile id={id} />) : (<ProductDesktop id={id} />);
}

export default ProductPage