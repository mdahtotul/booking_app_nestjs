# --- STAGE 1: DEVELOPMENT (for local running and building) ---
FROM node:20-alpine as development

WORKDIR /usr/src/app

# 1. Install pnpm globally on the development image
RUN npm install -g pnpm

# 2. Copy manifest files and install dependencies
# This leverages Docker cache, so installation only runs if these files change
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install

# 3. Copy source code and build
COPY . .
# Keep the build step here, as it's needed for the production stage later
RUN pnpm run build

# --- STAGE 2: PRODUCTION (for deployment) ---
FROM node:20-alpine as production

# Environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# 1. Install pnpm globally on the production image
RUN npm install -g pnpm

# 2. Copy manifest files and install ONLY production dependencies
COPY package.json ./
COPY pnpm-lock.yaml ./
# Use production install, which is much smaller
RUN pnpm install --prod --frozen-lockfile

# 3. Copy the built application code from the development stage
# This copies the minified/compiled JS files
COPY --from=development /usr/src/app/dist ./dist

# 4. Set the final command for the container
# Note: The docker-compose file will override this command for 'development' target
CMD ["node", "dist/apps/notifications/main"]