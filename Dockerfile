FROM node:alpine
MAINTAINER leo.lou@gov.bc.ca

RUN apk update \
  && apk add alpine-sdk python libffi libffi-dev \
  && git config --global url.https://github.com/.insteadOf git://github.com/ \
  && npm install -g gulp

RUN mkdir -p /app
  
RUN git clone $FEATURESRC /tmp/repo1 \
  && git -C /tmp/repo1 pull \
  && cp -r /tmp/repo1/* /app \
  && rm -rf /tmp/repo1 
  
WORKDIR /app
ADD . /app
RUN npm install && npm update
RUN adduser -S app
RUN chown -R app:0 /app && chmod -R 770 /app
RUN apk del --purge alpine-sdk python libffi libffi-dev  

USER app
EXPOSE 3000
CMD gulp
