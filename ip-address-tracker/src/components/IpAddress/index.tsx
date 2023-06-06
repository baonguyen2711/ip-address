import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.scss'
import { Input } from 'antd'
import iconArrow from '~/assets/img/icon-arrow.svg'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  ElementItems,
  Header,
  MapAddress,
  ResultDiv,
  ResultElement,
  ResultItems,
  SearchGroup,
  SearchInput,
  TitleItems,
  Topic,
  Wrapper
} from '../StyledComponent'
const IpAddress = () => {
  const [ipAddress, setIpAddress] = useState<string>('')
  const [ipData, setIpData] = useState<string>('')
  const [location, setLocation] = useState<string>('')
  const [timezone, setTimezone] = useState<string>('')
  const [isp, setIsp] = useState<string>('')
  const [position, setPosition] = useState<[number, number]>([0, 0])
  const resetData = () => {
    setIpData('')
    setIsp('')
    setLocation('')
    setTimezone('')
  }
  useEffect(() => {
    axios
      .get('https://api.ipify.org/')
      .then((response) => {
        const ipAddress = response.data
        setIpAddress(ipAddress)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  useEffect(() => {
    let url = `https://geo.ipify.org/api/v1?apiKey=${import.meta.env.VITE_APP_API_KEY}`
    let isDomain = ipAddress.includes('.')
    if (ipAddress) {
      url += `&${isDomain ? 'domain' : 'ipAddress'}=${ipAddress}`
      axios
        .get(url)
        .then((response) => {
          const data = response.data
          setIpData(data.ip)
          setLocation(`${data.location.city}, ${data.location.region}, ${data.location.country}`)
          setTimezone(data.location.timezone)
          setIsp(data.isp)
          setPosition([data.location.lat, data.location.lng])
        })
        .catch((error) => {
          console.error(error)
          alert('Domain name does not exist')
          resetData()
        })
    }
  }, [ipAddress])

  const handleSearch = (value: string) => {
    if (value.length === 0) {
      alert('Do not leave the input field blank')
      resetData()

      return
    }
    const isIpAddress = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(value)
    if (isIpAddress || /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/.test(value)) {
      setIpAddress(value)
    } else {
      alert('The domain name is incorrect')
      resetData()
    }
  }

  function MapMarker() {
    const map = useMap()
    if (position[0] !== 0 && position[1] !== 0) {
      const marker = L.marker(position)
      marker.addTo(map)
      map.setView(position, 13)
    }
    return null
  }

  return (
    <>
      <Wrapper>
        <Header className='header'>
          <Topic>IP Address Tracker</Topic>
          <SearchGroup>
            <SearchInput
              placeholder='Search for ant IP address or domain'
              enterButton={<img src={iconArrow} alt='' />}
              onSearch={handleSearch}
            />
          </SearchGroup>
        </Header>
        <ResultDiv>
          <ResultElement>
            <ResultItems>
              <TitleItems>IP Address</TitleItems>
              <ElementItems>{ipData}</ElementItems>
            </ResultItems>
            <ResultItems>
              <TitleItems>Location</TitleItems>
              <ElementItems>{location}</ElementItems>
            </ResultItems>
            <ResultItems>
              <TitleItems>Timezone</TitleItems>
              <ElementItems>{timezone}</ElementItems>
            </ResultItems>
            <ResultItems>
              <TitleItems>ISP</TitleItems>
              <ElementItems>{isp}</ElementItems>
            </ResultItems>
          </ResultElement>
        </ResultDiv>
        <MapAddress>
          <MapContainer center={[0, 0]} zoom={13}>
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            />
            <MapMarker />
          </MapContainer>
        </MapAddress>
      </Wrapper>
    </>
  )
}
export default IpAddress
