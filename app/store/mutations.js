const mutations = {
    setProjectId: (state, projectId) => (state.projectId = projectId),
    setTest: (state, test) => (state.test = test),
    clearTest: state => (state.test = {}),
    setVersionSwitch: (state, value) => (state.versionSwitch = value),
    setTheme: (state, value) => (state.theme = value),

    setTestCaseSelectNode: (state, value) => (state.testCaseSelectNode = value),
    setTestCaseSelectNodeIds: (state, value) => (state.testCaseSelectNodeIds = value),
    setTestCaseModuleOptions: (state, value) => (state.testCaseModuleOptions = value),

    setTestReviewSelectNode: (state, value) => (state.testReviewSelectNode = value),
    updateStore: (state, value) => {
        state.parent = value;
        console.log('windowstore数据同步至vue中的state.parent', state.parent);
    },
    setTestReviewSelectNodeIds: (state, value) => (state.testReviewSelectNodeIds = value),
    setTestReviewModuleOptions: (state, value) => (state.testReviewModuleOptions = value),
    setTestPlanViewSelectNode: (state, value) => (state.testPlanViewSelectNode = value),
};

export default mutations;
