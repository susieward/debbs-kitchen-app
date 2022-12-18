
export class LayoutTop {
  name = 'layout-top'

  render() {
    return (
      <div class="layout-top">
        <div class="layout-title">
          <slot name="title"></slot>
        </div>
        <div class="top-right">
          <slot name="header-right"></slot>
        </div>
        <slot name="subheader"></slot>
      </div>
    )
  }

  get styles() {
    return (`
      .layout-top {
        width: 100%;
        display: grid;
        padding: 20px;
        margin-bottom: 20px;
        padding-bottom: 0;
        align-content: center;
        grid-template-columns: auto auto;
        grid-auto-rows: auto;
      }

      .layout-title {
        display: grid;
        justify-content: flex-start;
        font-weight: 300;
        font-size: 30px;
      }

      .top-right {
        display: grid;
        grid-auto-flow: column;
        grid-column-gap: 10px;
        justify-content: flex-end;
      }
    `)
  }
}

export class LayoutContent {
  name = 'layout-content'

  render() {
    return (
      <div class="layout-content-wrapper">
        <div class="layout-main">
          <slot name="main"></slot>
        </div>
        <div class="layout-aside">
          <slot name="aside"></slot>
        </div>
      </div>
    )
  }

  get styles() {
    // const bgColor = this.getAttribute('bg-color') || '#f9f9f9'
    return (`
      .layout-content-wrapper {
        display: grid;
        grid-template-columns: minmax(auto, 900px) 25%;
        grid-auto-rows: auto;
        grid-column-gap: 30px;
        min-height: 500px;
        align-content: flex-start;
        padding: 0 20px;
      }

      .layout-main {
        display: grid;
        align-content: flex-start;
        font-size: 18px;
        width: 100%;
        max-width: 900px;
      }

      .layout-aside {
        display: grid;
        align-content: flex-start;
      }

    `)
  }
}

export class Layout {
  name = 'layout-component'

  render() {
    return (
      <div class="layout-wrapper">
        <slot></slot>
      </div>
    )
  }

  get styles() {
    return (`
      .layout-wrapper {
        display: grid;
        align-content: flex-start;
      }
    `)
  }
}
