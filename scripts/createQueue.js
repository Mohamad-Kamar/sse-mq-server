let queueKey = 'testQueueBrowser';
let queueType = 'fanout';

let createObj = JSON.stringify({ queueKey, queueType });
let r = fetch('http://localhost:3000/queue', {
  method: 'POST',
  body: createObj,
  headers: {
    'Content-Type': 'application/json',
  },
});
r.then((res) => res.json()).then(console.log);
