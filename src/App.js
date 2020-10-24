import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { UserProvider } from '../src/pages/context/UserContext'
import Main from './layout/Main';

function App() {
  return (
    <>
      <UserProvider>
        <Main />
      </UserProvider>
    </>
  )
}

export default App;
