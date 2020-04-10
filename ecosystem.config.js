module.exports = {
  apps: [{
    name: 'sharkpatrol',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ec2-user',
      host: 'ec2-54-153-85-27.us-west-1.compute.amazonaws.com',
      key: '~/.ssh/zone.pem',
      ref: 'origin/master',
      repo: 'git@github.com:goodatsports/sharkpatrol.git',
      path: '/home/ec2-user/sharkpatrol',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}