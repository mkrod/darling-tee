import React, { createContext, useContext, useEffect, useState } from 'react'
import { ExtractDesktopBannerData, getCategories, getFeaturedPost, getHomeBanner, getProducts } from './dummyData';

interface Note {
    type: "error" | "success";
    title?: string;
    body?: string;
}
export interface Category {
    id: string,
    name: string,
    image?: string,
}

export interface HomeBanner {
    image: string;
    url?: string;
}

export interface Product {
    id: string; // product id
    title: string; // product title
    category?: {
        id: string; // id of the category
        name: string; // category name
    };
    gallery?: {
        id?: string; // id
        url: string; // the link or path
    }[];
    created_at: Date | string; // date added
    price: {
        currency: "USD" | "NGN",
        current: number; // current selling price
        prev: number; // if the price was previously different, aim to calculate discount, etc
    };
    stock: number; // number of units available
    availability: boolean; // whether the product is currently available for sale
    description?: string; // detailed product description
    ratings?: {
        average: number; // average rating score
        count: number; // number of ratings/reviews
    };
    reviews?: {
        id: string; 
        user: string; 
        created_at: string | Date; 
        review: string
    }[]; // list of reviews
    sku: string; // unique identifier for inventory tracking
    tags?: string[]; // list of product tags or keywords for searching/filtering
    dimensions?: {
        length: number; // in cm
        width: number; // in cm
        height: number; // in cm
    };
    weight?: number; // in kg
    discount?: {
        percentage: number; // discount percentage
        startDate: Date | string; // discount start date
        endDate: Date | string; // discount end date
    };
    isFeatured?: boolean;
    featured?: {
        main?: string;
        description?: string;
        gallery?: string[];
    };
    brand?: string; // brand name
    manufacturer?: string; // manufacturer name
}

export interface DesktopBannerProp {
    deal?: string;
    title: string;
    image?: string;
    id: string;
}

interface GlobalContext {
    note: Note | undefined;
    setNote: React.Dispatch<React.SetStateAction<Note | undefined>>;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    display: Display;
    categories: Category[] | undefined;
    homeBanner: HomeBanner[] | undefined;
    desktopBanner: DesktopBannerProp[] | undefined;
    products: Product[] | undefined;
    featuredPost: Product[] | undefined
}

interface Display {
    mobile: boolean;
    desktop: boolean;
}
const GlobalContext = createContext<GlobalContext | null>(null);




/* Component */
export const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const mobile : number = 767;
    const [note, setNote] = useState<Note | undefined>();   //for bullet popup
    const [loading, setLoading] = useState<boolean>(true); //for overlay loading
    const [display, setDisplay] = useState<Display>({       //for ui responsiveness
        mobile: window.innerWidth <= mobile, 
        desktop: window.innerWidth > mobile
    });

    useEffect(() => {
        const configDisplay = () : void => {
            if(window.innerWidth > mobile){
                setDisplay({mobile: false, desktop:  true});
            }else{
                setDisplay({mobile: true, desktop:  false});
            }
        }
        window.addEventListener("resize", configDisplay);
        setTimeout(() => setLoading(false), 2000);
        return () => window.removeEventListener("resize", configDisplay);
    }, []);

    ///////////// all products ////////
    const [products, setProducts] = useState<Product[] | undefined>();
    useEffect(() => {
        getProducts()
        .then((data: Product[] | undefined) => {
            setProducts(data);
        })
        .catch((error: Error) => {
            console.log("Product not fetched: ", error.message);
        });
    }, []);



    ///////  home banner
    const [homeBanner, setHomeBanner] = useState<HomeBanner[] | undefined>();
    useEffect(() => {
        getHomeBanner()
        .then((banners: HomeBanner[] | undefined) => {
            setHomeBanner(banners);
        })
        .catch((error: Error) => {
            console.log("Home banners not fetched: ", error.message)
        })
    }, [products]);

    //desktop
    const [desktopBanner, setDesktopBanner] = useState<DesktopBannerProp[] | undefined>();
    useEffect(() => {
        ExtractDesktopBannerData()
        .then((data: DesktopBannerProp[] | undefined) =>  {
            setDesktopBanner(data);
        })
        .catch((error: Error) => {
            console.log("Cannot extract banner for desktop: ", error)
        })
    }, [products])

    /////////////// featuredPost
    const [featuredPost, setFeaturedPost] = useState<Product[] | undefined>();
    useEffect(() => {
        getFeaturedPost()
        .then((item: Product[] | undefined) => {
            setFeaturedPost(item);
        })
        .catch((error: Error) => {
            console.log("Cannot Fetch Featured: ", error)
        })
    }, [products])


    ////////////// products categories//
    const [categories, setCategories] = useState<Category[] | undefined>();
    //fetch category
    useEffect(() => {
        getCategories()
        .then((categories: Category[] | undefined) => {
            setCategories(categories);
        })
        .catch((error: Error) => {
            console.log("Category not fetched: ", error.message)
        })
    }, []);


    

    return (
        <GlobalContext.Provider value={{note, setNote, loading, setLoading, display, categories, homeBanner, desktopBanner, products, featuredPost}}>
            {children}
        </GlobalContext.Provider>
    );
};





/* Custom Hook */
export const useGlobalProvider = () => {
    const context = useContext(GlobalContext);
    if (!context) throw new Error('useGlobalProvider must be used within a GlobalProvider');
    return context;
};