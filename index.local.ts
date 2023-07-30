import appConfiguration from './src/';
import onServerStart from './src/eventHandler/onServerStart';

const app = appConfiguration(true);
app.listen(4000, onServerStart);
