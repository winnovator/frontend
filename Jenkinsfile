pipeline {
    agent any
    stages {

        stage('Build') {
            steps {
                nodejs(nodeJSInstallationName: 'Nodejs13', configId: null) {
                    sh "npm install"
                    sh "npm install ionic"
                    sh "npm install -g @angular/cli"
                    sh "npm install"
                    sh "ng build --configuration accept"
                   
                    sh "RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \  && echo  'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list.d/google.list"
                    sh "RUN apt-get update && apt-get -y install google-chrome-stable ."
                    sh "npm run test --browsers=HeadlessChrome --watch=false"
                                    }
            }
        }
}
}