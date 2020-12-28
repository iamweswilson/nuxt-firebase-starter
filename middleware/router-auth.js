export default function({ store, redirect, route }) {
  store.state.user != null && route.name == 'login' ? redirect('/account') : ''
  store.state.user != null && route.name == 'signup' ? redirect('/account') : ''
  store.state.user == null && isAccountRoute(route) ? redirect('/login') : ''
}

function isAccountRoute(route) {
  if (route.matched.some(record => record.path == '/account')) {
    return true
  } else if (route.matched.some(record => record.path == '/upload')) {
    return true
  }
}