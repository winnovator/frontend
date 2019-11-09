pipeline {
    agent any
    stages {

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'Nodejs13', configId: null) {
                  //  sh "npm install"
                  //  sh "npm install ionic"
                  //  sh "npm install -g @angular/cli"
                  //  sh "npm install"
                  //  sh "ng build --configuration accept"
                  sh "apt-get update"
                    sh "apt-get -y install sudo"
                    sh "echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' | tee -a /etc/apt/sources.list.d/google.list"
                    sh "wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -"
                    sh "apt-get update"
                    
                    sh "sudo apt-get install -y google-chrome-stable"
                    sh "npm run test --browsers=HeadlessChrome --watch=false --no-sandbox"
                                    }
            }
        }
}
}