import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';

import PagesRouteConfig from 'app/main/PageRoutesConfig';
import LoginConfig from 'app/main/login/LoginConfig';

const routeConfigs = [
	PagesRouteConfig,
	LoginConfig
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/dashboard" />
	}
];

export default routes;
