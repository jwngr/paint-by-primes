import React from 'react';

import SidebarStep from './SidebarStep/container';
import LogoWithSubtitle from '../LogoWithSubtitle';

import {SidebarWrapper} from './index.styles';

class Sidebar extends React.Component {
  render() {
    return (
      <SidebarWrapper>
        <LogoWithSubtitle />

        <div>
          <SidebarStep step={1} />
          <SidebarStep step={2} />
          <SidebarStep step={3} />
          <SidebarStep step={4} />
          <SidebarStep step={5} />
        </div>
      </SidebarWrapper>
    );
  }
}

export default Sidebar;
