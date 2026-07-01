import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://pypi-ahmad.github.io";
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

function normalizePath(pathname) {
  if (!pathname) {
    return "/";
  }

  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const normalized = withLeadingSlash.replace(/\/+$/, "");

  if (normalized === "" || normalized === "/home") {
    return "/";
  }

  return normalized;
}

export default function RouteMeta({
  title,
  description,
  canonicalPath,
  noindex = false,
}) {
  const location = useLocation();
  const path = normalizePath(canonicalPath ?? location.pathname);
  const canonicalUrl = `${SITE_URL}${path}`;
  const robotsContent = noindex ? "noindex, nofollow" : "index, follow";

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={DEFAULT_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_IMAGE} />
    </Helmet>
  );
}
