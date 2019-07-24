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
        sh 'touch a.txt'
        sh 'git add .'
        sh 'git commit -m "build"'
        sh 'git push'
      }
    }
  }
}
