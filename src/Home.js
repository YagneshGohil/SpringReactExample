import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container } from 'reactstrap';

class Home extends Component {
    render() {
        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <Button color="link"><Link to="/clients">Clients</Link></Button>
                    <Button color="link"><Link to="/newman">Newman</Link></Button>
                    <Button color="link"><Link to="/newman2">Newman 2</Link></Button>
                </Container>
            </div>
        );
    }
}
export default withRouter(Home);