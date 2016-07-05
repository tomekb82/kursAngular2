
## Konfiguracja aplikacji

### Serwer

-  utworzenie package.json

    npm init -y

-  konfiguracja kompilera TS (tsconfig.json):

{
 "version": "1.8.9",
 "compilerOptions": {
 "target": "es5",
 "module": "commonjs",
 "emitDecoratorMetadata": true,
 "experimentalDecorators": true,
 "outDir": "build"
 },
 "exclude": [
 "node_modules",
 "client",
 "typings/browser",
 "typings/browser.d.ts"
 ]
}

- uruchomienie serwera

    node build/hello_server.js

- instalacja plikow TS aby IDE podpowiadal skladnie (typings.json):

  $ sudo npm install typings -g

  typings init

  typings install dt~node --global --save

- instalacja express'a:

    npm install express --save

- instalacja definicji TS dla express'a:

    typings install dt~express dt~es6-shim dt~serve-static dt~express-serve-static-core dt~mime --save --global

- instalacja definicji dla websockets

    typings install dt~ws --save --global

- tsc in watch mode

   tsc -w

- instalacja demone NodeJs ktory automatycznie wykrywa zmiany w kodzie

   npm install -g nodemon

- uruchomienie serwera w trybie demona (konfiguracja w package.json)

   npm run dev


UWAGA: W NODE nie dziala metoda find() na talicach jezeli wersja node jest 0x - trzeba zrobic upgrade:
(TypeError: Object [object Object],[object Object],[object Object] has no method 'find')

  sudo npm cache clean -f
  sudo npm install -g n
  sudo n stable
  sudo ln -sf /usr/local/n/versions/node/<VERSION>/bin/node /usr/bin/node

### Testy

## instalacja jasmine

    typings install dt~jasmine --save --global

## uruchomienie testow jednostkowych

- przejdz do katalogu client

- uruchom serwer: live-server

- uruchom strone 'test.html' na serwerze

## testy z uzyciem karma

  npm install karma karma-jasmine karma-chrome-launcher karma-firefox-launcher --save-dev


