import Tonic from '@socketsupply/tonic'

class AppContainer extends Tonic {
  constructor() {
    super()
    setInterval(() => {
      console.error('hello')
    }, 1000)
  }
  render () {
    return this.html`<div>Hello, World.</div>`
  }
}

Tonic.add(AppContainer)
