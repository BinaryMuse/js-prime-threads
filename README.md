```
npm start
```

Adjust `DEFAULT_WORKER_NUM` in `index.js` to change the default number of workers. Send the process `SIGUSR2` to spawn a new worker (e.g. `kill -USR2 pid`).
