pipeline {
    agent any

    stages {
        stage('Tool Version') {
            steps {
                sh 'docker-compose --version'
            }
        }
        
        stage('Build Docker Image') {
			steps {
				sh 'docker build -f server/Dockerfile -t anyam22/lslab3-server:latest server/'
                // sh 'docker build -f client/Dockerfile -t anyam22/lslab3-client:latest client/'
			}
		}

        stage('Publish Image To Docker Hub') {
            steps {
                withDockerRegistry([url: 'https://registry.hub.docker.com/', credentialsId: 'bea1fae4-c046-4439-a5d8-4245e56aca95']) {
                    sh 'docker push anyam22/lslab3-server:latest'
                    // sh 'docker push anyam22/lslab3-client:latest'
                }
            }
        }
    }
}
