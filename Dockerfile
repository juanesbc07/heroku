FROM node:14.16.1-alpine3.10


#run ejecutar un comando....
RUN mkdir /code

COPY . /code

#directiva paara ir a una carpeta y los comandos subsiguientes se hacen en esa ubicacion..
WORKDIR /code

RUN npm i

#instruccion que ejecuta el contenedor cuando arranca.
CMD node index.js









