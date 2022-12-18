const MenuPlanner = () => import('@/components/MenuPlanner')

export default class Home {
  name = 'home-view'
  components = { MenuPlanner }

  render() {
    return (
      <div class="home">
        <div class="home-content">
          <menu-planner></menu-planner>
        </div>
      </div>
    )
  }

  get styles() {
    return (
      `.home-content {
      display: grid;
      justify-content: center;
      min-height: 500px;
      background-color: #f9f9f9;
      }`
    )
  }
}
