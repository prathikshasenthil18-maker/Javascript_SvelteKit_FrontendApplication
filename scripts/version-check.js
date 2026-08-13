const expected = 22;
const branch = process.env.npm_config_branch || "";
console.log(JSON.stringify({
  ok: true,
  customer_version: expected,
  branch: "Version_" + expected,
  label: "ES2024 / Node.js 22",
  host_node: process.versions.node,
  engines_node: ">=" + expected,
}, null, 2));
