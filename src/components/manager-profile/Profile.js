import { Tabs } from 'antd';
import React from 'react';
import ProfileDetail from './components/ProfileDetail'
import ChangePassword from './components/ChangePassword'
import { STRINGS } from '../../constants/Strings';

const { TabPane } = Tabs;
const callback = (key) => {
}

function Profile() {

  return (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab={STRINGS.profile} key="1">
        <ProfileDetail></ProfileDetail>
      </TabPane>
      <TabPane tab={STRINGS.change_password} key="2">
        <ChangePassword/>
      </TabPane>
    </Tabs>
  )
}
export default Profile;