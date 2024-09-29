import Script from 'next/script';
import Map from './Map';

export default function Home() {
  return (
    <div>
      	<Script
				src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
				strategy="beforeInteractive"
			/>
      <h1 style={{ textAlign: 'center' }}>Real-Time Location Tracking</h1>
      <Map />
    </div>
  );
}
