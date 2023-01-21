
export default class Menus {
  name = 'menus-view'
  state = () => ({
    selectedYear: '',
    selectedMonth: ''
  })

  render() {
    return (
      <div class="menus-list">
        <div class="menus-list-title">
          <h1>Menu Archive</h1>
        </div>
       <div class="menus-list-container">
         <p>
           <span style="display: inline-block; margin-right: 20px">
           <label for="year">Year: </label>
            <select
              name="year"
              onchange={(e) => this.selectedYear = e.target.value}>
              <option value="">Select year</option>
              {this.years.map(year => {
                return (<option value={year}>{year}</option>)
              })}
            </select>
         </span>
         {this.selectedYear ? this.monthSelect : null}
         </p>
         <map-items
           items={this.currentMenus}
           data-for={(menu) => this.buildMenu(menu)}>
         </map-items>
      </div>
      </div>
    )
  }

  buildMenu(menu) {
    return (
      <div>
        <h3>{menu.month} {menu.date} -</h3>
        <ul>
          {menu.dishes.map((dish) => {
            return (
              <li onclick={() => this.$router.push({ name: 'RecipePage', params: { id: dish.id }})}>{dish.name}</li>
              )
            })}
           </ul>
        </div>
      )
  }

  get menus() {
    return this.$store.state.menus
  }

  get monthSelect() {
    return (
      <>
      <label for="month">Month: </label>
       <select name="month" onchange={(e) => this.selectedMonth = e.target.value}>
        <option value="">Select month</option>
        {this.availableMonths.map(month => (<option value={month}>{month}</option>))}
      </select>
      </>
    )
  }

  get currentMenus() {
    if (this.menus.length > 0 && this.selectedYear && this.selectedMonth) {
      const menus = this.menus.filter(menu => {
        return (menu.month === this.selectedMonth) && (menu.year === this.selectedYear)
      })
      const sorted = menus.sort((a, b) => {
        return a.date - b.date
      })
      return sorted.map(menu => {
        const dishes = menu.dishes.map(d => {
          const { id, name } = d
          return { id, name }
        })
        return { ...menu, dishes: dishes }
      })
    }
    return []
  }

  get months() {
    if (this.menus.length === 0) return []
    var menuMonths = this.menus.map(menu => menu.month);
    var uniqueMonths = [...new Set(menuMonths)];
    return uniqueMonths
  }

  get availableMonths() {
    if (this.selectedYear) {
      var selectedYearMenus = this.menus.filter(menu => menu.year === this.selectedYear)
      var months = selectedYearMenus.map(menu => menu.month)
      var unique = [...new Set(months)]
      return unique
    }
    return []
  }

  get years() {
    if (this.menus.length === 0) return []
    var menuYears = this.menus.map(menu => menu.year)
    var uniqueYears = [...new Set(menuYears)]
    return uniqueYears
  }

  get styles() {
    return (`
      .menus-list {
      display: grid;
      background-color:#f9f9f9;
      min-height: 800px;
      width: 900px;
      align-content: flex-start;
      margin: 0 auto;
      padding: 30px;
      }

          .menus-list-title {
          width: 100%;
          text-align: center;
          padding: 20px;
          }

      .menus-list h1 {
      padding-top: 0;
      margin-top: 0;
      font-weight: 300;
      font-size: 34px;
      text-align: center;

      }

          .menus-list-container {
          display: grid;
          padding: 30px;

          }


          @media screen and (max-width: 1200px){

            .menus-list {
            width: 850px;
            padding: 30px;
            }


          }

          @media screen and (max-width: 1000px){

            .menus-list {
            width: 800px;
            padding: 30px;
            }


          }

          @media screen and (max-width: 970px){

            .menus-list {
            width: 700px;
            padding: 30px;
            }

            .menus-list h1 {
              font-size: 30px;
            }


          }

          @media screen and (max-width: 766px){

          .menus-list {
            width: 550px;
            padding: 20px;
            }

            .menus-list h1 {
              font-size: 28px;
            }


          }

          @media screen and (max-width: 590px){

            .menus-list {
            width: 420px;

            }

            .menus-list h1 {
              font-size: 28px;
            }


          }

          @media screen and (max-width: 400px){

            .menus-list {
            width: 350px;
            padding-left: 5px;
            padding-right: 5px;
            }

            .menus-list h1 {
              font-size: 25px;
            }


          }
    `)
  }
}
