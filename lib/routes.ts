export const ROUTES = {
  HOME: "/",
  NOT_FOUND: "/404",
  LOGIN: "/login",
  REGISTER: "/register",
  REVIEW_DETAILS: (id: string) => "/review/" + id,
  REVIEWS: "/reviews",
  PROFILE: "/profile",
  LOCATION: (id: string) => "/location/" + id,
  RATING_ACTIVITY: {
    NEW: "/rating-activity/new",
    DETAILS: (id: string) => "/rating-activity/" + id,
  },
};

export const API_ROUTES = {
  users: {
    create: "/api/users/create",
  },
  login: "/api/login",
};

export const PROTECTED_ROUTES = [ROUTES.HOME];
