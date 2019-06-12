import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from '../header';
import RandomPlanet from '../random-planet';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import ErrorBoundry from '../error-boundry';
import { SwapiServiceProvider } from '../swapi-service-context';
import {
  PeoplePage,
  PlanetsPage,
  StarshipsPage,
  LoginPage,
  SecretPage
 } from '../pages';

import './app.css';
import { StarshipDetails } from '../sw-components';


export default class App extends Component {


  state = {
    swapiService: new SwapiService(),
    isLoggedIn: false
  };

  onLogin = () => {
    this.setState({
      isLoggedIn: true
    });
  };

  onServiceChange = () => {
    this.setState(({ swapiService }) => {
      const Service  = swapiService instanceof SwapiService
                              ? DummySwapiService
                              : SwapiService;
      return {
        swapiService: new Service()
      }
    });
  };

  render() {

    const { isLoggedIn } = this.state;

    return (
      <ErrorBoundry>
        <SwapiServiceProvider value={this.state.swapiService}>
          <Router>
            <div className="start-db-app">
                <Header onServiceChange={this.onServiceChange} />
                <RandomPlanet />

                <Switch>
                  <Route
                    path="/works/star-db"
                    render={() => <h2>Welcome to Star DB</h2>}
                    exact />
                  <Route path="/works/star-db/people/:id?" component={PeoplePage} />
                  <Route path="/works/star-db/planets" component={PlanetsPage} />
                  <Route path="/works/star-db/starships" component={StarshipsPage} exact />
                  <Route path="/works/star-db/starships/:id"
                        render={({ match }) => {
                          const {id} = match.params;

                          return <StarshipDetails itemId={id} />
                        }} />
                  <Route
                    path="/works/star-db/login"
                    render={() => (
                      <LoginPage
                        isLoggedIn={isLoggedIn}
                        onLogin={this.onLogin} />
                    )}/>
                  <Route
                    path="/works/star-db/secret"
                    render={() => (
                      <SecretPage isLoggedIn={isLoggedIn} />
                    )}/>

                  <Route render={() => <h2>Page not found!</h2>} />
                </Switch>
            </div>
          </Router>
        </SwapiServiceProvider>
      </ErrorBoundry>
    );
  }
};
