import React, { Fragment } from 'react'

export const DiscountCollection = ({ discounts }) => {
  return (
    <Fragment>
      {
        discounts && (
          <div class="filter-lists">
            <ul>
              <h4>Discounts</h4>
              {
                discounts.map((item) => (
                  <li key={item.id}>
                    <label class="cstm-chkbx"> {item.collection_name}
                      <input type="checkbox" name='discounts[]' value={item.slug}  />
                      <span class="checkmark"></span>
                    </label>
                  </li>
                ))
              }
              
            </ul>
          </div>
        )
      }

    </Fragment>
  )
}
