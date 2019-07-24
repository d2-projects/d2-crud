pipeline {
  agent {
    docker {
      image 'madidev/rust-yarn'
    }

  }
  stages {
    stage('Build') {
      steps {
        echo 'Start Building...'
        sh 'yarn'
        sh 'yarn build'
        withCredentials([usernamePassword(credentialsId: 'github-fenghao', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/fh345392977/d2-crud.git')
        }
      }
    }
  }
}
