const http = require('http');
const https = require('https');
const { URL } = require('url');

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.url === '/status') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, proxy: 'Kaid Browser Proxy', port: PORT }));
    return;
  }

  if (req.url.startsWith('/fetch?url=')) {
    const targetUrl = decodeURIComponent(req.url.slice('/fetch?url='.length));
    if (!targetUrl) { res.writeHead(400); res.end('Missing url'); return; }

    let parsed;
    try { parsed = new URL(targetUrl); } catch(e) { res.writeHead(400); res.end('Invalid URL'); return; }

    const transport = parsed.protocol === 'https:' ? https : http;
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === 'https:' ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'identity'
      },
      timeout: 10000
    };

    const proxyReq = transport.request(options, (proxyRes) => {
      const contentType = proxyRes.headers['content-type'] || '';
      const isHtml = contentType.includes('text/html') || contentType.includes('application/xhtml');

      if (isHtml) {
        let body = [];
        proxyRes.on('data', (chunk) => body.push(chunk));
        proxyRes.on('end', () => {
          let html = Buffer.concat(body).toString('utf8');
          const baseHref = parsed.origin + parsed.pathname.substring(0, parsed.pathname.lastIndexOf('/') + 1);

          if (!html.includes('<base')) {
            html = html.replace(/<head([^>]*)>/i, '<head$1><base href="' + baseHref + '">');
            if (!html.match(/<head/i)) {
              html = '<head><base href="' + baseHref + '"></head>' + html;
            }
          }

          html = html.replace(/<\/head>/i, `
<script>
(function(){
  document.addEventListener("click",function(e){
    var a=e.target.closest("a[href]");
    if(!a)return;
    var h=a.getAttribute("href");
    if(!h||h.startsWith("javascript:")||h.startsWith("#")||h.startsWith("mailto:"))return;
    e.preventDefault();
    try{var u=new URL(h,location.href).href;}catch(er){return;}
    window.parent.postMessage({type:"kb-navigate",url:u},"*");
  });
  document.addEventListener("submit",function(e){
    var f=e.target;if(!f.action)return;
    e.preventDefault();
    var fd=new FormData(f);var params=[];
    fd.forEach(function(v,k){params.push(encodeURIComponent(k)+"="+encodeURIComponent(v));});
    var method=(f.method||"GET").toUpperCase();
    try{var a=new URL(f.action,location.href).href;}catch(er){return;}
    if(method==="GET"){window.parent.postMessage({type:"kb-navigate",url:a+"?"+params.join("&")},"*");}
    else{window.parent.postMessage({type:"kb-navigate",url:a},"*");}
  });
})();
</script>
</head>`);

          res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
            'X-Proxy-Url': targetUrl,
            'X-Base-Href': baseHref
          });
          res.end(html);
        });
      } else {
        res.writeHead(proxyRes.statusCode, {
          'Content-Type': contentType || 'application/octet-stream',
          'X-Proxy-Url': targetUrl
        });
        proxyRes.pipe(res);
      }
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });

    proxyReq.on('timeout', () => {
      proxyReq.destroy();
      res.writeHead(504, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Timeout' }));
    });

    proxyReq.end();
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log('Kaid Browser Proxy running on http://localhost:' + PORT);
  console.log('Status: http://localhost:' + PORT + '/status');
  console.log('Fetch:  http://localhost:' + PORT + '/fetch?url=https://example.com');
});
