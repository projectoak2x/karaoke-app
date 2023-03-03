import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script'

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <body>
        <Main />
        <Script
  id="show-banner"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `// Insert script:
    (function(w, d, s, p, a, c) {
    w.sfButton = w.sfButton || function(){};
    c = d.getElementsByTagName(s)[0];
    a = d.createElement(s);
    a.async=1;
    a.src=p;
    c.parentNode.insertBefore(a, c);
    })(window, document, 'script', '//savefrom.net/js/sf-helper-agent.min.js');
    
    // Text:
    sfButton.text = 'Download';
    
    // Styles:
    sfButton.styles = {
     color: 'rgba(0,0,0,0.7)',
     textShadow: '1px 1px 1px rgba(255,255,255,0.4)',
     fontFamily: 'Arial,Helvetica,sans-serif',
     fontSize: '12px',
     borderRadius: '4px',
     backgroundColor: '#81c200',
     'background-image': '-webkit-linear-gradient(#9cd600, #69ae00)',
     'background-image': '-moz-linear-gradient(#9cd600, #69ae00)',
     'background-image': 'linear-gradient(#9cd600, #69ae00)',
     border: 'none'
    };`,
  }}
/>
        <NextScript />
      </body>
    </Html>
  )
}
