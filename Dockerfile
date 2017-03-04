FROM node:alpine
MAINTAINER leo.lou@gov.bc.ca

RUN apk update \
  && apk add alpine-sdk python libffi libffi-dev \
  && git config --global url.https://github.com/.insteadOf git://github.com/ \
  && npm install -g gulp

RUN mkdir -p /app  
WORKDIR /app
ADD . /app
RUN npm install && npm update
RUN cd meteor && meteor 
RUN cd /app && gulp
RUN adduser -S app
RUN chown -R app:0 /app && chmod -R 770 /app
RUN apk del --purge alpine-sdk python libffi libffi-dev  

USER app
EXPOSE 3000
CMD gulp
