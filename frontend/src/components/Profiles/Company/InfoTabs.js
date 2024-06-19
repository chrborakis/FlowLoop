import React, { useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../Extra/TabPanel';
import Info from './Info/Info';
import Address from './Info/Address';
import Staff from './Info/Staff';
import { getCompany, getAddress, getStaff } from './CompanyUtils';

const InfoTabs = ({user,slug, data}) => {
    const [tabInfo, setTabInfo] = useState(0);
    const handleTabInfo = (event, newTabContent) => setTabInfo(newTabContent);
    
    const [ address, setAddress] = useState();
    const [ staff, setStaff]     = useState([]);

    useEffect( () => {
        if(data?.company_id) {
            getStaff(data?.company_id, setStaff)
            getAddress(data?.address, setAddress)
        }
    },[data?.company_id,slug])

    return(<>
        <Tabs value={tabInfo} onChange={handleTabInfo}
                indicatorColor="primary" textColor="primary" centered
                aria-label="scrollable auto tabs example">
            <Tab label="Information"/>
            <Tab label="Address"/>
            <Tab label={`Staff (${staff.length})`}/>
        </Tabs>
        <TabPanel value={tabInfo} index={0}>
            { data    && <Info company={data} admin={data?.company_id===user?.company?.id && user.is_admin} token={user?.token}/>}
        </TabPanel>
        <TabPanel value={tabInfo} index={1}>
            <Address company_id={data?.company_id} address={address} admin={data.company_id===user?.company?.id && user.is_admin} token={user?.token}/>
        </TabPanel>
        <TabPanel value={tabInfo} index={2}>
            <Staff user={user} company={{id:data?.company_id, slug:slug}}/>
        </TabPanel>
    </>)
}

export default InfoTabs