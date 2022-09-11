let queueName = 'testQueueBrowser';
let queueType = 'fanout';

let connectObj = { queueName, queueType };
let connectionSearchParamsString = new URLSearchParams(connectObj).toString();
let baseURL = 'http://localhost:3000/consumer/connect';
let urlWithParams = `${baseURL}?${connectionSearchParamsString}`;
let e = new EventSource(urlWithParams);
e.onmessage = console.log;
