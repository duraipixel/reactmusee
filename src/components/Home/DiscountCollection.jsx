import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { DiscountSkeletonItem } from '../Skeleton/DiscountSkeletonItem'
import { useDiscountCollectionQuery } from '../../app/services/homePageApi';

export default function DiscountCollection({ className }) {
    const { data, isLoading, isSuccess } = useDiscountCollectionQuery()
    return (
        <div className={`list-of-deals ${className}`} id="home-content">
            <div className="container pb-md-5 pb-3">
                <div>
                    <div className="common-heads py-4 text-center">
                        <h1 className='m-0 h2'> Exclusive Deals, Cool Prices!</h1>
                    </div>
                    <div className="row g-3 p-2 rounded justify-content-center">
                        {isSuccess && <DiscountSkeletonItem discountCollectionData={data} />}
                        {isLoading && <DiscountLoader/>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const DiscountLoader = () => {
    return Array.from(
        { length: 4 },
        (_, i) => (
            <div className="col-lg-3 col-md-6 col-sm-12 xol-xs-12" key={i}>
                <div className="deals-box">
                    <Skeleton />
                    <ul>
                        <li>
                            <Skeleton width={100} height={100} />
                            <Skeleton />
                        </li>
                        <li>
                            <Skeleton width={100} height={100} />
                            <Skeleton />
                        </li>
                        <li>
                            <Skeleton width={100} height={100} />
                            <Skeleton />
                        </li>
                        <li>
                            <Skeleton width={100} height={100} />
                            <Skeleton />
                        </li>
                    </ul>
                </div>
            </div>
        )
    )
}
