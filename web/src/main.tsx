import './index.css';

import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  Outlet,
  RouterProvider,
  Link,
  Router,
  Route,
  RootRoute,
} from '@tanstack/react-router';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './redux/store';
import Canvas from './components/Canvas.tsx';

// Create a root route
const rootRoute = new RootRoute({
  component: Root,
});

function Root() {
  return (
    <>
      <div>
        <Link to="/">Home</Link> <Link to="/about">About</Link>{' '}
        <Link to="/canvas">Canvas</Link>
      </div>
      <hr />
      <Outlet />
    </>
  );
}

// Create an index route
const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Index,
});

function Index() {
  return (
    <div>
      <h3>Welcome Home!</h3>
    </div>
  );
}

const aboutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: About,
});

function About() {
  return <div>Hello from About!</div>;
}

const canvasRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/canvas',
  component: Canvas,
});

// Create the route tree using your routes
const routeTree = rootRoute.addChildren([indexRoute, aboutRoute, canvasRoute]);

// Create the router using your route tree
const router = new Router({ routeTree });

// Register your router for maximum type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
