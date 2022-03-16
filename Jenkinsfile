pipeline {
    agent any
    stages {
        stage('Tool Version') {
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
