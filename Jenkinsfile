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
        git(
          branch: "master",
          credentialsId: "github-fenghao",
          url : "https://github.com/fh345392977/d2-crud.git",
          changelog: true
        )
        sh 'git push'
      }
    }
  }
}
