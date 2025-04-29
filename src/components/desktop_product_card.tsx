import { Product } from '@/constants/provider'
import React, { useState } from 'react'
import "./css/desktop_product_card.css"
import ActivityIndicator from './activity_indicator'
import { IoLocationSharp } from 'react-icons/io5'
import { returnUrl, formatNumberWithCommas } from '@/constants'
import { useNavigate } from 'react-router'

const DesktopProductCard : React.FC<{data: Product}> = ({ data }) : React.JSX.Element => {


    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const title : string = data.title.length > 35 ? data.title.slice(0, 35) + "..." : data.title;
    const difference = data.price.prev ? (data.price.prev - data.price.current): null;
    let discount : number | undefined; 
    if(difference){
      discount = difference < 0 ? undefined : Math.round((difference / data.price.prev) * 100);
    }


  return (
    <div 
    onClick={() => navigate(returnUrl({goto: "/product", params: {id: data.id}}))} 
    className='desktop_product_card_container'>
        <div className="desktop_product_card_image_container">
            <img onLoad={() => setIsLoading(false)} src={data.gallery ? data.gallery[0].url : ""} alt={`${data.sku || ""} image`} className='desktop_product_card_image' />
            {isLoading && <div className='desktop_product_card_image_is_loading_container'>
                <ActivityIndicator size='medium' />
            </div>}
        </div>
        <div className="desktop_product_card_metadata_container">
            <div className="desktop_product_card_metadata_title_container">
                <span className='desktop_product_card_metadata_title'>{title}</span>
            </div>
            <div className="desktop_product_card_price_container">
                <span className='desktop_product_card_current_price'>{data.price.currency + " " + formatNumberWithCommas(data.price.current)}</span>
                {data.price.prev && <span className='desktop_product_card_prev_price'>{data.price.currency + " " + formatNumberWithCommas(data.price.prev)}</span>}
            </div>
            <div className="desktop_product_card_ratings_container">

            </div>
            <div className="desktop_product_card_location_container">
                <IoLocationSharp color='var(--accent)' />
                <span className='desktop_product_card_location'>Ikeja</span>
            </div>
        </div>

        {(discount || data.discount?.percentage) && <div className='desktop_product_card_discount_container'>
        - {discount || data.discount?.percentage}%
      </div>}
    </div>
  )
}

export default DesktopProductCard