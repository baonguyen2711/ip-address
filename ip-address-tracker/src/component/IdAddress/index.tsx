import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import './style.scss';
import { Input } from 'antd';
import iconArrow from '~/assets/img/icon-arrow.svg';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const API_KEY = 'at_EogJizNJy1tYMxrO8gGmpnynffaOB';

const IdAddress= ()=> {
  const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');
  const [position, setPosition] = useState<[number,number]>([0, 0]);

  const { Search } = Input;
  useEffect(() => {
    axios.get('https://api.ipify.org/')
      .then(response => {
        const ipAddress = response.data;
        setIpAddress(ipAddress);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    if (ipAddress) {
      axios.get(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}&ipAddress=${ipAddress}`)
        .then((response) => {
          const data = response.data;
          setLocation(`${data.location.city}, ${data.location.region}, ${data.location.country}`);
          setTimezone(data.location.timezone);
          setIsp(data.isp);
          setPosition([data.location.lat, data.location.lng]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [ipAddress]);

  const handleSearch = (value: string) => {
    setIpAddress(value);
  }

  function MapMarker() {
    const map = useMap();
    if (position[0] !== 0 && position[1] !== 0) {
      const marker = L.marker(position);
      marker.addTo(map);
      map.setView(position, 13);
    }
    return null;
  }
  
  return (
    <>
      <div className='root'>
        <div className='root__header'>
          <div className='root__header--topic'>IP Address Tracker</div>
          <Search
            placeholder="Enter IP address"
            allowClear
            enterButton={<img src={iconArrow} alt='' />}
            onSearch={handleSearch}
          />
        </div>
        <div className='root__content'>
          <div className='root__content--element'>
            <div>
              <p>IP Address</p>
              <h3>{ipAddress}</h3>
            </div>
            <div>
              <p>Location</p>
              <h3>{location}</h3>
            </div>
            <div>
              <p>Timezone</p>
              <h3>{timezone ? moment.utc().tz(timezone).format('Z') : ''}</h3>
            </div>
            <div>
              <p>ISP</p>
              <h3>{isp}</h3>
            </div>
          </div>
          
        </div>
        <div className='root__content--map'>
            <MapContainer center={[0, 0]} zoom={13}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors" />
              <MapMarker />
            </MapContainer>
          </div>
      </div>
    </>
  )
}
export default IdAddress;