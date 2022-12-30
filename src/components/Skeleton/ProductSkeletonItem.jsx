import React, { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ProductSkeletonItem = () => {
    return (
        <Fragment>
            <div class="col-lg-4 col-md-4">
                <div class="project-bxe">
                    <a href="product-detail.html">
                        <div class="prdt-img">
                            <Skeleton  height={240} width={300} />
                        </div>
                        <div class="ratings d-flex justify-content-between">
                            <div class="prdt-type">
                            <Skeleton count={1} />
                            </div>
                        </div>
                        <div class="prdt-nameprc">
                            <Skeleton/>
                            <Skeleton height={35}/>
                        </div>
                    </a>
                </div>
            </div>
        </Fragment>
    )
}
