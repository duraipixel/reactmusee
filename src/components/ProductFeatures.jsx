import React from 'react'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Accordion } from 'react-bootstrap';
import { useMemo } from 'react';

function ProductFeatures({ data }) {
    const [value, setValue] = React.useState(data[0].name);
    const [currentTab, setCurrentTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useMemo(() => {
        data.map((item, i) => {
            if(item.has_data) {
                setCurrentTab(i)
            }
        })
    },[])
    return (
        <div className="product-features">
            <Accordion defaultActiveKey={currentTab} alwaysOpen>
                {data.map((item, i) => (
                    item.has_data && <Accordion.Item eventKey={i} key={i}>
                        <Accordion.Header><b className='text-uppercase'>{item.name == 'media' ? 'Audios & Videos' : item.name}</b></Accordion.Header>
                        <Accordion.Body>
                            <FeatureTab data={item} />
                        </Accordion.Body>
                    </Accordion.Item>
                ))} 
            </Accordion> 
        </div>
    )
}
function FeatureTab({ data }) {
    if (data.name == 'description') {
        return <div dangerouslySetInnerHTML={{ __html: data.data }}></div>
    }
    if (data.name == 'specification') {
        return data.data.length !== 0 ? data.data.map((list, i) => (
            <div className="card mb-3 shadow border" key={i}>
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
                        <iframe loading="lazy" width="100%" height={200} src={item.url.replace('https://youtu.be/', 'https://www.youtube.com/embed/')} title="Violin Techniques - II Feat. Pedro Gómez-Briceño | Musee Musical School of Music" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </ImageListItem>
                ))
                    : <p className='lead text-capitalize'>{data.name} is Empty!</p>
            }
        </ImageList>
    }
}
export default ProductFeatures