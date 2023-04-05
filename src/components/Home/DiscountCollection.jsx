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

                <section className={`list-of-deals ${className}`} id="home-content">
                    <div className="container">
                        <div className="">

                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="common-heads">
                                    <div className='fs-4 mb-4 fw-bold text-primary'>Deals You don’t Want to Miss</div>
                                </div>
                            </div>

                            <div className="row">
                                <DiscountSkeletonItem discountCollectionData={discountCollectionData} />
                            </div>
                        </div>
                    </div>
                </section>
            }
        </Fragment>
    )
}
