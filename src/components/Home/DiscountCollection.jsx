import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { DiscountSkeletonItem } from '../Skeleton/DiscountSkeletonItem'
import { useDiscountCollectionQuery } from '../../app/services/homePageApi';

export default function DiscountCollection({ className }) {
    const { data, isLoading, isSuccess } = useDiscountCollectionQuery() 
    if (isSuccess) return (
        <div className={`list-of-deals ${className}`} id="home-content">
            <div className="container pb-md-5 pb-3">
                <div>
                    <div className="common-heads py-4 text-center">
                        <h2 className='m-0'> Exclusive Deals, Cool Prices!</h2>
                    </div>
                    <div className="row g-3">
                        <DiscountSkeletonItem discountCollectionData={data} />
                    </div>
                </div>
            </div>
        </div>
    )
    if (isLoading) return Array.from(
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
