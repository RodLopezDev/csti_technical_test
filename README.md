## CSTI Technical Test

### Generate build container

```
docker build -t csti_technical_test .
```

### Running Build Container

```
docker run -d --name csti_technical_test_container -p 4000:4000 --env-file .env csti_technical_test
```
