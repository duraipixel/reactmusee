import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const DiscountSkeletonItem = () => {
    return (
        <Fragment>
            {
                Array.from(
                    { length: 4 },
                    (_, i) => (
                        <div className="col-lg-3 col-md-6 col-sm-12 xol-xs-12">
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
