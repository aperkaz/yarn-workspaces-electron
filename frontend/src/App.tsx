import React from 'react';

import { useAppDispatch, useAppSelector } from './store/hooks';
import { ACTIONS } from './store';
import { send } from './API/utils';
import NotificationList from './NotificationList';

const App = () => {
  const dispatch = useAppDispatch();

  const notifications = useAppSelector((s) => s.notifications);

  const handleProcessImageAsync = async () => {
    // The BE will udpate the redux store with notifications
    const isImageProcessed = await send({
      type: 'PROCESS_IMAGE_ASYNC'
    });

    console.log('Image processed: ', isImageProcessed);
  };

  const handleProcessImageBatch = async () => {
    // The BE will udpate the redux store
    send({
      type: 'PROCESS_IMAGE_BATCH'
    });
  };

  const handleReset = async () => {
    dispatch(ACTIONS.resetState());
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '5rem'
      }}
    >
      <h1 style={{ marginTop: 0 }}>Offline Image Processsing App</h1>
      <br />
      <img
        src="https://upload.wikimedia.org/wikipedia/en/7/77/EricCartman.png"
        className="rotate linear infinite"
        alt="img"
        width="80"
        height="80"
      />
      <br />
      <NotificationList
        notifications={notifications}
        handleProcessImageAsync={handleProcessImageAsync}
        handleProcessImageBatch={handleProcessImageBatch}
        handleReset={handleReset}
      />
    </div>
  );
};

export default App;
