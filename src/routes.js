import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from './pages/Home'
import Box from './pages/Box'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path={'/'} component={Home}/>
            <Route path={'/box/:id'} component={Box}/>
        </Switch>
    </BrowserRouter>
)

export default Routes
