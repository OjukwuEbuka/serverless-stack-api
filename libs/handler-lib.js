export default function handler(lambda) {
    return function (event, context) {
        return Promise.resolve()
        //run the lambda
        .then(() => lambda(event, context))
        // on success
        .then((responseBody) => [200, responseBody])
        // on failure
        .catch((e) => {
            return [500, {error: e.message}];
        })
        // return HTTP response
        .then(([statusCode, body]) => ({
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(body),
        }));
    };
}

// export default function handler(lambda) {
//     return async function (event, context) {
//         let result;
//         try {
//             await Promise.resolve();
//             const responseBody = lambda(event, context);
//             result = [200, responseBody];
//         }
//         catch (e) {
//             const result = [500, { error: e.message }];
//         }
//         const [statusCode, Body] = result;
//         return ({
//             statusCode,
//             headers: {
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Contro-Allow-Credentials": true,
//             },
//             body: JSON.stringify(body),
//         });
//     };
// }