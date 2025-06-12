'use client';

import Script from 'next/script';

export default function FacebookPixel() {
  return (
    <>
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'EAAbWwZBXv8ewBO34d2A4nu4uhVQLZA3Y3STCw4wjYtDyfGqX2GVDyoFWVSo0RfWggUZCxKcqEKZCBo5VGdsH28ZB0hi4OOI50hXaX8QZBUG1dzbmNrBZBrUk3DpuydSMCeTbG9nhNbh4MUcW04FK07XZCfpop3vqq8saCqMsFYrd3NbILILH2V3qp8BiJGyPLZCz1swZDZD');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=EAAbWwZBXv8ewBO34d2A4nu4uhVQLZA3Y3STCw4wjYtDyfGqX2GVDyoFWVSo0RfWggUZCxKcqEKZCBo5VGdsH28ZB0hi4OOI50hXaX8QZBUG1dzbmNrBZBrUk3DpuydSMCeTbG9nhNbh4MUcW04FK07XZCfpop3vqq8saCqMsFYrd3NbILILH2V3qp8BiJGyPLZCz1swZDZD&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
} 