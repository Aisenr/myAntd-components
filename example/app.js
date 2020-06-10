import React from 'react';
import ReactDOM from 'react-dom';
import {
  Switch,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

const routes = [
  { path: '/container-example', component: require('./pages/container-example').default },
  { path: '/rank-list-example', component: require('./pages/rank-list-example').default },
  { path: '/area-select-example', component: require('./pages/area-select-example').default },
  { path: '/counter-animation-example', component: require('./pages/counter-animation-example').default },
  { path: '/date-format-example', component: require('./pages/date-format-example').default },
  { path: '/detail-group-example', component: require('./pages/detail-group-example').default },
  { path: '/dynamic-info-horizontal-example', component: require('./pages/dynamic-info-horizontal-example').default },
  { path: '/dynamic-info-vertical-example', component: require('./pages/dynamic-info-vertical-example').default },
  { path: '/dynamic-info-vertical-second-example', component: require('./pages/dynamic-info-vertical-second-example').default },
  { path: '/ellipsis-example', component: require('./pages/ellipsis-example').default },
  { path: '/info-card-example', component: require('./pages/info-card-example').default },
  { path: '/info-list-example', component: require('./pages/info-list-example').default },
  { path: '/list-table-example', component: require('./pages/list-table-example').default },
  { path: '/message-item-example', component: require('./pages/message-item-example').default },
  { path: '/news-panel-example', component: require('./pages/news-panel-example').default },
  { path: '/map-example', component: require('./pages/map-example').default },
  { path: '/echarts-example', component: require('./pages/echarts-example').default },
  { path: '/number-format-example', component: require('./pages/number-format-example').default },
  { path: '/overall-details-example', component: require('./pages/overall-details-example').default },
  { path: '/echarts-china-map-example', component: require('./pages/echarts-china-map-example').default },
  { path: '/parse-code-example', component: require('./pages/parse-code-example').default },
  { path: '/picture-list-example', component: require('./pages/picture-list-example').default },
  { path: '/position-input-box-example', component: require('./pages/position-input-box-example').default },
  { path: '/position-show-example', component: require('./pages/position-show-example').default },
  { path: '/upload-button-example', component: require('./pages/upload-button-example').default },
  { path: '/slide-show-example', component: require('./pages/slide-show-example').default },
  { path: '/form-group-example', component: require('./pages/form-group-example').default },
  { path: '/form-multiple-columns-example', component: require('./pages/form-multiple-columns-example').default },
  { path: '/form-multiple-example', component: require('./pages/form-multiple-example').default },
  { path: '/select-area-example', component: require('./pages/select-area-example').default },
  { path: '/select-point-example', component: require('./pages/select-point-example').default },
  { path: '/select-route-example', component: require('./pages/select-route-example').default },
  { path: '/password-input-box-example', component: require('./pages/password-input-box-example').default },
  { path: '/select-item-example', component: require('./pages/select-item-example').default },
  { path: '/sms-verification-code-example', component: require('./pages/sms-verification-code-example').default },
  { path: '/geo-map-example', component: require('./pages/geo-map-example').default },
  { path: '/geo-map-new-example', component: require('./pages/geo-map-new-example').default },
  { path: '/time-interval-example', component: require('./pages/time-interval-example').default },
  { path: '/file-upload-example', component: require('./pages/file-upload-example').default },
  { path: '/date-picker-example', component: require('./pages/date-picker-example').default },
  { path: '/file-list-example', component: require('./pages/file-list-example').default },
  { path: '/map-new-example', component: require('./pages/map-new-example').default },
  { path: '/position-show-new-example', component: require('./pages/position-show-new-example').default },
  { path: '/position-input-box-new-example', component: require('./pages/position-input-box-new-example').default },
  { path: '/select-area-new-example', component: require('./pages/select-area-new-example').default },
  { path: '/select-point-new-example', component: require('./pages/select-point-new-example').default },
  { path: '/select-route-new-example', component: require('./pages/select-route-new-example').default },
  { path: '/rich-text-editor-example', component: require('./pages/rich-text-editor-example').default },
  { path: '/', component: require('./pages/home').default, exact: true },
];

const App = () =>
  (
    <Router>
      <Switch>
        {
          routes.map(route => (
            <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
          ))
        }
      </Switch>
    </Router>
  );

ReactDOM.render(<App />, document.getElementById('root'));
