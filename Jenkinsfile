library(
        identifier: 'jenkins-shared@lev-65-trivy-for-ci',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : 'ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git',
                              credentialsId: 'git'])
)

pipelineNodeJSApp {
    dockerApplicationService = 'api'
    dockerImage = "lev-api"
}
