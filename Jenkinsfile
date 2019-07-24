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
        sh 'yarn build'
        sh 'git add .'
        sh 'git commit -m "build"'
        sh 'git push'
      }
    }
  }
}
