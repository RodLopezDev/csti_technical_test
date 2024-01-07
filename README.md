## CSTI Technical Test

### Generate build container

```
docker build -t csti_technical_test .
```

### Running Build Container

```
docker run -d --name csti_technical_test_container -p 4000:4000 --env-file .env csti_technical_test
```

## Populate Exchange rates

File populate.js get info from [forex](https://fastforex.readme.io/reference/introduction)
You need to get a API_KEY and run the file

```
node populate.js {YOUR_FOREX_API_KEY}
```
