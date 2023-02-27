import { Fragment } from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const ProductSkeletonItem = () => {
    return (
        <Fragment>
            <div className="col-lg-4 col-md-4">
                <div className="project-bxe">
                    <div className="prdt-img">
                        <Skeleton  height={240} width={300} />
                    </div>
                    <div className="ratings d-flex justify-content-between">
                        <div className="prdt-type">
                        <Skeleton count={1} />
                        </div>
                    </div>
                    <div className="prdt-nameprc">
                        <Skeleton/>
                        <Skeleton height={35}/>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
