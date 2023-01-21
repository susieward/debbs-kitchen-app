
export default class Layout {
  name = 'layout-component'

  get slots() {
    return [...this.$querySelectorAll('slot')]
  }

  get templates() {
    return [...this.querySelectorAll('template')]
  }

  get filledSlots() {
    return this.slots.flatMap(s => s.assignedNodes())
  }

  get colGap() {
    return this.filledSlots.length > 1 ? '30px' : '0px'
  }

  render() {
    return (
      <div class="layout-wrapper">
        <div class="layout-header">
          <slot name="header-main" class="layout-header-main"></slot>
          <slot name="header-aside" class="layout-header-aside"></slot>
          <slot name="subheader"></slot>
        </div>
        <div class="layout-content-wrapper">
          <slot name="content-main" class="layout-main"></slot>
          <slot name="content-aside" class="layout-aside"></slot>
        </div>
      </div>
    )
  }

  get styles() {
    return (`
      .layout-wrapper {
        display: grid;
        align-content: flex-start;
        justify-content: center;
        padding: 0 20px;
        max-width: 1300px;
      }

      .layout-header {
        width: 100%;
        display: grid;
        padding-top: 20px;
        margin-bottom: 20px;
        align-content: center;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: auto;
      }

      .layout-header-main {
        display: grid;
        justify-content: start;
        font-weight: 300;
        font-size: 30px;
      }

      .layout-header-aside {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 10px;
        justify-content: end;
        align-items: end;
      }

      .layout-content-wrapper {
        display: grid;
        grid-auto-flow: column;
        grid-template-columns: repeat(auto-fit, minmax(auto, 1fr));
        grid-column-gap: ${this.colGap};
      }

      .layout-main {
        display: grid;
        align-content: flex-start;
        min-height: 500px;
        font-size: 18px;
      }

      .layout-aside {
        display: grid;
        align-content: flex-start;
        width: 100%;
        max-width: 300px;
        min-width: auto;
      }
    `)
  }
}
