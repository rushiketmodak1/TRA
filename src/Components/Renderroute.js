import { Route } from "react-router-dom";

export function renderRoute(route, userRole) {
    if (route.path === "/signin" || route.path === "/signup" ||route.path==='*') {
      return <Route path={route.path} element={route.element} />;
    }
  
    if (route.allowedRoles.includes(userRole)) {
      return <Route path={route.path} element={route.element} />;
    } else {
      return <Route path={route.path} element={<UnauthorizedComponent />} />;
    }
  }
  

  
  function UnauthorizedComponent() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh', 
        }}
      >
        <p>Unauthorized</p>
      </div>
    );
  }
  