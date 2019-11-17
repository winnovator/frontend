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
                    sh "sudo apt-get install -y google-chrome-stable"
                    sh "ng test --browsers=ChromeHeadlessNoSandbox --watch=false --code-coverage"
                    sh "sonar-scanner -D sonar.projectKey=WInnovatorFrontend -D sonar.sources=. -D sonar.host.url=https://sonar.owntournament.org -D sonar.login=1d2acbec1bf046558cb644e8f106039ccb8dbae2 -D sonar.typescript.lcov.reportPaths=./coverage/lcov.info -D sonar.exclusions=**/node_modules/**,**/*.spec.ts,**/*.conf.ts,**/e2e/**,**/environments/**,**/*.conf.ts,**/*.conf.js -D sonar.scm.provider=git -D sonar.projectName='WInnovator frontend'" 
                }
            }
        }
}
}