import { Fragment } from 'react'


export const Specification = ({ attributes }) => {
    return (
        <Fragment>
            <div className="col-lg-12">
                <div className="description-details no-bfr-afr text-center">
                    <div className="inner-headngs">
                        <h2>Specification</h2>
                    </div>
                </div>
                <div className="specs-lsts">
                    <table className="table table-bordered">
                        <tbody>
                            {
                                attributes && attributes.map((items, i) => (
                                    <Fragment>
                                        <tr className="active">
                                            <th className="active" colSpan={3} scope="row" style={{ textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #cccccc' }}>
                                                {items.title}
                                            </th>
                                        </tr>
                                        {
                                            items.child && items.child.map( (chik, key) => (
                                                
                                                <tr key={key}>
                                                    <th className="active" scope="row">{chik.title}</th>
                                                    <td className="spectable-colnumber-0"> {chik.value}</td>
                                                </tr>
                                            ) )
                                        }
                                    </Fragment>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}
