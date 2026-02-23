/**
 * Splash — Animated loading screen.
 *
 * Shows a bouncing-ball animation until the page finishes loading,
 * then redirects to /home.  Enabled when `settings.isSplash` is true.
 * Falls back to redirect after 3 seconds if the load event doesn't fire.
 *
 * Props: { theme }
 */
import React, { useState, useEffect } from "react";
import "./Splash.css";
import { Navigate } from "react-router-dom";

function AnimatedSplash(props) {
  return (
    <div className="logo_wrapper">
      <div className="loading">
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
        <div className="ball"></div>
      </div>
    </div>
  );
}

function Splash(props) {
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    let timeoutId;
    
    const handleLoad = () => {
      // Small delay for smooth transition
      timeoutId = setTimeout(() => setRedirect(true), 1000); 
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
    <AnimatedSplash theme={props.theme} />
  );
}

export default Splash;
