import React from 'react';
import { Story, Meta } from '@storybook/react';

import NotificationList from './NotificationList';

export default {
  title: 'NotificationList',
  component: NotificationList,
  argTypes: {
    handleProcessImageSync: { action: 'handleProcessImageSync' },
    handleProcessImageAsync: { action: 'handleProcessImageAsync' },
    handleReset: { action: 'handleReset' }
  }
} as Meta;

const Template: Story<React.ComponentProps<typeof NotificationList>> = (
  args
) => <NotificationList {...args} />;

export const Default = Template.bind({});
Default.args = {
  notifications: [
    { text: 'notification 1' },
    { text: 'notification 2' },
    { text: 'notification 3' }
  ]
};
