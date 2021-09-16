pipeline {
  agent any
  stages {
    stage('检出') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: env.GIT_BUILD_REF]], 
                                    userRemoteConfigs: [[url: env.GIT_REPO_URL, credentialsId: env.CREDENTIALS_ID]]])
      }
    }
    stage('编译') {
      steps {
        sh './build.sh --push'
      }
    }
    stage('生成测试地址') {
        steps {
            postSuccessComment()    
        }
    }
  }
}

def postSuccessComment() {
    if (env.MR_RESOURCE_ID == null) {
        echo "[WARN] env MR_RESOURCE_ID required"
        return
    }
    if (env.MR_TARGET_SHA == null) {
        echo "[WARN] env MR_TARGET_SHA required"
        return
    }
    if (env.MR_SOURCE_BRANCH == null) {
        echo "[WARN] env MR_SOURCE_SHA required"
        return
    }
    def testingContent = "前端测试环境地址：https://codingcorp.coding.net?buffet=${env.MR_SOURCE_SHA}"
    commentMR(depot: "${env.PROJECT_NAME}", token: "${env.PROJECT_TOKEN}", mrResourceId: "${env.MR_RESOURCE_ID}", commentContent: "${testingContent}")
}