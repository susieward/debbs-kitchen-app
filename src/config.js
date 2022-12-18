import router from '@/router'

const NavRoutes = router.routes.filter(route => route.props.navDisplay === true);
const SideRoutes = router.routes.filter(route => route.props.sidenav === true);

const config = {
  navRoutes: NavRoutes,
  sideRoutes: SideRoutes,
  fixedNav: false
}

export { NavRoutes, SideRoutes, config }
