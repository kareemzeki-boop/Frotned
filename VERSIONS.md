# CladWise — Version Log

Say **"go to version F-X"** for frontend or **"go to version B-X"** for backend.

---

## FRONTEND

| Version | Commit    | Description |
|---------|-----------|-------------|
| F-14    | a07ed06   | Unify tier badges — all circle+checkmark, different colors |
| F-13    | c61c6bf   | All supplier cards get toggle |
| F-12    | 2076c71   | Luminous supplier card design with toggle + contact details |
| F-11    | 1c1e084   | Revert wake ping from admin panel |
| F-10    | e5b655a   | Admin: Registered Accounts tab + frontend pending banner |
| F-9     | 1962146   | Add Claim listing button on standard-tier cards |
| F-8     | 92e3c1a   | Expanded supplier profile overlay — tabbed |
| F-7     | e435c52   | Fix: apostrophe crash in Stone description |
| F-6     | e17554b   | Material explorer modal |
| F-5     | dcddfc9   | Disable crosshair on mobile |
| F-4     | 8c9ef7d   | Material card photos — Pexels CDN |
| F-3     | c21a723   | Google Analytics GA4 |
| F-2     | 30b3bdc   | Fix: verdictColor missing — report generation crash |
| F-1     | f8073c7   | Revert materials to original card stack |

---

## BACKEND

| Version | Commit    | Description |
|---------|-----------|-------------|
| B-6     | 1ffa4f3   | Admin registrations routes — x-admin-secret |
| B-5     | af894fb   | Supplier registration emails + approval notifications |
| B-4     | 6a2e947   | Revert keepalive ping |
| B-3     | b5e77f0   | Fix hardcoded GitHub Pages URLs to cladwise.ae |
| B-2     | 2875a80   | Add /api/ai/advisory proxy |
| B-1     | 3cc3a42   | Supplier apply — Resend emails + admin approve/reject |

---

## HOW TO REVERT

Tell Claude: **"go to version F-12"**
Claude will run: `git revert` or `git checkout <commit>` and push.

New versions are added here after every significant push.

## Frontend
| Version | Commit | Description |
|---------|--------|-------------|
| F-15 | 707d54a | Admin: real error messages, apiFetch retry, Railway Hobby cleanup |
| F-14 | b4a0eb5 | Supplier application rebuilt — clean 3-step form |
| F-13 | 0a2cb85 | PDF final v3 — border lines, table header redrawn on page break |
| F-12 | eebecb6 | Enhanced material specs (16 rows), Download Spec Sheet PDF |

## Backend
| Version | Commit | Description |
|---------|--------|-------------|
| B-7 | c7388c0 | Fix: x-admin-secret added to CORS — admin panel now works |
| B-6 | 2899dbe | Fix: supplier_applications table created at startup |
