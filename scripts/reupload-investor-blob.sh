#!/usr/bin/env bash
# Re-upload the investor data room to the private Vercel Blob store after
# regenerating the binaries. Run from the website repo root after pulling
# BLOB_READ_WRITE_TOKEN with `vercel env pull` or sourcing prod env vars.
#
# Source of truth: repos/website/investor-assets/ (gitignored).

set -euo pipefail

if [[ -z "${BLOB_READ_WRITE_TOKEN:-}" ]]; then
  echo "BLOB_READ_WRITE_TOKEN is not set." >&2
  echo "Pull prod env vars first:  vercel env pull --environment=production" >&2
  echo "Then:  source .env.production.local  (or export BLOB_READ_WRITE_TOKEN directly)" >&2
  exit 1
fi

cd "$(dirname "$0")/../investor-assets"

FILES=(
  investor-data.json
  Volt_Two_Pager.docx
  Volt_Investor_Deck.pptx
  Volt_Series_A_Deck.pptx
  Volt_Financial_Model.xlsx
  Volt_90Day_Execution_Plan.docx
)

for f in "${FILES[@]}"; do
  if [[ ! -f "$f" ]]; then
    echo "MISSING: $f" >&2
    exit 1
  fi
  echo "Uploading $f → investor-room/$f"
  vercel blob put "$f" \
    --pathname "investor-room/$f" \
    --access private \
    --allow-overwrite true \
    --rw-token "$BLOB_READ_WRITE_TOKEN"
done

echo
echo "All 6 files uploaded. The /investors page reads them on next request."
echo "Verify with:  curl -I https://volt.cuemby.cloud/api/investors/download?file=two-pager  (expect 401 without cookie)"
