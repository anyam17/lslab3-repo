pipeline {
    agent any
    stages {
        stage('Test') {
            steps {
                sh 'docker-compose --version'
            }
        }
        
        stage('Build') {
			steps {
				sh 'docker-compose build'
			}
		}
    }
}
