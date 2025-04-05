import { addNotification } from '../redux/notificationsSlice';

export const initWebSocket = (dispatch) => {
  console.log('Attempting to connect to WebSocket...');
  const ws = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum');

  ws.onopen = () => {
    console.log('WebSocket connection established');
  };

  ws.onmessage = (event) => {
    console.log('WebSocket message received:', event.data);
    const data = JSON.parse(event.data);
    Object.entries(data).forEach(([asset, price]) => {
      dispatch(
        addNotification({
          id: `${asset}-${Date.now()}`,
          type: 'price_alert',
          message: `${asset.toUpperCase()} price updated to $${price}`,
        })
      );
    });
  };

  ws.onerror = (error) => {
    console.error('WebSocket error occurred:', error);
    console.error('Error details:', {
      message: error.message || 'No message provided',
      stack: error.stack || 'No stack trace',
      readyState: ws.readyState,
    });
    // Start fallback if WebSocket fails
    console.log('Falling back to mock updates...');
    startMockUpdates(dispatch);
  };

  ws.onclose = (event) => {
    console.log('WebSocket closed:', {
      code: event.code,
      reason: event.reason || 'No reason provided',
      wasClean: event.wasClean,
    });
  };

  // Log initial state
  console.log('WebSocket initial state:', ws.readyState);

  return ws;
};

// Mock updates function
const startMockUpdates = (dispatch) => {
  const simulatePriceUpdate = () => {
    const assets = ['bitcoin', 'ethereum'];
    const randomAsset = assets[Math.floor(Math.random() * assets.length)];
    const randomPrice = (Math.random() * 10000 + 20000).toFixed(2); // Random between 20k-30k
    dispatch(
      addNotification({
        id: `${randomAsset}-${Date.now()}`,
        type: 'price_alert',
        message: `${randomAsset.toUpperCase()} price updated to $${randomPrice}`,
      })
    );
  };

  const interval = setInterval(simulatePriceUpdate, 10000); // Every 10 seconds
  return { close: () => clearInterval(interval) };
};