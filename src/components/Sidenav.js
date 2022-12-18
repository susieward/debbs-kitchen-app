
export default class Sidenav {
  name = 'app-sidenav'

  links = [
    { text: 'planner', path: '/' },
    { text: 'about', path: '/about' },
    { text: 'recipes', path: '/recipes' },
    { text: 'menus', path: '/menus' },
    { text: 'index', path: '/tags' }
  ]


  static get observedAttributes() {
    return ['nav-width']
  }

  render() {
    return (
      <div style={`width: ${this['nav-width']}`} class="bm-menu">
          <span class="bm-cross-button cross-style" onclick={() => this.$emit('close')}>
          {[1, 2].map(index => {
              return (
                <span class="bm-cross" style={this.menuStyle(index)}>
                </span>
              )
            })}
             </span>
          <div class="menu-overlay-extended">
              <ul class="menu">
                {this.links.map(link => {
                  return (
                    <li>
                      <a onclick={() => this.$go(link.path)}>{link.text}</a>
                    </li>
                  )
                })}
                  <li style="display: none">
                    <span onclick={() => this.$emit('logout')}>logout</span>
                  </li>
            </ul>
        </div>
      </div>
    )
  }

  menuStyle(index) {
    return `position: absolute; width: 3px; height: 14px; transform: ${index === 1 ? 'rotate(45deg)' : 'rotate(-45deg)'}`
  }

  get styles() {
    return (`
      .bm-menu {
           height: 100%; /* 100% Full-height */
           width: 0; /* 0 width - change this with JavaScript */
           position: fixed; /* Stay in place */
           z-index: 1000; /* Stay on top */
           top: 0;
           left: 0;
           background-color: #333; /* Black*/
           overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 0;
      display: grid;
      justify-content: center;
      align-items: center;
      align-content: flex-start;
           transition: 0.3s; /*0.5 second transition effect to slide in the sidenav*/
         }

         .cross-style {
           position: absolute;
           top: 12px;
           right: 2px;
           cursor: pointer;
         }
         .bm-cross {
           background: #bdc3c7;
         }
         .bm-cross-button {
           height: 24px;
           width: 24px;
         }

      .bm-menu {
           height: 100%; /* 100% Full-height */
           width: 0; /* 0 width - change this with JavaScript */
           position: fixed; /* Stay in place */
           z-index: 1000; /* Stay on top */
           top: 0;
           left: 0;
           background-color: #333; /* Black*/
           overflow-x: hidden; /* Disable horizontal scroll */
      padding-top: 0;
      display: grid;
      justify-content: center;
      align-items: center;
      align-content: flex-start;
           transition: 0.3s; /*0.5 second transition effect to slide in the sidenav*/
         }

         .bm-overlay {

         }
         .bm-item-list {
           color: #b8b7ad;

           font-size: 20px;
         }
         .bm-item-list > * {
           display: flex;
           text-decoration: none;
           padding: 0.7em;
         }
         .bm-item-list > * > span {

           font-weight: 700;
           color: white;
         }


           .menu {
           list-style-type: none;
           padding: 0;
           margin: 0;
           }

           .menu li {
      width: 200px;
               margin: 0;
           }

           .menu li a {
               font-size: 18px;
               padding: 10px 8px 10px 8px;
               color: #fff;
               text-transform: lowercase;
               font-weight: 300;
               display: block;
               letter-spacing: 0.09em;
               text-align: center;
               color: #fff;
           }

           .menu li a.router-link-exact-active {
             color: #fff;
           }

           .menu li:first-child a {
            padding-top: 10px;
           }

           .menu li:last-child a {
           padding-bottom: 10px;
           }

           .menu li a:hover {
               background-color: #999;
               color: #fff;
           }


      .menu-overlay {
        height: 100vh;
      background-color: #333;
      overflow: hidden;
      transition: 0.3s;

      }

      .menu-overlay-extended a {

      }

      .menu-overlay-extended {
      margin-top: 55px;
      background-color: #333;
      display: grid;
      justify-content: center;
      transition: 0.3s;

      padding: 0;
      }

      .menu-closebtn {
      position: absolute;
      font-size: 40px;
      top: 5px;
      right: 8px;
      margin-left: 50px;
      cursor: pointer;
      font-weight: 300;
      }
    `)
  }
}
