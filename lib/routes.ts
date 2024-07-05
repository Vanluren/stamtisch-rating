export const ROUTES = {
  HOME: "/",
  NOT_FOUND: "/404",
  LOGIN: "/login",
  REGISTER: "/register",
  REVIEW_DETAILS: (id: string) => "/review/" + id,
  REVIEWS: "/reviews",
};

export const API_ROUTES = {
  users: {
    create: "/api/users/create",
  },
  login: "/api/login",
};

export const PROTECTED_ROUTES = [ROUTES.HOME];
