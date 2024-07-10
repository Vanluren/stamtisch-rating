export const ROUTES = {
  home: "/",
  notFound: "/404",
  login: "/login",
  register: "/register",
  review: {
    index: "/review",
    new: "/review/new",
  },
  profile: {
    index: "/profile",
    single: (id: string) => "/profile/" + id,
  },
  location: (id: string) => "/location/" + id,
} as const;

export const API_ROUTES = {
  users: {
    fetchById: "/users/:id",
    create: "/users/create",
    updateById: "/users/:id",
  },
  profile: {
    updateByUserId: "/profile/:id",
  },
  login: "/login",
  blob: {
    create: "/blob/create?filename=:filename",
  },
  locations: {
    search: "/locations/search",
  },
  review: {
    create: "/review/create",
    fetchById: "/review/:id",
    fetchByLocationId: "/review/location/:id",
    fetchByUserId: "/review/user/:id",
  },
} as const;

export const PROTECTED_ROUTES = [ROUTES.home];
