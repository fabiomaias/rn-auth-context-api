interface Response {
    token: string;
    user: {
        name: string;
        email: string;
    };
}

export function signIn(): Promise<Response> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'jkhgef7ywtowqbouiwygtw7aqgf2rgbsfwwgwfvgbszrgebdcvertg',
                user: {
                    name: 'Fábio',
                    email: 'fabiomaias@gmail.com',
                }
            })
        }, 2000)
    })
}