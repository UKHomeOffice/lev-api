library(
        identifier: 'jenkins-shared@3.0.0',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : 'ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git#LEV-78-extend-jenkinsfile',
                              credentialsId: 'git'])
)

pipelineNodeJSApp {}
