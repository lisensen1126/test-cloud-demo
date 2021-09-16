
FROM codingcorp-docker.pkg.coding.net/registry/public/nginx-stable-alpine:20200821

ADD default.conf /etc/nginx/conf.d/

ADD dist/ /usr/share/nginx/html/

EXPOSE 80
