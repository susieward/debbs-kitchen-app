import Witchly from '../../../src'
import App from './App'
import router from './router'
import store from './state'
// import './app.css'
import './css/main.css'
import { Layout, LayoutTop, LayoutContent } from '@/components/Layout'

Witchly.components([Layout, LayoutTop, LayoutContent])

new Witchly({
  id: 'app',
  render: () => App,
  router,
  store
})
