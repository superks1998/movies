import React, { lazy, Suspense } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";
import { Skeleton } from "antd";
import { isAuthenticated } from "./services/login";

const HomeComponent = lazy(() => import("./pages/home"));
const UpcomingComponent = lazy(() => import("./pages/up-coming"));
const SearchComponent = lazy(() => import("./pages/search"));
const DetailComponent = lazy(() => import("./pages/detail"));
const LoginComponent = lazy(() => import("./pages/login"));

const LoginRouter = ({ children, ...rest }) => {
    const isLogin = isAuthenticated();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLogin ? (
                    <Redirect
                        to={{ pathname: "/", state: { from: location } }}
                    />
                ) : (
                    children
                )
            }
        />
    );
};

const PrivateRoute = ({ children, ...rest }) => {
    const auth = isAuthenticated();
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth ? (
                    children
                ) : (
                    <Redirect
                        to={{ pathname: "login", state: { from: location } }}
                    />
                )
            }
        />
    );
};

const Movies = () => {
    return (
        <Router>
            <Suspense fallback={<Skeleton active />}>
                <Switch>
                    <PrivateRoute path="/home">
                        <HomeComponent />
                    </PrivateRoute>
                    <PrivateRoute path="/up-coming">
                        <UpcomingComponent />
                    </PrivateRoute>
                    <PrivateRoute path="/search">
                        <SearchComponent />
                    </PrivateRoute>
                    <LoginRouter path="/login">
                        <LoginComponent />
                    </LoginRouter>
                    <PrivateRoute path="/movie/:name~:id">
                        <DetailComponent />
                    </PrivateRoute>
                    <PrivateRoute exact path="/">
                        <HomeComponent />
                    </PrivateRoute>
                </Switch>
            </Suspense>
        </Router>
    );
};

export default Movies;
