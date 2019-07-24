pipeline {
  agent {
    docker {
      image 'nasajon/yarn'
    }

  }
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh 'yarn build'
          }
        }
        stage('Install') {
          steps {
            sh 'yarn'
          }
        }
      }
    }
  }
}