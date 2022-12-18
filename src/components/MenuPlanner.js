const Modal = () => import('@/components/Modal.js')

export default class MenuPlanner {
  name = 'menu-planner'
  components = { Modal }
  state = () => ({
    dateContext: null,
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    showModal: false,
    thisDate: '',
    currentDays: null
  })

  watch = {
    dateContext: {
      handler(newValue) {
        if (newValue) {
          this.updateDays()
        }
      }
    }
  }

  createdCallback() {
    let date = new Date().setHours(0, 0, 0, 0)
    this.dateContext = new Date(date)
  }

  render() {
    return (
      <div class="menu-planner">
        <div class="page-title">
          <button class="monthbtn" onclick={() => this.updateMonth(this.month - 1)}>
            &#x27F5;
          </button> <h1>{this.monthName + ' - ' + this.year}</h1>
          <button class="monthbtn" onclick={() => this.updateMonth(this.month + 1)}>
            &#x27F6;
          </button>
        </div>
        <div class="month">
          <div class="weekdays">
            {this.weekdays.map(day => {
              return (<div class="day-title">{day}</div>)
            })}
          </div>
            <div class="week">
              {this.currentDays}
            </div>
        </div>
        {this.showModal ? this.modal : null}
      </div>
    )
  }

  get modal() {
    return (
      <app-modal
          menus={this.createdMenus}
          date={this.thisDate}
          month={this.monthName}
          year={this.year}
          onclose={() => this.closeModal()}>
        </app-modal>
    )
  }

  get menus() {
    return this.$store.state.menus
  }

  get createdMenus() {
    if (this.menus.length > 0) {
      let x = this.menus.filter(({date}) => date === this.thisDate)
      return x.filter(({month}) => month === this.monthName)
    }
    return []
  }

  get year() {
    return this.dateContext.getFullYear()
  }

  get month() {
    return this.dateContext.getMonth()
  }

  get monthName() {
    return this.months[this.month]
  }

  get firstDay() {
    let ctx = new Date(this.dateContext)
    ctx.setDate(1)
    ctx.setHours(0,0,0,0)
    return new Date(ctx).getDay()
  }

  get daysInMonth() {
    return this.getDaysInMonth(this.year, this.month + 1)
  }

  updateDays() {
    if (this.currentDays) this.currentDays = null
    this.currentDays = this.buildMonthDays()
  }

  buildMonthDays() {
    const days = []
    const firstDay = this.firstDay
    const daysInMonth = this.daysInMonth

    for (let i = 1; i <= firstDay; i++) {
      days.push(<div class="day">&nbsp;</div>)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(this.buildDay(i))
    }
    return days
  }

  getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
  }

  buildDay(date) {
    const dateMenus = this.getDateMenus(date)
    return (
      <div class="day" onclick={() => this.openModal(date)}>
        {date}
        {(dateMenus.length > 0) ? this.buildMenuList(dateMenus) : null}
      </div>
    )
  }

  buildMenuList(dateMenus) {
    return dateMenus.map(menu => {
      return (
        <div>
          <span class="menu-dot">&#11044;</span>
            <div class="menu-text">
            <ul class="menu-list-calendar">
              {menu.dishes.map(dish => (<li>{dish.name}</li>))}
            </ul>
          </div>
        </div>
      )
    })
  }

  getDateMenus(date) {
    return this.menus.filter(m => (m.date == date && m.month === this.monthName))
  }

  updateMonth(month) {
    let ctx = new Date(this.dateContext)
    ctx.setMonth(month)
    ctx.setDate(1)
    ctx.setHours(0,0,0,0)
    this.dateContext = new Date(ctx)
  }

  openModal(e){
    this.thisDate = Number(e)
    this.showModal = true
  }

  closeModal() {
    this.showModal = false
  }

  get styles() {
    return (`
      .menu-planner {
      display: grid;
      background-color:#f9f9f9;
      justify-content: center;
      padding: 20px 30px 30px 30px;
      margin: 0 auto;
      }

      .menu-planner h1 {
      text-align: center;
      margin: 0px;
      padding: 0;
      font-weight: 300;
      font-size: 34px;
      line-height: 45px;
      }

      .page-title {
      display: grid;
      grid-template-columns: 100px auto 100px;
      grid-gap: 20px;
      padding: 20px;
      margin-bottom: 20px;
      }

          .monthbtn {
          border: none;
          font-size: 30px;
          cursor: pointer;
          background-color: #f9f9f9;
          color: var(--app-accent);
          border: none;
          }

      .month {
      display: grid;
      width: auto;
      height: auto;
      border-top: 1px solid #444;
      border-left: 1px solid #444;
      justify-content: center;
      margin: auto;
      grid-template-rows: repeat(5, auto);
      }

      .weekdays {
      display: grid;
      grid-template-columns: repeat(7, auto);
      height: auto;
      }

      .week-container {
      display: grid;
      grid-auto-rows: auto;
      }

      .week {
      display: grid;
      width: auto;
      grid-template-columns: repeat(7, auto);
      }

      .day-container {
      display: grid;
      grid-gap: 0px;
      }

      .day {
      width: 150px;
      height: 150px;
      padding: 10px;
      opacity: 1;
      border-right: 1px solid #444;
      border-bottom:  1px solid #444;
      }

      .day:hover {
      cursor: pointer;
      background-color: var(--app-accent);
      color: #fff;
      }

          .day:hover .menu-list li {
              color: #fff;
          }

          .day:hover .menu-dot {
            color: #fff;
          }

          .day-overlay {

          }


      .day:nth-child(even){
      background-color: var(--accent-light);
      }

      .day:nth-child(even):hover {
      background-color: var(--app-accent);
      }

      .day:nth-child(odd){
      background-color: #fff;
      }

      .day:nth-child(odd):hover {
      background-color: var(--app-accent);
      }

      .day-alt {
      width: 150px;
      height: 150px;
      padding: 10px;
      background-color: #F8F4F4;
          border-right: 1px solid #444;
      }

      .day-title {
      font-size: 18px;
      margin: 0;
      padding: 0;
      width: 150px;
      border-right: 1px solid #444;
      text-align: center;
      border-bottom: 1px solid #444;

      }

          .menu-click {
          font-family: 'Proxima Nova Regular';
          cursor: pointer;
          color: var(--app-accent);

          }

            .menu-list-calendar {
          list-style-type: none;
          margin: 0;
          padding: 0;
          }

          .menu-list-calendar li {
          margin: 0;
          padding: 0;
          font-size: 14px;
          line-height: normal;
          letter-spacing: normal;
          }


          .menu-text {
            display: block;
          }

          .menu-dot {
            display: none;
            color: var(--app-accent);
            padding: 0;
            font-size: 14px;
            line-height: normal;
            margin-left: 3px;

          }


      @media screen and (max-width: 1200px){

        .menu-planner h1 {
        text-align: center;
        margin: 0px;
        padding: 0;
        font-weight: 300;
        font-size: 34px;
        line-height: 45px;
        }

        .day {
        width: 100px;
        height: 100px;
        padding: 5px;
        opacity: 1;
        }

        .day-alt {
        width: 100px;
        height: 100px;
        padding: 5px;
        }

        .weekdays {
        display: grid;
        grid-template-columns: repeat(7, auto);
        height: auto;

        }

        .day-title {
          width: 100px;
          font-size: 16px;
        }

      }

      @media screen and (max-width: 970px){

        .menu-planner {
          padding: 20px 30px 20px 30px;
        }



        .menu-planner h1 {
          font-size: 30px;
          line-height: 45px;
        }

        .monthbtn {
          font-size: 20px;
        }


        .page-title {
        display: grid;
        grid-template-columns: 100px auto 100px;
        grid-gap: 20px;
        padding: 10px;
        margin-bottom: 20px;
        }

        .day {
        width: 90px;
        height: 90px;
        padding: 2px;
        opacity: 1;
        font-size: 12px;
        }

        .day-alt {
        width: 90px;
        height: 90px;
        padding: 2px;
        }

        .weekdays {
        display: grid;
        grid-template-columns: repeat(7, auto);
        height: auto;

        }

        .day-title {
          width: 90px;
          font-size: 16px;
        }

      }



      @media screen and (max-width: 766px){

        .menu-planner {
          padding: 20px 20px 20px 20px;
        }



        .menu-planner h1 {
          font-size: 25px;
          line-height: 35px;
        }

        .monthbtn {
          font-size: 20px;
        }


        .page-title {
        display: grid;
        grid-template-columns: 50px auto 50px;
        grid-gap: 20px;
        padding: 10px;
        margin-bottom: 20px;
        }

        .day {
        width: 75px;
        height: 75px;
        padding: 2px;
        opacity: 1;
        font-size: 14px;
        }

        .day-alt {
        width: 75px;
        height: 75px;
        padding: 2px;
        }

        .weekdays {
        display: grid;
        grid-template-columns: repeat(7, auto);
        height: auto;

        }

        .day-title {
          width: 75px;
          font-size: 16px;
        }

        .menu-text {
          display: none;
        }

        .menu-dot {
          display: block;
        }

      }

      @media screen and (max-width: 590px){

        .menu-planner {
          padding: 20px 10px 20px 10px;
        }



        .menu-planner h1 {
          font-size: 20px;
          line-height: 25px;
        }

        .monthbtn {
          font-size: 20px;
        }


        .page-title {
        display: grid;
        grid-template-columns: 50px auto 50px;
        grid-gap: 20px;
        padding: 10px;
        margin-bottom: 10px;
        }

        .day {
        width: 55px;
        height: 55px;
        padding: 2px;
        opacity: 1;
        font-size: 12px;
        }

        .day-alt {
        width: 55px;
        height: 55px;
        padding: 2px;
        }

        .weekdays {
        display: grid;
        grid-template-columns: repeat(7, auto);
        height: auto;

        }

        .day-title {
          width: 55px;
          font-size: 12px;
        }

      }

      @media screen and (max-width: 400px){

        .menu-planner {
          padding: 20px 10px 20px 10px;
        }



        .menu-planner h1 {
          font-size: 20px;
          line-height: 25px;
        }

        .monthbtn {
          font-size: 20px;
        }


        .page-title {
        display: grid;
        grid-template-columns: 50px auto 50px;
        grid-gap: 20px;
        padding: 10px;
        margin-bottom: 10px;
        }

        .day {
        width: 50px;
        height: 50px;
        padding: 1px;
        opacity: 1;
        font-size: 12px;
        }

        .day-alt {
        width: 50px;
        height: 50px;
        padding: 1px;
        }

        .weekdays {
        display: grid;
        grid-template-columns: repeat(7, auto);
        height: auto;

        }

        .day-title {
          width: 50px;
          font-size: 12px;
        }

        .menu-dot {
          font-size: 12px;

        }

      }
    `)
  }
}
