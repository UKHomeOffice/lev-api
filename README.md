# Life Event Verification API

A ReSTful API for verifying 'life events' such as births, deaths, marriages, and civil partnerships.

## Testing

To test changes to this repository simply run:
```bash
make test
```
## Local Development & Testing
### Test against an environment
```
POSTGRES_DB=xxx POSTGRES_USER=xxx POSTGRES_PASSWORD=xxx POSTGRES_SSL=true NODE_TLS_REJECT_UNAUTHORIZED=0 npm start
```
#### Note
- Insert appropriate values for the environment variables.
- Start the postgres proxy for the environment
- Set NODE_TLS_REJECT_UNAUTHORIZED=0 to allow self-signed certificates during local testing

### Test against a locally running database
```
docker-compose up --build
```

