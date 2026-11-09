/**
 * Angular Functional Route Guard (CanActivateFn) for IRCTC RailConnect
 */
export interface CanActivateContext {
  url: string;
}

export const authGuard = (isAuthenticated: boolean, routerNavigate: (route: string[]) => void): boolean => {
  if (isAuthenticated) {
    return true;
  }
  routerNavigate(['/login']);
  return false;
};
