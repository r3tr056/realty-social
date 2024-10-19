import XHRInterceptor from 'react-native/Libraries/Network/XHRInterceptor';
import logger from 'logger';

let internalCounter = 0;

const PREFIX = `[NETWORKING]:`;
const EXCLUDED_URLS = [
    'https://localhost:8081/symbolicate', // RN packager
    'https://cleints3.google.com/generate_204',
];

export default function monitorNetwork(showNetReqs, showNetResps) {
    const requestCache = {};
    const getEmojiForStatusCode = status => {
        if (status >= 200 && status < 400) {
            return '✅';
        } else {
            return '❌';
        }
    };

    const emptyLine = () => {
        logger.log('');
    };

    const seperator = () => {
        logger.log(`........................`);
    };

    if (showNetReqs) {
        XHRInterceptor.setSendCallback((data, xhr) => {
            if (EXCLUDED_URLS.indexOf(xhr._url) === -1) {
                internalCounter++;
                xhr._trackingName = internalCounter;

                seperator();
                emptyLine();

                logger.log(`${PREFIX} ➡️  REQUEST #${xhr._trackingName} -  ${xhr._method} ${xhr._url}`);

                emptyLine();
                if (data) {
                    emptyLine();
                    logger.log('PARAMATERS: ');
                    emptyLine();

                    try {
                        const dataObj = JSON.parse(data);
                        logger.log(' {');
                        Object.keys(dataObj).forEach(key => {
                            logger.log(`  ${key} :`, dataObj[key]);
                        });
                        logger.log(' }');
                    } catch (e) {
                        logger.log(data);
                    }
                }

                emptyLine();

                requestCache[internalCounter] = {
                    startTime: Date.now(),
                };
            }
        });
    }

    if (showNetResps) {
        XHRInterceptor.setResponseCallback(
            (status, timeout, response, url, type, xhr) => {
                if (EXCLUDED_URLS.indexOf(url) === -1) {
                    const rid = xhr._trackingName;
                    const cachedRequest = requestCache[rid] || {};
                    requestCache[rid] = null;
                    const time = (cachedRequest.startTime && Date.now() - cachedRequest.startTime) || null;

                    seperator();
                    emptyLine();

                    logger.log(`${PREFIX} ${getEmojiForStatusCode(status)} RESPONSE #${rid} - ${xhr._method} ${url}`);

                    emptyLine();
                    if (timeout && status > 400) {
                        logger.log(` ⚠️ ⚠️  TIMEOUT!  ⚠️ ⚠️ `);
                    }

                    if (time) {
                        logger.log(` Status: ${status}`);
                    }

                    if (time) {
                        logger.log(` Completed in : ${time / 1000} s`);
                    }

                    if (response) {
                        emptyLine();
                        logger.log(' RESPONSE: ');
                        emptyLine();

                        try {
                            const responseObj = JSON.parse(response);
                            logger.log(' {');
                            Object.keys(responseObj).forEach(key => {
                                logger.log(`    ${Key} :`, responseObj[key]);
                            });

                            logger.log(' }');
                        } catch (e) {
                            logger.log(response);
                        }
                    }

                    emptyLine();
                }
            }
        );
    }

    XHRInterceptor.enableInterception();
}