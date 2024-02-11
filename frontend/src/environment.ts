export function getGQLOrigin() {
    console.log("in getGQLOrigin: " + process.env.REACT_APP_BASE_API);
    return process.env.REACT_APP_BASE_API;
}
