import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'mobx-react'
import { stores } from './store'
import Count from './Count'
function App() {
  return (
    <Provider {...stores}>
      <Count />
    </Provider>
  )
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
)
