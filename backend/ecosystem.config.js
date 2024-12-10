require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master', DEPLOY_PRIVATE_KEY,
} = process.env;

module.exports = {
  apps: [{
    name: 'api-service',
    script: './dist/app.js',
  }],

  // Настройка деплоя
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/svadim-s/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      key: DEPLOY_PRIVATE_KEY,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH} ${DEPLOY_PRIVATE_KEY}`,
      'post-deploy': 'cd backend && export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v14.21.3/bin && npm i && npm run build && pm2 startOrRestart ecosystem.config.js --env production',
    },
  },
};
