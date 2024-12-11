const proxyServer = 'https://people.rit.edu/~dsbics/proxy/https://ischool.gccis.rit.edu/api/'

// getData goes and hits the RESTFUL API Endpoint
async function getData(endpoint) {
    const res = await fetch(`${proxyServer}${endpoint}`);
    return await res.json();
}

function other() {
}

function thing() {
}

export default getData;
export {other, thing}