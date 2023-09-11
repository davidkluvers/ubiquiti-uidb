import Head from 'next/head';
import { useState, useEffect } from 'react';
import React from 'react';
import { DevicesType } from 'types/global';
import Devices from '@components/Devices';
import Header from '@components/Header';

export default function Home() {
  const [deviceData, setDeviceData] = useState<DevicesType | null>(null);
  const [isLoading, setLoading] = useState<Boolean>(true);

  useEffect(() => {
    fetch('https://static.ui.com/fingerprint/ui/public.json')
      .then((res) => res.json())
      .then((data) => {
        setDeviceData(data.devices);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <>loading</>;
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link
          rel="preload"
          href="/fonts/ui-sans-v7-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/ui-sans-v7-bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />
        {deviceData === null ? (
          <div>loader</div>
        ) : (
          <Devices devices={deviceData} />
        )}
      </main>
    </div>
  );
}
