pipeline {
  agent {
    docker {
      image 'nasajon/yarn'
    }

  }
  stages {
    stage('Build') {
      steps {
        sh 'yarn && yarn build'
      }
    }
  }
}