pipeline {
  agent {
    docker 'node:10.16.0'
  }
  stages {
    stage('Build') {
      environment {
        GITHUB_CREDS = credentials('github-fenghao')
      }
      steps {
        echo 'Start Building...'
        sh 'touch a.txt'
        sh 'git config --global user.email "fh345392977@gmail.com"'
        sh 'git config --global user.name "fh345392977"'
        sh 'git add .'
        sh 'git commit -m "build"'
        withCredentials([usernamePassword(credentialsId: 'github-fenghao', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
          sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/fh345392977/d2-crud.git')
        }
      }
    }
  }
}
