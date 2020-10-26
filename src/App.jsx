import React from 'react';
import Navigation from './components/navigation/navigation.jsx'
import { slide as Menu } from 'react-burger-menu'

import Carrousel from './components/carrousel/carrousel.jsx'
import CarrouselMobile from './components/carrousel_mobile/carrousel_mobile.jsx'
import Project from './components/project/project.jsx'
import About from './components/about/about.jsx'
import Contact from './components/contact/contact.jsx'
import './App.scss';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { PageTransition } from '@steveeeie/react-page-transition';
import { BrowserView, MobileView, isBrowser } from "react-device-detect";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      menuOpen: false
    };

    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen })
  }


  closeMenu() {
    this.setState({ menuOpen: false })
  }

  toggleMenu() {
    this.setState(state => ({ menuOpen: !state.menuOpen }))
  }


  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <MobileView>
            <Menu width={'100%'} itemListClassName={"custom_menu"} crossButtonClassName={"custom_cross"} isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
              <Link className="menu-item" to="/" onClick={() => this.closeMenu()}>Home</Link>
              <Link className="menu-item" to="/about" onClick={() => this.closeMenu()}>About</Link>
              <Link className="menu-item" to="/contact" onClick={() => this.closeMenu()}>Contact</Link>
              <a href="https://www.instagram.com/tximenea.films/" rel="noopener noreferrer" target="_blank" className="links_button" style={{ backgroundImage: "url(./assets/logo_insta.png)", backgroundPosition: "center" }}></a>
            </Menu>
          </MobileView>
          <BrowserView>
            <Navigation />
          </BrowserView>
          <Route
            render={({ location }) => {
              return (
                <PageTransition
                  preset="scaleDownFromBottom"
                  transitionKey={location.pathname}
                >
                  <Switch location={location}>
                    <Route exact path="/" component={isBrowser ? () => <Carrousel currentPage={this.state.currentPage} setCurrentPage={(page) => this.setState({ currentPage: page })} /> : () => <CarrouselMobile currentPage={this.state.currentPage} setCurrentPage={(page) => this.setState({ currentPage: page })} />} />
                    <Route exact path="/project" component={() => <Project currentPage={this.state.currentPage} goBack={this.goBack} />} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/contact" component={Contact} />
                  </Switch>
                </PageTransition>
              );
            }}
          />
          <div className="links">
            <BrowserView>
              <a href={"https://www.instagram.com/tximenea.films/"} rel="noopener noreferrer" target="_blank" className="links_button" style={{ backgroundImage: "url(./assets/logo_insta.png)", backgroundPosition: "center" }}></a>
            </BrowserView>
          </div>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
