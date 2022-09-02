export default {
    toParamns(params: any[]): string {
        let link = "";
        if (params && params.length > 0)
            for (const key in params[0]) {
                if (link !== "") {
                    link += "&";
                }
                link += key + "=" + params[0][key];
            }
        return `?${link}`;
    }
};
