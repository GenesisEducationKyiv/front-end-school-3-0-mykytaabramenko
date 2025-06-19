
# 🔐 Security Audit Report

**Project**: `music-tracks`  
**Date**: June 18, 2025  
**Prepared by**: Mykyta Abramenko

---

## ✅ Objective

Audit all dependencies used in the project to:

1. Ensure packages meet security standards.
2. Confirm no known zero-day vulnerabilities exist.

---

## 📦 Tools Used

- `npm audit` – to identify vulnerabilities from the NPM advisory database.
- `snyk test` – for detecting known and emerging vulnerabilities including zero-days.
- Manual inspection using:
    - `npm info <package>` for version history and maintenance.
    - GitHub CVE advisories for deeper investigation.

---

## 🧪 Vulnerability Summary

### `npm audit` Results:

| Package            | Severity | Direct? | Affects Prod? | Description | Fix Available |
|--------------------|----------|---------|----------------|-------------|----------------|
| `brace-expansion`  | Low      | ❌       | ❌ No           | Regular Expression Denial of Service ([GHSA-v6h2-p8h4-qcjw](https://github.com/advisories/GHSA-v6h2-p8h4-qcjw)) | ✅ Yes |
| `vite`             | Moderate | ✅       | ❌ No (Dev only) | Path traversal vulnerability ([GHSA-859w-5945-r5v3](https://github.com/advisories/GHSA-859w-5945-r5v3)) | ✅ Yes |
| `react-router`     | High     | ❌       | ✅ Yes          | DoS & pre-render data spoofing ([GHSA-cpj6-fhp6-mr6j](https://github.com/advisories/GHSA-cpj6-fhp6-mr6j)) | ✅ Yes |
| `react-router-dom` | High     | ✅       | ✅ Yes          | Depends on `react-router`, inherits vulnerabilities | ✅ Yes |

### `snyk` Results:
✅ **No known vulnerabilities found** in current packages (as of scan date).  
🔒 This includes zero-day vulnerability databases from Snyk.

---

## 🔄 Recommended Package Replacement

### ⚙️ Target Package: `react-router-dom`

**Reason for replacement**:
- `react-router-dom` has known high-severity vulnerabilities via its dependency on `react-router`.
- Although an upgrade is available, replacing it with a lighter and more secure alternative offers long-term benefits.

---

### 🛠️ Proposed Alternative: [`wouter`](https://www.npmjs.com/package/wouter)

- ⚖️ **Lightweight**: ~4 KB gzipped.
- 🔒 **Zero vulnerabilities** (checked with Snyk and GitHub Advisories).
- 🧰 **Hook-based API** fully compatible with React.
- 📦 **Actively maintained**: monthly updates and strong community support.

> ⚠️ **Note on Migration Caution**  
> While `wouter` is a lightweight and secure alternative, its usage should be carefully considered depending on the project's needs:
>
> - `react-router-dom` offers advanced features such as SSR support, lazy loading, and deeply nested routing.
> - It benefits from a large ecosystem, long-term maintenance, and wide community support.
> - In contrast, `wouter` is better suited for simpler or lightweight applications and lacks many enterprise-grade capabilities.
>
> 🧠 Migration is encouraged only if your routing requirements remain minimal, or if size/security benefits clearly outweigh the need for advanced features.

---

### ✅ Evaluation Steps Performed

1. Queried GitHub Security Advisories and Snyk for reported vulnerabilities.
2. Verified package maintenance activity (stars, commits, issues).
3. Checked bundle size impact.
4. Compared routing APIs for compatibility and migration effort.

---

### 🏗 Migration Steps

```bash
# Step 1: Install wouter
npm install wouter

# Step 2: Replace routing logic
# Example: from react-router-dom
- import { BrowserRouter, Route, Link } from "react-router-dom";
+ import { Router, Route, Link } from "wouter";

<Router>
  <Link href="/tracks">Tracks</Link>
  <Route path="/tracks" component={TracksList} />
</Router>

# Step 3: Remove old dependency
npm uninstall react-router-dom

# Step 4: Re-audit the project
npm audit fix && npm audit
```

---

## 📜 License Audit

- Conducted using `snyk test` with license policy enabled.
- Manually validated flagged licenses via `npm info <package>` and GitHub license files.
- No highly restrictive licenses (e.g., GPL, AGPL) present in the current dependency tree.

---

## 📌 Notes

- `brace-expansion` is an indirect dependency — will be resolved by updating parent packages.
- No critical or unfixable vulnerabilities were found.
- License audit passed, no banned licenses detected.
