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
        git(url: 'https://github.com/fh345392977/d2-crud.git', branch: 'master', credentialsId: 'github-fenghao')
        sh 'git push https://github.com/fh345392977/d2-crud.git'
      }
    }
  }
}