import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


export const TestimonialImage = ({itemImage}) => {
    const [imageLoad, setImageLoad] = useState(false);

    function onLoad() {
        setImageLoad(true);
    }

    return (
      <>
        { !imageLoad &&
            <div className='testSkeleton'>
                <Skeleton circle={true} height={50} width={50}/>
            </div>

        }
        <img src={itemImage} width="50px" style={imageLoad ? {display:'block'}:{display:'none'}} onLoad={onLoad}/>   
      </>
          
    )
}
