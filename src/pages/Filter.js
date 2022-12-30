import React, { Fragment } from 'react'
import { Brand } from '../components/Filter/Brand'
import { DiscountCollection } from '../components/Filter/DiscountCollection'
import { ProductAvailability } from '../components/Filter/ProductAvailability'

export const Filter = ({filterStaticMenu}) => {

    const product_availability = filterStaticMenu.product_availability;
    const video_shopping = filterStaticMenu.video_shopping;
    const discounts = filterStaticMenu.discounts;

    return (
        <Fragment >
            <div class="col-lg-3 col-md-3 col-sm-3 col-xs-12
                            sdmnu-repnsve mCustomScrollbar">
                <div class="filter-lists">
                    <h3>Filters</h3>
                    <span class="cl-se-btn"><a
                        href="javascript:void(0)"> <img src="images/filter-close.png" /> </a></span>
                    <ProductAvailability product_availability={product_availability} />
                </div>
                <Brand />
                <div class="filter-lists">
                    <ul>
                        <h4>Video Shopping</h4>
                        <li>
                            <label class="cstm-chkbx">Video Shopping
                                <br />is available
                                <input type="checkbox" name='video_shopping' value="video_shopping" id="video_shopping" />
                                <span class="checkmark"></span>
                            </label>
                        </li>
                    </ul>
                </div>
                <DiscountCollection discounts={discounts} />

            </div>
        </Fragment>
    )
}
