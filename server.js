import 'dotenv-flow/config';
import chalk from "chalk";
import app from './src/app.js';

const PORT = process.env.PORT;

app.listen(PORT, (err) => {

    if (err) {
        process.exit(1)
    }

    console.log(chalk.green(`Loading environment from ${process.env.NODE_ENV}`))
    console.log(chalk.blue(`🦖☄️ Server listening on port ${PORT}`))
})