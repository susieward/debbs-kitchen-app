import Navbar from '@/components/Navbar.js'

export default class Header {
  name = 'app-header'
  state = () => ({
    search: ''
  })

  render() {
    return (
      <div class="header-container">
          <div class="icon-nav">
              <div class="bm-burger-button" onclick={() => this.$emit('open')}>
                {[1, 2, 3].map(index => {
                  return (
                    <span class="bm-burger-bars line-style"
                      style={`top: ${20 * (index * 2)}%`}>
                    </span>
                  )
                })}
              </div>
          </div>
          <Navbar $router={this.$router}>
            <div slot="title">
              <h1 style="cursor: pointer" onclick={() => this.$router.push({ path: '/' })}>
                Debb's Kitchen
              </h1>
            </div>
          </Navbar>
          <div class="search">
          </div>
      </div>
    )
  }

  startSearch() {
    this.$router.push({ name: 'SearchResults', params: { search: this.search }});
  }

  get styles() {
    return (`
      .header-container {
        display: grid;
        grid-template-areas: "menu left search";
        grid-template-columns: auto 1fr auto;
        align-content: center;
        grid-column-gap: 30px;
        padding: 0;
        margin: 0;
      }

      .header-container h1 {
        display: inline-block;
        margin: 0;
        padding: 0;
        font-weight: 400;
        font-size: 28px;
        letter-spacing: 0.03em;
      }

      .title-and-links {
        display: grid;
        grid-area: left;
        grid-auto-columns: auto;
        grid-auto-flow: column;
        align-content: center;
        justify-content: flex-start;
        grid-gap: 30px;
        margin: 0;
        padding: 0;
      }

      .title {
        display: grid;
        justify-content: flex-start;
        align-content: center;
        width: auto;
      }

      /* LINKS */

      .links {
        display: grid;
        margin: 0;
        padding: 0;
      }


      nav {
        display: grid;
        grid-gap: 30px;
        grid-auto-columns: auto;
        grid-auto-flow: column;
        padding: 0;
        margin: 0;
        align-content: center;
      }

      nav a {
        display: inline-block;
        font-size: 18px;
        line-height: normal;
        font-weight: 400;
        letter-spacing: 0.03em;
        transition: 0.3s;
        margin: auto 0;
        cursor: pointer;
      }

      nav a:hover {
      color: #444;
      }

      nav a.router-link-exact-active {
      color: #444;
      }

      /* SEARCH BAR */

      .search {
      grid-area: search;
      display: grid;
      align-content: center;
      justify-content: flex-end;


      }

      #bar {
      width: 200px;
      border: 1px solid #eee;
      border-radius: 6px;
      padding: 6px 12px;
      font-family: 'Proxima Nova Light';
      font-size: 18px;

      }


      /* MENU */

      .icon-nav {
        grid-area: menu;
        display: grid;
        width: 30px;
        height: auto;
        cursor: pointer;
      }

      .bm-burger-button {
           position: absolute;
           width: 30px;
           height: 25px;
           left: 35px;
           top: 28%;
           cursor: pointer;
           display: block;

         }
      .bm-burger-bars {
           background-color: #aaa;
         }
      .line-style {
           position: absolute;
           height: 8%;
           top: 0;
           left: 0;
           right: 0;
         }

         @media screen and (max-width: 1200px){

           .header-container h1 {
             font-size: 30px;
           }

           nav {
             grid-gap: 30px;
           }

           nav a {
             font-size: 17px;
           }

           #bar {
             width: 180px;
           }
         }

         @media screen and (max-width: 970px){

           .header {
             padding: 30px;
           }

           .title-and-links {
             grid-template-areas: "menu title";
             align-content: center;
             grid-gap: 20px;
           }

           .links {
             display: none;
           }

         .bm-burger-button {
           display: block;
         }

           .menu-dropdown {
           display: none;
           background-color: #333;
           opacity: 0.9;
           width: 140px;
           margin-top: 10px;

           position: relative;
           z-index: 500;
           }

         }


         @media screen and (max-width: 766px){

             .header-container h1 {
               font-size: 30px;
             }


             nav {
               grid-gap: 30px;
             }

             nav a {
               font-size: 16px;
             }

             #bar {
               width: 160px;
               font-size: 16px;
               padding: 4px 6px;
             }

           }

           @media screen and (max-width: 590px){

             .header-container {

             }

             .header-container h1 {
               font-size: 20px;
             }

             .icon-item {
                 width: 32px;
             }


           }
    `)
  }
}
