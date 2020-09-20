import App from "./App";
import { getHooks } from "./utils/hooks";

export function createRootRoute(store) {
    const { loadModule, errorLoading } = getHooks(store);
    return {
        path: '/',
        indexRoute: {
            component: App,
        },
        childRoutes: [
            {
                path: '*',
                getComponent(nextState, cb) {
                    import('./components/NotFound')
                        .then(loadModule(cb))
                        .catch(errorLoading);
                },
            }
        ],
    }
}