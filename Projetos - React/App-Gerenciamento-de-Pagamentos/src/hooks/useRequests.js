import useGlobal from "./useGlobal";

function useRequests() {
    const { token, setErroLogin, removeToken } = useGlobal();

    async function get(route) {
        try {
            if (token) {
                const response = await fetch(`https://desafio-modulo-5.herokuapp.com/${route}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data)
                }
                return data;
            }
        } catch (error) {
            console.log(error.message);
            error.message === 'jwt expired' && removeToken()
        }
    }

    async function getOne(route, id) {
        try {
            const response = await fetch(`https://desafio-modulo-5.herokuapp.com/${route}/${id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data)
            }

            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function post(route, body, withToken) {

        const config = withToken ? {
            'Authorization': `Bearer ${token}`
        } : {}

        try {
            const response = await fetch(`https://desafio-modulo-5.herokuapp.com/${route}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...config,
                },
                body: JSON.stringify(body)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data)
            }

            return data;
        } catch (error) {
            if (error.message === 'Senha ou Email incorretos') {
                setErroLogin(true)
            }

            console.log(error.message);
        }
    }

    async function del(route, id) {
        try {
            const response = await fetch(`https://desafio-modulo-5.herokuapp.com/${route}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data)
            }

            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function put(route, body, id) {
        try {
            const response = await fetch(`https://desafio-modulo-5.herokuapp.com/${route}/${id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data)
            }

            return data;
        } catch (error) {
            console.log(error.message);
        }
    }

    async function putOne(route, body) {
        try {
            const response = await fetch(`https://desafio-modulo-5.herokuapp.com/${route}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data)
            }

            return data;
        } catch (error) {
            console.log(error.message);
        }
    }


    async function getCEP(cep) {
        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data)
            }
            return data;

        } catch (error) {
            console.log('error.message');
            return false
        }
    }

    return {
        get,
        getOne,
        getCEP,
        post,
        del,
        put,
        putOne
    }
}

export default useRequests;