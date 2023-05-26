library(
        identifier: 'jenkins-shared@lev-105-jenkins-slave',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : 'ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git',
                              credentialsId: 'git'])
)

pipelineNodeJSApp {
    dockerApplicationService = 'api'
    dockerImage = "lev-api"
}
