FROM php:7.0-apache

RUN set -ex; \
    \
    a2enmod rewrite;
