pipeline {
    agent any
    stages {

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'Nodejs13', configId: 'ce61a74-952e-4d9d-82dc-f4a002791978') {
                    sh "npm install"
                    sh "npm install ionic"
                    sh "sudo npm install -g @angular/cli"
                    sh "sudo npm install"
                    sh "ng build --configuration accept"
                    sh "npm run test --browsers=HeadlessChrome --watch=false"
                                    }
            }
        }
}
}