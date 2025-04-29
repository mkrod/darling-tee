import ActivityIndicator from '@/components/activity_indicator';
import { appName, formatNumberWithCommas } from '@/constants';
import { Product, useGlobalProvider } from '@/constants/provider'
import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';
import DesktopProductCard from '@/components/desktop_product_card';
import usePagination from '@/constants/usePagination';
import { IoMdShareAlt } from 'react-icons/io';
import stringSimilarity from "string-similarity";
import ReviewComponent from '@/components/reviews';
import Discussion from '@/components/discussion';

const ProductDesktop : React.FC<{id:  string | undefined}> = ({ id }) : React.JSX.Element => {
    const { products, setNote } = useGlobalProvider();
    const [product, setProduct] = useState<Product | undefined>();
    const [rating, setRating] = useState<number | undefined>();
    const [ImageShowing, setImageShowing] = useState(0);
    const [loadingImage, setLoadingImage] = useState<boolean>(true);
    useEffect(() => {
        if(!products || !id) return;
        const thisProduct = products.find((item: Product) => item.id === id);
        setProduct(thisProduct);
    }, [products, id]);
    useEffect(() => {
        if((!product || !product.ratings) || rating) return;
        const ra : number = product.ratings.average;
        setRating(ra);
    }, [product]);

    useEffect(() => {
        let lightbox: PhotoSwipeLightbox | null = new PhotoSwipeLightbox({
          gallery: '#product-gallery',
          children: 'a',
          pswpModule: () => import('photoswipe'),
        });
        lightbox.init();
    
        return () => {
          if (lightbox) {
            lightbox.destroy();
          }
          lightbox = null;
        };
      }, []);
      const [showingFullDescription, setShowingFullDescription] = useState<boolean>(false);


      const [similarCategory, setSimilarCategory] = useState<Product[] | undefined>()
      const { nextFp, prevFp, canNextFp, canPrevFp, startEnd} = usePagination({perView: 4, data: similarCategory || []});
      useEffect(() => {
        if(!product || !products) return;
        const category = product.category;
        const same = products.filter((prod: Product) => prod.category === category || stringSimilarity.compareTwoStrings(prod.sku, product.sku) >= 0.7);
        setSimilarCategory(same);
      }, [products, product]);



      const [activeTab, setActiveTab] = useState<"reviews" | "discussion">("reviews");

  return (
    <div className='desktop_view_product_container'>
        <div className="desktop_view_product_first_section">
            <div className="desktop_view_product_first_section_left">
                <div id='product-gallery' className="desktop_view_product_first_section_left_image_container">
                    {product?.gallery?.length && product.gallery.map((item: { id?: string; url: string }, index: number) => (

                            <a 
                            href={item.url}
                            key={index} 
                            className={`desktop_view_product_first_section_left_image ${ImageShowing === index && "active_image"}`} 
                            data-pswp-width={450}
                            data-pswp-height={450}
                            >
                                <img
                                    onLoad={() => setLoadingImage(false)} 
                                    src={item.url} 
                                alt="" />
                            </a>

                    ))}
                    {loadingImage && <div className='desktop_view_product_first_section_left_image_is_loading'>
                        <ActivityIndicator size='medium' />
                    </div>}
                </div>
                <div className="desktop_view_product_first_section_left_image_gallery_container">
                    {product?.gallery?.length && product.gallery.map((item: { id?: string; url: string }, index: number) => (
                        <div key={index} onClick={() => setImageShowing(index)} className={`desktop_view_product_first_section_left_image_gallery_item_container ${ImageShowing === index && "active_border"}`}>
                              <img src={item.url} className='desktop_view_product_first_section_left_image_gallery_item' />
                        </div>
                    ))}
                </div>
            </div>
            <div className="desktop_view_product_first_section_right">
                <h2 className="desktop_view_product_first_section_right_title">{product?.title}</h2>
                <div className="desktop_view_product_first_section_right_rating_container">
                    <Rating fillColor='var(--accent)' readonly transition size={15} allowFraction initialValue={rating} />
                    <span className='desktop_view_product_first_section_right_rating_number'>({ rating })</span>
                </div>
                <div className="desktop_view_product_first_section_right_description_container">
                    {product?.description && product?.description?.length > 200 ? (
                        <span className='desktop_view_product_first_section_right_description'>
                            {product?.description.slice(0, 200)}
                            {showingFullDescription ? <strong onClick={() => setShowingFullDescription(false)}>...less</strong> : <strong onClick={() => setShowingFullDescription(true)}>...more</strong>}
                        </span>
                        
                    ) : (
                    <span className='desktop_view_product_first_section_right_description'>
                        {product?.description}
                    </span>
                    )}
                </div>
                <div className="desktop_view_product_first_section_right_price_container">
                    <h4 className='desktop_view_product_first_section_right_price'>{product?.price.currency + " " + formatNumberWithCommas(product?.price.current || 0)}</h4>
                    <span className='desktop_view_product_first_section_right_old_price'>{product?.price.currency + " " + formatNumberWithCommas(product?.price.prev || 0)}</span>
                </div>
                <div className='desktop_view_product_first_section_right_hr'/> 
                <div className='desktop_view_product_first_section_right_brand_etc'>
                    <div className="desktop_view_product_first_section_right_brand_etc_left">
                        <span className='desktop_view_product_first_section_right_brand_etc_label'>Brand</span>
                        <span className='desktop_view_product_first_section_right_brand_etc_label'>Color</span>
                        <span className='desktop_view_product_first_section_right_brand_etc_label'>Category</span>
                    </div>
                    <div className="desktop_view_product_first_section_right_brand_etc_right">
                        <span className='desktop_view_product_first_section_right_brand_etc_value'>Generic</span>
                        <span className='desktop_view_product_first_section_right_brand_etc_value'>Space grey</span>
                        <span className='desktop_view_product_first_section_right_brand_etc_value'>Phones</span>
                    </div>              
                </div>
                <div className="desktop_view_product_first_section_right_buy_cart_container">
                    <button className="desktop_view_product_first_section_right_cart">Add to cart</button>
                    <button className="desktop_view_product_first_section_right_buy">Buy now</button>
                    <button className="desktop_view_product_first_section_right_share" onClick={() => {
                        
                        navigator.share({
                            title: "Check out this product from " + appName,
                            text: product?.title,
                            url: window.location.href,
                        })
                        .then(() => {
                            setNote({type: "success", title: "Shared"})
                            setTimeout(() => setNote(undefined), 2000);
                        })
                        .catch(() => {
                            setNote({type: "success", title: "Share Failed"})
                            setTimeout(() => setNote(undefined), 2000);
                    })
                    }}><IoMdShareAlt size={20} /></button>
                </div>
            </div>
        </div>

        <div className='desktop_view_product_first_section_right_hr'/> 

        {/* Review Tab Here*/}
        <div className="desktop_view_product_review_section_container">
            <div className="desktop_view_product_review_section_header_tab_container">
                <h4 onClick={() => setActiveTab("reviews")} style={{color: activeTab === "reviews" ? "var(--accent)":"var(--color)", cursor: "pointer"}} className="desktop_view_product_review_section_header_tab">Reviews</h4>
                <h4 onClick={() => setActiveTab("discussion")} style={{color: activeTab === "discussion" ? "var(--accent)":"var(--color)", cursor: "pointer"}} className="desktop_view_product_review_section_header_tab">Discussion</h4>
            </div>
            <div className="desktop_view_product_review_section_content_container">
                <div className="desktop_view_product_review_section_content_left_container">
                    {/*conditional  Rendering of the components */}
                    {activeTab === "reviews" && product && product.reviews?.length && (
                        <ReviewComponent data={product.reviews} />
                    )}
                    {activeTab === "reviews" && product && !product.reviews && (
                        <div>
                            No Review at this Time
                        </div>
                    )}
                    {activeTab === "discussion" && (
                        <Discussion />
                    )}
                </div>
                <div className='desktop_view_product_review_section_content_right_container'>

                </div>
            </div>
        </div>

        <div className='desktop_view_product_first_section_right_hr'/> 

        {similarCategory && similarCategory.length > 0 && <div className="desktop_view_similar_products_section_container">
            <div className="desktop_view_similar_products_header_container">
                <div className="desktop_view_similar_products_header_left">
                    <h3 className='desktop_view_similar_products_header_label'>Similar product</h3>
                    <MdOutlineProductionQuantityLimits size={20} />
                </div>
                <div className="desktop_view_similar_products_header_right">
                    <button disabled={!canPrevFp} onClick={prevFp} className="desktop_view_similar_products_header_right_button_prev"><FaCaretLeft /></button>
                    <button disabled={!canNextFp} onClick={nextFp} className="desktop_view_similar_products_header_right_button_next"><FaCaretRight /></button>
                </div>
            </div>


            <div className="desktop_view_similar_products_container">
                {similarCategory.slice(startEnd.start, startEnd.end).map((item: Product, index: number) => (
                    <DesktopProductCard key={index} data={item}/>
                ))}
            </div>
        </div>}
    </div>
  )
}

export default ProductDesktop