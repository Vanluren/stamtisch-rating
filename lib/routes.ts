export const ROUTES = {
  HOME: "/",
  NOT_FOUND: "/404",
  LOGIN: "/login",
  REGISTER: "/register",
  REVIEW_DETAILS: (id: string) => "/review/" + id,
  REVIEWS: "/reviews",
  PROFILE: {
    INDEX: "/profile",
    SINGLE: (id: string) => "/profile/" + id,
  },
  LOCATION: (id: string) => "/location/" + id,
  RATING_ACTIVITY: {
    NEW: "/rating-activity/new",
    DETAILS: (id: string) => "/rating-activity/" + id,
  },
};

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
};

export const PROTECTED_ROUTES = [ROUTES.HOME];
