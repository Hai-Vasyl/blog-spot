import React from 'react';

import BackgroundOverlay from './components/background-overlay/BackgroundOverlay';
import BackgroundOverlayTest from './components/background-overlay/BackgroundOverlayTest';
import Navbar from './components/nav-bar/Navbar';
import Popup from './components/popup/Popup';
import Routes from './components/Routes';

const App: React.FC = () => {
  return (
    <div>
      {/* <BackgroundOverlay /> */}
      <BackgroundOverlayTest />
      <Popup />
      <Navbar />
      <div className="wrapper">
        <Routes />
      </div>
    </div>
  );
};

export default App;
