import { InferInsertModel } from 'drizzle-orm';
import { Webhook } from 'svix';

import { WebhookEvent } from '@clerk/nextjs/server';

import { db } from '~/server/db';
import { users } from '~/server/db/schema';

type UserInsertType = InferInsertModel<typeof users>;

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error("Missing 'CLERK_WEBHOOK_SECRET' environment variable");
    }
    const svix_id = req.headers.get('svix-id') ?? '';
    const svix_timestamp = req.headers.get('svix-timestamp') ?? '';
    const svix_signature = req.headers.get('svix-signature') ?? '';

    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing or malformed svix headers');
        return new Response('Missing or malformed svix headers', {
            status: 400,
        });
    }

    const body = await req.text();

    const sivx = new Webhook(WEBHOOK_SECRET);

    let payload: WebhookEvent;

    try {
        payload = sivx.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        throw new Error('Error verifying webhook');
        // return new Response("Invalid webhook signature", {
        //   status: 400,
        // });
    }

    const eventType = payload.type;

    if (
        eventType === 'user.created' &&
        payload.data.public_metadata.role === 'USER'
    ) {
        try {
            const {
                email_addresses,
                primary_email_address_id,
                id,
                first_name,
                last_name,
                external_accounts,
            } = payload.data;
            const primaryEmail = email_addresses.find(
                (email) => email.id === primary_email_address_id,
            );

            if (!primaryEmail) {
                console.error('No primary email found');
                throw new Error('No primary email found'); // return new Response("Invalid webhook signature", {
                //   status: 400,
                // });;
                // return new Response("No primary email found", { status: 400 });
            }
            const user: UserInsertType = {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email: primaryEmail.email_address,
                auth_provider: external_accounts[0].provider,
                created_at: new Date(),
                updated_at: new Date(),
            };

            await db.insert(users).values(user);
        } catch (err) {
            console.error(err);
            throw new Error('Error creating user in database');
            // return new Response("Error creating user in database", { status: 400 });
        }
    }

    console.log('USER CREATED');

    return new Response(
        'Successfully verified webhook and created user in database',
        { status: 200 },
    );
}
