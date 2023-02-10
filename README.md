# API-CPF
> API para controle de CPFs

## Installation

```bash
# install dependencies
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev
```

## Test

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```
## Running app on container

```bash
# generate container build
$ docker build . -t apicpf

# execute and expose API in port 3000
$ docker run --rm -it -p 3000:3000 apicpf
```

## libs

### Prisma 
> I used Prisma for the ease of integration with typescript and also for the good organization of the code due to the schema file.

### NestJs
> NestJS was used because it has great integration with typescript, excellent documentation and encourages good practices.

### Pnpm
> It is faster than npm and has great storage efficiency.