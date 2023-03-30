import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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
                        <FeatureTab data={item} />
                    </TabPanel>
                ))}
            </TabContext>
        </div>
    )
}
function FeatureTab({ data }) {
    if (data.name == 'description') {
        return <div dangerouslySetInnerHTML={{ __html: data.data }}></div>
    }
    if (data.name == 'specification') {
        return data.data.length !== 0 ? data.data.map((list, i) => (
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
        )) : <p className='lead text-capitalize'>{data.name} is Empty!</p>
    }
    if (data.name == 'media') {
        return <ImageList cols={3} >
            {
                data.data.length > 0 ? data.data.map((item) => (
                    <ImageListItem key={item.id}>
                        <iframe loading="lazy" width="100%" height={200} src={item.url.replace('https://youtu.be/','https://www.youtube.com/embed/')} title="Violin Techniques - II Feat. Pedro Gómez-Briceño | Musee Musical School of Music" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </ImageListItem>
                ))
                    : <p className='lead text-capitalize'>{data.name} is Empty!</p>
            }
        </ImageList>
    }
}
export default ProductFeatures