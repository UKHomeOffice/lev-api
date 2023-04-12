pipeline {
    agent { label 'docker' }
    options {
        disableConcurrentBuilds()
    }
    stages {
        stage('Build') {
            steps {
                script {
                  echo "This is an application build"
                }
            }
        }
    }
}
