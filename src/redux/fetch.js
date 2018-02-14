/* istanbul ignore file */
import { stringify } from 'qs';
import { curry, get as lodashGet } from 'lodash';

function headersWithAuth(auth = true) {
  if (!auth) return {};
  const accessToken = lodashGet(JSON.parse(memoryDB.tokenInfo || '{}'), 'data.id_token');
  if (accessToken) {
    return { Authorization: accessToken };
  }
  return {};
}

export function makeApiUrl(endpoint, query) {
  const queryString = stringify(query, { encode: false, arrayFormat: 'brackets' });
  return `${endpoint}${queryString ? '?' : ''}${queryString}`;
}

function checkStatus(response) {
  if (response.status < 400) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function processError({ endpoint/* , query, auth, url, method */ }) {
  /* const metadata = {
    endpoint,
    query,
    url,
    auth,
    method
  };

  const name = `API Error: ${method} ${endpoint}`;
  const severity = 'error'; */

  return error => ({
    error: error.message || `${error.response.status} error calling ${endpoint}`,
  });
}

async function processResponse(response) {
  const body = await response.json();
  return {
    response: {
      headers: response.headers,
      body,
      status: response.status,
    },
  };
}

export async function get(endpoint, query, auth = true) {
  const url = makeApiUrl(endpoint, query, auth);
  try {
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        ...headersWithAuth(auth),
      },
    });
    const status = checkStatus(res);
    const processedResponse = await processResponse(status);
    return processedResponse;
  } catch (e) {
    return processError({
      endpoint,
      query,
      url,
      method: 'GET',
    })(e);
  }
}
async function postOrPutOrDelete(method, endpoint, { query, auth = true, requestBody = {} } = {}) {
  const url = makeApiUrl(endpoint, query);
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/vnd.api+json',
        Accept: 'application/vnd.api+json',
        ...headersWithAuth(auth),
      },
      body: JSON.stringify(requestBody),
    });
    const status = checkStatus(res);
    const processedResponse = await processResponse(status);
    return processedResponse;
  } catch (e) {
    return processError({
      endpoint,
      query,
      url,
      auth,
      method: 'GET',
    })(e);
  }
}

export const post = curry(postOrPutOrDelete)('POST');
export const put = curry(postOrPutOrDelete)('PUT');
export const del = curry(postOrPutOrDelete)('DELETE');
