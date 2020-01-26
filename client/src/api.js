const BASE_URL = "http://localhost:8085"

async function get(url = "") {
    const response = await fetch(BASE_URL + url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json()
}

export function getPerson(input) {
    return get(`/person/${input}`)
}

export function getFacility(firstName) {
    return get(`/facility/${firstName}`)
}

export function getExposure(lastName) {
    return get(`/exposure/${lastName}`)
}
