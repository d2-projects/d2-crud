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
        sh 'npm install'
        sh 'npm run build'
        sh 'git add .'
        sh 'git commit -m "build"'
        git(
          branch: "master",
          credentialsID: "github-fenghao",
          url : "https://github.com/fh345392977/d2-crud.git",
          changelog: true
        )
        sh 'git push'
      }
    }
  }
}
