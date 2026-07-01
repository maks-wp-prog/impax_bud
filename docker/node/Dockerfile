# =============================================================================
# Node.js 20 — збірка SCSS/JS для теми WordPress
# =============================================================================

FROM node:20-alpine

LABEL project="impax_bud"
LABEL description="Node.js build environment for WordPress theme assets"

RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git

WORKDIR /app

CMD ["npm", "run", "dev"]
