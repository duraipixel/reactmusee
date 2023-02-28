import { Fragment, useEffect, useMemo, useState } from 'react'
import DiscountCollection from '../components/Home/DiscountCollection';
import SideCustomScrollbar from '../components/SideCustomScrollbar';
import HistoryVideo from '../components/Home/HistoryVideo';
import { CollectionSectionOne } from '../components/Sliders/CollectionSectionOne';
import { LiveVideo } from '../components/LiveVideo';
import { CollectionToprank } from '../components/Sliders/CollectionToprank';
import { CollectionTrending } from '../components/Sliders/CollectionTrending';
import { CollectionBlockBuster } from '../components/Sliders/CollectionBlockBuster';
import { Brand } from '../components/Sliders/Brand';
import { CollectionKeyboards } from '../components/Sliders/CollectionKeyboards';
import { CollectionBestSeller } from '../components/Sliders/CollectionBestSeller';
import { CollectionControlTunes } from '../components/Sliders/CollectionControlTunes';
import { CollectionRecommend } from '../components/Sliders/CollectionRecommend';
import { RecentView } from '../components/Sliders/RecentView';
import { Testimonials } from '../components/Sliders/Testimonials';
import { PackageSupport } from '../components/Home/PackageSupport';
import HomeCarousel from './../components/Carousel/HomeCarousel';
import { useDispatch, useSelector } from 'react-redux';
import { isOpenSideBar } from '../app/reducer/sideMenuBarSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCart } from '../app/reducer/cartSlice';
import { clearAttemptItem } from '../app/reducer/attemptedCartSlice';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { fetchProducts } from '../app/reducer/productFilterSlice';
import './common.css';

export default function Home() {
    
    const dispatch = useDispatch();
    const customer = JSON.parse(window.localStorage.getItem('customer'));
    const [recentData, setRecentData] = useState([]);
    const [homeData, setHomeData] = useState([]);
    const [recentDataLoading, setRecentDataLoading] = useState(true);

    const navigate = useNavigate();
    const location  = useLocation();

    const searchParams = new URLSearchParams(location.search);

    const goToProductListPageCollection = (collection_slug ) => {

        const url = new URL(window.location.href);
        const SUrl = "/products/pfilter";
        
        searchParams.set("collection", collection_slug);

        navigate(SUrl + '?'+ searchParams.toString());
        dispatch(fetchProducts('?'+ searchParams.toString()));
    }

    async function getRecentViewData() {
        
        let customer = JSON.parse(window.localStorage.getItem('customer'));
        setRecentDataLoading(false);
        await axios({
            url: window.API_URL + '/get/recent/view',
            method: 'POST',
            data: {customer_id:customer.id},
        }).then((res) => {
           
           setRecentData(res.data);
        }).catch((err) => {
            setRecentDataLoading(true);
        })
    }

    async function getHomeData() {
        await axios({
            url: window.API_URL + '/get/home/details',
            method: 'GET',            
        }).then((res) => {
            if( res.data ) {
                setHomeData(res.data)
            }
        }).catch((err) => {
        })
    }

    useMemo(() => {
        if( homeData.length === 0 ) {
            getHomeData()
        }
    }, [homeData])

    useEffect(() => {
        
        if( !customer ) {
            dispatch(clearCart());
            // dispatch(clearAttemptItem())
        } else {
            if( recentData.length == 0 && recentDataLoading ){
                getRecentViewData();
            }
        }
        const openSideBar = () => {
            dispatch(isOpenSideBar());
        }
    }, [])
    
    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
            </Helmet>
            <HomeCarousel homeData={homeData} />
            <DiscountCollection />
            <HistoryVideo homeData={homeData} />
            <CollectionSectionOne homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            <LiveVideo />
            <CollectionToprank homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            <CollectionTrending homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            <CollectionBlockBuster homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            <Brand />
            <CollectionKeyboards homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            <CollectionBestSeller homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            <CollectionControlTunes homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            <CollectionRecommend homeData={homeData} goToProductListPageCollection={goToProductListPageCollection} />
            {
            recentData.length > 5 &&
            <RecentView recentData={recentData}/>
            }
            <Testimonials homeData={homeData} />
            <PackageSupport />
            
        </Fragment>
    )
}
