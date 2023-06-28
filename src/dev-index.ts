import { env } from './config'
import { app } from './main/app-api'

const port = env.port ?? 3000
const server = app.listen(port, () => { console.log(`server started in port ${port}...`) })

process.on('SIGTERM', () => {
  server.close()
})
