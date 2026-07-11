## 2026-07-11 - Removed O(n^2) loop in simulator.js
**Learning:** Found a common pattern where derived data (min/max chart values) was being calculated in a completely separate nested O(n^2) pass after simulation generation.
**Action:** Always check if derivation logic like chart bounds can be moved directly into the primary data generation loop to save redundant iteration cycles.
