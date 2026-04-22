FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html logo.svg favicon.svg /usr/share/caddy/
