import { useEffect } from "react";
import { getPageMeta, generateStructuredData, siteConfig } from "../utils/seo.js";

function setOrCreateMeta(nameOrProp, attrValue, content) {
  let element = document.querySelector(`meta[${nameOrProp}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(nameOrProp, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function setOrCreateLink(rel, href) {
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SEOHead({ path }) {
  useEffect(() => {
    const meta = getPageMeta(path);

    // 1. Title Tag
    document.title = meta.title;

    // 2. Meta Description
    setOrCreateMeta("name", "description", meta.description);

    // 3. Canonical URL
    setOrCreateLink("canonical", meta.canonical);

    // 4. Open Graph Tags
    setOrCreateMeta("property", "og:title", meta.title);
    setOrCreateMeta("property", "og:description", meta.description);
    setOrCreateMeta("property", "og:url", meta.canonical);
    setOrCreateMeta("property", "og:site_name", siteConfig.name);
    setOrCreateMeta("property", "og:type", "website");
    setOrCreateMeta("property", "og:locale", "en_IN");
    setOrCreateMeta("property", "og:image", siteConfig.ogImage);

    // 5. Twitter Card Tags
    setOrCreateMeta("name", "twitter:card", "summary_large_image");
    setOrCreateMeta("name", "twitter:title", meta.title);
    setOrCreateMeta("name", "twitter:description", meta.description);
    setOrCreateMeta("name", "twitter:image", siteConfig.ogImage);

    // 6. JSON-LD Structured Data
    const structuredData = generateStructuredData(path);
    let scriptTag = document.getElementById("pumerai-structured-data");
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = "pumerai-structured-data";
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData, null, 2);
  }, [path]);

  return null;
}
