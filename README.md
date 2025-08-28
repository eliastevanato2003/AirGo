# CREATE NETWORK:
docker network create mynet
(Only needed the first time)


# BACKEND:
#### DOWNLOAD & RUN
docker run -p 3000:3000 --network mynet --name airgobe eliastevanato03/airgobe
#### RUN
docker run -p 3000:3000 --network mynet --name airgobe airgobe
#### RUN WITH AUTO UPDATE
npm install --save-dev nodemon
docker run -it --name airgobelive --network mynet `-v "C:\Users\Elia Stevanato\Documents\Unive\TAW\be:/usr/src/app" ` -w /usr/src/app ` -p 3000:3000 eliastevanato03/airgobe ` npm run dev
#### START
docker start airgobe

#### CREATE & PUSH IMAGE
docker build -t airgobe .
docker tag airgobe eliastevanato03/airgobe
docker push eliastevanato03/airgobe


# DATABASE:
#### DOWNLOAD & RUN
docker run --env=POSTGRES_USER=admin --env=POSTGRES_PASSWORD=prova --env=POSTGRES_DB=AirGo --network=mynet -p 5433:5432 --name airgodb -d eliastevanato03/airgodb
RUN
docker run --env=POSTGRES_USER=admin --env=POSTGRES_PASSWORD=prova --env=POSTGRES_DB=AirGo --network=mynet -p 5433:5432 --name airgodb -d airgodb
#### START
docker start airgodb

#### CREATE & PUSH IMAGE
docker build -t airgodb .
docker tag airgodb eliastevanato03/airgodb
docker push eliastevanato03/airgodb

#### DUMP DB
docker exec -t airgodb pg_dump -U admin -d AirGo --encoding=UTF8 --format=p > airgo.sql 
(Changing the encoding to UTF-8 may be necessary)

#### COPY DUMP
docker cp "C:\Users\Elia Stevanato\Documents\Unive\TAW\db\airgo.sql" airgodb:/tmp/airgo.sql

#### RESTORE
docker exec -i airgodb psql -U admin -d AirGo -f /tmp/airgo.sql
docker exec -i airgodb pg_restore -U admin -d AirGo /tmp/airgo.sql