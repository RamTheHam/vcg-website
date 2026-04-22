FROM caddy:2-alpine
ENV PORT=8080
EXPOSE 8080
COPY Caddyfile /etc/caddy/Caddyfile
COPY index.html logo.svg favicon.svg /usr/share/caddy/
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
