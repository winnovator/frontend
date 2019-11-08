pipeline {
    agent any
    stages {

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'Nodejs13', configId: null) {
                    sh "npm install"
                    sh "npm install ionic"
                    sh "npm install  @angular/cli"
                    sh "npm install"
                    sh "ng build --configuration accept"
                    sh "npm run test --browsers=HeadlessChrome --watch=false"
                                    }
            }
        }
}
}