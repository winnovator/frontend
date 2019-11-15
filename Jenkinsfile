pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'Nodejs13', configId: null) {
                    sh "npm install"
                    sh "npm install ionic"
                    sh "npm install -g @angular/cli"
                    sh "npm install sonarqube-scanner"
                    sh "npm install"
                    sh "ng build --configuration accept"
                    sh "apt-get update"
                    sh "apt-get -y install sudo"
                    sh "echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' | tee -a /etc/apt/sources.list.d/google.list"
                    sh "wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -"
                    sh "apt-get update"
                    sh "sonar-scanner -D sonar.projectKey=123456789abcdefg -D sonar.sources=. -D sonar.host.url=http://localhost:9000 -D sonar.login=ddfe8fcbe89fef511ccf2d0c9603b6be0b36dfbe -D sonar.typescript.lcov.reportPaths=./coverage/lcov.info" 
                    sh "sudo apt-get install -y google-chrome-stable"
                    sh "ng test --browsers=ChromeHeadlessNoSandbox --watch=false --code-coverage"
                }
            }
        }
}
}