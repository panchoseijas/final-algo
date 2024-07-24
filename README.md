# Algoritmica y lógica computacional - Trabajo final

---

Para probar localmente el test vocacional, es necesario levantar la interfaz web y el servidor HTTP. A continuación se detallan los pasos necesarios para cada uno.

## Ejecutar el servidor HTTP

### Requisitos

1. Instalar [swi-prolog](https://www.swi-prolog.org/download/stable/bin/swipl-8.4.3-1.x64.exe.envelope) _(aclaracion, es importante que sea la version 8.4.3 ya que a nosotros con otras versiones nos dió error pyswip)_
2. Instalar [python3](https://www.python.org/downloads/)

### Pasos

```
python -m pip install fastapi pyswip
python main.py
```

Ahora el servidor HTTP está corriendo en [http://localhost:8000/](http://localhost:8000/)

## Ejecutar la interfaz web

### Requisitos

1. Instalar [Node.js](https://nodejs.org/en/) y [NPM](https://www.npmjs.com/) _(viene incluido con Node)_

### Pasos

```
cd test-vocacional
npm install
npm start
```

Ahora la interfaz web está corriendo en [http://localhost:3000](http://localhost:3000)
