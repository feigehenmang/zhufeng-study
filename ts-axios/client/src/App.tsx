import { useEffect, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import axios, { AxiosRequestConfig, AxiosResponse } from './axios'
// interceptor
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config?.headers?.name ? config.headers.name += '1' : config!.headers!.name = 'name'
  return config
})
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config?.headers?.name ? config.headers.name += '2' : config!.headers!.name = 'name'
  return config
})
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config?.headers?.name ? config.headers.name += '3' : config!.headers!.name = 'name3'
  return config
})
axios.interceptors.response.use((config: AxiosResponse) => {
  config.data.user +=1
  return config
})
axios.interceptors.response.use((config: AxiosResponse) => {
  config.data.user +=2
  return config
})
axios.interceptors.response.use((config: AxiosResponse) => {
  config.data.user +=3
  return config
})

const baseUrl = 'http://localhost:8080'
type User = {
  user: string,
  age: number
}
axios({
  url: baseUrl + '/get',
  method: 'get',
  params: {
    user: 'zs',
    age: 14
  },
  headers: {
    name: 'name'
  }
}).then((result: AxiosResponse<User>) => {
  console.log(result)
  // result.data.
  // result.data.user
}, (err: any) => {
  console.log(err)
})

function App() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    
  })
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
