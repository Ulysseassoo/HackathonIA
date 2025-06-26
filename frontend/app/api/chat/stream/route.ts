export async function POST(req: Request) {
    const { agentId, message } = await req.json();

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${agentId}/stream`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        }
    );

    return new Response(response.body, {
        headers: {
            "Content-Type": "text/event-stream",
        },
    });
}
