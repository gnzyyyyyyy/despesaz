export async function loginUser(data: {
    username: string;
    password: string;
}) {
    const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    const result = await res.json();

    if ( !res.ok ) {
        throw new Error(result.message || "Login failed");
    }

    return result;
}

// Transactions

export async function createTransaction(data: any) {
    const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    const result = await res.json();

    if ( !res.ok ) {
        throw new Error(result.message || "Login failed");
    }

    return result;
}

export async function getTransactions() {
    const res = await fetch("/api/transactions", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    const result = await res.json();

    if ( !res.ok ) {
        throw new Error(result.message || "Login failed");
    }

    return result;
}

export async function updateTransaction(id: string, data: any) {
    const res = await fetch(`/api/transactions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
    });

    return res.json();
}

export async function deleteTransaction(id: string) {
    const res = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
        credentials: "include",
    });

    return res.json();
}