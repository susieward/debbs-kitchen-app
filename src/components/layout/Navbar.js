// import NavLinks from '@/layout/NavLinks.js'
import { NavRoutes } from '@/config.js'

export default (props, children) => {
  const title = (
    <div class="title">
      <slot name="title"></slot>
      {children}
    </div>
  )

  const links = (
    <div class="links">
    <nav>
    {NavRoutes.map((route) => {
      return (
        <a class="router-link" onclick={() => props.$router.push(route.path)}>
          {route.name}
        </a>
      )
    })}
    </nav>
    </div>
  )
  return (
    <div class="title-and-links">
      {title} {links}
    </div>
  )
}
