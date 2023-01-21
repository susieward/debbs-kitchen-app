const MenuPlanner = () => import('@/views/MenuPlanner')
const About = () => import('@/views/About')
const Recipes = () => import('@/views/Recipes')
const RecipeView = () => import('@/views/RecipeView')
const Menus = () => import('@/views/Menus')

const routes = [
    {
      path: '/',
      name: 'home',
      //component: Home,
      props: { navDisplay: true }
    },
    {
      path: '/recipes',
      //component: Recipes,
      props: { navDisplay: true, sidenav: true },
      children: [
        {
          path: '',
          name: 'AllRecipes',
          //component: AllRecipes
        },
        {
          path: 'new',
          name: 'NewRecipe',
          //component: NewRecipe
        },
        {
          path: 'drafts',
          name: 'DraftsPage',
          //component: DraftsPage,
          props: true
        }
      ]
    },
    {
      path: '/recipe/:id',
      name: 'RecipePage',
      //component: RecipePage,
      props: true
    },
    {
      path: '/menus',
      name: 'Menus',
      //component: MenusList,
      props: { navDisplay: true, sidenav: true }
    },
    {
      path: '/tags',
      name: 'Index',
      //component: Tags,
      props: { navDisplay: true, sidenav: true }
    },
        {
          path: '/tags/:selectedTag',
          name: 'TagResults',
          //component: TagResults,
          props: true
        },

        {
          path: '/tagged/:id',
          name: 'TaggedRecipe',
          //component: TaggedRecipe,
          props: true
        },
        {
          path: '/search/:search',
          name: 'SearchResults',
          //component: SearchResults,
          props: true
        }
  ]

export default {
  routes: [
    {
      path: '/',
      name: 'Home',
      component: MenuPlanner,
      props: { navDisplay: true }
    },
    {
      path: '/recipes',
      name: 'Recipes',
      component: Recipes,
      props: { navDisplay: true, sidenav: true }
    },
    {
      path: '/recipe/:id',
      name: 'RecipePage',
      component: RecipeView,
      props: true
    },
    {
      path: '/new',
      name: 'NewRecipe',
      component: RecipeView,
      props: {}
    },
    {
      path: '/menus',
      name: 'Menus',
      component: Menus,
      props: { navDisplay: true, sidenav: true }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      props: { navDisplay: true, sidenav: true }
    }
  ]
}
