import React, { FC } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const App: FC<WithTranslation> = ({ t }) => (
  <div className="App">
    <Button type="primary">Button</Button>
    <div>{t('greeting')}</div>
  </div>
);

export default withTranslation()(App);

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
