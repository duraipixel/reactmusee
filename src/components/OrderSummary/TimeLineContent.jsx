import { Timeline } from 'rsuite';
import CheckIcon from '@rsuite/icons/legacy/Check';
import { TiCancel } from "react-icons/ti";
import { BsCalendar2Week } from "react-icons/bs";
import { BiTime } from "react-icons/bi";

function TimeLineContent({ orders }) {
    const stages = orders.tracking;
    return (
        <Timeline className="custom-timeline">
            {
                stages.map((stage, index) => (
                    <Timeline.Item dot={<ActionIcon action={stage.action} />} key={index}>
                        <p className='text-dark fw-bold'>{stage.action}</p>
                        <p className='my-1 d-flex align-items-center'>
                            <BsCalendar2Week size={16} className="me-2" /> 
                            {stage.created_at} 
                        </p>
                        <small>{stage.description}</small>
                    </Timeline.Item>
                ))
            }
            {
                orders.status !== 'delivered' && <Timeline.Item dot={<BiTime className='rs-icon' style={{ background: '#313190', color: '#fff' }} />} >
                    <p className='text-dark fw-bold pt-2'>Your order will reach you shortly</p>
                </Timeline.Item>
            }
        </Timeline>
    )
}
function ActionIcon({ action }) {
    switch (action) {
        case 'Order Cancelled':
            return <TiCancel style={{ background: '#b23915', color: '#fff' }} className='rs-icon' />
        case 'Order Delivered':
            return <CheckIcon style={{ background: '#15b215', color: '#fff' }} />
        default:
            return <CheckIcon className='rs-icon' style={{ transform: 'scale(.8)' }} />
    }
}
export default TimeLineContent