import {size, map} from 'lodash'

const fixPath = path => ((path.substring(0, 1) === '/') ? '' : '/') + path

export const toJS = data => {
    if (data && data.toJS) {
        return data.toJS()
    }

    return data
}

export const pathToJS = (data, path, notSetValue) => {
    if (!data || !path) {
        return notSetValue
    }

    const pathArr = fixPath(path).split(/\//).slice(1)

    if (data.getIn) {
        return toJS(data.getIn(pathArr, notSetValue))
    }

    return data
}

export const customToJS = (data, path, custom, notSetValue=undefined, takeRaw=false) => {
    if (!(data && data.getIn) || !path) {
        return notSetValue
    }

    const customPath = '/' + custom + fixPath(path)

    const pathArr = customPath.split(/\//).slice(1)

    if (data.getIn) {
        let retVal = toJS(data.getIn(pathArr, notSetValue));

        if (retVal) {
            retVal = takeRaw ? retVal : retVal[custom];
        }

        return retVal
    }

    return data
}

export const dataToJS = (data, path, notSetValue) => {
    if (!(data && data.getIn) || !path) {
        return notSetValue
    }

    const dataPath = '/data' + fixPath(path)

    const pathArr = dataPath.split(/\//).slice(1)

    if (data.getIn) {
        let retVal = toJS(data.getIn(pathArr, notSetValue));

        if (retVal) {
            retVal = retVal['data'];
        }

        return retVal
    }

    return data
}

export const snapshotToJS = (snapshot, path, notSetValue) => {
    if (!(snapshot && snapshot.getIn) || !path) {
        return notSetValue
    }

    const snapshotPath = '/snapshot' + fixPath(path)

    const pathArr = snapshotPath.split(/\//).slice(1)

    if (snapshot.getIn) {
        let retVal = toJS(snapshot.getIn(pathArr, notSetValue));

        if (retVal) {
            retVal = retVal['snapshot'];
        }

        return retVal
    }

    return snapshot
}

export const isLoaded = function () {
    if (!arguments || !arguments.length) {
        return true
    }

    return map(arguments, a => a !== undefined).reduce((a, b) => a && b)
}

export const isEmpty = data => {
    return !(data && size(data))
}

export default { pathToJS, dataToJS, snapshotToJS, isLoaded, isEmpty, customToJS }
