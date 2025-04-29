import SearchBox from '@/components/search_box'
import { searchProduct } from '@/constants'
import React, { useEffect, useState } from 'react'
import { Category, DesktopBannerProp, Product, useGlobalProvider } from '@/constants/provider';
import { useNavigate } from 'react-router';
import { useCurrentAddress } from '@/constants/use_address';
import { TbGpsFilled } from 'react-icons/tb';
import { FaRegListAlt } from 'react-icons/fa';
import EmptyProductState from '@/components/empty_product_state';
import MobileProductCard from '@/components/mobile_product_card';
import ActivityIndicator from '@/components/activity_indicator';
import DesktopBanner from '@/components/desktop_banner';
import useInfiniteScroll from '@/constants/useInfiniteScroll';


const MobileHomePage : React.FC = () : React.JSX.Element => {

  const { desktopBanner, display, categories, homeBanner, products } = useGlobalProvider(); 
  const navigate = useNavigate();
  const { current_address, address_loading, address_error } = useCurrentAddress();
  const [showingBanner, setShowingBanner] = useState<number>(0);
  useEffect(() => {
    if(!homeBanner) return;
    const interval = setInterval(() => {
      setShowingBanner(prev => (prev + 1) % homeBanner.length); // Loop through banners
    }, 3000); // Change banner every 3 seconds
  
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [homeBanner]);

  // pagination
  const [recentItems, setRecentItems] = useState<Product[] | undefined>();
  const totalRecentToShow = 200;

  useEffect(() => {
    if(!products || products.length === 0) return;
    setRecentItems(products.slice(0, totalRecentToShow));
  }, [products]);

  const { maxLength, addingMore, ended } = useInfiniteScroll({
    data: recentItems || [],
    perPage: 20,
    sH: window.innerHeight,
    sP: window.scrollY,
    cH: document.documentElement.scrollHeight,
    eventElement: window,
  })
  /*
  useEffect(() => {
    const handleScroll = () => {
      // Handle scroll event here
      const screenHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      const containerHeight = document.documentElement.scrollHeight;

      if (scrollPosition + screenHeight >= containerHeight) {
        // Scroll is at the bottom
        if(maxLength >= totalRecentToShow){
          // no more item to show
          setIsRecentEnded(true);
          setIsAddingMoreRecent(false); // hide loader
        }else{
          function updatePage() {
            setPage((prev) => prev + 1); // increase page
            setIsAddingMoreRecent(false); // hide loader
          }
          // add more item to recent sliced
          setIsAddingMoreRecent(true); //show loader
          setTimeout(updatePage, 2000); //load more recent
          setIsRecentEnded(false); //optional cleanup.
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, products]);
*/










  return (
    <div className='home_container'>
      {display.mobile && <div className="home_top_search_container">
        <SearchBox onsearch={(term: string) => searchProduct(term)} />
      </div>
      }
      {display.mobile && (
        <div className="home_mobile_address_container">
          <TbGpsFilled size={25} color='green' />
          <span className='home_mobile_address'>
            {address_error && !current_address && "Location not Available..."}
            {address_loading && "Loading Address..."}
            {current_address && current_address.fullAddress}
          </span>
        </div>
      )}
      {display.mobile && categories && (
        <div className='home_mobile_categories_section_container'>
          <span className='home_mobile_categories_title'>Categories</span>
          <div className='home_mobile_categories_container'>
          {categories.map((item: Category, index: number) => (
            <div key={index} onClick={() => navigate(`/categories?i_=${new Date()}id=${item.id}`)} className="home_mobile_category">{item.name}</div> 
          ))}
          </div>
        </div>
      )}


      {display.mobile && desktopBanner && (
        <div className="home_mobile_banners_container">
          {desktopBanner.map((item: DesktopBannerProp, index: number) => (
            <div key={index} className={`home_mobile_banner_container ${showingBanner === index ? "home_mobile_banner_active" : ""}`}>
              <DesktopBanner variant="mobile" data={item} />
            </div>
          ))}
        </div>
      )}


      {display.mobile && (
        <div className="home_mobile_product_list_container">
          <div className="home_mobile_product_list_header">
            <div className="home_mobile_product_list_header_left">
              <span className='home_mobile_product_list_header_left_title'>Recently Added</span>
              <FaRegListAlt />
            </div>
            <div className="home_mobile_product_list_header_right"></div>
          </div>

          {products && products.length > 0 && (<div className="home_mobile_product_list">
            {recentItems && recentItems.slice(0, maxLength).map((item: Product, index: number) => (
              <MobileProductCard key={index} data={item} />
            ))}
          </div>)}

          {maxLength > 0 && ended && !addingMore && <span className='home_mobile_product_list_bottom_text'>No more Recent</span>}
          {addingMore && !ended && <div className='home_mobile_product_list_bottom_text'>
            <ActivityIndicator size='small' />
          </div>}
          {!products && (<div className='home_mobile_empty_product_state_container'>
            <EmptyProductState />
          </div>)}
        </div>
      )}
    </div>
  )
}

export default MobileHomePage