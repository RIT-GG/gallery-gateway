import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Portfolios from './containers/Portfolios'
import Submit from './pages/Submit'

import Layout from './components/Layout'
import NotFound from '../shared/components/NotFound'
import PortfolioSubmissionForm from './containers/PortfolioSubmissionForm'

const Student = () => (
  <Layout>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/portfolios' component={Portfolios} />
      <Route exact path='/portfolios/create' component={PortfolioSubmissionForm} />
      <Route path='/submit' component={Submit} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)

export default Student
