module.exports = {
  apps : [{
    name: 'Nikadmitrieva',
    script: 'index.js',
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
    }
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
