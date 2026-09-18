import type {
  IHttpRequestOptions,
  IExecuteSingleFunctions,
} from 'n8n-workflow';

/**
 * A shared preSend function to log and augment outgoing requests
 */
export async function preSendLogger(this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions) {

	this.logger.debug('╔═══════════════════════════════════════════════════════════╗');
	this.logger.debug('║              REQUEST LOGGED                               ║');
	this.logger.debug('╚═══════════════════════════════════════════════════════════╝');
	this.logger.debug(`URL: ${requestOptions.url}`);
	this.logger.debug(`HEADERS: ${JSON.stringify(requestOptions.headers, null, 2)}`);
	this.logger.debug(`METHOD: ${requestOptions.method}`);
	this.logger.debug(`BODY: ${JSON.stringify(requestOptions.body, null, 2)}`);
	this.logger.debug(`QS: ${JSON.stringify(requestOptions.qs, null, 2)}`);
	this.logger.debug('═══════════════════════════════════════════════════════════');
	return requestOptions;
}
