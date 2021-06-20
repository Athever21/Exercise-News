import React, { lazy, Suspense } from "react";
import { hot } from "react-hot-loader";
import "./App.scss";

import Header from "./components/news/Header";
import Pages from "./components/news/Pages";
const Filter = lazy(() => import("./components/filters/Filter"));
const News = lazy(() => import("./components/news/News"));

const App = () => (
  <div>
    <Suspense fallback={<></>}>
      <Filter />
      <Header />
      <News />
      <Pages />
    </Suspense>
  </div>
);
export default hot(module)(App);
