(async ()=>{
  try {
    const url = 'http://localhost:3000/api/tides/harbors?state=pb';
    console.log('REQUEST URL:', url);
    const res = await fetch(url);
    console.log('STATUS', res.status);
    const json = await res.json();
    console.log('BODY keys:', Object.keys(json));
    console.log(JSON.stringify(json, null, 2).slice(0,4000));
  } catch (e) {
    console.error('ERROR', e);
  }
})();
