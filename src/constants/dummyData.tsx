import { Category, DesktopBannerProp, HomeBanner, Product } from "@/constants/provider";
import axios from "axios";

export const getCategories = async () : Promise<Category[] | undefined> => { 

    //logic to fetch categories here
    return [
        {id: "efbe8f42gf42bf7ytfpb2bqy34gy94b9894yt4v4tfq34tfq8p9849", name: "IPhone", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICDo76FTv076YsCo3aonhNDuNe8RGku4H1A&s"},
        {id: "efbe8f42gf42bf7ytfpb2bqy34gy94b9894yt4v4tfq34tfq8p9849", name: "Accessories", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICDo76FTv076YsCo3aonhNDuNe8RGku4H1A&s"},
        {id: "efbe8f42gf42bf7ytfpb2bqy34gy94b9894yt4v4tfq34tfq8p9849", name: "Laptops", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICDo76FTv076YsCo3aonhNDuNe8RGku4H1A&s"},
        {id: "efbe8f42gf42bf7ytfpb2bqy34gy94b9894yt4v4tfq34tfq8p9849", name: "Services", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQICDo76FTv076YsCo3aonhNDuNe8RGku4H1A&s"},
    ]
}

export const getHomeBanner = async () : Promise<HomeBanner[] | undefined> => {

    return [
        {image: "https://static.vecteezy.com/system/resources/thumbnails/007/808/325/small/flash-sale-banner-template-design-for-web-or-social-media-vector.jpg"},
        {image: "https://img.freepik.com/free-vector/gradient-flash-sale-background_23-2149027975.jpg?semt=ais_hybrid&w=740"},
        {image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/flash-sale-banner-design-template-9349bfc8031a263ff98d40c75a97378a_screen.jpg?ts=1714269671"},
    ]
}

export const getProducts = async () : Promise<Product[] | undefined> => {

    const response = await axios.get("/products.json");
    const products : Product[] = response.data;
    if(response.status < 200 || response.status >= 300) return [];
    return products;
}

export const ExtractDesktopBannerData = async () : Promise<DesktopBannerProp[] | undefined> => {
    const keyword = "apple" // tag used to filter item
    const products = await getProducts() as Product[];
    if(!products) return [];

    const featured = products.filter((item: Product) => item.tags?.some(tag => tag.toLowerCase() === keyword)).slice(0, 5);
    const fit = (item: Product): DesktopBannerProp =>  ({
            title: item.description ?? item.title,
            id: item.id,
            image: item.gallery?.[0].url, // Assuming gallery is an array and you want the first image
            deal: "Featured Post",
    });
    return featured.map(fit);
}

export const getFeaturedPost = async () : Promise<Product[] | undefined> => {
    const products = await getProducts() as Product[];
    if(!products) return [];
    const featured = products.filter((item: Product) => item.isFeatured);
    return featured;
}