import './common.css';
import { Helmet } from 'react-helmet';
import { Fragment } from 'react'
import DiscountCollection from '../components/Home/DiscountCollection';
import HistoryVideo from '../components/Home/HistoryVideo';
import HomeCarousel from './../components/Carousel/HomeCarousel';
import ProductSlider from '../components/ProductSlider';
import { LiveVideo } from '../components/LiveVideo';
import { Brand } from '../components/Sliders/Brand';
import { RecentView } from '../components/Sliders/RecentView';
import { Testimonials } from '../components/Sliders/Testimonials';
import { PackageSupport } from '../components/Home/PackageSupport';
import { useHomePageDataQuery, useRecentViewsQuery } from '../app/services/homePageApi';

export default function Home() {
    const { data, isSuccess, isFetching } = useHomePageDataQuery()
    const recent = useRecentViewsQuery()
    return (
        <Fragment>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Home | Musee Musical</title>
                <link rel="canonical" href={window.location.href} />
                <meta name='title' content="Shop Music Instruments, Accessories and Music Books - Musée Musical"></meta>
                <meta name='description' content='Musée Musical was established in 1842. Explore our wide range of guitars, drums, Pianos, Music books, and Music instrument accessories online at the best price.' />
            </Helmet>
            {
                isFetching &&
                <section style={{ minHeight: '100vh' }} className='d-flex align-items-center justify-content-center fixed-top bg-white'>
                    <img src={require('../assets/gif/loader.gif')} width={100} />
                </section>
            }
            {
                isSuccess &&
                <>
                    <HomeCarousel homeData={data} />
                    <DiscountCollection className='bg-white' />
                    <HistoryVideo homeData={data} />
                    <LiveVideo />
                    <ProductSlider data={data.collection} />
                    <Brand />
                    {recent.isSuccess && recent.data.length > 5 && <RecentView recentData={recent.data} />}
                    <Testimonials homeData={data} />
                    <PackageSupport />
                </>
            }
        </Fragment>
    )
}
