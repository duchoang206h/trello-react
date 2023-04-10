import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './index.css';
import { Navbar } from './components/Navbar';
import { SignUpPage } from './pages/SignUpPage';
import { SignInPage } from './pages/SignInPage';
import { BoardsPage } from './pages/BoardsPage';
import { BoardPage } from './pages/BoardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ROUTES } from './config/constant';

const App = () => {
    return (
        <Router>
            <>
                <Navbar />
                <div className="h-full">
                    <Switch>
                        <Redirect exact from="/" to="/boards" />
                        <Route exact path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route exact path={ROUTES.BOARDS} component={BoardsPage} />
                        <Route exact path={ROUTES.BOARD} component={BoardPage} />
                        <Route component={NotFoundPage} />
                    </Switch>
                </div>
            </>
        </Router>
    );
};

export default App;
