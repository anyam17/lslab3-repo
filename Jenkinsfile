pipeline {
    agent any

    stages {
        stage('Tool Version') {
            steps {
                sh 'docker-compose --version'
            }
        }
        
        // stage('Build Docker Image') {
		// 	steps {
		// 		sh 'docker build -f server/Dockerfile -t anyam22/lslab3-server:latest server/'
        //         sh 'docker build -f client/Dockerfile -t anyam22/lslab3-client:latest client/'
		// 	}
		// }

        // stage('Publish Image To Docker Hub') {
        //     steps {
        //         withDockerRegistry([url: 'https://registry.hub.docker.com/', credentialsId: 'bea1fae4-c046-4439-a5d8-4245e56aca95']) {
        //             sh 'docker push anyam22/lslab3-server:latest'
        //             // sh 'docker push anyam22/lslab3-client:latest'
        //         }
        //     }
        // }

        stage('Connection To K8s Cluster') {
            steps {
                sshagent(['ssh-creds']) {
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@18.188.224.171'
                }
            }
        }

        stage('Copy Deployments to K8s Cluster') {
            steps {
                sshagent(['ssh-creds']) {
                    sh 'scp -r k8s-deployments/ ubuntu@18.188.224.171:/home/ubuntu'
                }
            }
        }

        stage('Connect To K8s Cluster & Deploy Pods') {
            steps {
                sshagent(['ssh-creds']) {
                    sh 'ssh -o StrictHostKeyChecking=no ubuntu@18.188.224.171 kubectl apply -f k8s-deployments'
                }
            }
        }
    }
}
