FROM caddy:2-alpine
ENV PORT=8080
EXPOSE 8080
COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html logo.svg favicon.svg henrik.jpg /usr/share/caddy/
COPY logos/ /usr/share/caddy/logos/
# Inherit the base image's ENTRYPOINT ["caddy"] and default CMD
# (run --config /etc/caddy/Caddyfile --adapter caddyfile).
