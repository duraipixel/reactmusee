import React, { Fragment } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { DiscountSkeletonItem } from '../Skeleton/DiscountSkeletonItem'

export default function DiscountCollection() {
  return (
    <Fragment>
        <section className="list-of-deals" id="home-content">
            <div className="container">
                <div className="">

                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="common-heads">
                            <h2>Deals You don’t Want to Miss</h2>
                        </div>
                    </div>

                    <div className="row">
                        <DiscountSkeletonItem />

                    </div>

                </div>
            </div>
        </section>
    </Fragment>
  )
}
