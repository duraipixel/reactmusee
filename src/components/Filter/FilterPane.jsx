import React, { Fragment } from 'react'
import { FilterItems } from './FilterItems';
import { ProductSkeletonItem } from './../Skeleton/ProductSkeletonItem';

export const FilterPane = () => {
    return (
        <Fragment>
            <div class="col-lg-12 col-md-12 col-sm-12
                                    main-det-prdt">
                <div class="row">
                    {/* <FilterItems /> */}
                    

                    {
                        Array.from(
                            { length: 6 },
                            (_, i) => (
                                <ProductSkeletonItem key={i} />
                            )
                        )
                    }

                </div>

                <div class="col-lg-12 text-center">
                    <div class="load-btn">
                        <a href="">
                            Load More
                        </a>
                    </div>
                </div>

            </div>
        </Fragment>
    )
}
