import * as uWebsockets from 'uWebSockets.js';
import Request from './http/Request';
import Response from './http/Response';
import Router from './router/Router'

interface ServerConstructorOptions {
    key_file_name?: string,
    cert_file_name?: string,
    passphrase?: string,
    dh_params_file_name?: string,
    ssl_prefer_low_memory_usage?: boolean,
    fast_buffers?: boolean,
    fast_abort?: boolean,
    trust_proxy?: boolean,
    max_body_length?: number
}

type GlobalErrorHandler = (request: Request, response: Response, error: Error) => void;
type GlobalNotFoundHandler = (request: Request, response: Response) => void;

export default class Server extends Router {
    constructor(options?: ServerConstructorOptions)

    /* Server Methods */

    /**
     * Starts HyperExpress webserver on specified port and host.
     *
     * @param {Number} port
     * @param {String=} host Optional. Default: 0.0.0.0
     * @returns {Promise} Promise
     */
    listen(port: number, host?: string): Promise<uWebsockets.us_listen_socket|string>;

    /**
     * Stops/Closes HyperExpress webserver instance.
     *
     * @param {uWebSockets.us_listen_socket=} [listen_socket] Optional
     * @returns {Boolean}
     */
    close(listen_socket?: uWebsockets.us_listen_socket): boolean;

    /**
     * Sets a global error handler which will catch most uncaught errors across all routes/middlewares.
     *
     * @param {GlobalErrorHandler} handler
     */
    set_error_handler(handler: GlobalErrorHandler): void;

    /**
     * Sets a global not found handler which will handle all requests that are unhandled by any registered route.
     * Note! This handler must be registered after all routes and routers.
     *
     * @param {GlobalNotFoundHandler} handler
     */
    set_not_found_handler(handler: GlobalNotFoundHandler): void;

    /* Server Properties */

    /**
     * Underlying uWS instance.
     * @returns {uWebSockets.us_listen_socket}
     */
    get uws_instance(): uWebsockets.TemplatedApp;

    /**
     * Server instance global handlers.
     * @returns {Object}
     */
    get handlers(): Object;
}