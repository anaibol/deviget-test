import React from 'react'
import './App.css'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

  
import styled from '@emotion/styled'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'


const Main = styled.main`
  min-height: 100vh;
  flex-direction: row;
`;

export default function App({ loading, data, nextPage, previousPage }) {
  console.log(data);
  return (
    <Main>
      <Router>
        <LeftPanel
          loading={loading}
          data={data}
          nextPage={nextPage}
          previousPage={previousPage}
        />
        <Switch>
          <Route path="/:postId">
            <RightPanel
              data={data}
            />
          </Route>
        </Switch>
      </Router>
    </Main>
  );
  }