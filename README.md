# APP Renta de carros

Aplicacion de renta de carros hecha en NEXTJS v15 Y Node


## Contenido

- **rent-cars-next-react** -> Aplicacion frontend
- **rent-car-next-node** -> Aplicacion backend con script de base de datos

Cada carpeta contiene su readme del paso a paso de como instalar y ejecutar el proyecto. Recomendable empezar por el back para luego ser consumido por el front.

El proyecto tambien soporta Docker, si deseas instalarla por medio de docker. Sigue los siguientes pasos (de lo contrario, dentro de cada proyecto esta la doc de como instalar el front y el back:

## Instalación

Sigue estos pasos para instalar por medio de docker el proyecto:

### 1. Instala docker

Aqui se encuentra el recurso para instalar docker en tu maquina: https://docs.docker.com/desktop/setup/install/windows-install/


### 2. Clonar el repositorio

Clona el repositorio en tu máquina local:

```bash
git clone https://github.com/kmilo1717/rent-car-next-node.git
```

```bash
cd rent-car-next-node
```

### 3. Construye los dockers

Debes construir docker por docker, siendo db->backend->frontend

```bash
docker-compose up --build db
```
```bash
docker-compose up --build backend
```
```bash
docker-compose up --build frontend
```

Validar que cada uno este corriendo, importante hacerlos en secuencia, hasta que no termine uno, no ejecutar el siguiente.
Abrir 3 terminales para cada servicio.

Para ver tu proyecto en el navegador, por defecto se va a desplegar en: [localhost:3000/](http://localhost:3000)

