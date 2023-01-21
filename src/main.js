import Witchly from 'witchly'
import App from './App'
import router from './router'
import store from './state'
import './css/main.css'
import Layout from '@/components/layout/Layout'

Witchly.component(Layout)

new Witchly({
  id: 'app',
  render: () => App,
  router,
  store
})
