import React, { Fragment } from 'react'

export const SortBy = ({sort_by}) => {
    
    return (
        <Fragment>
            <div class="sort-order">
                <span> Sort by</span>
                <select class="form-control" id="sort_by" name="sort_by">
                    {
                        sort_by && sort_by.map((item, i) => (
                            <option value={item.slug} key={i}>{item.name}</option>
                        ))
                    }
                </select>
            </div>
        </Fragment>
    )
}
