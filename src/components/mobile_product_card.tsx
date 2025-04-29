import { Product } from '@/constants/provider'
import React, { useState } from 'react'
import "./css/mobile_product_card.css";
import ActivityIndicator from './activity_indicator';
import { FaLocationDot } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { returnUrl, formatNumberWithCommas } from '@/constants';

const MobileProductCard : React.FC<{data: Product}> = ({ data }) : React.JSX.Element => {
  const [isLoadingPic, setIsLoadingPic] = useState<boolean>(true);
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
    className='mobile_product_card_container'>
      <div className="mobile_product_card_image_container">
        {data.gallery && data.gallery.length > 0 && (
          <img onLoad={() => setIsLoadingPic(false)} src={data.gallery[0].url} alt={`${data.sku || ""} picture`} />
        )}
        {isLoadingPic && (
        <div className="mobile_product_card_is_loading">
          <ActivityIndicator size='small' />
        </div>)}
      </div>
      <div className="mobile_product_card_metadata_container">
        <div className="mobile_product_card_metadata_title_container">
          <span className="mobile_product_card_metadata_title">{title}</span> {/* slice 35 */}
        </div>
        <div className="mobile_product_card_metadata_price_container">
          <span className='mobile_product_card_metadata_price'>{data.price.currency + " " + formatNumberWithCommas(data.price.current)}</span>
          {data.price.prev && <span className='mobile_product_card_metadata_old_price'>{data.price.currency + " " + formatNumberWithCommas(data.price.prev)}</span>}
        </div>
        <div className="mobile_product_card_metadata_rating_container"></div>
        <div className="mobile_product_card_metadata_location">
          <FaLocationDot color='var(--accent)' />
          <span className="mobile_product_card_metadata_location_text">Ikeja</span>
        </div>
      </div>

      {(discount || data.discount?.percentage) && <div className='mobile_product_card_discount_container'>
        - {discount || data.discount?.percentage}%
      </div>}
    </div>
  )
}

export default MobileProductCard