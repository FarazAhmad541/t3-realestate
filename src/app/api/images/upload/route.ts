export async function POST(request: Request) {
    console.log('POST request received, ', request.body);
    return new Response('Hello, world!', { status: 200 });
}
