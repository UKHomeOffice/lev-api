library(
        identifier: 'jenkins-shared@master',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : 'ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git',
                              credentialsId: 'git'])
)

pipelineNodeJSApp {
    dockerApplicationService = 'api'
    dockerImage = 'lev-api'
    zone = 'i'
    dev1k8sCluster = 'np-i-docker-env1'
}
