export function breadcrumbsFor(path) {
  const parts = String(path ?? "/").split("/").filter(Boolean);
  const crumbs = [{ label: "Home", href: "/" }];
  let acc = "";
  for (const p of parts) {
    acc += `/${p}`;
    crumbs.push({ label: p, href: acc });
  }
  return crumbs;
}
