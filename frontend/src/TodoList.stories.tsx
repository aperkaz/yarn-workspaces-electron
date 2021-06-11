import React from 'react';
import { Story, Meta } from '@storybook/react';

import TodoList from './TodoList';

export default {
  title: 'TodoList',
  component: TodoList,
  argTypes: {
    handleAddTodoSync: { action: 'handleAddTodoSync' },
    handleAddTodoAsync: { action: 'handleAddTodoAsync' }
  }
} as Meta;

const Template: Story<React.ComponentProps<typeof TodoList>> = (args) => (
  <TodoList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  todos: [
    { text: 'todo 1', isDone: false },
    { text: 'todo 2', isDone: true },
    { text: 'todo 3', isDone: false }
  ]
};
