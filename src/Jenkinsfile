pipeline {
    stages {
        stage('npm install') {
            steps {
                sh "npm install"
            }
        }
        stage('install Ionic') {
            steps {
                sh "npm install ionic"
            }
        }
        stage('install angular cli') {
            steps {
                sh "sudo npm install -g @angular/cli"
                sh "sudo npm install"
            }
        }
        stage('Build') {
            steps {
                sh "ng build --configuration accept"
            }
        }

        stage('Unit Tests') {
          steps {
              sh "npm run test --browsers=HeadlessChrome --watch=false"
          }
        }        
    }
}