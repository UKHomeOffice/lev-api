library(
        identifier: 'jenkins-shared@3.0.0',
        retriever: modernSCM([$class       : 'GitSCMSource',
                              remote       : '-b LEV-78-extend-jenkinsfile ssh://git@bitbucket.ipttools.info/lev/jenkins-shared.git',
                              credentialsId: 'git'])
)

pipelineNodeJSApp {}
