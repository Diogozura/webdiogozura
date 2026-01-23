(async ()=>{
  try {
    const url = 'http://localhost:3000/api/tides/tabua-mare?harbor=pb01&month=1&days=%5B1,2,3%5D';
    console.log('REQUEST URL:', url);
    const res = await fetch(url);
    console.log('STATUS', res.status);
    const text = await res.text();
    console.log('BODY (first 4000 chars):\n', text.slice(0,4000));
  } catch (e) {
    console.error('ERROR', e);
  }
})();
