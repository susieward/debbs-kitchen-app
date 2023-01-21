import Header from '@/components/layout/Header'
import Sidenav from '@/components/layout/Sidenav'

export default class App {
  name = 'debbs-kitchen-app'
  components = { Header, Sidenav }
  state = () => ({
    prevRoute: null,
    routeName: '',
    loggedIn: false,
    isActive: false,
    isSideBarOpen: false
  })

  async createdCallback() {
    await this.$store.dispatch('init')
  }

  /*
  connectedCallback() {
    document.addEventListener('click', this.documentClick);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.documentClick);
  }
  */

  render() {
      return (
        <div id="app">
          <div class="app-container">
            <app-sidenav
              nav-width={this.navWidth}
              onclose={() => this.closeMenu()}
              onlogout={() => this.logout()}>
            </app-sidenav>
            <app-header
              class="header"
              onOpen={() => this.openMenu()}>
            </app-header>
            <main class="main">
                <router-view onroute={(r) => this.displayPrevRoute(r)}></router-view>
              </main>
            <footer class="footer">
              <div class="footer-container">
                <p>
                  &copy; Debbie Ward { new Date().getFullYear() }<br />
                  website by <a href="https://susieward.dev">Susie Ward</a>
                </p>
              </div>
            </footer>
          </div>
        </div>
      )
    }

    get navWidth() {
      return this.isSideBarOpen ? '200px' : '0px'
    }

    openMenu() {
      this.isSideBarOpen = true
    }

    closeMenu() {
      this.isSideBarOpen = false
    }

    documentClick(e){
      let element = this.$refs.bmBurgerButton;
      let target = null;
      if (e && e.target) {
        target = e.target;
      }
      if (element && element !== target && !element.contains(target) && e.target.className !== 'bm-menu' && this.isSideBarOpen){
        this.closeMenu();
      }
    }

    loginSuccess(){
      this.loggedIn = true;
    }

    logout(){
        // this.$store.commit('AUTH_LOGOUT');
        this.$router.push('/')
    }

    displayPrevRoute(prevRoute){
      this.prevRoute = prevRoute;
      this.routeName = this.prevRoute.params.name;
    }

  get styles() {
    return (`
      #app {
        display: grid;
        background-color: #fff;
        min-height: 100vh;
        z-index: 1;
        position: relative;
      }

      .app-container {
        display: grid;
        grid-template-areas: "header"
                            "main"
                            "footer";
        z-index: 0;
        grid-template-rows: 90px auto auto;
        position: relative;
      }

      .header {
        grid-area: header;
        display: grid;
        align-content: center;
        padding: 0px 30px;
        background-color: #f8f8f8;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
        position: relative;
      }

      /* MAIN */
      .main {
      grid-area: main;
      display: grid;
      grid-gap: 40px;
      justify-content: center;
      margin-top: 40px;
      }

      /* CONTENT */

      .content {
      display: grid;
      padding: 0;
      border: 1px solid blue;
      }

      /* FOOTER */
      .footer {
        display: grid;
        min-height: 120px;
        justify-content: center;
        width: 100vw;
      }

      .footer-container {
      display: grid;
      align-content: center;
      padding: 20px;
      font-size: 14px;
      letter-spacing: 0.07em;
      color: #bbb;
      text-align: center;
      }

    `)
  }
}
