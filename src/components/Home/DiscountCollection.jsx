import { Fragment, useEffect, useMemo, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { DiscountSkeletonItem } from '../Skeleton/DiscountSkeletonItem'

export default function DiscountCollection({className}) {

    const [discountCollectionData, setDiscountCollectionData] = useState([]);

    async function getDiscountData() {
        const response = await fetch(window.API_URL + '/get/discount/collections')
            .then((response) => response.json())
            .then((data) => {
                setDiscountCollectionData(data)
            })
            .catch((err) => {
            });
    }
    
    useEffect(() => {

        if (discountCollectionData.length == 0) {
            getDiscountData();
        }

    }, []);


    return (
        <Fragment>
            {
                discountCollectionData && discountCollectionData.length > 0 &&
                <div className={`list-of-deals ${className}`} id="home-content">
                    <div className="container pb-md-5 pb-3">
                        <div>
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="common-heads py-4 text-center">
                                    <h2 className='m-0'> Exclusive Deals, Cool Prices!</h2>
                                </div>
                            </div>

                            <div className="row  g-3">
                                <DiscountSkeletonItem discountCollectionData={discountCollectionData} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </Fragment>
    )
}
