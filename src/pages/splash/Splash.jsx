/**
 * Splash — Animated loading screen.
 *
 * Shows a brief loading-mark fade until the page finishes loading,
 * then redirects to /home. Root entry is gated by `settings.isSplash`;
 * direct visits to /splash always use this component.
 * Falls back to redirect after 3 seconds if the load event doesn't fire.
 */
import { useState, useEffect } from "react";
import "./Splash.css";
import { Navigate } from "react-router-dom";

function AnimatedSplash() {
  return (
    <div className="logo_wrapper" role="status" aria-label="Loading portfolio">
      <div className="loading">
        <div className="motion-fade" data-motion="fade" aria-hidden="true">
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
          <div className="ball"></div>
        </div>
      </div>
    </div>
  );
}

function Splash() {
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    let timeoutId;
    
    const handleLoad = () => {
      // Loading readiness wins over the fallback; no minimum display duration is imposed.
      clearTimeout(timeoutId);
      setRedirect(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      // Fallback timeout in case load event doesn't fire or takes too long
      timeoutId = setTimeout(() => setRedirect(true), 3000);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
  }, []);

  return redirect ? (
    <Navigate to="/home" replace />
  ) : (
    <AnimatedSplash />
  );
}

export default Splash;
