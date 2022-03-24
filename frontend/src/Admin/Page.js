import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import ViewShow from './pages/ViewShow'
import PrintableReport from './pages/PrintableReport'
import CreateShow from './pages/CreateShow'
import CreatePortfolioPeriod from './pages/CreatePortfolioPeriod'
import CreateScholarship from './pages/CreateScholarship'
import EditShow from './pages/EditShow'
import EditPortfolioPeriod from './pages/EditPortfolioPeriod'
import AssignJudges from './pages/AssignJudges'
import ManageUsers from './pages/ManageUsers'

import Layout from './components/Layout'
import NotFound from '../shared/components/NotFound'
import ViewPortfolioPeriod from './pages/ViewPortfolioPeriod'

const Admin = () => (
  <Layout>
    <Switch>
      <Route exact path='/' component={Dashboard} />
      <Route exact path='/show' component={Dashboard} />
      <Route exact path='/show/new' component={CreateShow} />
      <Route exact path='/show/:id/judges/assign' component={AssignJudges} />
      <Route exact path='/show/:id/edit' component={EditShow} />
      <Route path='/show/:id/print' component={PrintableReport} />
      <Route path='/show/:id' component={ViewShow} />
      <Route path='/users' component={ManageUsers} />
      <Route exact path='/portfolio-period' component={Dashboard} />
      <Route exact path='/portfolio-period/new' component={CreatePortfolioPeriod} />
      <Route exact path='/portfolio-period/:id/edit' component={EditPortfolioPeriod} />
      <Route path='/portfolio-period/:id' component={ViewPortfolioPeriod} />
      <Route exact path='/scholarships/new' component={CreateScholarship} />
      <Route component={NotFound} />
    </Switch>
  </Layout>
)

export default Admin
