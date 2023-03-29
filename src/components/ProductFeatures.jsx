import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
function ProductFeatures({ data }) {
    const [value, setValue] = React.useState(data[0].name);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={{ minHeight: '50vh' }} className="product-features">
            <TabContext value={value} >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                    <TabList onChange={handleChange} variant="fullWidth">
                        {data.map((item, i) => (
                            <Tab key={i} label={item.name} value={item.name} />
                        ))}
                    </TabList>
                </Box>
                {data && data.map((item, i) => (
                    <TabPanel key={i} value={item.name}>
                        {typeof (item.data) === 'string' && <div dangerouslySetInnerHTML={{ __html: item.data }}></div>}
                        {
                            typeof (item.data) === 'object' ?
                                item.data.length !== 0 ?
                                    item.data.map((list, i) => (
                                        list.child !== undefined ?
                                            <div className="card mb-3 shadow border">
                                                <div className="card-header bg-light p-2">
                                                    <b>{list.title}</b>
                                                </div>
                                                <div className="card-body p-2">
                                                    <table className='table table-hover table-borderless m-0'>
                                                        <tbody>
                                                            {
                                                                list.child.map((spec, i) => (
                                                                    <tr>
                                                                        <th width='20%'>{spec.title}</th>
                                                                        <td width='30'>:</td>
                                                                        <td>{spec.value}</td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            : console.log(item)
                                            //  item.links.map(media => (
                                            //     <iframe width="950" height="534" src={media.url} title="Violin Techniques - II Feat. Pedro Gómez-Briceño | Musee Musical School of Music" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                            // ))
                                    ))
                                    : <p className='lead text-capitalize'>
                                        {item.name} is Empty!
                                    </p>
                                : null
                        }
                    </TabPanel>
                ))}
            </TabContext>
        </div>
    )
}

export default ProductFeatures