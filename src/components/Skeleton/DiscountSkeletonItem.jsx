import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'

export const DiscountSkeletonItem = ({discountCollectionData}) => {

    // console.log(discountCollectionData, 'discountCollectionData')
    
    return (
        <Fragment>
            {

                discountCollectionData.length > 0 ? (
                    <>
                    {
                        discountCollectionData.map((item) => (

                            <div className="col-lg-3 col-md-6 col-sm-12 xol-xs-12" key={item.id}>
                                <div className="deals-box">
                                    <h4>
                                        <Link to={`/products/pfilter?discount=${item.slug}`}>
                                        {item.collection_name}
                                        </Link>
                                        
                                    </h4>
                                    <ul>
                                        {
                                            item.products.length > 0 ? (

                                                item.products.map((productItems, i) => (
                                                    <li key={i} >
                                                        <Link to={`/products/pfilter?discount=${item.slug}&category=${productItems.category_slug}`}>
                                                            <img src={productItems.image} />
                                                            <span>{productItems.category} </span>
                                                        </Link>

                                                    </li>
                                                    
                                                ))
                                                
                                            ):null
                                        }
                                       
                                    </ul>
                                </div>
                            </div>
                        ))
                    }
                    
                    </>
                ) :
                Array.from(
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
        </Fragment>
    )
}
