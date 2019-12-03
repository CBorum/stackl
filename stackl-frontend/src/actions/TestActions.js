export const startTest = msg => {
    return {
        type: "TEST",
        payload: msg,
    }
}

export const testDone = res => {
    return {
        type: "TEST_DONE",
        payload: res,
    }
}