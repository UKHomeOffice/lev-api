library(
        identifier: 'jenkins-shared@LEV-97',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : 'ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git',
                              credentialsId: 'git'])
)

def zone = 'i'

pipelineNodeJSApp {
    dockerApplicationService = 'api'
    dockerImage = 'lev-api'
    zone = "$zone"
    dev1k8sCluster = "np-${zone}-docker-env1"
}
